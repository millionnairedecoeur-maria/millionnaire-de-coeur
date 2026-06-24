# Deplace les 10 images de la racine vers le dossier images/
$repo = "C:\Users\Laronze Maria\Desktop\VERCEL SITE WEB MILLIONNAIRE DE COEUR\millionnaire-de-coeur"
$imgDst = "$repo\images"

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

$ok = 0
foreach ($name in $names) {
    $src = "$repo\$name"
    $dst = "$imgDst\$name"
    if (Test-Path $src) {
        Move-Item $src $dst -Force
        Write-Host "  Deplace: $name" -ForegroundColor Green
        $ok++
    } else {
        Write-Host "  ABSENT: $name" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "$ok/10 images deplacees" -ForegroundColor Yellow

if ($ok -gt 0) {
    Set-Location $repo
    git add -A
    git commit -m "fix: images articles dans dossier images/"
    Write-Host "  Commit OK — ouvre GitHub Desktop et clique Push" -ForegroundColor Cyan
}

Read-Host "Appuyez sur Entree pour fermer"
