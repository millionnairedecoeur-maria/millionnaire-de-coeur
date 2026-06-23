@echo off
cd /d "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"

echo === Ajout des fichiers modifiés ===
git add index.html entrepreneurs-decision-cost-audit-ai.html quantum-decision-catalyst.html quantum-expansion.html quantum-sovereignty.html quantum-legacy.html

echo.
echo === Commit ===
git commit -m "Ajout bénéfices concrets et clarification pro/perso sur 6 pages"

echo.
echo === Push vers GitHub ===
git push origin main

echo.
echo === DONE ! Vercel déploie dans 1-2 min ===
pause
