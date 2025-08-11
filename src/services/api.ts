import axios from 'axios';
import { CreateOrderForm } from 'types';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Global auth failure handler - will be set by AuthProvider
let globalAuthFailureHandler: (() => void) | null = null;
let globalTokenRefreshHandler: (() => Promise<boolean>) | null = null;

export const setAuthFailureHandler = (handler: () => void) => {
    globalAuthFailureHandler = handler;
};

export const setTokenRefreshHandler = (handler: () => Promise<boolean>) => {
    globalTokenRefreshHandler = handler;
};

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Try to refresh token if handler is available
            if (globalTokenRefreshHandler) {
                const refreshed = await globalTokenRefreshHandler();
                if (refreshed) {
                    // Retry the original request with new token
                    const token = localStorage.getItem('access_token');
                    if (token) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    }
                }
            }

            // If refresh failed or no handler, use failure handler
            if (globalAuthFailureHandler) {
                globalAuthFailureHandler();
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth API functions
export const authAPI = {
    login: (credentials: { email: string; password: string }) => {
        const formData = new URLSearchParams();
        formData.append("username", credentials.email);
        formData.append("password", credentials.password);

        return api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    },

    register: (userData: {
        email: string;
        nin: string;
        password: string;
        password2: string;
        full_name: string;
        phone_number: string;
    }) => api.post('/auth/register', userData),

    logout: () => api.post('/auth/logout'),

    getProfile: () => api.get('/auth/me'),

    // Token refresh endpoint
    refreshToken: () => {
        const refreshToken = localStorage.getItem('refresh_token');
        return api.post('/auth/refresh', { refresh_token: refreshToken });
    },
};

// Escrow API functions
export const escrowAPI = {
    getAll: () => api.get('/escrow'),

    getById: (id: string) => api.get(`/escrow/${id}`),

    create: (escrowData: CreateOrderForm) => {
        const formData = new FormData();
    
        // Append all the text fields
        formData.append("name", escrowData.name);
        formData.append("price", escrowData.price.toString());
        formData.append("description", escrowData.description);
        formData.append("delivery_date", escrowData.delivery_date); // format: YYYY-MM-DD
        formData.append("receiver_email", escrowData.receiver_email);
        formData.append("receiver_phone", escrowData.receiver_phone);
        formData.append("role", escrowData.role);
    
        if (escrowData.logistic_service) {
            formData.append("logistic_service", escrowData.logistic_service);
        }
    
        // Append multiple files
        escrowData.images.forEach((file: File) => {
            formData.append("images", file);
        });

    
        return api.post('/escrow/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    

    update: (id: string, updates: any) => api.put(`/escrow/${id}`, updates),

    release: (id: string) => api.post(`/escrow/${id}/release`),

    cancel: (id: string) => api.post(`/escrow/${id}/cancel`),
};

// User API functions
export const userAPI = {
    getEscrows: () => api.get('/user/escrows'),

    updateProfile: (profileData: any) => api.put('/user/profile', profileData),

    changePassword: (passwordData: { currentPassword: string; newPassword: string }) =>
        api.put('/user/password', passwordData),
};

export default api;