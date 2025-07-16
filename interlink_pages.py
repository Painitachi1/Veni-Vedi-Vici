import os
import re

def interlink_page(file_path):
    # Read the file content
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Universal navigation template
    navigation = '''
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
    '''
    
    # Footer template
    footer = '''
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
    '''
    
    # Detect body tag
    body_match = re.search(r'<body[^>]*>', content, re.IGNORECASE)
    
    if body_match:
        # Insert navigation right after body tag
        modified_content = (
            content[:body_match.end()] + 
            '\n    <!-- Universal Navigation -->\n' + 
            navigation + 
            content[body_match.end():]
        )
        
        # Insert footer before closing body tag
        modified_content = modified_content.replace('</body>', f'{footer}\n</body>')
    else:
        # Fallback if no body tag found
        modified_content = content
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(modified_content)

def main():
    directory = r'C:\Users\hp\Desktop\VVV Deepsite'
    html_files = [f for f in os.listdir(directory) if f.endswith('.html')]
    
    for file in html_files:
        file_path = os.path.join(directory, file)
        try:
            interlink_page(file_path)
            print(f"Processed {file}")
        except Exception as e:
            print(f"Error processing {file}: {e}")

if __name__ == '__main__':
    main()
