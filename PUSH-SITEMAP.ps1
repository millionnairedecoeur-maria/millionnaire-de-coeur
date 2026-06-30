$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

$lock = Join-Path $repo ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force; Write-Host "Lock supprime." -ForegroundColor Yellow }

git add sitemap.xml
git commit -m "SEO : sitemap 40 URLs complet + lastmod + fix XML"

git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCES - Sitemap deploye!" -ForegroundColor Green
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}
Read-Host "Appuyez sur Entree pour fermer"
