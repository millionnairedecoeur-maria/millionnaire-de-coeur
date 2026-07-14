# PLAN D'ACTION SEO + GEO — Semaine du 4 juillet 2026
**DORA — Les 10 actions prioritaires dans l'ordre d'impact**

---

## ⚡ ACTIONS MANUELLES (à faire par Maria)

### ACTION #0 — PUSH-NOW.bat (URGENT — 2 minutes)
> **Double-cliquer PUSH-NOW.bat MAINTENANT.**
> 
> Pourquoi : Le fichier `a-propos.html` a des corrections importantes (sensibles) qui ne sont pas encore en ligne. La page live affiche encore l'ancienne version. Le push déploie aussi les redirections 301 pour les 4 URLs en erreur 404 dans Search Console.

---

### ACTION #1 — Cloudflare : Autoriser les robots IA (10 minutes)
**Priorité : CRITIQUE pour le GEO**

1. Aller sur dash.cloudflare.com
2. Sélectionner le domaine millionnairedecoeur.com
3. Aller dans **Security → Bots**
4. Trouver "AI Scrapers and Crawlers"
5. Changer de "Block" à **"Allow"** (ou "Managed Challenge" si disponible)
6. Sauvegarder

**Pourquoi** : Sans cette action, GPTBot (OpenAI), Google-Extended (Gemini) et ClaudeBot sont bloqués et ne peuvent pas indexer le site pour les réponses IA.

---

### ACTION #2 — Google Business Profile (15 minutes)
**Impact SEO local + GEO : Très élevé**

1. Aller sur business.google.com
2. Créer une fiche "Millionnaire de Cœur — Maria Francheteau"
3. Catégorie : "Coach de vie" ou "Coach d'affaires"
4. Ajouter l'URL millionnairedecoeur.com
5. Ajouter numéro, horaires si applicable
6. Uploader logo + photo de Maria

**Pourquoi** : Google Business est l'une des premières sources que Google AI Overview consulte pour identifier une entreprise locale française.

---

### ACTION #3 — LinkedIn : Compléter le profil (20 minutes)
**Impact GEO : Élevé**

1. Dans le profil LinkedIn, ajouter **millionnairedecoeur.com** dans "Sites web"
2. Modifier le titre : "Coach en Clarté Décisionnelle pour Entrepreneurs | Docteur en Droit | Fondatrice Millionnaire de Cœur"
3. Dans la section "À propos" sur LinkedIn : mentionner Decision Cost Audit AI, les offres Quantum, le projet KOSMOS
4. Publier 1 article LinkedIn long (800+ mots) avec un lien vers millionnairedecoeur.com

**Pourquoi** : Les LLMs utilisent LinkedIn comme source de confiance. Un profil riche augmente la probabilité d'être cité.

---

### ACTION #4 — Soumettre sitemap.xml dans Search Console (5 minutes)
**Impact SEO : Élevé**

1. Aller sur Google Search Console → millionnairedecoeur.com
2. Aller dans **Index → Sitemaps**
3. Entrer l'URL : `https://www.millionnairedecoeur.com/sitemap.xml`
4. Cliquer "Soumettre"

Note : Si le sitemap retourne toujours vide, vérifier dans le repo Git que le fichier sitemap.xml est bien à la racine du projet.

---

## 🤖 ACTIONS QUE DORA PEUT FAIRE (avec accord de Maria)

### ACTION #5 — Ajouter Schema Organization sur index.html
**Impact GEO : Élevé**

