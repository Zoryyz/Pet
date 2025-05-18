 document.addEventListener('DOMContentLoaded', function() {
            // Make logo clickable with animation
            const logoLink = document.querySelector('.logo-link');
            logoLink.addEventListener('click', function(e) {
                e.preventDefault();
                const logo = this.querySelector('.logo');
                logo.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    logo.style.transform = 'scale(1)';
                    window.location.href = '#';
                }, 150);
            });
            
            // Responsive adjustments
            function checkScreenSize() {
                if (window.innerWidth <= 768) {
                    const menuButton = document.querySelector('.mobile-menu-btn') || document.createElement('button');
                    menuButton.textContent = '☰';
                    menuButton.classList.add('mobile-menu-btn');
                    menuButton.style.display = 'block';
                    
                    const headerContent = document.querySelector('.header-content');
                    if (!document.querySelector('.mobile-menu-btn')) {
                        headerContent.prepend(menuButton);
                    }
                    
                    document.querySelector('.nav-links').style.display = 'none';
                    
                    menuButton.onclick = function() {
                        const navLinks = document.querySelector('.nav-links');
                        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
                            navLinks.style.display = 'flex';
                            navLinks.style.flexDirection = 'column';
                            navLinks.style.position = 'absolute';
                            navLinks.style.top = '70px';
                            navLinks.style.left = '0';
                            navLinks.style.right = '0';
                            navLinks.style.backgroundColor = '#fff';
                            navLinks.style.padding = '15px';
                            navLinks.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                            navLinks.style.zIndex = '100';
                        } else {
                            navLinks.style.display = 'none';
                        }
                    };
                } else {
                    const menuButton = document.querySelector('.mobile-menu-btn');
                    if (menuButton) {
                        menuButton.style.display = 'none';
                    }
                    document.querySelector('.nav-links').style.display = 'flex';
                    document.querySelector('.nav-links').style.flexDirection = '';
                    document.querySelector('.nav-links').style.position = '';
                }
            }
            
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        });