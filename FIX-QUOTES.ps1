$file = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur\solitude-decisionnelle-entrepreneur.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Remplacer TOUT tag img qui contient article-hero-img (peu importe les guillemets)
# Le regex matche <img ... article-hero-img ... />
$correct = '<img src="/images/solitude-decisionnelle-entrepreneur.jpg" alt="Solitude decisionnelle entrepreneur" class="article-hero-img" />'
$content = [regex]::Replace($content, '<img[^>]*article-hero-img[^>]*/>', $correct)

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host ""
Write-Host "SUCCES : img article-hero-img corrige avec guillemets droits"
Write-Host ""
pause
