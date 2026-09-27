// ============================================================
//  api/webhook-cahier.js — Stripe Webhook Handler
//  Millionnaire de Cœur — Cahier d'Exercices (29 €)
//
//  ENV VARS REQUIS (à configurer dans Vercel → Settings → Env Variables) :
//    STRIPE_SECRET_KEY       → clé secrète Stripe (sk_live_...)
//    STRIPE_WEBHOOK_SECRET   → secret du webhook Stripe (whsec_...)
//    CAHIER_PRICE_ID         → ID du prix Stripe (price_...), ex: price_1AbcDef...
//    RESEND_API_KEY          → clé API Resend (re_...) — resend.com
//    APPS_SCRIPT_URL         → URL du Web App Apps Script MDC (pour log Google Sheets)
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
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// ── Ajout du filigrane discret en bas de chaque page du PDF ──────────────────
async function addWatermark(pdfBytes, email, date, heure) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  // Filigrane discret en bas de page — email + date/heure uniquement
  const watermarkText = `${email} — ${date} ${heure}`;

  for (const page of pages) {
    const { width } = page.getSize();
    const fontSize = 7;
    const textWidth = helvetica.widthOfTextAtSize(watermarkText, fontSize);
    const x = (width - textWidth) / 2;
    const y = 18;

    page.drawText(watermarkText, {
      x,
      y,
      size: fontSize,
      font: helvetica,
      color: rgb(0.6, 0.6, 0.6),
      opacity: 0.08,
    });
  }

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

  const cahierPriceId = process.env.CAHIER_PRICE_ID;
  if (cahierPriceId) {
    const isForCahier =
      session.metadata?.price_id === cahierPriceId ||
      session.metadata?.product === 'cahier-exercices';
    if (!isForCahier) {
      return res.status(200).json({ received: true });
    }
  }

  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || '';
  const prenom = customerName.split(' ')[0] || 'Client';

  if (!customerEmail) {
    console.error('No customer email in session:', session.id);
    return res.status(200).json({ received: true, warning: 'No customer email' });
  }

  const now = new Date();
  const date = now.toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
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

  <p style="font-size:16px;line-height:1.8;margin:0 0 20px;">Bonjour ${prenom},</p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 20px;">
    Je vous remercie pour votre confiance, et je salue la clarté de votre engagement.
  </p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 20px;">
    Ce cahier a été conçu spécifiquement pour vous permettre d’exécuter les protocoles et d’ancrer la posture de votre Future Self après chaque écoute.
  </p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 28px;">
    Vous trouverez votre <strong>Cahier d’Exercices et d’Intégration — L’Ingénierie Quantique du Business</strong> en pièce jointe de cet e-mail. Il est entièrement téléchargeable et imprimable. Je vous invite à le compléter avec un stylo bleu effaçable ou au crayon de bois après chaque session d’écoute.
  </p>

  <p style="font-size:16px;line-height:1.8;margin:0 0 24px;">
    Si vous avez besoin de revenir sur les audios, capsule par capsule, votre espace d’écoute privé reste accessible en permanence à cette adresse :
  </p>

  <p style="margin:20px 0;">
    <a href="${espaceUrl}" style="display:inline-block;background:#1a3a5c;color:#D4AF37;padding:12px 24px;border-radius:4px;text-decoration:none;font-family:Georgia,serif;font-size:14px;font-weight:bold;">👉 ACCÉDER À MON ESPACE D’ÉCOUTE PRIVÉ →</a>
  </p>

  <p style="font-size:16px;line-height:1.8;margin:32px 0 0;">À très vite,</p>

  <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e8e0d0;">
    <p style="font-size:16px;font-weight:bold;color:#1a1a1a;margin:0 0 4px;">Maria Francheteau, Ph.D.</p>
    <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#D4AF37;margin:0 0 2px;">Millionnaire de Cœur</p>
    <p style="font-size:12px;color:#888;margin:4px 0 0;font-style:italic;">Clarté Décisionnelle &amp; Approche Systémique</p>
    <p style="font-size:12px;margin:6px 0 0;"><a href="${siteUrl}" style="color:#D4AF37;text-decoration:none;">millionnairedecoeur.com</a></p>
  </div>

  <div style="margin-top:32px;padding-top:16px;border-top:1px solid #f0ebe0;text-align:center;">
    <p style="font-size:11px;color:#bbb;margin:0;">Vous recevez cet email car vous avez commandé le Cahier d’Exercices MDC.<br>
    <a href="${siteUrl}/desabonnement?email=${encodeURIComponent(customerEmail)}" style="color:#D4AF37;font-size:11px;">Se désabonner</a> · <a href="${siteUrl}" style="color:#D4AF37;font-size:11px;">millionnairedecoeur.com</a></p>
  </div>

</div>
</body>
</html>`;

    const { error: sendError } = await resend.emails.send({
      from: 'Maria Francheteau, Ph.D. — Millionnaire de Cœur <contact@millionnairedecoeur.com>',
      to: customerEmail,
      subject: '📥 Votre Cahier d’Exercices — L’Ingénierie Quantique du Business',
      html: emailHtml,
      attachments: [
        {
          filename: 'Cahier-Exercices-MDC.pdf',
          content: pdfBase64,
        },
      ],
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return res.status(500).json({ error: 'Email sending failed', details: sendError });
    }

    console.log(`✅ Cahier envoyé à ${customerEmail} (session: ${session.id})`);

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'logCahierAchat',
            prenom: prenom,
            email: customerEmail,
            nom: customerName,
            montant: '29',
            devise: 'EUR',
            date: date,
            heure: heure,
            stripeSessionId: session.id,
          }),
        });
      } catch (sheetErr) {
        console.warn('Google Sheets log failed (non-bloquant):', sheetErr.message);
      }
    }

    return res.status(200).json({ success: true, email: customerEmail });

  } catch (err) {
    console.error('Webhook processing error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
