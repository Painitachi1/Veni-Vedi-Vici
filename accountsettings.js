document.addEventListener('DOMContentLoaded', function() {
    // Profile Form Elements
    const profileForm = document.getElementById('profile-form');
    const passwordForm = document.getElementById('password-form');
    const notificationForm = document.getElementById('notification-form');

    // Profile Form Validation
    function validateProfileForm(form) {
        const firstName = form.querySelector('#first-name');
        const lastName = form.querySelector('#last-name');
        const email = form.querySelector('#email');
        const phone = form.querySelector('#phone');

        let isValid = true;

        // Name Validation
        if (!firstName.value.trim()) {
            markInvalid(firstName, 'First name is required');
            isValid = false;
        } else {
            markValid(firstName);
        }

        if (!lastName.value.trim()) {
            markInvalid(lastName, 'Last name is required');
            isValid = false;
        } else {
            markValid(lastName);
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            markInvalid(email, 'Invalid email format');
            isValid = false;
        } else {
            markValid(email);
        }

        // Phone Validation
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone.value)) {
            markInvalid(phone, 'Invalid phone number');
            isValid = false;
        } else {
            markValid(phone);
        }

        return isValid;
    }

    // Password Form Validation
    function validatePasswordForm(form) {
        const currentPassword = form.querySelector('#current-password');
        const newPassword = form.querySelector('#new-password');
        const confirmPassword = form.querySelector('#confirm-password');

        let isValid = true;

        // Current Password Check
        if (!currentPassword.value) {
            markInvalid(currentPassword, 'Current password is required');
            isValid = false;
        } else {
            markValid(currentPassword);
        }

        // New Password Validation
        if (newPassword.value.length < 8) {
            markInvalid(newPassword, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            markValid(newPassword);
        }

        // Password Confirmation
        if (newPassword.value !== confirmPassword.value) {
            markInvalid(confirmPassword, 'Passwords do not match');
            isValid = false;
        } else {
            markValid(confirmPassword);
        }

        return isValid;
    }

    // Mark Field as Invalid
    function markInvalid(field, message) {
        field.classList.add('border-red-500');
        const errorSpan = field.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = message;
        }
    }

    // Mark Field as Valid
    function markValid(field) {
        field.classList.remove('border-red-500');
        field.classList.add('border-green-500');
        const errorSpan = field.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = '';
        }
    }

    // Form Submission Handlers
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateProfileForm(this)) {
            // Simulate API call
            const formData = new FormData(this);
            const userData = Object.fromEntries(formData.entries());
            
            // In a real app, you'd send this to a backend
            localStorage.setItem('userProfile', JSON.stringify(userData));
            showNotification('Profile updated successfully!', 'success');
        }
    });

    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validatePasswordForm(this)) {
            // Simulate password change
            showNotification('Password changed successfully!', 'success');
            this.reset();
        }
    });

    notificationForm.addEventListener('change', function(e) {
        const target = e.target;
        if (target.type === 'checkbox') {
            const preferences = {
                email: document.getElementById('email-notifications').checked,
                sms: document.getElementById('sms-notifications').checked,
                push: document.getElementById('push-notifications').checked
            };
            
            localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
            showNotification('Notification preferences updated!', 'info');
        }
    });

    // Notification Display
    function showNotification(message, type = 'info') {
        const notificationContainer = document.getElementById('notification-container');
        const notification = document.createElement('div');
        
        notification.className = `
            fixed top-4 right-4 z-50 px-4 py-2 rounded 
            ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'} 
            text-white transition-all duration-300
        `;
        
        notification.textContent = message;
        notificationContainer.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => notificationContainer.removeChild(notification), 300);
        }, 3000);
    }

    // Load Saved Preferences
    function loadSavedPreferences() {
        const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const savedNotifications = JSON.parse(localStorage.getItem('notificationPreferences') || '{}');

        // Populate profile form
        Object.keys(savedProfile).forEach(key => {
            const field = document.getElementById(key);
            if (field) field.value = savedProfile[key];
        });

        // Set notification checkboxes
        ['email', 'sms', 'push'].forEach(type => {
            const checkbox = document.getElementById(`${type}-notifications`);
            if (checkbox) checkbox.checked = savedNotifications[type] || false;
        });
    }

    // Initial Load
    loadSavedPreferences();
});
