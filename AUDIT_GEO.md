# AUDIT GEO — Visibilité dans les IA
**DORA — Rapport Phase 2 | 4 juillet 2026**
*GEO = Generative Engine Optimization : être cité par ChatGPT, Perplexity, Gemini, Google AI Overview*

---

## SCORE GEO ACTUEL : 8/100 🔴

millionnairedecoeur.com est **quasiment invisible** pour les IA génératives. Ce rapport détaille pourquoi et comment changer ça.

---

## CE QUE LES IA UTILISENT POUR CITER UN SITE

Les LLMs (ChatGPT, Gemini, Perplexity, Claude) citent un site quand :
1. Il est **indexé et crawlable** par leurs robots
2. Il a des **données structurées** (Schema.org) qui permettent de l'identifier
3. Il est **cité par d'autres sources** sur le web (backlinks = crédibilité)
4. Son contenu est **encyclopédique et factuel** (style Wikipedia)
5. Son **profil web est cohérent** sur tous les réseaux

---

## DIAGNOSTIC POINT PAR POINT

### 1. Crawlabilité par les robots IA
**Score : 2/10 🔴**

Le robots.txt a un **conflit critique** (voir Audit SEO) :
- Cloudflare bloque GPTBot, Google-Extended, ClaudeBot, meta-externalagent
- Maria essaie de les ré-autoriser mais la première règle gagne

**Résultat probable** : OpenAI, Gemini et Claude ne peuvent pas lire le site → impossible d'être cité.

**Fix** : Dans le dashboard Cloudflare → Security → Bots → changer "AI Scrapers and Crawlers" de "Block" à "Managed Challenge" ou "Allow".

---

### 2. Données structurées Schema.org
**Score : 3/10 🟡**

✅ Schema `Person` complet sur a-propos.html (local, pas encore en ligne)  
❌ Aucun Schema sur la homepage  
❌ Aucun Schema `Service` ou `Product` sur les pages d'offres  
❌ Aucun Schema `Article` sur les articles  
❌ Aucun Schema `FAQPage` sur les pages de services  

**Fix prioritaire** : Déployer a-propos.html (PUSH-NOW.bat) + ajouter Schema Organization sur l'accueil.

---

### 3. Citations web externes
**Score : 1/10 🔴**

Recherche effectuée sur "millionnairedecoeur.com" + "Maria Francheteau" coach :
- **LinkedIn** : Profil présent ✓ (signal modeste)
- **Viadeo** : Profil Maria Francheteau-Laronze (travaux académiques 2008 — pas le coaching)
- **Persée** : Thèse en droit international 2008 (profil académique, pas business)
- **Presse** : ZÉRO article de presse ou média sur MDC
- **Blogs** : ZÉRO mention dans des blogs coaching/entrepreneuriat
- **Podcasts** : ZÉRO interview tracée sur le web

**Un site invisible sur le web = invisible pour les IA.**

---

### 4. Profil "encyclopédique" de Maria
**Score : 3/10 🟡**

La page À Propos raconte une histoire forte (quand elle sera déployée) mais n'est pas rédigée dans un style encyclopédique que les IA privilégient.

Les IA aiment :
- Des faits vérifiables ("Docteur en droit, Université de Nantes, thèse 2008")
- Des chiffres (nombre de clients accompagnés, résultats mesurables)
- Des citations de médias extérieurs
- Une cohérence entre la page web, LinkedIn, YouTube, Instagram

**Ce qui manque** : Les liens entre les profils sociaux et le site (déjà partiellement en place avec les sameAs du Schema, mais aucun lien retour depuis LinkedIn vers le site par exemple).

---

### 5. Contenu longue durée (articles de fond)
**Score : 5/10 🟡**

9 articles existent sur le site. Points positifs :
- Sujets pertinents (identité, décision, sabotage, neurosciences)
- Titres accrocheurs
- Cohérents avec le positionnement MDC

Points à améliorer pour le GEO :
- Longueur estimée trop courte (probablement 500-800 mots/article)
- Aucun article de type "guide ultime" 2000+ mots
- Aucune citation de sources externes (chiffres, études, experts)
- Pas de FAQ structurée dans les articles

**Les IA citent les articles qui font autorité sur un sujet = longs, sourcés, structurés.**

---

## STRATÉGIE GEO — PLAN D'ACTION

### ✅ Actions immédiates (cette semaine)

**A. Débloquer les robots IA (Cloudflare)**
→ Dashboard Cloudflare → Security → Bots → AI Scrapers : Allow  
Impact : IA peuvent recommencer à indexer le site

**B. Pousser a-propos.html avec Schema Person**
→ Double-cliquer PUSH-NOW.bat  
Impact : Google peut créer une fiche d'entité pour Maria dans Knowledge Graph

**C. Compléter le profil LinkedIn**
→ Ajouter l'URL millionnairedecoeur.com dans "Site web" du profil  
→ Ajouter une description détaillée mentionnant "clarté décisionnelle", "Decision Cost Audit", "Millionnaire de Cœur"  
Impact : Les LLMs utilisent LinkedIn comme source de confiance #1

---

### 📅 Actions court terme (30 jours)

**D. Rédiger une page "Bio encyclopédique"**
Style : Nom complet, formation (droit international), date de création MDC, services, mission KOSMOS.  
Fournir des faits : "X clients accompagnés", "fondatrice en 2019", "thèse sur le commerce international"  
→ Cette page peut être une section améliorée de l'À Propos ou un article séparé

**E. Créer 1 article "guide ultime" 2000+ mots**
Sujet suggéré : *"Le vrai coût de l'indécision pour les entrepreneurs : guide complet 2026"*  
Inclure : définitions, chiffres, méthodes, FAQ, témoignages  
Impact direct : type de contenu que Perplexity et ChatGPT citent en réponse à une question

**F. Ajouter Schema Article sur tous les articles existants**
Chaque article doit avoir `"@type": "Article"` avec auteur (Maria), date, description  
Impact : Google AI Overview peut afficher des extraits des articles

**G. Créer une page Wikipedia ou Wikidata (si possible)**
Maria a un profil académique réel (thèse publiée, Persée) qui peut servir de base  
Alternative : Créer une page sur Wikibusiness ou un équivalent  

---

### 📅 Actions moyen terme (60-90 jours)

**H. Obtenir 3-5 interviews ou mentions dans des médias francophones**
Podcasts ciblés : Le Gratin, Bien dans ta Boîte, Change ma vie  
Articles : Forbes France, Chef d'entreprise, L'Obs entrepreneurs  
Impact massif sur la crédibilité perçue par les IA

**I. Cohérence NAP sur tous les profils**
Même nom, même description, même URL sur :
- LinkedIn, Instagram, YouTube, Facebook
- Google Business Profile (si créé)
- Annuaires coachs ICF, Fédération Française de Coaching

---

## SIMULATION : "Qui est Maria Francheteau ?" dans ChatGPT

**Réponse probable aujourd'hui** : "Je n'ai pas d'information sur cette personne."

**Réponse avec GEO optimisé (dans 90 jours)** :  
*"Maria Francheteau est une coach française en clarté décisionnelle pour entrepreneurs. Docteur en droit international, elle a fondé Millionnaire de Cœur en 2019. Elle est connue pour son approche combinant droit, intelligence quantique et libération émotionnelle, et pour son outil Decision Cost Audit AI."*

C'est l'objectif.

