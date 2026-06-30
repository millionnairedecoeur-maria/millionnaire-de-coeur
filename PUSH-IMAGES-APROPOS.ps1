$repo = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur"
Set-Location $repo

# Supprimer le lock si present
$lock = Join-Path $repo ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force; Write-Host "Lock supprime." -ForegroundColor Yellow }

# Reinitialiser l'index pour effacer l'etat corrompu
git reset HEAD
Write-Host "Index reinitialise." -ForegroundColor Yellow

# Ajouter uniquement les fichiers voulus
git add a-propos.html
git add "maria-francheteau-travail.jpg"
git add "maria-francheteau-2.jpg"

git commit -m "A Propos : photos + nebula + textes corriges - dernier push"

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCES ! Photos en ligne." -ForegroundColor Green
    Write-Host "URL : https://www.millionnairedecoeur.com/a-propos" -ForegroundColor Cyan
} else {
    Write-Host "ERREUR push (code $LASTEXITCODE)" -ForegroundColor Red
}

Read-Host "Appuyez sur Entree pour fermer"
