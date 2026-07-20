$file = "C:\Users\Laronze Maria\Documents\Claude\Projects\MDC - Machine de vente\millionnaire-de-coeur\articles-decisions-entrepreneurs.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Supprimer .html de tous les href des cartes article (pattern: href="slug.html" class="article-card")
$before = ([regex]::Matches($content, '\.html" class="article-card"')).Count
$content = [regex]::Replace($content, '\.html" class="article-card"', '" class="article-card"')
$after = ([regex]::Matches($content, '\.html" class="article-card"')).Count

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "SUCCES : $before liens .html convertis en liens propres (reste: $after)"
Write-Host ""
pause
