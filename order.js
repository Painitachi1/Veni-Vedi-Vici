document.addEventListener('DOMContentLoaded', function() {
    // Order Tracking Elements
    const orderList = document.getElementById('order-list');
    const orderDetailsModal = document.getElementById('order-details-modal');
    const orderDetailsContent = document.getElementById('order-details-content');
    const filterSelect = document.getElementById('order-filter');
    const searchInput = document.getElementById('order-search');

    // Sample Order Data (in real app, this would come from backend)
    const orderData = [
        {
            id: 'ORD-001',
            date: '2023-04-15',
            total: 349.99,
            status: 'Delivered',
            items: [
                { name: 'Wireless Headphones', price: 249.99, quantity: 1 },
                { name: 'Phone Case', price: 100.00, quantity: 1 }
            ],
            trackingNumber: 'TRK-12345-XYZ',
            shippingAddress: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001'
            }
        },
        {
            id: 'ORD-002',
            date: '2023-05-01',
            total: 599.99,
            status: 'Processing',
            items: [
                { name: 'Luxury Leather Bag', price: 599.99, quantity: 1 }
            ],
            trackingNumber: null,
            shippingAddress: {
                name: 'Jane Smith',
                street: '456 Elm St',
                city: 'San Francisco',
                state: 'CA',
                zip: '94110'
            }
        }
    ];

    // Render Order List
    function renderOrders(orders) {
        orderList.innerHTML = orders.map(order => `
            <div class="order-card bg-white rounded-lg shadow-md p-4 mb-4">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <span class="font-semibold">Order #${order.id}</span>
                        <span class="ml-4 text-sm text-gray-500">${order.date}</span>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                           order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                           'bg-blue-100 text-blue-800'}">
                        ${order.status}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <div>
                        ${order.items.map(item => `
                            <div class="text-sm text-gray-600">
                                ${item.name} x ${item.quantity} - $${item.price.toFixed(2)}
                            </div>
                        `).join('')}
                    </div>
                    <div class="text-xl font-bold text-blue-600">
                        $${order.total.toFixed(2)}
                    </div>
                </div>
                <div class="mt-4">
                    <button onclick="showOrderDetails('${order.id}')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Show Order Details Modal
    window.showOrderDetails = function(orderId) {
        const order = orderData.find(o => o.id === orderId);
        if (order) {
            orderDetailsContent.innerHTML = `
                <div class="bg-white rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4">Order Details: ${order.id}</h2>
                    
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <h3 class="font-medium mb-2">Order Items</h3>
                            ${order.items.map(item => `
                                <div class="flex justify-between text-sm mb-1">
                                    <span>${item.name} x ${item.quantity}</span>
                                    <span>$${item.price.toFixed(2)}</span>
                                </div>
                            `).join('')}
                            <div class="border-t mt-2 pt-2 flex justify-between font-semibold">
                                <span>Total</span>
                                <span>$${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-medium mb-2">Shipping Information</h3>
                            <p class="text-sm">
                                ${order.shippingAddress.name}<br>
                                ${order.shippingAddress.street}<br>
                                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}
                            </p>
                            ${order.trackingNumber ? `
                                <div class="mt-2">
                                    <span class="font-medium">Tracking Number:</span>
                                    <span class="text-blue-600">${order.trackingNumber}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <button onclick="closeOrderDetailsModal()" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            `;
            orderDetailsModal.classList.remove('hidden');
        }
    }

    // Close Order Details Modal
    window.closeOrderDetailsModal = function() {
        orderDetailsModal.classList.add('hidden');
    }

    // Filter and Search Orders
    function filterOrders() {
        const filterStatus = filterSelect.value;
        const searchTerm = searchInput.value.toLowerCase();

        const filteredOrders = orderData.filter(order => 
            (filterStatus === 'all' || order.status === filterStatus) &&
            (searchTerm === '' || 
             order.id.toLowerCase().includes(searchTerm) || 
             order.items.some(item => item.name.toLowerCase().includes(searchTerm)))
        );

        renderOrders(filteredOrders);
    }

    // Event Listeners
    filterSelect.addEventListener('change', filterOrders);
    searchInput.addEventListener('input', filterOrders);

    // Initial Load
    renderOrders(orderData);
});
