// Fees Page Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    function toggleFAQ(button) {
        const faqItem = button.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = button.querySelector('i');
        
        answer.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }

    // Tier Calculator Logic
    function calculateTierProgress() {
        const purchasesInput = document.getElementById('purchases');
        const monthlyInput = document.getElementById('monthly');
        const progressBars = document.querySelectorAll('.tier-progress-bar');
        
        const totalPurchases = parseFloat(purchasesInput.value) || 0;
        
        progressBars.forEach(bar => {
            const requiredAmount = parseFloat(bar.dataset.tierThreshold);
            const progressPercentage = Math.min((totalPurchases / requiredAmount) * 100, 100);
            
            bar.style.width = `${progressPercentage}%`;
            bar.setAttribute('aria-valuenow', progressPercentage);
        });
    }

    // Event Listeners
    const faqButtons = document.querySelectorAll('.faq-toggle');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => toggleFAQ(button));
    });

    const purchasesInput = document.getElementById('purchases');
    const monthlyInput = document.getElementById('monthly');
    
    if (purchasesInput) {
        purchasesInput.addEventListener('input', calculateTierProgress);
    }
    
    if (monthlyInput) {
        monthlyInput.addEventListener('input', calculateTierProgress);
    }

    // Accessibility Enhancements
    function enhanceAccessibility() {
        const interactiveElements = document.querySelectorAll('button, a, input');
        interactiveElements.forEach(el => {
            if (!el.getAttribute('aria-label') && el.textContent.trim()) {
                el.setAttribute('aria-label', el.textContent.trim());
            }
        });
    }

    enhanceAccessibility();
});
