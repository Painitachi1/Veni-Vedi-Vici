# Comprehensive Link Auditing and Updating Script

# Mapping of common button/link texts to their target pages
$linkMapping = @{
    # Navigation Links
    "Dashboard" = "Dashboard.html"
    "Store" = "Store.html"
    "Orders" = "Order.html"
    "Wallet" = "walletrechargepage.html"
    "Account" = "accountsettings.html"
    "Login" = "Signup.html"
    "Signup" = "Signup.html"
    "Sign Up" = "Signup.html"
    "Log In" = "Signup.html"

    # Action Links
    "Buy" = "Checkout.html"
    "Checkout" = "Checkout.html"
    "Cart" = "Checkout.html"
    "Track Order" = "Producttracking.html"
    "Order History" = "Order.html"
    "Payment Methods" = "Payment.html"
    "Send Money" = "Transferfundpage.html"
    "Recharge Wallet" = "walletrechargepage.html"

    # Account Management
    "Account Settings" = "accountsettings.html"
    "Security" = "security.html"
    "Verification" = "Verification.html"
    "Change Password" = "forgetpassword.html"
    "Upgrade Tier" = "upgrade.html"

    # Support Links
    "Help" = "AiSupport.html"
    "Support" = "AiSupport.html"
    "Contact Us" = "Contactus.html"
    "FAQ" = "Faq.html"
    
    # Community Links
    "Rewards" = "rewards.html"
    "Referral" = "referal.html"
    "Community" = "community.html"
}

function Update-PageLinks {
    param (
        [string]$FilePath
    )

    # Read the file content
    $content = Get-Content -Path $FilePath -Raw

    # Flag to track if changes were made
    $changesMade = $false

    # Iterate through link mapping
    foreach ($linkText in $linkMapping.Keys) {
        $targetPage = $linkMapping[$linkText]
        
        # Regular expression to find href attributes with similar text
        $pattern = "href=[`"']([^`"']*)[`"'][^>]*>$linkText<"
        
        $content = $content -replace $pattern, "href='$targetPage'>$linkText<"
    }

    # Additional link validation and correction
    $corrections = @{
        # Specific corrections for known issues
        "href='login.html'" = "href='Signup.html'"
        "href='register.html'" = "href='Signup.html'"
        "href='account.html'" = "href='accountsettings.html'"
    }

    foreach ($oldLink in $corrections.Keys) {
        $content = $content -replace $oldLink, $corrections[$oldLink]
    }

    # Write back the modified content
    $content | Set-Content -Path $FilePath -Encoding UTF8

    Write-Host "Processed links in $FilePath"
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Update-PageLinks -FilePath $file.FullName
}

Write-Host "Link auditing and updating complete."
