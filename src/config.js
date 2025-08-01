const API_BASE_URL = '/api';

const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  USERS: {
    BASE: `${API_BASE_URL}/users`,
    BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
  },
  ORDERS: {
    SUBMIT: `${API_BASE_URL}/orders`,
  },
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
};
