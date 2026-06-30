$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

$lock = Join-Path $repo ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force; Write-Host "Lock supprime." -ForegroundColor Yellow }

git add -A
git commit -m "SEO/GEO : footer A Propos sur 40 pages + page A Propos redesign complet + timeline marques corrigee"

git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCES !" -ForegroundColor Green
    Write-Host "- Footer mis a jour sur 40 pages" -ForegroundColor Cyan
    Write-Host "- Page A Propos redesignee (design MDC, 2 photos, historique des marques)" -ForegroundColor Cyan
    Write-Host "- URL : https://www.millionnairedecoeur.com/a-propos" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "ATTENTION : ajoutez votre 2e photo dans le dossier du site :" -ForegroundColor Yellow
    Write-Host "  Nom du fichier : maria-francheteau-2.jpg" -ForegroundColor White
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}
Read-Host "Appuyez sur Entree pour fermer"
