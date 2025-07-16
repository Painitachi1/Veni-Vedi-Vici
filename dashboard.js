document.addEventListener('DOMContentLoaded', function() {
    // Dashboard Sections
    const dashboardSections = {
        overview: document.getElementById('dashboard-overview'),
        recentOrders: document.getElementById('recent-orders'),
        accountActivity: document.getElementById('account-activity'),
        recommendations: document.getElementById('product-recommendations')
    };

    const navLinks = document.querySelectorAll('.dashboard-nav-link');

    // Navigation Handler
    function handleNavigation(sectionId) {
        // Hide all sections
        Object.values(dashboardSections).forEach(section => {
            section.classList.add('hidden');
        });

        // Highlight active nav link
        navLinks.forEach(link => {
            link.classList.remove('bg-blue-500', 'text-white');
            link.classList.add('text-gray-600');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        activeLink.classList.add('bg-blue-500', 'text-white');

        // Show selected section
        dashboardSections[sectionId].classList.remove('hidden');
    }

    // Attach navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            handleNavigation(sectionId);
        });
    });

    // Fetch and Render Recent Orders
    async function fetchRecentOrders() {
        try {
            // In a real app, this would be an API call
            const mockOrders = [
                { id: 'ORD-001', date: '2023-05-01', total: 129.99, status: 'Shipped' },
                { id: 'ORD-002', date: '2023-04-25', total: 79.50, status: 'Processing' }
            ];

            const ordersContainer = document.getElementById('orders-list');
            ordersContainer.innerHTML = mockOrders.map(order => `
                <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div class="flex justify-between items-center">
                        <span class="font-semibold">${order.id}</span>
                        <span class="text-sm text-gray-500">${order.date}</span>
                    </div>
                    <div class="mt-2 flex justify-between items-center">
                        <span>Total: $${order.total}</span>
                        <span class="px-2 py-1 rounded ${
                            order.status === 'Shipped' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }">${order.status}</span>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    }

    // Account Activity Tracking
    function trackAccountActivity() {
        const activities = [
            { type: 'Login', timestamp: new Date().toLocaleString() },
            { type: 'Profile Update', timestamp: '2023-04-20 10:30' }
        ];

        const activityContainer = document.getElementById('activity-log');
        activityContainer.innerHTML = activities.map(activity => `
            <div class="bg-gray-50 p-3 rounded-lg mb-2">
                <div class="flex justify-between">
                    <span class="font-medium">${activity.type}</span>
                    <span class="text-sm text-gray-500">${activity.timestamp}</span>
                </div>
            </div>
        `).join('');
    }

    // Product Recommendations
    function generateRecommendations() {
        const recommendations = [
            { id: 1, name: 'Smart Watch Pro', price: 199.99, image: 'watch.jpg' },
            { id: 2, name: 'Noise-Cancelling Headphones', price: 249.99, image: 'headphones.jpg' }
        ];

        const recommendationsContainer = document.getElementById('recommendations-grid');
        recommendationsContainer.innerHTML = recommendations.map(product => `
            <div class="bg-white rounded-lg shadow-md p-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-t-lg">
                <div class="mt-4">
                    <h3 class="font-semibold">${product.name}</h3>
                    <div class="flex justify-between items-center mt-2">
                        <span class="text-blue-600 font-bold">$${product.price}</span>
                        <button onclick="addToCart(${product.id})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Initial Load
    function initializeDashboard() {
        fetchRecentOrders();
        trackAccountActivity();
        generateRecommendations();
        
        // Default to overview section
        handleNavigation('overview');
    }

    // Cart Interaction
    window.addToCart = function(productId) {
        alert(`Product ${productId} added to cart!`);
        // In a real app, this would update cart state
    }

    // Initialize Dashboard
    initializeDashboard();
});
