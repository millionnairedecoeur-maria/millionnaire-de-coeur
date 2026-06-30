# COMMIT ET PUSH SEO — DORA Agent
$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

# 1. Supprimer le lock stale si present
$lockFile = Join-Path $repo ".git\index.lock"
if (Test-Path $lockFile) {
    Remove-Item $lockFile -Force
    Write-Host "Lock supprime." -ForegroundColor Yellow
}

# 2. Stager les modifications
git add index.html sitemap.xml la-precision-nest-pas-de-la-brutalite.html biaisstatuquocoutindecision.jpg commentprendreunedecisiondifficileentrepreneur.jpg coutcachedecisionrepousseeentrepreneurs.jpg decisionembauchesignauxenergetiquesrh.jpg decisionpeurvsclarte.jpg decisionsouspressioncerveau.jpg fatiguedecisionnellecoutbusiness.jpg intuitionentrepreneurvsanalyse.jpg 2>$null

# 3. Commiter
git commit -m "SEO : H2 FR + sitemap 35 URLs + nouvel article + images"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur commit." -ForegroundColor Red
    Read-Host "Appuyez sur Entree"
    exit 1
}

# 4. Push avec token
$token = "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"
$remote = "https://$token@github.com/millionnairedecoeur-maria/millionnaire-de-coeur.git"
git -c credential.helper="" push $remote HEAD:main

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCES - Site deploye!" -ForegroundColor Green
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}

Read-Host "Appuyez sur Entree pour fermer"
