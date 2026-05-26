import axios from 'axios';
import { appParams } from '@/lib/app-params';

// Create axios instance for base44 API communication
export const base44 = axios.create({
  baseURL: appParams.apiBaseURL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Id': appParams.appId,
  },
});

// Add auth token to requests if available
base44.interceptors.request.use((config) => {
  if (appParams.token) {
    config.headers.Authorization = `Bearer ${appParams.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
base44.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default base44;
