   // Payment method selection
        const paymentOptions = document.querySelectorAll('.payment-option');
        const paymentRadios = document.querySelectorAll('input[name="payment"]');
        
        paymentRadios.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                paymentOptions.forEach(option => {
                    option.classList.remove('selected');
                });
                paymentOptions[index].classList.add('selected');
            });
        });
        
        // Coupon code functionality
        const couponInput = document.querySelector('.coupon-section input');
        const applyButton = document.querySelector('.coupon-section button');
        const subtotalElem = document.querySelector('.summary-row:nth-of-type(1) span:last-child');
        const shippingElem = document.querySelector('.summary-row:nth-of-type(2) span:last-child');
        const totalElem = document.querySelector('.total-row span:last-child');
        
        applyButton.addEventListener('click', () => {
            const couponCode = couponInput.value.trim().toUpperCase();
            if (couponCode === 'DISCOUNT50') {
                // Apply 50% discount
                const subtotal = 600;
                const discount = subtotal * 0.5;
                const total = subtotal - discount;
                
                totalElem.textContent = `$${total}`;
                alert('Coupon applied successfully! 50% discount applied.');
            } else if (couponCode === 'FREESHIP') {
                // Free shipping is already applied
                alert('Shipping is already free!');
            } else if (couponCode) {
                alert('Invalid coupon code.');
            }
        });
        
        // Pay now button functionality
        const payButton = document.querySelector('.pay-btn');
        const cancelButton = document.querySelector('.cancel-btn');
        
        payButton.addEventListener('click', () => {
            // Get selected payment method
            const selectedPayment = document.querySelector('input[name="payment"]:checked').id;
            
            // Validate credit card if that's the selected method
            if (selectedPayment === 'cc-radio') {
                const cardNumber = document.querySelector('#credit-card input:nth-of-type(1)').value;
                const expiryDate = document.querySelector('#credit-card .cc-row input:nth-of-type(1)').value;
                const cvc = document.querySelector('#credit-card .cc-row input:nth-of-type(2)').value;
                const cardHolder = document.querySelector('#credit-card input:last-of-type').value;
                
                if (!cardNumber || !expiryDate || !cvc || !cardHolder) {
                    alert('Please fill in all credit card details.');
                    return;
                }
                
                if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
                    alert('Please enter a valid 16-digit card number.');
                    return;
                }
            }
            
            // Simulate successful payment
            alert('Payment successful! Thank you for your order.');
        });
        
        cancelButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel your order?')) {
                window.location.href = '#';
            }
        });
        
        // Add credit card formatting
        const cardNumberInput = document.querySelector('#credit-card input:nth-of-type(1)');
        
        cardNumberInput.addEventListener('input', function(e) {
            // Remove all non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Add a space after every 4 digits
            if (value.length > 0) {
                value = value.match(/.{1,4}/g).join(' ');
            }
            
            // Update the input value
            this.value = value;
        });