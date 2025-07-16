document.addEventListener('DOMContentLoaded', function() {
    // Hub Pickup Tracking
    const trackingForm = document.getElementById('tracking-form');
    const trackingResult = document.getElementById('tracking-result');

    if (trackingForm && trackingResult) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = this.querySelector('input').value;

            // Simulated tracking data
            const trackingData = {
                'HUB-12345': { 
                    status: 'In Transit', 
                    location: 'New York Distribution Center', 
                    estimatedDelivery: '2023-05-10' 
                },
                'HUB-67890': { 
                    status: 'Ready for Pickup', 
                    location: 'San Francisco Hub', 
                    estimatedDelivery: '2023-05-05' 
                }
            };

            const result = trackingData[trackingNumber];
            if (result) {
                trackingResult.innerHTML = `
                    <div class="bg-blue-100 p-4 rounded">
                        <p><strong>Status:</strong> ${result.status}</p>
                        <p><strong>Current Location:</strong> ${result.location}</p>
                        <p><strong>Estimated Delivery:</strong> ${result.estimatedDelivery}</p>
                    </div>
                `;
            } else {
                trackingResult.innerHTML = `
                    <div class="bg-red-100 p-4 rounded">
                        No tracking information found for this number.
                    </div>
                `;
            }
        });
    }

    // Nearby Hub Locator
    const nearbyHubsBtn = document.getElementById('nearby-hubs');
    const hubsList = document.getElementById('hubs-list');

    if (nearbyHubsBtn && hubsList) {
        nearbyHubsBtn.addEventListener('click', function() {
            // Simulated nearby hubs
            const hubs = [
                { name: 'Downtown Hub', address: '123 Main St', distance: '0.5 miles' },
                { name: 'Westside Hub', address: '456 Elm St', distance: '2.3 miles' },
                { name: 'Eastside Hub', address: '789 Oak Ave', distance: '3.7 miles' }
            ];

            hubsList.innerHTML = hubs.map(hub => `
                <div class="bg-white p-4 rounded shadow mb-2">
                    <h3 class="font-bold">${hub.name}</h3>
                    <p>${hub.address}</p>
                    <p class="text-sm text-gray-600">Distance: ${hub.distance}</p>
                </div>
            `).join('');
        });
    }
});
