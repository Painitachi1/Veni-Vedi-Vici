document.addEventListener('DOMContentLoaded', function() {
    // FAQ Search Functionality
    const faqSearchInput = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-toggle-icon');
            
            // Toggle answer visibility
            answer.classList.toggle('hidden');
            
            // Rotate icon
            icon.classList.toggle('rotate-180');
        });
    });

    // Helpful Feedback
    const helpfulButtons = document.querySelectorAll('.faq-helpful-btn');
    
    helpfulButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wasHelpful = this.getAttribute('data-helpful') === 'true';
            const faqId = this.getAttribute('data-faq-id');
            
            // Store feedback (in a real app, this would be sent to a server)
            const feedback = {
                faqId: faqId,
                helpful: wasHelpful,
                timestamp: new Date().toISOString()
            };
            
            console.log('FAQ Feedback:', feedback);
            
            // Disable buttons after voting
            this.disabled = true;
            this.nextElementSibling.disabled = true;
            
            alert(wasHelpful ? 'Thank you for your feedback!' : 'We appreciate your input.');
        });
    });

    // Category Filtering
    const categoryFilter = document.getElementById('faq-category-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    }
});
