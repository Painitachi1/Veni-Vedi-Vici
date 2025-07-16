# Cleanup Signup Page Script

$filePath = "C:\Users\hp\Desktop\VVV Deepsite\Signup.html"
$content = Get-Content $filePath -Raw

# Remove all footer tags
$content = [regex]::Replace($content, '<footer[^>]*>.*?</footer>', '', 'Singleline')

# Remove any additional footer-like sections
$footerSections = @(
    '<div[^>]*class="[^"]*footer[^"]*"[^>]*>.*?</div>',
    '<section[^>]*class="[^"]*footer[^"]*"[^>]*>.*?</section>'
)

foreach ($pattern in $footerSections) {
    $content = [regex]::Replace($content, $pattern, '', 'Singleline')
}

# Trim any excess whitespace left after removal
$content = $content -replace '\s+</body>', '</body>'

# Write back the modified content
$content | Set-Content $filePath -Encoding UTF8

Write-Host "Cleaned up Signup page, removing all footers"
