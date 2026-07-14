$file = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur\solitude-decisionnelle-entrepreneur.html"
$content = Get-Content $file -Raw -Encoding UTF8

# FIX 1 : Remplacer le base64 logo par /logo.jpg dans le footer
# Cherche le tag img avec data:image/jpeg;base64 qui contient footer-logo-img
$content = $content -replace '<img src="data:image/jpeg;base64,[^"]*" alt="Logo Millionnaire de C[^"]*" class="footer-logo-img" style="mix-blend-mode:screen;" />', '<img src="/logo.jpg" alt="Logo Millionnaire de Coeur" class="footer-logo-img" />'

# FIX 2 : Ajouter l'image de l'article apres le bloc titre
$ancre = '<p class="article-intro">Il y a une phrase'
$imgTag = '<img src="/images/solitude-decisionnelle-entrepreneur.jpg" alt="La Solitude Decisionnelle de l''Entrepreneur – entrepreneur decidant seul dans l''obscurite" class="article-hero-img" />' + "`r`n`r`n      " + '<p class="article-intro">Il y a une phrase'
$content = $content.Replace($ancre, $imgTag)

# Sauvegarder
[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host ""
Write-Host "SUCCES :"
Write-Host "  - Logo footer : remplacement base64 par /logo.jpg"
Write-Host "  - Image article : insertee apres le titre"
Write-Host ""
pause
