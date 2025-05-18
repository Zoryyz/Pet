        document.addEventListener('DOMContentLoaded', function() {
            // Wishlist button toggle
            const wishlistBtn = document.getElementById('wishlist-toggle');
            wishlistBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    this.textContent = '❤️';
                    alert('Product added to wishlist!');
                } else {
                    this.textContent = '♡';
                    alert('Product removed from wishlist!');
                }
            });

            // Thumbnail image selection
            const thumbnails = document.querySelectorAll('.thumbnail');
            const mainImage = document.querySelector('.main-image img');
            
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function() {
                    // In a real implementation, this would change the main image
                    // For demo purposes, we'll just show an alert
                    alert(`Switching to image ${index + 1}`);
                });
            });

            // Add to cart functionality
            const addToCartBtn = document.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', function() {
                alert('Product added to cart!');
            });

            // Related product click
            const relatedProducts = document.querySelectorAll('.product-card');
            relatedProducts.forEach(product => {
                product.addEventListener('click', function() {
                    alert('Navigating to related product page');
                });
            });
        });