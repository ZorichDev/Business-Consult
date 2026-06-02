const axios = require('axios');

class FlutterwaveService {
  constructor() {
    this.secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    this.baseURL = process.env.NODE_ENV === 'production' 
      ? 'https://api.flutterwave.com/v3'
      : 'https://api.flutterwave.com/v3';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async chargeCard(data) {
    try {
      const response = await this.client.post('/charges?type=card', data);
      return response.data;
    } catch (error) {
      console.error('Flutterwave charge error:', error.response?.data || error.message);
      throw error;
    }
  }

  async tokenizedCharge(data) {
    try {
      const response = await this.client.post('/tokenized-charges', data);
      return response.data;
    } catch (error) {
      console.error('Flutterwave tokenized charge error:', error.response?.data || error.message);
      throw error;
    }
  }

  async verifyTransaction(transactionId) {
    try {
      const response = await this.client.get(`/transactions/${transactionId}/verify`);
      return response.data;
    } catch (error) {
      console.error('Flutterwave verification error:', error.response?.data || error.message);
      throw error;
    }
  }

  async createSubscriptionPlan(data) {
    try {
      const response = await this.client.post('/payment-plans', data);
      return response.data;
    } catch (error) {
      console.error('Flutterwave create plan error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getSubscriptionPlan(planId) {
    try {
      const response = await this.client.get(`/payment-plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error('Flutterwave get plan error:', error.response?.data || error.message);
      throw error;
    }
  }

  async cancelSubscription(planId) {
    try {
      const response = await this.client.put(`/payment-plans/${planId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Flutterwave cancel plan error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getBanks(country = 'NG') {
    try {
      const response = await this.client.get(`/banks/${country}`);
      return response.data;
    } catch (error) {
      console.error('Flutterwave get banks error:', error.response?.data || error.message);
      throw error;
    }
  }

  async initiateTransfer(data) {
    try {
      const response = await this.client.post('/transfers', data);
      return response.data;
    } catch (error) {
      console.error('Flutterwave transfer error:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new FlutterwaveService();