document.addEventListener('DOMContentLoaded', function() {
    // Payment Method Selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('border-blue-500', 'bg-blue-50'));
            
            // Add active class to selected method
            this.classList.add('border-blue-500', 'bg-blue-50');
        });
    });

    // Payment Form Validation
    const paymentForm = document.getElementById('payment-form');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cardNumber = document.getElementById('card-number');
            const cardName = document.getElementById('card-name');
            const expiryDate = document.getElementById('expiry-date');
            const cvv = document.getElementById('cvv');
            
            let isValid = true;
            
            // Card Number Validation (basic)
            if (!/^\d{16}$/.test(cardNumber.value)) {
                cardNumber.classList.add('border-red-500');
                isValid = false;
            } else {
                cardNumber.classList.remove('border-red-500');
            }
            
            // Card Name Validation
            if (cardName.value.trim() === '') {
                cardName.classList.add('border-red-500');
                isValid = false;
            } else {
                cardName.classList.remove('border-red-500');
            }
            
            // Expiry Date Validation
            if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
                expiryDate.classList.add('border-red-500');
                isValid = false;
            } else {
                expiryDate.classList.remove('border-red-500');
            }
            
            // CVV Validation
            if (!/^\d{3,4}$/.test(cvv.value)) {
                cvv.classList.add('border-red-500');
                isValid = false;
            } else {
                cvv.classList.remove('border-red-500');
            }
            
            if (isValid) {
                alert('Payment processed successfully!');
                paymentForm.reset();
            } else {
                alert('Please correct the errors in the form.');
            }
        });
    }

    // Dynamic Total Calculation
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const totalDisplay = document.getElementById('total-amount');
    
    if (quantityInputs.length && totalDisplay) {
        quantityInputs.forEach(input => {
            input.addEventListener('change', calculateTotal);
        });

        function calculateTotal() {
            let total = 0;
            quantityInputs.forEach(input => {
                const price = parseFloat(input.getAttribute('data-price'));
                const quantity = parseInt(input.value);
                total += price * quantity;
            });
            
            totalDisplay.textContent = `$${total.toFixed(2)}`;
        }

        calculateTotal();
    }
});
