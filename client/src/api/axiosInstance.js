import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy handles the rest in Vite
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // For httpOnly cookies
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Global error handling logic (e.g. redirect on 401)
        if (error.response && error.response.status === 401) {
            // Check if not already on login page to avoid loops
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
