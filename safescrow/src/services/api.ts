import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
  
  logout: () => api.post('/auth/logout'),
  
  getProfile: () => api.get('/auth/profile'),
};

// Escrow API functions
export const escrowAPI = {
  getAll: () => api.get('/escrow'),
  
  getById: (id: string) => api.get(`/escrow/${id}`),
  
  create: (escrowData: {
    amount: number;
    recipientEmail: string;
    description: string;
    conditions: string;
  }) => api.post('/escrow', escrowData),
  
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