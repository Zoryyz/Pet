// Simple interactivity for demo purposes
document.addEventListener('DOMContentLoaded', function() {
    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            alert('Product details would open here');
            console.log('Logo clicked - navigating to home page');
            alert('Logo clicked! In a real website, this would take you to the homepage.');   
        });
    });

    // Pagination functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            paginationBtns.forEach(b => b.classList.remove('active'));
            if (!this.textContent.includes('⟨') && !this.textContent.includes('⟩')) {
                this.classList.add('active');
            }
        });
    });

    // View more functionality
    const viewMoreLinks = document.querySelectorAll('.view-more');
    viewMoreLinks.forEach(link => {
        link.addEventListener('click', function() {
            alert('More options would be shown here');
        });
    });
    
    // Rating star functionality
    const starRatingLinks = document.querySelectorAll('.star-rating-link');
    starRatingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const starRating = this.querySelector('.star-rating').textContent;
            alert(`Filtering products with rating ${starRating} and up`);
        });
    });
    
    // Product stars functionality
    const productStars = document.querySelectorAll('.product-stars');
    productStars.forEach(stars => {
        stars.addEventListener('click', function(e) {
            e.preventDefault();
            alert('You can now rate this product or see rating details');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alert(`Searching for: ${this.value}`);
        }
    });

    // Cart button
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Shopping cart would open here');
    });
});