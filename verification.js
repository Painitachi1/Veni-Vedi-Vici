document.addEventListener('DOMContentLoaded', function() {
    // Badge Verification Form
    const verificationForm = document.getElementById('badge-verification-form');
    const verificationResult = document.getElementById('verification-result');

    if (verificationForm && verificationResult) {
        verificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const badgeCode = this.querySelector('input').value;

            // Simulated verification data
            const validBadges = {
                'VIP-12345': { 
                    status: 'Valid', 
                    type: 'Gold Tier', 
                    expirationDate: '2024-12-31' 
                },
                'PRO-67890': { 
                    status: 'Expired', 
                    type: 'Silver Tier', 
                    expirationDate: '2023-03-15' 
                }
            };

            const result = validBadges[badgeCode];
            if (result) {
                verificationResult.innerHTML = `
                    <div class="${result.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} p-4 rounded">
                        <p><strong>Status:</strong> ${result.status}</p>
                        <p><strong>Badge Type:</strong> ${result.type}</p>
                        <p><strong>Expiration:</strong> ${result.expirationDate}</p>
                    </div>
                `;
            } else {
                verificationResult.innerHTML = `
                    <div class="bg-red-100 text-red-800 p-4 rounded">
                        Invalid badge code. Please check and try again.
                    </div>
                `;
            }
        });
    }

    // Badge Benefits Preview
    const badgeTiers = document.querySelectorAll('.badge-tier');
    
    badgeTiers.forEach(tier => {
        tier.addEventListener('mouseover', function() {
            const benefits = this.getAttribute('data-benefits').split(',');
            const benefitsList = benefits.map(benefit => `<li>${benefit}</li>`).join('');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-white shadow-lg p-4 rounded z-10';
            tooltip.innerHTML = `
                <h4 class="font-bold mb-2">Tier Benefits</h4>
                <ul class="list-disc list-inside">${benefitsList}</ul>
            `;
            
            this.appendChild(tooltip);
        });

        tier.addEventListener('mouseout', function() {
            const tooltip = this.querySelector('div');
            if (tooltip) {
                this.removeChild(tooltip);
            }
        });
    });
});
