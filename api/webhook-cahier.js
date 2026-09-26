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

// ── Ajout du filigrane diagonal sur chaque page du PDF ──────────────────────
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
    const x = (width - textWidth) / 2; // centré horizontalement
    const y = 18; // bas de page, 18pt de marge

    page.drawText(watermarkText, {
      x,
      y,
      size: fontSize,
      font: helvetica,
      color: rgb(0.6, 0.6, 0.6),
      opacity: 0.08, // ~8% — discret, juste visible à l'inspection
    });
  }

  return pdfDoc.save();
}

// ── Handler principal ────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Lire le corps brut et vérifier la signature Stripe
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

  // 2. Ignorer tous les événements sauf checkout.session.completed
  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object;

  // 3. Filtrer : ne traiter que les achats du Cahier d'Exercices
  const cahierPriceId = process.env.CAHIER_PRICE_ID;
  if (cahierPriceId) {
    // Vérification via metadata (injectée dans le lien checkout) ou line_items
    const isForCahier =
      session.metadata?.price_id === cahierPriceId ||
      session.metadata?.product === 'cahier-exercices';

    if (!isForCahier) {
      // Pas le Cahier d'Exercices → ignorer silencieusement
      return res.status(200).json({ received: true });
    }
  }

  // 4. Extraire les infos client
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || '';
  const prenom = customerName.split(' ')[0] || 'Client';

  if (!customerEmail) {
    console.error('No customer email in session:', session.id);
    return res.status(200).json({ received: true, warning: 'No customer email' });
  }

  // 5. Horodatage en format français
  const now = new Date();
  const date = now.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const heure = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  });

  try {
    // 6. Lire le PDF template depuis le repo (jamais exposé publiquement)
    const pdfPath = path.join(__dirname, 'cahier-template.pdf');
    if (!fs.existsSync(pdfPath)) {
      throw new Error('PDF template introuvable : api/cahier-template.pdf manquant');
    }
    const pdfBytes = fs.readFileSync(pdfPath);

    // 7. Appliquer le filigrane dynamique
    const watermarkedBytes = await addWatermark(
      new Uint8Array(pdfBytes),
      customerEmail,
      date,
      heure
    );

    // 8. Encoder en base64 pour la pièce jointe
    const pdfBase64 = Buffer.from(watermarkedBytes).toString('base64');

    // 9. Envoyer l'email avec le PDF personnalisé
    const { error: sendError } = await resend.emails.send({
      from: 'contact@millionnairedecoeur.com',
      to: customerEmail,
      subject: "Votre Cahier d'Exercices — Millionnaire de Cœur",
      html: `
        <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; color: #1a1a1a; background: #fff; padding: 32px;">
          <h2 style="color: #D4AF37; font-size: 22px; margin-bottom: 24px;">Bonjour ${prenom},</h2>

          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Merci pour votre achat. Vous trouverez en pièce jointe votre
            <strong>Cahier d'Exercices et d'Intégration — L'Ingénierie Quantique du Business</strong>,
            personnalisé à votre nom.
          </p>

          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Ce document est protégé. Il a été généré spécifiquement pour vous :
            toute copie, diffusion ou partage est strictement interdite.
          </p>

          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
            Pour toute question, écrivez-moi à
            <a href="mailto:contact@millionnairedecoeur.com" style="color: #D4AF37;">
              contact@millionnairedecoeur.com
            </a>.
          </p>

          <hr style="border: none; border-top: 1px solid #e0d5b0; margin: 24px 0;" />

          <p style="font-size: 13px; color: #888; line-height: 1.6;">
            Maria Francheteau<br>
            <strong style="color: #D4AF37;">Millionnaire de Cœur</strong><br>
            <a href="https://www.millionnairedecoeur.com" style="color: #D4AF37;">
              millionnairedecoeur.com
            </a>
          </p>
        </div>
      `,
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

    // 10. Enregistrer l'achat dans Google Sheets via Apps Script
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
        console.log(`📊 Achat logué dans Google Sheets pour ${customerEmail}`);
      } catch (sheetErr) {
        // Ne pas bloquer l'envoi du PDF si le log échoue
        console.warn('Google Sheets log failed (non-bloquant):', sheetErr.message);
      }
    }

    return res.status(200).json({ success: true, email: customerEmail });

  } catch (err) {
    console.error('Webhook processing error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
