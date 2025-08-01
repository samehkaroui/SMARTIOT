import config from '../config';
const { API_ENDPOINTS } = config;

const handleResponse = async (response) => {
  try {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in handleResponse:', error);
    throw error;
  }
};

export const apiService = {
  // Health check
  checkHealth: async () => {
    const response = await fetch(API_ENDPOINTS.HEALTH);
    return handleResponse(response);
  },

  // Users
  getUsers: async () => {
    const response = await fetch(API_ENDPOINTS.USERS.BASE);
    return handleResponse(response);
  },

  getUser: async (id) => {
    const response = await fetch(API_ENDPOINTS.USERS.BY_ID(id));
    return handleResponse(response);
  },

  createUser: async (userData) => {
    const response = await fetch(API_ENDPOINTS.USERS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Orders
  submitOrder: async (orderData) => {
    try {
      console.log('Submitting order:', orderData);
      const response = await fetch(API_ENDPOINTS.ORDERS.SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData),
      });
      const result = await handleResponse(response);
      console.log('Order submission successful:', result);
      return result;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    }
  },

  // Generic request method
  request: async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return handleResponse(response);
  },
};

export default apiService;