Ajouter ce bloc JSON-LD dans le `<head>` de index.html :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Millionnaire de Cœur",
  "url": "https://www.millionnairedecoeur.com",
  "logo": "https://www.millionnairedecoeur.com/logo.jpg",
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Maria Francheteau",
    "jobTitle": "Coach en Clarté Décisionnelle pour Entrepreneurs",
    "url": "https://www.millionnairedecoeur.com/a-propos"
  },
  "sameAs": [
    "https://fr.linkedin.com/in/mariafrancheteau",
    "https://www.youtube.com/@lechoixducoeur888",
    "https://www.instagram.com/millionnairedecoeur/",
    "https://www.facebook.com/profile.php?id=100010965070076"
  ],
  "description": "Coaching en clarté décisionnelle pour entrepreneurs. Decision Cost Audit AI, sessions Quantum Decision Catalyst, Quantum Expansion, Sovereignty et Legacy.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "millionnairedecoeur@gmail.com",
    "contactType": "customer service"
  }
}
</script>
```

**Dire à DORA "ajoute le Schema sur la homepage" pour qu'elle l'intègre et pousse.**

---

### ACTION #6 — Corriger le logo base64 sur les pages articles et services
**Impact Performance : Moyen**

Remplacer les logos intégrés en base64 par `<img src="/logo.jpg">` sur les pages qui l'encodent encore. Gain de ~50-80Ko par page HTML.

---

### ACTION #7 — Ajouter liens internes (articles → services)
**Impact SEO : Moyen-Élevé**

Dans chaque article, ajouter un lien contextuel vers une offre de service correspondante (voir tableau dans STRATEGIE_BACKLINKS.md). Cela concentre l'autorité SEO sur les pages qui convertissent.

---

## 📞 ACTIONS OUTREACH (par Maria, dans les 30 prochains jours)

### ACTION #8 — Contacter 3 podcasts pour une interview
Utiliser le Template A de STRATEGIE_BACKLINKS.md.

**Commencer par :**
1. Bien dans ta Boîte (Laura Besson) — coach + entrepreneurs = audience parfaite
2. Comment t'as fait ? — format interview entrepreneurs, moins connu = plus accessible
3. Change ma vie (Clotilde Dusoulier) — coaching + dev perso

---

### ACTION #9 — Créer un profil ICF France
Site : icfrance.org

Rejoindre la Fédération ICF France et créer un profil dans l'annuaire des coachs. Backlink de qualité depuis un site d'autorité dans la niche.

---

### ACTION #10 — Rédiger 1 article "guide ultime" 2000+ mots
**Sujet suggéré** : *"Le vrai coût de l'indécision pour les entrepreneurs : tout ce que vous perdez sans le savoir"*

Structure :
- Introduction avec un chiffre fort
- Partie 1 : Les 5 types de coûts de l'indécision (argent, énergie, opportunités, relations, confiance)
- Partie 2 : Les 3 mécanismes qui bloquent les décisions (peur, identité, loyautés)
- Partie 3 : La méthode Decision Cost Audit — 3 étapes
- FAQ (5-7 questions structurées en Schema FAQPage)
- CTA vers Decision Cost Audit AI

**Demander à DORA de rédiger cet article quand vous êtes prête.**

---

## RÉSUMÉ EXÉCUTIF

| Action | Durée | Impact | Qui |
|---|---|---|---|
| #0 PUSH-NOW.bat | 2 min | 🔴 CRITIQUE | Maria |
| #1 Cloudflare bots | 10 min | 🔴 CRITIQUE GEO | Maria |
| #2 Google Business | 15 min | 🔴 TRÈS ÉLEVÉ | Maria |
| #3 LinkedIn complet | 20 min | 🟠 ÉLEVÉ GEO | Maria |
| #4 Soumettre sitemap | 5 min | 🟠 ÉLEVÉ SEO | Maria |
| #5 Schema Homepage | 15 min | 🟠 ÉLEVÉ GEO | DORA |
| #6 Fix logos base64 | 20 min | 🟡 MOYEN | DORA |
| #7 Liens internes | 30 min | 🟡 MOYEN SEO | DORA |
| #8 3 podcasts contact | 30 min | 🔴 TRÈS ÉLEVÉ GEO | Maria |
| #9 Profil ICF France | 15 min | 🟡 MOYEN | Maria |
| #10 Article guide ultime | — | 🔴 TRÈS ÉLEVÉ GEO | DORA + Maria |

---

## HORIZON DE RÉSULTATS

| Délai | Résultat attendu |
|---|---|
| Immédiat (cette semaine) | a-propos.html corrigé en ligne, robots IA débloqués, redirections 404 actives |
| 30 jours | Google Business actif, LinkedIn optimisé, premier podcast contacté, Schema homepage en place |
| 60 jours | 5-8 backlinks acquis, 1 podcast réalisé, article guide ultime publié |
| 90 jours | 15-20 backlinks, site commençant à ranker sur mots-clés longue traîne, premières citations possibles dans les IA |
| 6 mois | Positions Google sur "coach clarté décisionnelle entrepreneur", citations régulières dans les réponses IA |

