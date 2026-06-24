@echo off
cd /d "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
echo Etape 1 - Commit tout en local...
git add -A
git commit -m "Mise a jour SEO + Bio hero : ajout solitude"
echo Etape 2 - Pull remote en gardant nos versions en cas de conflit...
git pull --no-rebase -X ours origin/main
echo Etape 3 - Push...
git push origin main
echo.
echo === DONE - Site mis a jour ===
pause
