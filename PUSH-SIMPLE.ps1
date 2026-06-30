$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

# Supprimer le lock si present
$lock = Join-Path $repo ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force; Write-Host "Lock supprime." -ForegroundColor Yellow }

# Commiter la correction du sous-titre
git add index.html
git commit -m "Fix : sous-titre section mission en anglais"

# Push
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCES - Site deploye sur Vercel!" -ForegroundColor Green
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}
Read-Host "Appuyez sur Entree pour fermer"
