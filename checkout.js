document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    // Form Validation
    function validateStep(step) {
        const inputs = step.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('border-red-500');
                isValid = false;
            } else {
                input.classList.remove('border-red-500');
            }
        });
        
        return isValid;
    }
    
    // Step Progression
    function showStep(currentStep, nextStep) {
        currentStep.classList.remove('active');
        currentStep.classList.add('completed');
        nextStep.classList.add('active');
    }
    
    // Next Step Handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.checkout-step');
            const nextStep = currentStep.nextElementSibling;
            
            if (validateStep(currentStep)) {
                showStep(currentStep, nextStep);
            } else {
                alert('Please fill in all required fields');
            }
        });
    });
    
    // Previous Step Handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.checkout-step');
            const prevStep = currentStep.previousElementSibling;
            
            currentStep.classList.remove('active');
            prevStep.classList.remove('completed');
            prevStep.classList.add('active');
        });
    });
    
    // Payment Method Selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            paymentMethods.forEach(m => m.classList.remove('border-blue-500'));
            this.classList.add('border-blue-500');
        });
    });
    
    // Price Calculation
    function updateTotalPrice() {
        const items = document.querySelectorAll('.cart-item');
        let total = 0;
        
        items.forEach(item => {
            const price = parseFloat(item.dataset.price);
            const quantity = parseInt(item.querySelector('.quantity').value);
            total += price * quantity;
        });
        
        document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
    }
    
    // Quantity Adjustment
    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateTotalPrice);
    });
    
    // Form Submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Final validation
        const allSteps = Array.from(checkoutSteps);
        const isAllValid = allSteps.every(validateStep);
        
        if (isAllValid) {
            // Proceed with checkout
            alert('Checkout successful!');
            // You would typically send this to a backend endpoint
        } else {
            alert('Please complete all steps correctly');
        }
    });
});
