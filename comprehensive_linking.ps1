# Comprehensive Linking Validation Script

# Define a comprehensive site map of interconnected pages
$sitemap = @{}
$sitemap['Dashboard.html'] = @{
    primary_links = @("Store.html", "Order.html", "walletrechargepage.html", "accountsettings.html")
    action_buttons = @{
        "Shop Now" = "Store.html"
        "View Orders" = "Order.html"
        "Manage Wallet" = "walletrechargepage.html"
        "Account Settings" = "accountsettings.html"
    }
}
$sitemap['Store.html'] = @{
    primary_links = @("Checkout.html", "Productpaymentpage.html", "HubPickupPage.html")
    action_buttons = @{
        "Buy Now" = "Checkout.html"
        "Product Details" = "Productpaymentpage.html"
        "Pickup Options" = "HubPickupPage.html"
    }
}
$sitemap['Checkout.html'] = @{
    primary_links = @("Payment.html", "Order.html", "Store.html")
    action_buttons = @{
        "Proceed to Payment" = "Payment.html"
        "View Order" = "Order.html"
        "Continue Shopping" = "Store.html"
    }
}
$sitemap['Order.html'] = @{
    primary_links = @("Producttracking.html", "Vipdispute.html", "Review.html")
    action_buttons = @{
        "Track Order" = "Producttracking.html"
        "Dispute Order" = "Vipdispute.html"
        "Leave Review" = "Review.html"
    }
}
$sitemap['Payment.html'] = @{
    primary_links = @("Transferfundpage.html", "walletrechargepage.html", "transactions.html")
    action_buttons = @{
        "Transfer Funds" = "Transferfundpage.html"
        "Recharge Wallet" = "walletrechargepage.html"
        "View Transactions" = "transactions.html"
    }
}
$sitemap['accountsettings.html'] = @{
    primary_links = @("security.html", "Verification.html", "Userbadge.html")
    action_buttons = @{
        "Security Settings" = "security.html"
        "Verify Account" = "Verification.html"
        "User Badges" = "Userbadge.html"
    }
}
$sitemap['Signup.html'] = @{
    primary_links = @("forgetpassword.html", "Verification.html", "Dashboard.html")
    action_buttons = @{
        "Forgot Password" = "forgetpassword.html"
        "Verify Account" = "Verification.html"
        "Go to Dashboard" = "Dashboard.html"
    }
}

function Update-PageInterconnections {
    param (
        [string]$FilePath
    )

    $fileName = Split-Path $FilePath -Leaf
    $content = Get-Content -Path $FilePath -Raw

    if ($sitemap.ContainsKey($fileName)) {
        $pageConfig = $sitemap[$fileName]

        # Add primary links section
        $primaryLinksHtml = "<div class='container mx-auto mt-10 bg-white p-6 rounded-lg shadow-md'>`n"
        $primaryLinksHtml += "    <h2 class='text-2xl font-bold mb-6'>Quick Navigation</h2>`n"
        $primaryLinksHtml += "    <div class='grid grid-cols-1 md:grid-cols-3 gap-6'>`n"

        foreach ($linkedPage in $pageConfig['primary_links']) {
            $linkedPageName = [System.IO.Path]::GetFileNameWithoutExtension($linkedPage)
            $primaryLinksHtml += "        <div>`n"
            $primaryLinksHtml += "            <h3 class='font-semibold mb-4'>$linkedPageName</h3>`n"
            $primaryLinksHtml += "            <a href='$linkedPage' class='text-blue-600 hover:underline'>Go to $linkedPageName</a>`n"
            $primaryLinksHtml += "        </div>`n"
        }

        $primaryLinksHtml += "    </div>`n"
        $primaryLinksHtml += "</div>`n"

        # Add action buttons section
        $actionButtonsHtml = "<div class='container mx-auto mt-10 bg-white p-6 rounded-lg shadow-md'>`n"
        $actionButtonsHtml += "    <h2 class='text-2xl font-bold mb-6'>Quick Actions</h2>`n"
        $actionButtonsHtml += "    <div class='grid grid-cols-2 md:grid-cols-4 gap-4'>`n"

        foreach ($buttonText in $pageConfig['action_buttons'].Keys) {
            $linkedPage = $pageConfig['action_buttons'][$buttonText]
            $actionButtonsHtml += "        <a href='$linkedPage' class='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center'>`n"
            $actionButtonsHtml += "            $buttonText`n"
            $actionButtonsHtml += "        </a>`n"
        }

        $actionButtonsHtml += "    </div>`n"
        $actionButtonsHtml += "</div>`n"

        # Insert sections before footer
        $content = $content -replace '</footer>', "$primaryLinksHtml`n$actionButtonsHtml`n</footer>"

        # Save modified content
        $content | Set-Content -Path $FilePath -Encoding UTF8
        Write-Host "Enhanced interconnections for $fileName"
    }
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Update-PageInterconnections -FilePath $file.FullName
}
