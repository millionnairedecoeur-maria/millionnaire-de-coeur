@echo off
cd /d "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"

echo Etape 1 - Copie vers dossier Vercel...
copy /Y "articles-decisions-entrepreneurs.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\articles-decisions-entrepreneurs.html"
copy /Y "comment-prendre-une-decision-difficile-entrepreneur.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\comment-prendre-une-decision-difficile-entrepreneur.html"
copy /Y "paralysie-decisionnelle-entrepreneurs-bloques.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\paralysie-decisionnelle-entrepreneurs-bloques.html"
copy /Y "fatigue-decisionnelle-cout-business.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\fatigue-decisionnelle-cout-business.html"
copy /Y "risques-invisibles-contrat-partenariat.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\risques-invisibles-contrat-partenariat.html"
copy /Y "decision-sous-pression-cerveau.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\decision-sous-pression-cerveau.html"
copy /Y "decision-peur-vs-clarte.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\decision-peur-vs-clarte.html"
copy /Y "biais-statu-quo-cout-indecision.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\biais-statu-quo-cout-indecision.html"
copy /Y "decision-embauche-signaux-energetiques-rh.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\decision-embauche-signaux-energetiques-rh.html"
copy /Y "intuition-entrepreneur-vs-analyse.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\intuition-entrepreneur-vs-analyse.html"
copy /Y "cout-cache-decision-repoussee-entrepreneurs.html" "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\cout-cache-decision-repoussee-entrepreneurs.html"

echo Etape 2 - Ajout des fichiers git...
git add -A
echo Etape 3 - Commit...
git commit -m "feat: 10 articles autorite SEO decision entrepreneur"
echo Etape 4 - Push avec token...
git push https://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@github.com/millionnairedecoeur-maria/millionnaire-de-coeur.git HEAD:main
echo.
echo === DONE - 10 articles en ligne sur Vercel ===
pause
