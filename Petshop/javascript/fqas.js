 function toggleFAQ(element) {
            // Get the answer element (next sibling after the question)
            const answer = element.nextElementSibling;
            
            // Toggle active class on the answer
            answer.classList.toggle('active');
            
            // Update the toggle icon
            const toggleIcon = element.querySelector('.faq-toggle');
            if (answer.classList.contains('active')) {
                toggleIcon.textContent = '×';
            } else {
                toggleIcon.textContent = '+';
            }
            
            // Close other open FAQs
            const allAnswers = document.querySelectorAll('.faq-answer');
            const allToggles = document.querySelectorAll('.faq-toggle');
            
            for (let i = 0; i < allAnswers.length; i++) {
                // Skip the current one that was clicked
                if (allAnswers[i] !== answer) {
                    allAnswers[i].classList.remove('active');
                    allToggles[i].textContent = '+';
                }
            }
        }

        // Automatically open the first FAQ item on page load
        window.onload = function() {
            const firstQuestion = document.querySelector('.faq-question');
            if (firstQuestion) {
                firstQuestion.click();
            }
        };

        // Login Modal Functions
        function openLoginModal() {
            document.getElementById('loginModal').style.display = 'flex';
            document.getElementById('registerModal').style.display = 'none';
        }
        
        function closeLoginModal() {
            document.getElementById('loginModal').style.display = 'none';
        }
        
        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Here you would typically send the login data to a server
            console.log('Login attempted with:', email);
            
            // For demo purposes, just close the modal and show success message
            alert('Login successful!');
            closeLoginModal();
        }
        
        // Register Modal Functions
        function openRegisterModal() {
            document.getElementById('registerModal').style.display = 'flex';
            document.getElementById('loginModal').style.display = 'none';
        }
        
        function closeRegisterModal() {
            document.getElementById('registerModal').style.display = 'none';
        }
        
        function handleRegister(event) {
            event.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Password validation
            if (password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            
            // Here you would typically send the registration data to a server
            console.log('Registration attempted for:', fullName, email);
            
            // For demo purposes, just close the modal and show success message
            alert('Registration successful! Please login with your new account.');
            closeRegisterModal();
            openLoginModal();
        }
        
        function switchToLogin() {
            closeRegisterModal();
            openLoginModal();
        }
        
        // Close modals when clicking outside the content
        window.onclick = function(event) {
            const loginModal = document.getElementById('loginModal');
            const registerModal = document.getElementById('registerModal');
            
            if (event.target === loginModal) {
                closeLoginModal();
            }
            
            if (event.target === registerModal) {
                closeRegisterModal();
            }
        }