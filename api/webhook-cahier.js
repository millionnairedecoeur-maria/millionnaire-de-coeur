// ============================================================
//  api/webhook-cahier.js — Stripe Webhook Handler
//  Millionnaire de Cœur — Cahier d'Exercices (29 €)
//
//  ENV VARS REQUIS (à configurer dans Vercel → Settings → Env Variables) :
//    STRIPE_SECRET_KEY       → clé secrète Stripe (sk_live_...)
//    STRIPE_WEBHOOK_SECRET   → secret du webhook Stripe (whsec_...)
//    RESEND_API_KEY          → clé API Resend (re_...) — resend.com
//
//  PDF SOURCE : api/cahier-template.pdf (dans le repo, jamais exposé publiquement)
// ============================================================

const fs = require('fs');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Lecture du corps brut (nécessaire pour la vérification Stripe) ──────────
function getRawBody(req) {
  if (Buffer.isBuffer(req.rawBody)) return Promise.resolve(req.rawBody);
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// ── Filigrane nominatif visible sur les pages intérieures (pas sur la couverture ni la 4e de couverture) ──
function texteCompatible(font, texte) {
  const autorises = new Set(font.getCharacterSet());
  return Array.from(String(texte || '').normalize('NFC')).map((c) => {
    if (autorises.has(c.codePointAt(0))) return c;
    const remplacements = { 'Ł': 'L', 'ł': 'l', 'Đ': 'D', 'đ': 'd', 'Ħ': 'H', 'ħ': 'h', 'ı': 'i' };
    const simple = remplacements[c] || c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return simple && autorises.has(simple.codePointAt(0)) ? simple : '';
  }).join('');
}

async function addWatermark(pdfBytes, nomComplet, email, date, heure) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  const watermarkText = texteCompatible(
    helvetica,
    `Licence personnelle de ${nomComplet} — ${email} — achat du ${date} à ${heure} · Reproduction, partage et revente interdits`
  );

  pages.forEach((page, index) => {
    if (index === 0 || index === pages.length - 1) return; // couverture avant et arrière
    const { width } = page.getSize();
    let fontSize = 5.6;
    let textWidth = helvetica.widthOfTextAtSize(watermarkText, fontSize);
    if (textWidth > width - 40) {
      fontSize = fontSize * (width - 40) / textWidth;
      textWidth = helvetica.widthOfTextAtSize(watermarkText, fontSize);
    }
    page.drawText(watermarkText, {
      x: (width - textWidth) / 2,
      y: 36,
      size: fontSize,
      font: helvetica,
      color: rgb(0.45, 0.45, 0.45),
      opacity: 0.85,
    });
  });

  return pdfDoc.save();
}

