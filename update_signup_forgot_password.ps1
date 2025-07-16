# Update Forgot Password Link in Signup Page

$filePath = "C:\Users\hp\Desktop\VVV Deepsite\Signup.html"
$content = Get-Content $filePath -Raw

# Replacement patterns for "Forgot Password" links
$replacementPatterns = @(
    # Pattern 1: Direct href replacement
    @{
        Pattern = "href=[`"']([^`"']*)[`"'][^>]*>Forgot Password<"
        Replacement = "href='forgetpassword.html'>Forgot Password<"
    },
    # Pattern 2: Case-insensitive replacement
    @{
        Pattern = "href=[`"']([^`"']*)[`"'][^>]*>(?i)forgot password<"
        Replacement = "href='forgetpassword.html'>Forgot Password<"
    },
    # Pattern 3: With additional whitespace or formatting
    @{
        Pattern = "href=[`"']([^`"']*)[`"'][^>]*>\s*Forgot\s*Password\s*<"
        Replacement = "href='forgetpassword.html'>Forgot Password<"
    }
)

# Apply each replacement pattern
foreach ($replacementRule in $replacementPatterns) {
    $content = $content -replace $replacementRule.Pattern, $replacementRule.Replacement
}

$content | Set-Content $filePath -Encoding UTF8

Write-Host "Updated 'Forgot Password' link in Signup.html"
