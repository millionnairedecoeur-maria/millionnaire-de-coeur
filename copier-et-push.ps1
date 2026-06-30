# Script PowerShell — copie images + push GitHub MDC
$ErrorActionPreference = "Stop"

$src = "C:\Users\Laronze Maria\Downloads"
$dst1 = "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur\images"
$dst2 = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur\images"
$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"

# Noms cibles dans l'ordre alphabetique = ordre de generation
$names = @(
    "biaisstatuquocoutindecision.jpg",
    "commentprendreunedecisiondifficileentrepreneur.jpg",
    "coutcachedecisionrepousseeentrepreneurs.jpg",
    "decisionembauchesignauxenergetiquesrh.jpg",
    "decisionpeurvsclarte.jpg",
    "decisionsouspressioncerveau.jpg",
    "fatiguedecisionnellecoutbusiness.jpg",
    "intuitionentrepreneurvsanalyse.jpg",
    "paralysiedecisionnelleentrepreneursbloques.jpg",
    "risquesinvisiblescontratpartenariat.jpg"
)

# Recuperer les 10 images les plus recentes depuis Telechargements
$imgs = Get-ChildItem -Path $src -Include "*.jpg","*.jpeg","*.png" -File -Recurse:$false |
        Sort-Object LastWriteTime |
        Select-Object -Last 10

Write-Host ""
Write-Host "=== IMAGES TROUVEES (ordre chronologique) ===" -ForegroundColor Cyan
for ($i = 0; $i -lt $imgs.Count; $i++) {
    Write-Host ("  " + ($i+1) + ". " + $imgs[$i].Name + " -> " + $names[$i]) -ForegroundColor Yellow
}

if ($imgs.Count -lt 10) {
    Write-Host "ATTENTION: seulement $($imgs.Count) images trouvees dans Telechargements!" -ForegroundColor Red
    Read-Host "Appuyez sur Entree pour continuer quand meme ou Ctrl+C pour annuler"
}

Write-Host ""
Write-Host "=== ETAPE 1 — COPIE DES IMAGES ===" -ForegroundColor Green
if (-not (Test-Path $dst1)) { New-Item -ItemType Directory -Path $dst1 -Force | Out-Null }
if (-not (Test-Path $dst2)) { New-Item -ItemType Directory -Path $dst2 -Force | Out-Null }

for ($i = 0; $i -lt $imgs.Count; $i++) {
    $srcFile = $imgs[$i].FullName
    $name = $names[$i]
    Copy-Item $srcFile (Join-Path $dst1 $name) -Force
    Copy-Item $srcFile (Join-Path $dst2 $name) -Force
    Write-Host "  OK: $name" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== ETAPE 2 — GIT ===" -ForegroundColor Green
Set-Location $repo

# Retirer les .bat du tracking git
git rm --cached push-mdc.bat 2>$null
git rm --cached copier-images-articles.bat 2>$null
git rm --cached LANCER-MAINTENANT.bat 2>$null
git rm --cached copier-et-push.ps1 2>$null

# Ajouter tout
git add -A
Write-Host "  git add OK" -ForegroundColor Green

# Commit
git commit -m "feat: 10 images quantiques articles SEO decision"
Write-Host "  git commit OK" -ForegroundColor Green

# Push avec token
Write-Host "  Push en cours..." -ForegroundColor Yellow
git push "https://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@github.com/millionnairedecoeur-maria/millionnaire-de-coeur.git" HEAD:main
Write-Host "  Push OK!" -ForegroundColor Green

Write-Host ""
Write-Host "=== TERMINE — Site mis a jour sur Vercel ===" -ForegroundColor Cyan
Read-Host "Appuyez sur Entree pour fermer"
