document.addEventListener('DOMContentLoaded', function() {
    // Cookie Consent Management
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    if (cookieConsent && acceptCookiesBtn && rejectCookiesBtn) {
        // Check if user has already made a choice
        const cookiePreference = localStorage.getItem('cookie-consent');
        
        if (cookiePreference) {
            cookieConsent.classList.add('hidden');
        }

        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'accepted');
            cookieConsent.classList.add('hidden');
            alert('All cookies have been accepted.');
        });

        rejectCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'rejected');
            cookieConsent.classList.add('hidden');
            alert('Non-essential cookies have been rejected.');
        });
    }

    // Privacy Settings Toggle
    const privacyToggles = document.querySelectorAll('.privacy-toggle');
    
    privacyToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.getAttribute('data-setting');
            const isEnabled = this.checked;
            
            // Simulate saving privacy settings
            localStorage.setItem(`privacy-${settingName}`, isEnabled);
            
            console.log(`Privacy setting for ${settingName}: ${isEnabled ? 'Enabled' : 'Disabled'}`);
        });

        // Load previous settings
        const savedSetting = localStorage.getItem(`privacy-${toggle.getAttribute('data-setting')}`);
        if (savedSetting !== null) {
            toggle.checked = savedSetting === 'true';
        }
    });

    // Data Request Form
    const dataRequestForm = document.getElementById('data-request-form');
    
    if (dataRequestForm) {
        dataRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]');
            const requestType = this.querySelector('select');
            
            if (email.value && /\S+@\S+\.\S+/.test(email.value)) {
                alert(`Your ${requestType.value} data request has been submitted. We'll process it within 30 days.`);
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});
