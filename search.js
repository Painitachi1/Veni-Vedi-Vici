document.addEventListener('DOMContentLoaded', function() {
    // Search Elements
    const searchInput = document.getElementById('global-search');
    const categoryFilter = document.getElementById('category-filter');
    const priceRangeMin = document.getElementById('price-min');
    const priceRangeMax = document.getElementById('price-max');
    const sortSelect = document.getElementById('sort-order');
    const resultsContainer = document.getElementById('search-results');
    const filterTags = document.getElementById('filter-tags');

    // Sample Search Data (in real app, this would come from backend)
    const searchData = [
        { 
            id: 1, 
            name: 'Premium Wireless Headphones', 
            category: 'Electronics', 
            price: 249.99, 
            brand: 'Sony', 
            rating: 4.5 
        },
        { 
            id: 2, 
            name: 'Luxury Leather Bag', 
            category: 'Fashion', 
            price: 599.99, 
            brand: 'Gucci', 
            rating: 4.8 
        },
        // More items would be here
    ];

    // Render Search Results
    function renderSearchResults(results) {
        resultsContainer.innerHTML = results.map(item => `
            <div class="search-result-card bg-white rounded-lg shadow-md p-4 mb-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-semibold">${item.name}</h3>
                        <div class="flex items-center mt-2">
                            <span class="text-yellow-500 mr-2">
                                ${'★'.repeat(Math.round(item.rating))}
                                ${'☆'.repeat(5 - Math.round(item.rating))}
                            </span>
                            <span class="text-gray-500">(${item.rating})</span>
                        </div>
                        <div class="mt-2">
                            <span class="text-sm text-gray-600">Category: ${item.category}</span>
                            <span class="ml-4 text-sm text-gray-600">Brand: ${item.brand}</span>
                        </div>
                    </div>
                    <div>
                        <span class="text-xl font-bold text-blue-600">$${item.price.toFixed(2)}</span>
                        <button onclick="addToCart(${item.id})" class="block w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Search and Filter Logic
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const minPrice = parseFloat(priceRangeMin.value) || 0;
        const maxPrice = parseFloat(priceRangeMax.value) || Infinity;
        const sortOrder = sortSelect.value;

        let filteredResults = searchData.filter(item => 
            (searchTerm === '' || item.name.toLowerCase().includes(searchTerm)) &&
            (selectedCategory === 'all' || item.category === selectedCategory) &&
            item.price >= minPrice &&
            item.price <= maxPrice
        );

        // Sorting
        switch(sortOrder) {
            case 'price-low':
                filteredResults.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredResults.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredResults.sort((a, b) => b.rating - a.rating);
                break;
        }

        renderSearchResults(filteredResults);
        updateFilterTags(selectedCategory, minPrice, maxPrice);
    }

    // Update Active Filter Tags
    function updateFilterTags(category, minPrice, maxPrice) {
        const tags = [];
        if (category !== 'all') tags.push(`Category: ${category}`);
        if (minPrice > 0) tags.push(`Min Price: $${minPrice}`);
        if (maxPrice < Infinity) tags.push(`Max Price: $${maxPrice}`);

        filterTags.innerHTML = tags.map(tag => `
            <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                ${tag}
            </span>
        `).join('');
    }

    // Cart Interaction
    window.addToCart = function(productId) {
        const product = searchData.find(p => p.id === productId);
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartBadge();
        alert(`${product.name} added to cart!`);
    }

    function updateCartBadge() {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            cartBadge.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    }

    // Event Listeners
    searchInput.addEventListener('input', performSearch);
    categoryFilter.addEventListener('change', performSearch);
    priceRangeMin.addEventListener('input', performSearch);
    priceRangeMax.addEventListener('input', performSearch);
    sortSelect.addEventListener('change', performSearch);

    // Initial Load
    performSearch();
    updateCartBadge();
});
