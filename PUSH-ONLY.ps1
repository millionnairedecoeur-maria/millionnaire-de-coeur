# Push uniquement — bypass credential manager
$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

Write-Host "Push en cours (sans credential manager)..." -ForegroundColor Cyan

# Desactiver le credential manager pour ce push
$env:GIT_TERMINAL_PROMPT = "0"
$env:GCM_INTERACTIVE = "never"

# Push avec token directement dans URL
$token = "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"
$remote = "https://$token@github.com/millionnairedecoeur-maria/millionnaire-de-coeur.git"

git -c credential.helper="" push $remote HEAD:main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCES — Site deploye sur Vercel!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "ERREUR lors du push (code $LASTEXITCODE)" -ForegroundColor Red
    Write-Host "Verifiez le token GitHub ou debloquez le secret sur github.com" -ForegroundColor Yellow
}

Read-Host "Appuyez sur Entree pour fermer"
