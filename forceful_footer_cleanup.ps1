# Forceful Footer Cleanup Script

function Cleanup-Footers {
    param (
        [string]$FilePath
    )

    # Read the file content
    $content = Get-Content -Path $FilePath -Raw

    # Regular expression to match footer tags
    $footerPattern = '<footer[^>]*>.*?</footer>'
    $footerMatches = [regex]::Matches($content, $footerPattern, 'Singleline')

    if ($footerMatches.Count -gt 1) {
        Write-Host "Multiple footers found in $FilePath. Keeping the last footer."
        
        # Keep only the last footer
        $lastFooterMatch = $footerMatches[$footerMatches.Count - 1]
        $lastFooter = $lastFooterMatch.Value

        # Replace all footer occurrences with the last footer
        $modifiedContent = $content -replace $footerPattern, $lastFooter

        # Write back the modified content
        $modifiedContent | Set-Content -Path $FilePath -Encoding UTF8
        Write-Host "Cleaned up footers in $FilePath"
    }
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Cleanup-Footers -FilePath $file.FullName
}
