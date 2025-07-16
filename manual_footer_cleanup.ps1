# Manual Footer Cleanup Script

function Remove-ExtraFooters {
    param (
        [string]$FilePath
    )

    # Read the file content
    $content = Get-Content -Path $FilePath -Raw

    # Count existing footers
    $footerMatches = [regex]::Matches($content, '<footer[^>]*>.*?</footer>')
    
    if ($footerMatches.Count -gt 1) {
        Write-Host "Multiple footers found in $FilePath"
        
        # Keep the last footer, remove others
        $lastFooterIndex = $footerMatches[$footerMatches.Count - 1].Index
        $firstFooterIndex = $footerMatches[0].Index
        
        $modifiedContent = $content.Substring(0, $firstFooterIndex) + 
                           $content.Substring($firstFooterIndex, $lastFooterIndex - $firstFooterIndex) + 
                           $content.Substring($lastFooterIndex)
        
        # Write back the modified content
        $modifiedContent | Set-Content -Path $FilePath -Encoding UTF8
        Write-Host "Removed extra footers from $FilePath"
    }
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Remove-ExtraFooters -FilePath $file.FullName
}
