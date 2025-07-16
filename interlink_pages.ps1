# PowerShell script to interlink HTML pages

# Universal Navigation Template
$navigation = @"
    <nav class="fixed top-0 w-full bg-gray-800 text-white z-50">
        <div class="container mx-auto flex justify-between items-center p-4">
            <div class="logo">
                <a href="Dashboard.html" class="flex items-center">
                    <span class="ml-2 font-bold text-xl">VVV Platform</span>
                </a>
            </div>
            <ul class="flex space-x-4">
                <li><a href="Store.html" class="hover:text-yellow-500">Store</a></li>
                <li><a href="Dashboard.html" class="hover:text-yellow-500">Dashboard</a></li>
                <li><a href="walletrechargepage.html" class="hover:text-yellow-500">Wallet</a></li>
                <li><a href="Order.html" class="hover:text-yellow-500">Orders</a></li>
                <li><a href="accountsettings.html" class="hover:text-yellow-500">Account</a></li>
            </ul>
            <div class="user-actions">
                <a href="Checkout.html" class="mr-4">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="bg-red-500 text-white rounded-full px-2 py-1 text-xs">0</span>
                </a>
                <a href="Signup.html" class="bg-yellow-500 text-black px-4 py-2 rounded">Login/Signup</a>
            </div>
        </div>
    </nav>
"@

# Footer Template
$footer = @"
    <footer class="bg-gray-900 text-white py-10 mt-10">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h4 class="font-bold mb-4">Quick Links</h4>
                <ul>
                    <li><a href="Dashboard.html" class="hover:text-yellow-500">Dashboard</a></li>
                    <li><a href="Store.html" class="hover:text-yellow-500">Store</a></li>
                    <li><a href="Order.html" class="hover:text-yellow-500">Order History</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Support</h4>
                <ul>
                    <li><a href="AiSupport.html" class="hover:text-yellow-500">AI Support</a></li>
                    <li><a href="Faq.html" class="hover:text-yellow-500">FAQ</a></li>
                    <li><a href="Contactus.html" class="hover:text-yellow-500">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Legal</h4>
                <ul>
                    <li><a href="privacy.html" class="hover:text-yellow-500">Privacy Policy</a></li>
                    <li><a href="termsandcondition.html" class="hover:text-yellow-500">Terms of Service</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Community</h4>
                <ul>
                    <li><a href="referal.html" class="hover:text-yellow-500">Referral Program</a></li>
                    <li><a href="rewards.html" class="hover:text-yellow-500">Rewards</a></li>
                    <li><a href="community.html" class="hover:text-yellow-500">Community</a></li>
                </ul>
            </div>
        </div>
    </footer>
"@

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    try {
        # Read the file content
        $content = Get-Content -Path $file.FullName -Raw

        # Check if body tag exists
        if ($content -match '<body[^>]*>') {
            # Insert navigation after body tag
            $content = $content -replace '(<body[^>]*>)', "`$1`n    <!-- Universal Navigation -->`n$navigation"

            # Insert footer before closing body tag
            $content = $content -replace '</body>', "$footer`n</body>"

            # Write modified content back to file
            $content | Set-Content -Path $file.FullName -Encoding UTF8

            Write-Host "Processed $($file.Name)"
        }
        else {
            Write-Host "No body tag found in $($file.Name)"
        }
    }
    catch {
        Write-Host "Error processing $($file.Name): $_"
    }
}
