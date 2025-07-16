# Enhanced Interlinking PowerShell Script

$pageLinkMap = @{}
$pageLinkMap['Dashboard.html'] = @{
    relatedPages = @("Store.html", "Order.html", "walletrechargepage.html", "accountsettings.html")
    linkSections = @{
        "Quick Actions" = @("Store.html", "Order.html", "walletrechargepage.html")
        "Account Management" = @("accountsettings.html", "Userbadge.html", "security.html")
        "Community" = @("referal.html", "rewards.html", "community.html")
    }
}
$pageLinkMap['Store.html'] = @{
    relatedPages = @("Productpaymentpage.html", "Checkout.html", "Order.html")
    linkSections = @{
        "Shopping" = @("Productpaymentpage.html", "Checkout.html")
        "Order Management" = @("Order.html", "Producttracking.html")
        "Financial" = @("walletrechargepage.html", "Payment.html")
    }
}
$pageLinkMap['Order.html'] = @{
    relatedPages = @("Producttracking.html", "Vipdispute.html", "Review.html")
    linkSections = @{
        "Order Actions" = @("Producttracking.html", "Vipdispute.html")
        "Customer Support" = @("AiSupport.html", "Contactus.html")
        "Feedback" = @("Review.html", "disputes.html")
    }
}
$pageLinkMap['Payment.html'] = @{
    relatedPages = @("Transferfundpage.html", "walletrechargepage.html", "transactions.html")
    linkSections = @{
        "Financial Tools" = @("Transferfundpage.html", "walletrechargepage.html")
        "Transaction History" = @("transactions.html", "fees.html")
        "Account Management" = @("accountsettings.html", "security.html")
    }
}
$pageLinkMap['Checkout.html'] = @{
    relatedPages = @("Payment.html", "Order.html", "Store.html")
    linkSections = @{
        "Payment Options" = @("Payment.html", "walletrechargepage.html")
        "Order Management" = @("Order.html", "Producttracking.html")
        "Continue Shopping" = @("Store.html")
    }
}
$pageLinkMap['accountsettings.html'] = @{
    relatedPages = @("security.html", "Verification.html", "Userbadge.html")
    linkSections = @{
        "Security" = @("security.html", "Verification.html")
        "Profile" = @("Userbadge.html", "Signup.html")
        "Financial" = @("walletrechargepage.html", "Payment.html")
    }
}
$pageLinkMap['Signup.html'] = @{
    relatedPages = @("Verification.html", "forgetpassword.html", "Contactus.html")
    linkSections = @{
        "Account Recovery" = @("forgetpassword.html", "Verification.html")
        "Support" = @("Contactus.html", "AiSupport.html")
    }
}

function Add-ContextualLinks {
    param (
        [string]$FilePath
    )

    $fileName = Split-Path $FilePath -Leaf
    $content = Get-Content -Path $FilePath -Raw

    if ($pageLinkMap.ContainsKey($fileName)) {
        $pageLinks = $pageLinkMap[$fileName]

        # Create HTML for contextual links
        $contextualLinksHtml = "<div class='container mx-auto mt-10 bg-white p-6 rounded-lg shadow-md'>`n"
        $contextualLinksHtml += "    <h2 class='text-2xl font-bold mb-6'>Related Resources</h2>`n"
        $contextualLinksHtml += "    <div class='grid grid-cols-1 md:grid-cols-3 gap-6'>`n"

        foreach ($sectionName in $pageLinks.linkSections.Keys) {
            $contextualLinksHtml += "        <div>`n"
            $contextualLinksHtml += "            <h3 class='font-semibold mb-4'>$sectionName</h3>`n"
            $contextualLinksHtml += "            <ul class='space-y-2'>`n"

            foreach ($linkedPage in $pageLinks.linkSections[$sectionName]) {
                $linkedPageName = [System.IO.Path]::GetFileNameWithoutExtension($linkedPage)
                $contextualLinksHtml += "                <li><a href='$linkedPage' class='text-blue-600 hover:underline'>$linkedPageName</a></li>`n"
            }

            $contextualLinksHtml += "            </ul>`n"
            $contextualLinksHtml += "        </div>`n"
        }

        $contextualLinksHtml += "    </div>`n"
        $contextualLinksHtml += "</div>`n"

        # Insert contextual links before the footer
        $content = $content -replace '</footer>', "$contextualLinksHtml`n</footer>"

        # Save modified content
        $content | Set-Content -Path $FilePath -Encoding UTF8
        Write-Host "Added contextual links to $fileName"
    }
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Add-ContextualLinks -FilePath $file.FullName
}
