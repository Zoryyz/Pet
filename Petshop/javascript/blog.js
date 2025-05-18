 // Smooth scrolling for table of contents
        document.addEventListener('DOMContentLoaded', function() {
            const tocLinks = document.querySelectorAll('.toc-link');
            
            tocLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Highlight current section in TOC based on scroll position
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('.article-content section');
                const tocItems = document.querySelectorAll('.toc-list li a');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.pageYOffset >= sectionTop - 100) {
                        currentSection = '#' + section.getAttribute('id');
                    }
                });
                
                tocItems.forEach(item => {
                    item.style.fontWeight = 'normal';
                    if (item.getAttribute('href') === currentSection) {
                        item.style.fontWeight = 'bold';
                    }
                });
            });
            
            // Mobile menu toggle functionality
            const menuButton = document.createElement('button');
            menuButton.textContent = '☰';
            menuButton.classList.add('mobile-menu-btn');
            menuButton.style.display = 'none';
            
            const headerContent = document.querySelector('.header-content');
            headerContent.prepend(menuButton);
            
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
                    menuButton.style.display = 'block';
                    document.querySelector('.nav-links').style.display = 'none';
                } else {
                    menuButton.style.display = 'none';
                    document.querySelector('.nav-links').style.display = 'flex';
                }
            }
            
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
            
            menuButton.addEventListener('click', function() {
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
            });
        });