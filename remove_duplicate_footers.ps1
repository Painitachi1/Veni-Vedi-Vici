# Remove Duplicate Footers Script

function Remove-DuplicateFooters {
    param (
        [string]$FilePath
    )

    # Read the file content
    $content = Get-Content -Path $FilePath -Raw

    # Regular expression to match multiple footer tags
    $footerPattern = '(<footer[^>]*>.*?</footer>)\s*(<footer[^>]*>.*?</footer>)'
    
    # Replace multiple footers with a single footer
    $modifiedContent = $content -replace $footerPattern, '$1'

    # If content was modified, write back to file
    if ($content -ne $modifiedContent) {
        $modifiedContent | Set-Content -Path $FilePath -Encoding UTF8
        Write-Host "Removed duplicate footer from $FilePath"
    }
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Remove-DuplicateFooters -FilePath $file.FullName
}
