const API_BASE_URL = 'http://localhost:5000';

class BackendService {
    static async request(endpoint, method = 'POST', data = null) {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: data ? JSON.stringify(data) : null
            };

            const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Something went wrong');
            }

            return responseData;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentication Methods
    static async signup(username, email, password) {
        return await this.request('/signup', 'POST', { username, email, password });
    }

    static async login(username, password) {
        const result = await this.request('/login', 'POST', { username, password });
        
        // Store user information in localStorage
        if (result.user_id) {
            localStorage.setItem('user_id', result.user_id);
            localStorage.setItem('username', result.username);
        }

        return result;
    }

    static logout() {
        // Clear local storage
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        
        // Redirect to login page
        window.location.href = 'Signup.html';
    }

    // Error Handling
    static handleApiError(error, errorElement) {
        console.error(error);
        if (errorElement) {
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
        }
    }
}

// Export for global use
window.BackendService = BackendService;
