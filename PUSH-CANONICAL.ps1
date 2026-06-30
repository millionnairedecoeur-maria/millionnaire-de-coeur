$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

# Supprimer le lock si present
$lock = Join-Path $repo ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force; Write-Host "Lock supprime." -ForegroundColor Yellow }

# Commiter les balises canonical
git add -A
git commit -m "SEO : balises canonical sur 40 pages HTML"

# Push
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCES - Canonical tags deployes sur Vercel!" -ForegroundColor Green
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}
Read-Host "Appuyez sur Entree pour fermer"