// ── Handler principal ────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    console.error('Error reading body:', err.message);
    return res.status(400).json({ error: 'Cannot read request body' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object;

  // Le cahier est reconnu par l'identifiant de son lien de paiement Stripe (29 €)
  const CAHIER_PAYMENT_LINK = 'plink_1UJyj9KHZQOqYMkzKlWkavza';
  if (session.payment_link !== CAHIER_PAYMENT_LINK) {
    return res.status(200).json({ received: true });
  }

  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || '';
  const champPrenom = (session.custom_fields || []).find(
    (f) => (f.label?.custom || '').toLowerCase().startsWith('pr')
  );
  const prenom = (champPrenom?.text?.value || '').trim() || customerName.split(' ')[0] || '';
  const nomComplet = customerName || prenom || customerEmail;

  if (!customerEmail) {
    console.error('No customer email in session:', session.id);
    return res.status(200).json({ received: true, warning: 'No customer email' });
  }

  const now = new Date();
  const date = now.toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Paris',
  });
  const heure = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris',
  });

  try {
    const pdfPath = path.join(__dirname, 'cahier-template.pdf');
    if (!fs.existsSync(pdfPath)) {
      throw new Error('PDF template introuvable : api/cahier-template.pdf manquant');
    }
    const pdfBytes = fs.readFileSync(pdfPath);

    const watermarkedBytes = await addWatermark(
      new Uint8Array(pdfBytes),
      nomComplet,
      customerEmail,
      date,
      heure
    );

    const pdfBase64 = Buffer.from(watermarkedBytes).toString('base64');

    const espaceUrl = 'https://millionnairedecoeur.com/espace-ecoute-prive-cahier-exercices';
    const siteUrl = 'https://millionnairedecoeur.com';

    const emailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f2eb;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;padding:48px 40px;font-family:Georgia,serif;color:#1a1a1a;">

  <div style="border-bottom:2px solid #D4AF37;padding-bottom:20px;margin-bottom:32px;">
    <p style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#D4AF37;margin:0 0 4px;">Millionnaire de Cœur</p>
    <h2 style="font-size:16px;font-weight:bold;color:#1a1a1a;margin:0;letter-spacing:2px;text-transform:uppercase;">L’Ingénierie Quantique du Business</h2>
  </div>

  <p style="font-size:16px;line-height:1.8;margin:0 0 20px;">Bonjour${prenom ? ' ' + prenom : ''},</p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 20px;">
    Je vous remercie pour votre confiance, et je salue la clarté de votre engagement.
  </p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 20px;">
    Ce cahier a été conçu spécifiquement pour vous permettre d’exécuter les protocoles et d’ancrer la posture de votre Future Self après chaque écoute.
  </p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 28px;">
    Vous trouverez votre <strong>Cahier d’exercices du Business Quantique</strong> en pièce jointe de cet e-mail. Il est entièrement téléchargeable et imprimable. Je vous invite à le compléter avec un stylo bleu effaçable ou au crayon de bois après chaque session d’écoute. Les exercices de ce cahier sont ceux du livre complet <em>Le Business Quantique</em>, à paraître.
  </p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 28px;">
    Ce cahier est nominatif : votre nom figure sur chaque page intérieure. Merci de le réserver à votre usage personnel.
  </p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 24px;">
    Si vous avez besoin de revenir sur les audios, capsule par capsule, votre espace d’écoute privé reste accessible en permanence à cette adresse :
  </p>

  <p style="margin:20px 0;">
    <a href="${espaceUrl}" style="display:inline-block;background:#1a3a5c;color:#D4AF37;padding:12px 24px;border-radius:4px;text-decoration:none;font-family:Georgia,serif;font-size:14px;font-weight:bold;">Accéder à mon espace d’écoute privé</a>
  </p>

  <p style="font-size:16px;line-height:1.8;margin:32px 0 0;">Bien à vous,</p>

  <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e8e0d0;">
    <p style="font-size:15px;font-weight:bold;color:#000000;margin:0 0 4px;">Maria Francheteau.</p>
    <p style="font-size:13px;color:#D4AF37;margin:0 0 4px;">Millionnaire de Cœur — Clarté Décisionnelle &amp; Approche Systémique</p>
    <p style="font-size:13px;margin:0;"><a href="${siteUrl}" style="color:#1a3a5c;text-decoration:underline;">millionnairedecoeur.com</a></p>
  </div>

  <div style="margin-top:32px;padding-top:16px;border-top:1px solid #f0ebe0;text-align:center;">
    <p style="font-size:11px;color:#bbb;margin:0;">Vous recevez cet email car vous avez commandé le Cahier d’exercices du Business Quantique.<br>
    <a href="${siteUrl}/desabonnement?email=${encodeURIComponent(customerEmail)}" style="color:#D4AF37;font-size:11px;">Se désabonner</a> · <a href="${siteUrl}" style="color:#D4AF37;font-size:11px;">millionnairedecoeur.com</a></p>
  </div>

</div>
</body>
</html>`;

    const { error: sendError } = await resend.emails.send({
      from: 'Maria Francheteau, Ph.D. — Millionnaire de Cœur <contact@millionnairedecoeur.com>',
      to: customerEmail,
      subject: 'Votre Cahier d’exercices du Business Quantique',
      html: emailHtml,
      attachments: [
        {
          filename: 'Cahier-exercices-du-Business-Quantique.pdf',
          content: pdfBase64,
        },
      ],
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return res.status(500).json({ error: 'Email sending failed', details: sendError });
    }

    console.log(`Cahier envoyé à ${customerEmail} (session: ${session.id})`);

    // Le Google Sheet et Sender sont mis à jour par Make (scénario Paiements Stripe).

    return res.status(200).json({ success: true, email: customerEmail });

  } catch (err) {
    console.error('Webhook processing error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

// Corps brut obligatoire pour vérifier la signature Stripe
module.exports.config = { api: { bodyParser: false } };
