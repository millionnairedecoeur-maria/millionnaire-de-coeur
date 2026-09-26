// ============================================================
//  scripts/create-stripe-product.js
//  Crée la fiche produit Stripe pour le Cahier d'Exercices (29 €)
//
//  USAGE (une seule fois) :
//    STRIPE_SECRET_KEY=sk_live_... node scripts/create-stripe-product.js
//
//  OU (si vous avez un fichier .env.local) :
//    node -r dotenv/config scripts/create-stripe-product.js
// ============================================================

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY manquant. Relancez avec STRIPE_SECRET_KEY=sk_live_...');
    process.exit(1);
  }

  console.log('🚀 Création du produit Stripe...\n');

  // ── 1. Créer le produit ──────────────────────────────────────────────────
  const product = await stripe.products.create({
    name: "Cahier d'Exercices & d'Intégration - L'Ingénierie Quantique du Business",
    description:
      "Cahier téléchargeable de 64 pages : 30 protocoles pour ancrer, exercice après exercice, " +
      "rempli au stylo, page après page, les décisions de votre Future Self, pour attirer plus de clients, " +
      "plus d'argent, plus de liberté sans forcer. Maria Francheteau, autrice du livre " +
      "L'Ingénierie Quantique du Business, vous invite à découvrir ce cahier en exclusivité.",
    metadata: {
      product_key: 'cahier-exercices',
      site: 'millionnairedecoeur.com',
    },
  });

  console.log(`✅ Produit créé : ${product.name}`);
  console.log(`   ID produit   : ${product.id}\n`);

  // ── 2. Créer le prix (29 €, paiement unique) ─────────────────────────────
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 2900, // centimes
    currency: 'eur',
    nickname: "Cahier d'Exercices — 29 €",
  });

  console.log(`✅ Prix créé : 29,00 €`);
  console.log(`   ID prix      : ${price.id}\n`);

  // ── 3. Créer le lien de paiement Stripe ──────────────────────────────────
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    metadata: {
      product: 'cahier-exercices',
      price_id: price.id,
    },
    // Collecte le nom du client (nécessaire pour le filigrane)
    billing_address_collection: 'auto',
    phone_number_collection: { enabled: false },
    // Redirection après paiement
    after_completion: {
      type: 'redirect',
      redirect: {
        url: 'https://www.millionnairedecoeur.com/espace-ecoute-prive-cahier-exercices',
      },
    },
  });

  console.log(`✅ Lien de paiement créé`);
  console.log(`   URL            : ${paymentLink.url}\n`);

  // ── 4. Récapitulatif ─────────────────────────────────────────────────────
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  RÉCAPITULATIF — À CONFIGURER DANS VERCEL');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('  Variables d\'environnement à ajouter dans Vercel :');
  console.log(`  CAHIER_PRICE_ID=${price.id}`);
  console.log('');
  console.log('  Lien de paiement à utiliser sur vos pages :');
  console.log(`  ${paymentLink.url}`);
  console.log('');
  console.log('  URL du webhook Stripe à configurer dans le Dashboard Stripe :');
  console.log('  https://www.millionnairedecoeur.com/api/webhook-cahier');
  console.log('  Événement : checkout.session.completed');
  console.log('');
  console.log('  Après avoir créé le webhook, copiez le "Signing secret"');
  console.log('  et ajoutez-le dans Vercel :');
  console.log('  STRIPE_WEBHOOK_SECRET=whsec_...');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
