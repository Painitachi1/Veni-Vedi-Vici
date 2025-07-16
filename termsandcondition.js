document.addEventListener('DOMContentLoaded', function() {
    // Terms Accordion
    const termsSections = document.querySelectorAll('.terms-section');
    
    termsSections.forEach(section => {
        const header = section.querySelector('.terms-header');
        const content = section.querySelector('.terms-content');
        
        header.addEventListener('click', function() {
            // Toggle active class
            section.classList.toggle('active');
            
            // Slide toggle content
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Version History
    const versionHistoryBtn = document.getElementById('version-history-btn');
    const versionHistoryContent = document.getElementById('version-history-content');
    
    if (versionHistoryBtn && versionHistoryContent) {
        versionHistoryBtn.addEventListener('click', function() {
            versionHistoryContent.classList.toggle('hidden');
        });
    }

    // Acceptance Tracking
    const termsAcceptCheckbox = document.getElementById('terms-accept');
    const continueButton = document.getElementById('continue-button');
    
    if (termsAcceptCheckbox && continueButton) {
        continueButton.disabled = true;
        
        termsAcceptCheckbox.addEventListener('change', function() {
            continueButton.disabled = !this.checked;
        });

        continueButton.addEventListener('click', function() {
            if (termsAcceptCheckbox.checked) {
                localStorage.setItem('terms-accepted', new Date().toISOString());
                alert('Terms and Conditions accepted. You can now proceed.');
            }
        });
    }

    // Last Updated Timestamp
    const lastUpdatedSpan = document.getElementById('last-updated');
    
    if (lastUpdatedSpan) {
        const lastUpdated = new Date('2023-04-15');
        lastUpdatedSpan.textContent = lastUpdated.toLocaleDateString();
    }
});
