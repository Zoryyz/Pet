   document.addEventListener('DOMContentLoaded', function() {
            // Variables to store order details
            let subtotal = 70; // $45 + $25
            let shipping = 0;
            let discount = 0;
            let total = subtotal;
            
            // Login modal functionality
            const loginLink = document.getElementById('login-link');
            const loginModal = document.getElementById('login-modal');
            const closeLogin = document.getElementById('close-login');
            const loginForm = document.getElementById('login-form');
            
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.style.display = 'block';
            });
            
            closeLogin.addEventListener('click', function() {
                loginModal.style.display = 'none';
            });
            
            window.addEventListener('click', function(e) {
                if (e.target === loginModal) {
                    loginModal.style.display = 'none';
                }
            });
            
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                loginModal.style.display = 'none';
                showNotification('Login successful!');
                loginLink.textContent = 'My Account';
            });
            
            // Shipping option selection
            const freeShipping = document.getElementById('free-shipping');
            const nextdayShipping = document.getElementById('nextday-shipping');
            const shippingCostElement = document.getElementById('shipping-cost');
            const totalElement = document.getElementById('total-amount');
            
            freeShipping.addEventListener('click', function() {
                document.getElementById('free').checked = true;
                freeShipping.classList.add('selected');
                nextdayShipping.classList.remove('selected');
                shipping = 0;
                shippingCostElement.textContent = 'Free';
                updateTotal();
            });
            
            nextdayShipping.addEventListener('click', function() {
                document.getElementById('nextday').checked = true;
                nextdayShipping.classList.add('selected');
                freeShipping.classList.remove('selected');
                shipping = 20;
                shippingCostElement.textContent = '$20';
                updateTotal();
            });
            
            // Coupon code functionality
            const couponInput = document.getElementById('coupon-input');
            const applyCouponBtn = document.getElementById('apply-coupon');
            const discountRow = document.getElementById('discount-row');
            const discountAmount = document.getElementById('discount-amount');
            
            // Valid coupon codes
            const validCoupons = {
                'WELCOME10': 10,
                'PETLOVER20': 20,
                'FREESHIP': 0  // This would be for free shipping, already implemented
            };
            
            applyCouponBtn.addEventListener('click', function() {
                const couponCode = couponInput.value.trim().toUpperCase();
                
                if (validCoupons.hasOwnProperty(couponCode)) {
                    discount = validCoupons[couponCode];
                    discountAmount.textContent = `-$${discount}`;
                    discountRow.style.display = 'flex';
                    updateTotal();
                    showNotification(`Coupon code "${couponCode}" applied successfully!`);
                } else if (couponCode === '') {
                    showNotification('Please enter a coupon code', 'error');
                } else {
                    showNotification('Invalid coupon code', 'error');
                }
            });
            
            // Form validation
            const shippingForm = document.getElementById('shipping-form');
            const continueBtn = document.getElementById('continue-btn');
            const checkoutBtn = document.getElementById('checkout-btn');
            const cancelBtn = document.getElementById('cancel-btn');
            
            shippingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset previous errors
                const errorMessages = document.querySelectorAll('.error-message');
                errorMessages.forEach(msg => msg.style.display = 'none');
                
                const inputs = shippingForm.querySelectorAll('input, select');
                let isValid = true;
                
                inputs.forEach(input => {
                    input.classList.remove('error');
                    const errorElement = document.getElementById(`${input.id}-error`);
                    
                    if (input.required && !input.value.trim()) {
                        input.classList.add('error');
                        if (errorElement) errorElement.style.display = 'block';
                        isValid = false;
                    } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
                        input.classList.add('error');
                        if (errorElement) errorElement.style.display = 'block';
                        isValid = false;
                    } else if (input.id === 'postal-code' && input.value.trim() && !validatePostalCode(input.value)) {
                        input.classList.add('error');
                        if (errorElement) errorElement.style.display = 'block';
                        isValid = false;
                    } else if (input.id === 'phone' && input.value.trim() && !validatePhone(input.value)) {
                        input.classList.add('error');
                        if (errorElement) errorElement.style.display = 'block';
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    // Go to next step (payment)
                    document.getElementById('step-2').classList.remove('active');
                    document.getElementById('step-3').classList.add('active');
                    showNotification('Proceeding to payment...');
                }
            });
            
            checkoutBtn.addEventListener('click', function() {
                continueBtn.click(); // Trigger form validation
            });
            
            cancelBtn.addEventListener('click', function() {
                // Go back to shopping cart
                document.getElementById('step-2').classList.remove('active');
                document.getElementById('step-1').classList.add('active');
                showNotification('Returning to cart...');
            });
            
            // Navigation between steps
            document.getElementById('step-1').addEventListener('click', function() {
                document.getElementById('step-2').classList.remove('active');
                document.getElementById('step-3').classList.remove('active');
                document.getElementById('step-1').classList.add('active');
                showNotification('Returning to cart...');
            });
            
            document.getElementById('step-3').addEventListener('click', function() {
                continueBtn.click(); // Trigger form validation
            });
            
            // Helper functions
            function updateTotal() {
                total = subtotal + shipping - discount;
                totalElement.textContent = `$${total}`;
            }
            
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            function validatePostalCode(postalCode) {
                // Canadian postal code format: A1A 1A1
                const re = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
                return re.test(postalCode);
            }
            
            function validatePhone(phone) {
                // Basic phone validation
                const re = /^[\d\s\-\(\)]{10,}$/;
                return re.test(phone);
            }
            
            function showNotification(message, type = 'success') {
                const notification = document.getElementById('notification');
                notification.textContent = message;
                notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#d9534f';
                notification.style.display = 'block';
                
                setTimeout(function() {
                    notification.style.display = 'none';
                }, 3000);
            }
        });