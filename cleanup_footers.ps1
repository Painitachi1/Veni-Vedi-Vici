# Aggressive Footer Cleanup Script

function Clean-Footers {
    param (
        [string]$FilePath
    )

    # Read the file content
    $content = Get-Content -Path $FilePath -Raw

    # Flag to track if changes were made
    $changesMade = $false

    # Remove extra footers added during previous interlinking
    $cleanupPatterns = @(
        # Match and remove additional footers with specific classes or styles
        '<footer[^>]*class="bg-gray-900[^>]*>.*?</footer>\s*<footer',
        '<footer[^>]*class="bg-white[^>]*>.*?</footer>\s*<footer',
        '<footer[^>]*class="container[^>]*>.*?</footer>\s*<footer'
    )

    foreach ($pattern in $cleanupPatterns) {
        $newContent = $content -replace $pattern, '<footer'
        if ($newContent -ne $content) {
            $content = $newContent
            $changesMade = $true
        }
    }

    # Remove completely duplicate footers
    $footerPattern = '(<footer[^>]*>.*?</footer>)\s*\1'
    $newContent = $content -replace $footerPattern, '$1'
    if ($newContent -ne $content) {
        $content = $newContent
        $changesMade = $true
    }

    # If changes were made, write back to file
    if ($changesMade) {
        $content | Set-Content -Path $FilePath -Encoding UTF8
        Write-Host "Cleaned up footers in $FilePath"
    }
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Clean-Footers -FilePath $file.FullName
}
