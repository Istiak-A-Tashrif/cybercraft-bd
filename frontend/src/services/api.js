// services/api.js - Core API service with axios

import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      deleteCookie('token');
      // Redirect to login if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      setCookie('token', response.data.token);
    }
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      setCookie('token', response.data.token);
    }
    return response.data;
  },
  
  googleAuth: async (tokenId) => {
    const response = await api.post('/auth/google', { tokenId });
    if (response.data.token) {
      setCookie('token', response.data.token);
    }
    return response.data;
  },
  
  facebookAuth: async (accessToken, userID) => {
    const response = await api.post('/auth/facebook', { accessToken, userID });
    if (response.data.token) {
      setCookie('token', response.data.token);
    }
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: async () => {
    const response = await api.get('/auth/logout');
    deleteCookie('token');
    return response.data;
  }
};

// Contact services
export const contactService = {
  // Public endpoint
  submitContactForm: async (contactData) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },
  
  // Admin endpoints
  getAllContacts: async (page = 1, limit = 10, sort = '-createdAt', status = null) => {
    const params = { page, limit, sort };
    if (status) params.status = status;
    
    const response = await api.get('/contacts', { params });
    return response.data;
  },
  
  getContact: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },
  
  updateContact: async (id, updateData) => {
    const response = await api.put(`/contacts/${id}`, updateData);
    return response.data;
  },
  
  deleteContact: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
  
  deleteMultipleContacts: async (ids) => {
    const response = await api.delete('/contacts', { data: { ids } });
    return response.data;
  },
  
  downloadPDF: async (id) => {
    const response = await api.get(`/contacts/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  },
  
  downloadMultiplePDF: async (ids) => {
    const response = await api.post('/contacts/pdf', { ids }, {
      responseType: 'blob'
    });
    return response.data;
  },
  
  downloadAllExcel: async () => {
    const response = await api.get('/contacts/excel', {
      responseType: 'blob'
    });
    return response.data;
  },
  
  downloadSelectedExcel: async (ids) => {
    const idString = ids.join(',');
    const response = await api.get(`/contacts/excel?ids=${idString}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};