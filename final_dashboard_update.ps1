# Final Dashboard Link Update Script

$filePath = "C:\Users\hp\Desktop\VVV Deepsite\Dashboard.html"
$content = Get-Content $filePath -Raw

# Detailed replacement mapping
$replacements = @{
    "Profile" = "accountsettings.html"
    "Orders" = "order.html"
    "Wishlist" = "referal.html"
    "Addresses" = "dashboard.html"
    "Payment Methods" = "Payment.html"
    "Settings" = "accountsettings.html"
}

# Perform replacements with multiple regex patterns
foreach ($key in $replacements.Keys) {
    $value = $replacements[$key]
    
    # Replace href with exact text match
    $content = $content -replace "href=[`"']([^`"']*)[`"'][^>]*>$key<", "href='$value'>$key<"
    
    # Replace href in different contexts
    $content = $content -replace "href=[`"']([^`"']*)[`"'][^>]*>\s*$key\s*<", "href='$value'>$key<"
    
    # Replace spans with links
    $content = $content -replace "<span>$key</span>", "<a href='$value' class='block'><span>$key</span></a>"
}

$content | Set-Content $filePath -Encoding UTF8

Write-Host "Comprehensively updated links and spans in Dashboard.html"
