$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

$lock = Join-Path $repo ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force; Write-Host "Lock supprime." -ForegroundColor Yellow }

git add a-propos.html sitemap.xml
git commit -m "SEO/GEO : page A Propos Maria Francheteau + sitemap 41 URLs"

git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCES - Page A Propos en ligne !" -ForegroundColor Green
    Write-Host "URL : https://www.millionnairedecoeur.com/a-propos" -ForegroundColor Cyan
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}
Read-Host "Appuyez sur Entree pour fermer"
