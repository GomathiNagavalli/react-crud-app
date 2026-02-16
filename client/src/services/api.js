import axios from 'axios';

// Base URL for the JSON-server
const API_URL = 'http://localhost:5000/users';

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
            const response = await api.get('/');
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
            const response = await api.post('/', userData);
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
