import axios from 'axios';

// Base URL for the API
// In production (Vercel), this will be relative.
// We use a relative path so it works on the same domain.
const API_URL = '/api/users';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API Service Object
const userService = {
    // Get all users
    getAll: async () => {
        try {
            const response = await api.get('');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get single user by ID
    getById: async (id) => {
        try {
            // Changed to query param for compatibility with single-function API
            const response = await api.get(`?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create new user
    create: async (userData) => {
        try {
            const response = await api.post('', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update existing user
    update: async (id, userData) => {
        try {
            // Changed to query param
            const response = await api.put(`?id=${id}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete user
    delete: async (id) => {
        try {
            // Changed to query param
            const response = await api.delete(`?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;
