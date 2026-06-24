@echo off
set REPO=C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur
set DST=%REPO%\images

move "%REPO%\biaisstatuquocoutindecision.jpg" "%DST%\"
move "%REPO%\commentprendreunedecisiondifficileentrepreneur.jpg" "%DST%\"
move "%REPO%\coutcachedecisionrepousseeentrepreneurs.jpg" "%DST%\"
move "%REPO%\decisionembauchesignauxenergetiquesrh.jpg" "%DST%\"
move "%REPO%\decisionpeurvsclarte.jpg" "%DST%\"
move "%REPO%\decisionsouspressioncerveau.jpg" "%DST%\"
move "%REPO%\fatiguedecisionnellecoutbusiness.jpg" "%DST%\"
move "%REPO%\intuitionentrepreneurvsanalyse.jpg" "%DST%\"
move "%REPO%\paralysiedecisionnelleentrepreneursbloques.jpg" "%DST%\"
move "%REPO%\risquesinvisiblescontratpartenariat.jpg" "%DST%\"

echo --- IMAGES DEPLACEES ---
cd /d "%REPO%"
git add -A
git commit -m "fix: images articles dans dossier images/"
echo --- COMMIT FAIT --- ouvre GitHub Desktop et clique Push ---
pause
