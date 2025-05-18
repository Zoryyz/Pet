   document.addEventListener('DOMContentLoaded', function() {
            // Product Data
            const products = [
                {
                    id: 1,
                    name: "Dog Food Premium",
                    description: "High-quality dog food with all essential nutrients for your furry friend.",
                    price: 29.99,
                    image: "🐶",
                    quantity: 1
                },
                {
                    id: 2,
                    name: "Cat Scratching Post",
                    description: "Durable cat scratching post with soft perch for your feline companion.",
                    price: 49.99,
                    image: "🐱",
                    quantity: 1
                }
            ];
            
            const relatedProducts = [
                {
                    id: 101,
                    name: "Pet Bed Deluxe",
                    price: 39.99,
                    sold: 125,
                    rating: 4.7,
                    image: "🛌"
                },
                {
                    id: 102,
                    name: "Dog Toys Bundle",
                    price: 24.99,
                    sold: 98,
                    rating: 4.5,
                    image: "🦴"
                },
                {
                    id: 103,
                    name: "Cat Climbing Tree",
                    price: 89.99,
                    sold: 76,
                    rating: 4.8,
                    image: "🌳"
                },
                {
                    id: 104,
                    name: "Pet Grooming Set",
                    price: 34.99,
                    sold: 112,
                    rating: 4.6,
                    image: "✂️"
                },
                {
                    id: 105,
                    name: "Pet Carrier",
                    price: 59.99,
                    sold: 65,
                    rating: 4.4,
                    image: "🧳"
                }
            ];
            
            // Cart state
            let cart = [...products];
            let selectedItems = [];
            let appliedCoupon = null;
            
            // UI Elements
            const cartItemsContainer = document.getElementById('cart-items');
            const selectAllCheckbox = document.getElementById('select-all-checkbox');
            const itemCountSpan = document.getElementById('item-count');
            const subtotalSpan = document.getElementById('subtotal');
            const totalSpan = document.getElementById('total');
            const checkoutCountSpan = document.getElementById('checkout-count');
            const checkoutTotalSpan = document.getElementById('checkout-total');
            const deleteSelectedBtn = document.getElementById('delete-selected');
            const deleteModal = document.getElementById('delete-modal');
            const closeModalBtn = document.getElementById('close-modal');
            const cancelDeleteBtn = document.getElementById('cancel-delete');
            const confirmDeleteBtn = document.getElementById('confirm-delete');
            const checkoutBtn = document.getElementById('checkout-btn');
            const checkoutModal = document.getElementById('checkout-modal');
            const closeCheckoutModal = document.getElementById('close-checkout-modal');
            const cancelCheckoutBtn = document.getElementById('cancel-checkout');
            const confirmCheckoutBtn = document.getElementById('confirm-checkout');
            const addToCartModal = document.getElementById('add-to-cart-modal');
            const closeAddModalBtn = document.getElementById('close-add-modal');
            const continueShopping = document.getElementById('continue-shopping');
            const viewCart = document.getElementById('view-cart');
            const productNameModal = document.getElementById('product-name-modal');
            const notification = document.getElementById('notification');
            const productsGrid = document.querySelector('.products-grid');
            const applyCouponBtn = document.getElementById('apply-coupon');
            const couponInput = document.querySelector('.coupon-input');
            const discountRow = document.getElementById('discount-row');
            const discountSpan = document.getElementById('discount');
            
            // Render cart items
            function renderCartItems() {
                cartItemsContainer.innerHTML = '';
                
                if (cart.length === 0) {
                    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
                    return;
                }
                
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.dataset.id = item.id;
                    
                    const isChecked = selectedItems.includes(item.id) ? 'checked' : '';
                    
                    cartItem.innerHTML = `
                        <div class="item-checkbox">
                            <input type="checkbox" ${isChecked} data-id="${item.id}">
                        </div>
                        <div class="item-image">
                            <span style="font-size: 32px;">${item.image}</span>
                        </div>
                        <div class="item-details">
                            <h3 class="item-name">${item.name}</h3>
                            <p class="item-description">${item.description}</p>
                            <p class="item-price">$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="quantity-control">
                            <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                            <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.id}">
                            <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                        </div>
                    `;
                    
                    cartItemsContainer.appendChild(cartItem);
                });
                
                // Update item count
                itemCountSpan.textContent = cart.length;
                
                // Add event listeners to new items
                addCartItemEventListeners();
                
                // Update summary
                updateSummary();
            }
            
            // Add event listeners to cart items
            function addCartItemEventListeners() {
                // Checkbox event listeners
                const checkboxes = cartItemsContainer.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', function() {
                        const itemId = parseInt(this.dataset.id);
                        
                        if (this.checked) {
                            if (!selectedItems.includes(itemId)) {
                                selectedItems.push(itemId);
                            }
                        } else {
                            selectedItems = selectedItems.filter(id => id !== itemId);
                            selectAllCheckbox.checked = false;
                        }
                        
                        updateSummary();
                    });
                });
                
                // Quantity event listeners
                const minusBtns = cartItemsContainer.querySelectorAll('.minus-btn');
                const plusBtns = cartItemsContainer.querySelectorAll('.plus-btn');
                const quantityInputs = cartItemsContainer.querySelectorAll('.quantity-input');
                
                minusBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const itemId = parseInt(this.dataset.id);
                        const item = cart.find(i => i.id === itemId);
                        
                        if (item && item.quantity > 1) {
                            item.quantity--;
                            renderCartItems();
                        }
                    });
                });
                
                plusBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const itemId = parseInt(this.dataset.id);
                        const item = cart.find(i => i.id === itemId);
                        
                        if (item) {
                            item.quantity++;
                            renderCartItems();
                        }
                    });
                });
                
                quantityInputs.forEach(input => {
                    input.addEventListener('change', function() {
                        const itemId = parseInt(this.dataset.id);
                        const quantity = parseInt(this.value);
                        const item = cart.find(i => i.id === itemId);
                        
                        if (item && quantity > 0) {
                            item.quantity = quantity;
                            renderCartItems();
                        } else {
                            this.value = item.quantity;
                        }
                    });
                });
            }
            
            // Update summary section
            function updateSummary() {
                // Calculate subtotal
                const selectedProducts = cart.filter(item => selectedItems.includes(item.id));
                const subtotal = selectedProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
                
                subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
                
                // Calculate discount if coupon applied
                let discount = 0;
                if (appliedCoupon) {
                    if (appliedCoupon.type === 'percentage') {
                        discount = subtotal * (appliedCoupon.value / 100);
                    } else if (appliedCoupon.type === 'fixed') {
                        discount = Math.min(subtotal, appliedCoupon.value);
                    }
                    
                    discountRow.style.display = 'flex';
                    discountSpan.textContent = `-$${discount.toFixed(2)}`;
                } else {
                    discountRow.style.display = 'none';
                }
                
                // Calculate total
                const total = subtotal - discount;
                totalSpan.textContent = `$${total.toFixed(2)}`;
                checkoutTotalSpan.textContent = `$${total.toFixed(2)}`;
                
                // Update checkout button count
                checkoutCountSpan.textContent = selectedItems.length;
                
                // Disable checkout button if no items selected
                if (selectedItems.length === 0) {
                    checkoutBtn.disabled = true;
                    checkoutBtn.style.opacity = '0.5';
                    checkoutBtn.style.cursor = 'not-allowed';
                } else {
                    checkoutBtn.disabled = false;
                    checkoutBtn.style.opacity = '1';
                    checkoutBtn.style.cursor = 'pointer';
                }
            }
            
            // Render related products
            function renderRelatedProducts() {
                productsGrid.innerHTML = '';
                
                relatedProducts.forEach(product => {
                    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
                    
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.dataset.id = product.id;
                    
                    productCard.innerHTML = `
                        <div class="product-image">
                            <span style="font-size: 48px;">${product.image}</span>
                        </div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-sold">${product.sold} sold</div>
                        <div class="rating">${stars}</div>
                    `;
                    
                    productsGrid.appendChild(productCard);
                });
                
                // Add event listeners to product cards
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    card.addEventListener('click', function() {
                        const productId = parseInt(this.dataset.id);
                        const product = relatedProducts.find(p => p.id === productId);
                        
                        if (product) {
                            // Show product name in modal
                            productNameModal.textContent = product.name;
                            
                            // Show add to cart modal
                            addToCartModal.style.display = 'flex';
                        }
                    });
                });
            }
            
            // Show notification
            function showNotification(message, duration = 3000) {
                notification.textContent = message;
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, duration);
            }
            
            // Event Listeners
            selectAllCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedItems = cart.map(item => item.id);
                } else {
                    selectedItems = [];
                }
                
                renderCartItems();
            });
            
            deleteSelectedBtn.addEventListener('click', function() {
                if (selectedItems.length > 0) {
                    deleteModal.style.display = 'flex';
                } else {
                    showNotification('Please select items to delete');
                }
            });
            
            closeModalBtn.addEventListener('click', function() {
                deleteModal.style.display = 'none';
            });
            
            cancelDeleteBtn.addEventListener('click', function() {
                deleteModal.style.display = 'none';
            });
            
            confirmDeleteBtn.addEventListener('click', function() {
                // Remove selected items from cart
                cart = cart.filter(item => !selectedItems.includes(item.id));
                selectedItems = [];
                
                // Close modal
                deleteModal.style.display = 'none';
                
                // Update UI
                renderCartItems();
                
                // Show notification
                showNotification('Items removed from cart');
            });
            
            checkoutBtn.addEventListener('click', function() {
                if (selectedItems.length > 0) {
                    checkoutModal.style.display = 'flex';
                } else {
                    showNotification('Please select items to checkout');
                }
            });
            
            closeCheckoutModal.addEventListener('click', function() {
                checkoutModal.style.display = 'none';
            });
            
            cancelCheckoutBtn.addEventListener('click', function() {
                checkoutModal.style.display = 'none';
            });
            
            confirmCheckoutBtn.addEventListener('click', function() {
                // Proceed to next step
                const steps = document.querySelectorAll('.step');
                const activeStep = document.querySelector('.step.active');
                const currentStepNumber = parseInt(activeStep.dataset.step);
                
                if (currentStepNumber < steps.length) {
                    activeStep.classList.remove('active');
                    steps[currentStepNumber].classList.add('active');
                }
                
                // Close modal
                checkoutModal.style.display = 'none';
                
                // Show notification
                showNotification('Proceeding to next step');
            });
            
            closeAddModalBtn.addEventListener('click', function() {
                addToCartModal.style.display = 'none';
            });
            
            continueShopping.addEventListener('click', function() {
                addToCartModal.style.display = 'none';
            });
            
            viewCart.addEventListener('click', function() {
                addToCartModal.style.display = 'none';
                // Scroll to cart section
                document.querySelector('.cart-section').scrollIntoView({ behavior: 'smooth' });
            });
            
            applyCouponBtn.addEventListener('click', function() {
                const couponCode = couponInput.value.trim().toUpperCase();
                
                // Simulated coupon codes
                const coupons = {
                    'WELCOME10': { type: 'percentage', value: 10 },
                    'SAVE20': { type: 'percentage', value: 20 },
                    'DISCOUNT5': { type: 'fixed', value: 5 }
                };
                
                if (couponCode && coupons[couponCode]) {
                    appliedCoupon = coupons[couponCode];
                    updateSummary();
                    showNotification(`Coupon ${couponCode} applied successfully!`);
                } else {
                    showNotification('Invalid coupon code');
                }
            });
            
            // Initialize
            renderCartItems();
            renderRelatedProducts();
        });
  