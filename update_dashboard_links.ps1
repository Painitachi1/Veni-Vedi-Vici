# Update Dashboard Links

$filePath = "C:\Users\hp\Desktop\VVV Deepsite\Dashboard.html"
$content = Get-Content $filePath -Raw

# Define replacement mapping
$replacements = @{
    "Profile" = "accountsettings.html"
    "Orders" = "order.html"
    "Wishlist" = "referal.html"
    "Addresses" = "dashboard.html"
    "Payment Methods" = "Payment.html"
    "Settings" = "accountsettings.html"
}

# Perform replacements
foreach ($key in $replacements.Keys) {
    $value = $replacements[$key]
    $content = $content -replace "href=[`"']([^`"']*)[`"'][^>]*>$key<", "href='$value'>$key<"
}

$content | Set-Content $filePath -Encoding UTF8

Write-Host "Updated links in Dashboard.html"
