 // Toggle FAQ answers
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQs
                document.querySelectorAll('.faq-answer').forEach(item => {
                    item.style.display = 'none';
                });
                document.querySelectorAll('.faq-question').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current FAQ
                if (!isOpen) {
                    answer.style.display = 'block';
                    question.classList.add('active');
                }
            });
        });
        
        // Chat functionality
        const chatButton = document.getElementById('chat-button');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatInput = document.getElementById('chat-input-field');
        const chatSend = document.getElementById('chat-send');
        const chatMessages = document.getElementById('chat-messages');
        
        chatButton.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
        });
        
        chatClose.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
        
        chatSend.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
        
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message message-user';
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate bot response after a short delay
                setTimeout(() => {
                    const botResponses = [
                        "Thank you for your message. Our support team will get back to you shortly.",
                        "I understand your concern. Let me help you with that issue.",
                        "We appreciate your question. Please provide your order number for better assistance.",
                        "Thank you for contacting us. For pet-specific advice, please consult with your veterinarian."
                    ];
                    
                    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                    
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message message-bot';
                    botMessage.textContent = randomResponse;
                    chatMessages.appendChild(botMessage);
                    
                    // Scroll to bottom again
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 800);
            }
        }
        
        // Support case form toggle
        document.getElementById('create-case').addEventListener('click', (e) => {
            e.preventDefault();
            const caseForm = document.getElementById('case-form');
            caseForm.style.display = caseForm.style.display === 'block' ? 'none' : 'block';
        });
        
        // Handle support form submission
        document.getElementById('support-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = document.getElementById('case-subject').value;
            
            // Show notification
            showNotification(`Case created: ${subject}`);
            
            // Clear and hide form
            document.getElementById('support-form').reset();
            document.getElementById('case-form').style.display = 'none';
        });
        
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.style.display = 'block';
            notification.style.opacity = '1';
            
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 300);
            }, 3000);
        }
        
        // Help search functionality
        document.getElementById('help-search-btn').addEventListener('click', searchHelp);
        document.getElementById('help-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchHelp();
            }
        });
        
        function searchHelp() {
            const searchTerm = document.getElementById('help-search').value.toLowerCase().trim();
            if (!searchTerm) return;
            
            const faqItems = document.querySelectorAll('.faq-item');
            let found = false;
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    // Highlight and open the matching FAQ
                    item.querySelector('.faq-answer').style.display = 'block';
                    item.querySelector('.faq-question').classList.add('active');
                    
                    // Scroll to the item
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                } else {
                    item.querySelector('.faq-answer').style.display = 'none';
                    item.querySelector('.faq-question').classList.remove('active');
                }
            });
            
            if (!found) {
                showNotification("No results found. Please try different keywords.");
            }
        }
        
        // Category tile interaction
        document.querySelectorAll('.category-tile').forEach(tile => {
            tile.addEventListener('click', (e) => {
                e.preventDefault();
                const category = tile.getAttribute('data-category');
                showNotification(`Navigating to ${category.replace('-', ' ')} category`);
                
                // In a real app, this would navigate to category pages
                // window.location.href = `/help/${category}`;
            });
        });
        
        // Newsletter subscription
        document.getElementById('newsletter-btn').addEventListener('click', () => {
            const emailInput = document.querySelector('.newsletter input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.');
            }
        });
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Login modal functionality
        const loginModal = document.getElementById('login-modal');
        const cartModal = document.getElementById('cart-modal');
        
        document.getElementById('login-button').addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
        
        document.getElementById('close-login').addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
        
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email && password) {
                // Simulate successful login
                document.getElementById('login-button').textContent = 'My Account';
                loginModal.style.display = 'none';
                showNotification('You have successfully logged in!');
                
                // In a real application, this would send credentials to a server
                // and handle authentication properly
            }
        });
        
        // Cart modal functionality
        document.getElementById('cart-button').addEventListener('click', () => {
            cartModal.style.display = 'block';
        });
        
        document.getElementById('close-cart').addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
        
        // View cases functionality
        document.getElementById('view-cases').addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if user is logged in (in a real app this would check auth state)
            if (document.getElementById('login-button').textContent === 'My Account') {
                showNotification('Loading your support cases...');
                // In a real app, this would fetch and display user's cases
            } else {
                loginModal.style.display = 'block';
                showNotification('Please log in to view your cases');
            }
        });
        
        // Header search functionality
        document.getElementById('header-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.trim();
                if (searchTerm) {
                    showNotification(`Searching for: ${searchTerm}`);
                    // In a real app, this would navigate to search results
                }
            }
        });
        
        // Sample product data for demonstration
        const sampleProducts = [
            { id: 1, name: 'Premium Dog Food', price: 29.99, image: 'dog-food.jpg' },
            { id: 2, name: 'Cat Scratching Post', price: 39.99, image: 'scratch-post.jpg' },
            { id: 3, name: 'Pet Carrier', price: 49.99, image: 'pet-carrier.jpg' }
        ];
        
        // Function to add product to cart
        function addToCart(productId) {
            const product = sampleProducts.find(p => p.id === productId);
            
            if (product) {
                // Update cart count
                const cartBtn = document.getElementById('cart-button');
                const currentCount = parseInt(cartBtn.textContent.match(/\d+/)[0]);
                cartBtn.textContent = `Your Cart (${currentCount + 1})`;
                
                // Update cart modal
                const cartItems = document.getElementById('cart-items');
                
                // Remove "empty cart" message if it exists
                if (cartItems.textContent.includes('empty')) {
                    cartItems.innerHTML = '';
                }
                
                // Create cart item element
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                        <div>
                            <h4 style="margin: 0;">${product.name}</h4>
                            <p style="margin: 5px 0;">${product.price.toFixed(2)}</p>
                        </div>
                        <button class="remove-item" data-id="${product.id}" style="background: none; border: none; color: red; cursor: pointer;">✕</button>
                    </div>
                `;
                
                cartItems.appendChild(itemElement);
                
                // Enable checkout button
                document.getElementById('checkout-btn').disabled = false;
                
                // Show notification
                showNotification(`${product.name} added to cart!`);
                
                // Add event listener for remove button
                itemElement.querySelector('.remove-item').addEventListener('click', function() {
                    itemElement.remove();
                    
                    // Update cart count
                    const newCount = parseInt(cartBtn.textContent.match(/\d+/)[0]) - 1;
                    cartBtn.textContent = `Your Cart (${newCount})`;
                    
                    // If cart is empty, show empty message and disable checkout
                    if (newCount === 0) {
                        cartItems.innerHTML = '<p>Your cart is currently empty.</p>';
                        document.getElementById('checkout-btn').disabled = true;
                    }
                    
                    showNotification(`${product.name} removed from cart`);
                });
            }
        }
        
        // Sample product recommendations
        function loadRecommendations() {
            // Create recommendations section if it doesn't exist
            if (!document.getElementById('recommendations')) {
                const mainContent = document.querySelector('.main-content');
                
                const recommendationsSection = document.createElement('div');
                recommendationsSection.id = 'recommendations';
                recommendationsSection.innerHTML = `
                    <h2 style="text-align: center; margin-top: 40px;">Recommended for Your Pets</h2>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;"></div>
                `;
                
                mainContent.appendChild(recommendationsSection);
                
                const productsContainer = recommendationsSection.querySelector('div');
                
                sampleProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.style.cssText = 'border: 1px solid #ddd; padding: 15px; border-radius: 5px; width: 200px; text-align: center;';
                    productCard.innerHTML = `
                        <div style="height: 100px; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; font-weight: bold;">Product Image</div>
                        <h3 style="margin: 10px 0;">${product.name}</h3>
                        <p style="color: #e63946; font-weight: bold;">${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn" data-id="${product.id}" style="background-color: #333; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; width: 100%;">Add to Cart</button>
                    `;
                    
                    productsContainer.appendChild(productCard);
                });
                
                // Add event listeners to buttons
                document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = parseInt(button.getAttribute('data-id'));
                        addToCart(productId);
                    });
                });
            }
        }
        
        // Load recommendations after page load
        window.addEventListener('load', () => {
            setTimeout(loadRecommendations, 1500); // Delay to simulate loading
        });
        
        // Quick help shortcuts
        function createQuickHelp() {
            const quickHelpDiv = document.createElement('div');
            quickHelpDiv.style.cssText = 'position: fixed; left: 20px; bottom: 20px; background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 900;';
            quickHelpDiv.innerHTML = `
                <h3 style="margin-top: 0;">Quick Help</h3>
                <ul style="padding-left: 20px; margin-bottom: 0;">
                    <li><a href="#" id="track-order">Track my order</a></li>
                    <li><a href="#" id="return-policy">Return policy</a></li>
                    <li><a href="#" id="contact-support">Contact support</a></li>
                </ul>
                <button id="close-quick-help" style="position: absolute; top: 5px; right: 5px; background: none; border: none; font-size: 16px; cursor: pointer;">×</button>
            `;
            
            document.body.appendChild(quickHelpDiv);
            
            document.getElementById('close-quick-help').addEventListener('click', () => {
                quickHelpDiv.style.display = 'none';
                
                // Show it again after some time
                setTimeout(() => {
                    quickHelpDiv.style.display = 'block';
                }, 60000); // Show again after 1 minute
            });
            
            // Quick help links functionality
            document.getElementById('track-order').addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Opening order tracking tool...');
                // In a real app, navigate to order tracking page
            });
            
            document.getElementById('return-policy').addEventListener('click', (e) => {
                e.preventDefault();
                // Open the relevant FAQ
                const returnFaq = document.querySelector('.faq-question:nth-child(1)');
                if (returnFaq) {
                    returnFaq.click();
                    returnFaq.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            
            document.getElementById('contact-support').addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('chat-button').click();
            });
        }
        
        // Create quick help after a short delay
        setTimeout(createQuickHelp, 3000);
        
        // Load recently viewed pages
        function loadRecentlyViewed() {
            // This would normally be saved in localStorage or fetched from server
            // Simulating for demonstration
            const recentlyViewed = [
                { title: 'Dog Food Brands', url: '#' },
                { title: 'Summer Pet Care', url: '#' },
                { title: 'Order #12345', url: '#' }
            ];
            
            if (recentlyViewed.length > 0) {
                const casesSection = document.querySelector('.cases-section');
                
                const recentSection = document.createElement('div');
                recentSection.style.marginTop = '30px';
                recentSection.innerHTML = `
                    <h3>Recently Viewed</h3>
                    <ul style="padding-left: 15px;">
                        ${recentlyViewed.map(item => `<li><a href="${item.url}" class="cases-link">${item.title}</a></li>`).join('')}
                    </ul>
                `;
                
                casesSection.appendChild(recentSection);
            }
        }
        
        // Load after page load
        setTimeout(loadRecentlyViewed, 2000);
        
        // Show page viewed confirmation
        setTimeout(() => {
            showNotification('Help Center page loaded successfully!');
        }, 500);