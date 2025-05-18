document.addEventListener('DOMContentLoaded', function () {
    const featuredSlider = document.getElementById('featuredProductsSlider');
    const nextBtn = document.getElementById('featuredNextBtn');
    const prevBtn = document.getElementById('featuredPrevBtn');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const extraProducts = document.querySelectorAll('.product-card.extra'); // Get all extra products

    // Define your 5 original products for the slider
    const originalProducts = [
        { name: 'Product 1', price: '$200', img: '/api/placeholder/200/200' },
        { name: 'Product 2', price: '$150', img: '/api/placeholder/200/200' },
        { name: 'Product 3', price: '$300', img: '/api/placeholder/200/200' },
        { name: 'Product 4', price: '$120', img: '/api/placeholder/200/200' },
        { name: 'Product 5', price: '$180', img: '/api/placeholder/200/200' }
    ];

    let currentIndex = 0; // Track the current pair of products being displayed
    let isExpanded = false; // To track the state of the "Load More" button

    function applyAnimation(card) {
        const animations = ['animate-fade', 'animate-slide', 'animate-zoom'];
        let animationIndex = 0;
        animations.forEach(anim => card.classList.remove(anim));
        void card.offsetWidth; // Restart animation
        card.classList.add(animations[animationIndex]);
        animationIndex = (animationIndex + 1) % animations.length;
    }

    function renderProducts() {
        featuredSlider.innerHTML = ''; // Clear current product(s)

        // Get the current pair of products (currentIndex and next product)
        const firstProduct = originalProducts[currentIndex];
        const secondProduct = originalProducts[(currentIndex + 1) % originalProducts.length]; // Loop to first product after the last

        // Create the product cards for the two products
        const card1 = document.createElement('div');
        card1.classList.add('product-card');
        card1.innerHTML = `
            <img src="${firstProduct.img}" alt="Product Image">
            <h3 class="product-name">${firstProduct.name}</h3>
            <p class="product-price">${firstProduct.price}</p>
        `;
        applyAnimation(card1);

        const card2 = document.createElement('div');
        card2.classList.add('product-card');
        card2.innerHTML = `
            <img src="${secondProduct.img}" alt="Product Image">
            <h3 class="product-name">${secondProduct.name}</h3>
            <p class="product-price">${secondProduct.price}</p>
        `;
        applyAnimation(card2);

        // Append both cards to the slider
        featuredSlider.appendChild(card1);
        featuredSlider.appendChild(card2);
    }

    // Initially render the first pair of products
    renderProducts();

    // Next and previous buttons functionality for product slider
    nextBtn.addEventListener('click', () => {
        // Move to the next pair of products, and loop back to the start when reaching the last one
        currentIndex = (currentIndex + 1) % originalProducts.length;
        renderProducts(); // Re-render with updated products
    });

    prevBtn.addEventListener('click', () => {
        // Move to the previous pair of products, and loop back to the end when reaching the first one
        currentIndex = (currentIndex - 1 + originalProducts.length) % originalProducts.length;
        renderProducts(); // Re-render with updated products
    });

    // Toggle "Load More" and "Show Less" functionality
    loadMoreBtn.addEventListener('click', function () {
        if (isExpanded) {
            extraProducts.forEach(product => product.style.display = 'none');
            loadMoreBtn.textContent = 'Load More'; // Change button text to "Load More"
        } else {
            extraProducts.forEach(product => product.style.display = 'block');
            loadMoreBtn.textContent = 'Show Less'; // Change button text to "Show Less"
        }
        isExpanded = !isExpanded; // Toggle the state (expand or collapse)
    });
});


