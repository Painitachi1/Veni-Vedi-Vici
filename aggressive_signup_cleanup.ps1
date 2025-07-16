# Aggressive Signup Page Cleanup Script

$filePath = "C:\Users\hp\Desktop\VVV Deepsite\Signup.html"
$content = Get-Content $filePath -Raw

# Remove all footer tags and footer-related content
$cleanupPatterns = @(
    # Remove entire footer sections
    '<footer[^>]*>.*?</footer>',
    
    # Remove sections with footer class or comments
    '<div[^>]*class="[^"]*footer[^"]*"[^>]*>.*?</div>',
    '<section[^>]*class="[^"]*footer[^"]*"[^>]*>.*?</section>',
    
    # Remove footer comments
    '<!--\s*Footer\s*-->.*?<!--\s*End\s*Footer\s*-->',
    '<!--\s*Footer\s*-->.*?$',
    
    # Remove any additional footer-like content
    '<div[^>]*id="footer"[^>]*>.*?</div>'
)

foreach ($pattern in $cleanupPatterns) {
    $content = [regex]::Replace($content, $pattern, '', 'Singleline,IgnoreCase')
}

# Ensure only signup form content remains
$signupFormPattern = '(<body[^>]*>.*?<div[^>]*class="[^"]*signup-container[^"]*"[^>]*>.*?</div>.*?)</body>'
if ($content -match $signupFormPattern) {
    $content = $matches[1]
}

# Write back the modified content
$content | Set-Content $filePath -Encoding UTF8

Write-Host "Aggressively cleaned up Signup page, leaving only signup form"
