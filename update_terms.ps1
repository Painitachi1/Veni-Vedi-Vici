# Update Terms and Conditions Links

$filePath = "C:\Users\hp\Desktop\VVV Deepsite\termsandcondition.html"
$content = Get-Content $filePath -Raw

# Replace specific links
$updatedContent = $content -replace 'index\.html', 'heat.html' `
                            -replace 'stores\.html', 'store.html' `
                            -replace 'Hubs\.html', 'myhubs.html' `
                            -replace 'conquero club', 'Dashboard.html'

$updatedContent | Set-Content $filePath -Encoding UTF8

Write-Host "Updated links in termsandcondition.html"
