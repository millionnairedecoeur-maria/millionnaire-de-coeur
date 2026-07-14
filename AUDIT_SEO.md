# AUDIT SEO TECHNIQUE — millionnairedecoeur.com
**DORA — Rapport Phase 1 | 4 juillet 2026**

---

## ⚠️ ALERTE URGENTE — À TRAITER EN PRIORITÉ ABSOLUE

> **Le fichier `a-propos.html` a été corrigé en local (embolie pulmonaire supprimée, anciens noms de marque supprimés, "Docteur" corrigé) MAIS la version live sur millionnairedecoeur.com affiche encore l'ancienne version.**
> **→ Maria doit double-cliquer PUSH-NOW.bat dès maintenant pour déployer les corrections.**

---

## SYNTHÈSE PAR PAGE

### Page Accueil (/)
| Élément | Statut | Note |
|---|---|---|
| Title | ✅ VERT | "Coach Décision pour Entrepreneurs \| Maria Francheteau" — bon |
| Meta description | ✅ VERT | Présente, orientée bénéfice |
| H1 | ✅ VERT | "CLARTÉ DÉCISIONNELLE POUR ENTREPRENEURS & INTELLIGENCE ÉNERGÉTIQUE" |
| Schema.org | 🔴 ROUGE | Absent — Google et les IA ne peuvent pas identifier Maria formellement |
| Logo | 🟡 ORANGE | Base64 (intégré dans le HTML) — alourdit la page |
| Images | 🟡 ORANGE | Deux images identiques de Maria avec la même URL |
| Canonical | 🔴 ROUGE | Non vérifié / absent visible |

### Page Services (/services)
| Élément | Statut | Note |
|---|---|---|
| Title | ✅ VERT | "Mes Services – Maria Francheteau \| Millionnaire de Cœur" |
| Meta description | ✅ VERT | Mentionne les 5 offres |
| H1 | ✅ VERT | "MES SERVICES" |
| Schema.org | 🔴 ROUGE | Aucun schema Product ou Service |
| Prix affichés | ✅ VERT | 7€ / 250€ / 600€ / 1800€ — bon signal de confiance |
| Navigation "À Propos" | 🟡 ORANGE | Absent dans le menu de la page services |

### Page À Propos (/a-propos)
| Élément | Statut | Note |
|---|---|---|
| Title (local) | ✅ VERT | "À Propos — Maria Francheteau \| Millionnaire de Cœur" |
| Meta description (local) | ✅ VERT | Inclut "Docteur en droit international, PhD" |
| Canonical | ✅ VERT | Présent dans le fichier local |
| Schema Person | ✅ VERT | Complet dans le fichier local (jamais déployé) |
| **Version LIVE** | 🔴 ROUGE | **Ancienne version en ligne — corrections non poussées** |

### Page Articles (/articles-decisions-entrepreneurs)
| Élément | Statut | Note |
|---|---|---|
| Title | 🟡 ORANGE | "Millionnaire de Coeur" sans œ accent — incohérent |
| Meta description | 🟡 ORANGE | Très courte : "Articles sur les décisions…" |
| H1 | ✅ VERT | "ARTICLES" |
| Nombre d'articles | ✅ VERT | 9 articles visibles |
| Navigation | 🟡 ORANGE | "À Propos" absent du menu sur cette page |
| Schema Article | 🔴 ROUGE | Absent sur les articles individuels |

---

## PROBLÈMES TECHNIQUES CRITIQUES

### 🔴 ROUGE — robots.txt : Conflit Cloudflare vs Maria

**Problème grave pour le GEO.** Le robots.txt comporte deux sections contradictoires :

**Section Cloudflare (en premier) :**
```
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: ClaudeBot
Disallow: /
```

**Section Maria (en second) :**
```
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /
```

Les crawlers lisent la **première règle correspondante**. La section Cloudflare bloque donc tous les robots IA majeurs. Maria a essayé de les re-autoriser mais beaucoup d'entre eux ignorent la deuxième section.

**Impact** : OpenAI (GPTBot), Gemini (Google-Extended), Anthropic (ClaudeBot) peuvent être bloqués de citer le site.

**Solution** : Modifier le paramètre Cloudflare "AI Scrapers and Crawlers" de "Block" à "Allow" dans le dashboard Cloudflare. OU corriger manuellement le robots.txt pour supprimer les Disallow de la section Cloudflare.

---

### 🔴 ROUGE — sitemap.xml : Vide ou inaccessible

`https://www.millionnairedecoeur.com/sitemap.xml` retourne une réponse vide.

Le fichier sitemap.xml existe dans le repo Git local (41 URLs confirmées lors d'un audit précédent) mais ne semble pas se déployer correctement ou est ignoré par Vercel.

**Impact** : Google ne reçoit pas la liste complète des pages à indexer → risque d'indexation incomplète.

**Solution** : Vérifier que Vercel déploie bien le sitemap.xml. Soumettre manuellement l'URL dans Google Search Console.

---

### 🟡 ORANGE — Schema.org absent sur homepage et services

La page à-propos.html **locale** a un Schema Person complet. Mais ni la homepage ni les pages services n'ont de données structurées.

**Impact** : Google AI Overview et les LLMs ne peuvent pas créer une fiche structurée de Maria ou de ses services.

**Solution** :
- Homepage → Ajouter Schema `Person` + `Organization`
- Services → Ajouter Schema `Service` ou `Product` pour chaque offre

---

### 🟡 ORANGE — Images base64 dans le HTML

Sur certaines pages (articles, services), le logo est encodé en base64 directement dans le HTML. Cela alourdit le fichier HTML de plusieurs dizaines de Ko et ralentit le Time To First Byte.

**Solution** : Remplacer les base64 par des `<img src="/logo.jpg">` normaux (le logo.jpg est déjà disponible sur le serveur).

---

## MOTS-CLÉS IDENTIFIÉS

### Mots-clés prioritaires (à cibler)
| Mot-clé | Difficulté estimée | Potentiel |
|---|---|---|
| coach clarté décisionnelle entrepreneur | Moyen | ⭐⭐⭐⭐⭐ |
| coach décision entrepreneurs France | Élevé | ⭐⭐⭐⭐ |
| coaching décisionnel dirigeant | Élevé | ⭐⭐⭐ |
| clarté mentale entrepreneur | Moyen | ⭐⭐⭐⭐ |
| decision cost audit | Faible | ⭐⭐⭐⭐⭐ (niche unique) |
| quantum decision coaching | Faible | ⭐⭐⭐⭐⭐ (quasi inexistant) |
| libérer blocages décision | Moyen | ⭐⭐⭐ |

### Longue traîne (articles à créer)
- "comment prendre une décision difficile en entreprise"
- "pourquoi je n'arrive pas à décider en tant qu'entrepreneur"
- "coût de l'indécision entrepreneur"
- "blocages identitaires décision stratégique"
- "comment lire les risques cachés d'une décision"

---

## SCORE SEO GLOBAL : 38/100

| Catégorie | Score |
|---|---|
| Titres & Metas | 7/10 |
| Structure H-tags | 7/10 |
| Schema.org | 1/10 |
| robots.txt / sitemap | 2/10 |
| Backlinks | 1/10 |
| Contenu / Fréquence | 6/10 |
| Cohérence navigation | 4/10 |
| Performance technique | 10/10 |

