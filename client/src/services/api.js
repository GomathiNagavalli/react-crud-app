import axios from 'axios';

// Base URL for the API
// Detect environment: Use localhost:5000 (json-server) in development,
// and relative path /api/users (Vercel Serverless) in production.
const PROD_API = '/api/users';
const DEV_API = 'http://localhost:5000/users';

const API_URL = process.env.NODE_ENV === 'development' ? DEV_API : PROD_API;

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
            const response = await api.get(`/${id}`);
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
            const response = await api.put(`/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete user
    delete: async (id) => {
        try {
            const response = await api.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;
