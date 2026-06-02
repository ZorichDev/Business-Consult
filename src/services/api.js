// src/services/api.js
const API_URL = 'http://localhost:3000/api';

export const subscriptionAPI = {
  // Create a new subscription
  createSubscription: async (subscriptionData) => {
    const response = await fetch(`${API_URL}/subscriptions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });
    return response.json();
  },

  // Get subscription status by email
  getSubscriptionStatus: async (email) => {
    const response = await fetch(`${API_URL}/subscriptions/status?email=${encodeURIComponent(email)}`);
    return response.json();
  },

  // Get payment history
  getPaymentHistory: async (email) => {
    const response = await fetch(`${API_URL}/subscriptions/history?email=${encodeURIComponent(email)}`);
    return response.json();
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId, customerEmail) => {
    const response = await fetch(`${API_URL}/subscriptions/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptionId, customerEmail }),
    });
    return response.json();
  },
};