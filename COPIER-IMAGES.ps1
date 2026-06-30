# Copie directe des 10 images articles depuis Telechargements
$src = "C:\Users\Laronze Maria\Downloads"
$dst = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur\images"
$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"

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

Write-Host ""
Write-Host "=== COPIE DES 10 IMAGES ARTICLES ===" -ForegroundColor Cyan

$ok = 0
foreach ($name in $names) {
    $srcFile = Join-Path $src $name
    $dstFile = Join-Path $dst $name
    if (Test-Path $srcFile) {
        Copy-Item $srcFile $dstFile -Force
        Write-Host "  OK: $name" -ForegroundColor Green
        $ok++
    } else {
        Write-Host "  INTROUVABLE: $name" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "$ok/10 images copiees" -ForegroundColor Yellow

if ($ok -gt 0) {
    Write-Host ""
    Write-Host "=== GIT ===" -ForegroundColor Cyan
    Set-Location $repo
    git add images/
    git commit -m "feat: 10 images articles SEO decision"
    Write-Host "  Commit OK" -ForegroundColor Green

    Write-Host "  Push en cours..." -ForegroundColor Yellow
    $env:GIT_TERMINAL_PROMPT = "0"
    $env:GCM_INTERACTIVE = "never"
    git -c credential.helper="" push "https://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@github.com/millionnairedecoeur-maria/millionnaire-de-coeur.git" HEAD:main

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCCES — Images en ligne sur Vercel!" -ForegroundColor Green
    } else {
        Write-Host "Push echoue (code $LASTEXITCODE) — images commitees, push via GitHub Desktop" -ForegroundColor Yellow
    }
}

Read-Host "Appuyez sur Entree pour fermer"
