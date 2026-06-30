$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

$lock = Join-Path $repo ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force; Write-Host "Lock supprime." -ForegroundColor Yellow }

git add -A
git commit -m "A Propos : nebula bleue + glow photos + textes corriges + nouvelle photo hero"

git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCES !" -ForegroundColor Green
    Write-Host "- Page A Propos : nebula bleue + glow photos + textes corriges" -ForegroundColor Cyan
    Write-Host "- URL : https://www.millionnairedecoeur.com/a-propos" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "ATTENTION : deposez vos 2 nouvelles photos dans le dossier du site :" -ForegroundColor Yellow
    Write-Host "  Photo travail  : maria-francheteau-travail.jpg" -ForegroundColor White
    Write-Host "  Photo detente  : maria-francheteau-2.jpg" -ForegroundColor White
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}
Read-Host "Appuyez sur Entree pour fermer"
