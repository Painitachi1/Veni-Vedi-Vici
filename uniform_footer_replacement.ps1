# Uniform Footer Replacement Script

# New footer HTML
$newFooter = @"
<footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 class="text-lg font-semibold mb-4">Premium Shopping</h3>
                <p class="text-gray-400">Your exclusive gateway to the world's best shopping experiences.</p>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
                <ul class="space-y-2">
                    <li><a href="Heat.html" class="text-gray-400 hover:text-white transition">Home</a></li>
                    <li><a href="Store.html" class="text-gray-400 hover:text-white transition">Stores</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition">Categories</a></li>
                    <li><a href="accountsettings.html" class="text-gray-400 hover:text-white transition">My Account</a></li>
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-4">Support</h3>
                <ul class="space-y-2">
                    <li><a href='Faq.html' class="text-gray-400 hover:text-white transition">FAQ</a></li>
                    <li><a href='Contactus.html' class="text-gray-400 hover:text-white transition">Contact Us</a></li>
                    <li><a href="privacy.html" class="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="termsandcondition.html" class="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-4">Connect With Us</h3>
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-pinterest"></i></a>
                </div>
                <div class="mt-4">
                    <p class="text-gray-400">Subscribe to our newsletter</p>
                    <div class="flex mt-2">
                        <input type="email" placeholder="Your email" class="px-3 py-2 text-gray-800 rounded-l focus:outline-none w-full">
                        <button class="bg-yellow-500 text-white px-4 rounded-r hover:bg-yellow-600 transition">Go</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2023 Premium Shopping. All rights reserved.</p>
        </div>
    </div>
</footer>
"@

function Replace-Footer {
    param (
        [string]$FilePath
    )

    # Skip signup-related pages
    $excludedPages = @(
        "Signup.html", 
        "forgetpassword.html", 
        "Verification.html", 
        "Phoneemailverification.html"
    )

    $fileName = Split-Path $FilePath -Leaf

    # Check if file should be excluded
    if ($excludedPages -contains $fileName) {
        Write-Host "Skipping $fileName"
        return
    }

    # Read the file content
    $content = Get-Content -Path $FilePath -Raw

    # Remove existing footers
    $footerRemovedContent = [regex]::Replace($content, '<footer[^>]*>.*?</footer>', '', 'Singleline')

    # Add new footer just before the closing body tag
    $modifiedContent = $footerRemovedContent -replace '</body>', "$newFooter`n</body>"

    # Write back the modified content
    $modifiedContent | Set-Content -Path $FilePath -Encoding UTF8

    Write-Host "Updated footer in $fileName"
}

# Directory containing HTML files
$directory = "C:\Users\hp\Desktop\VVV Deepsite"

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter *.html

# Process each HTML file
foreach ($file in $htmlFiles) {
    Replace-Footer -FilePath $file.FullName
}
