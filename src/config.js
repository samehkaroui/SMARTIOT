// Determine the base URL based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const API_BASE_URL = isProduction 
  ? 'https://smartiotserver.onrender.com/api' // Replace with your actual Render backend URL
  : '/api';

const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  CONTACT: `${API_BASE_URL}/contact`,
  USERS: {
    BASE: `${API_BASE_URL}/users`,
    BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
  },
  ORDERS: {
    SUBMIT: `${API_BASE_URL}/orders`,
  },
};

const config = {
  API_BASE_URL,
  API_ENDPOINTS,
  // Add other config values here
};

// Log the config in development for debugging
if (!isProduction) {
  console.log('API Configuration:', config);
}

export default config;
