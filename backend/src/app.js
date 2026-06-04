const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (no MongoDB required)
const subscriptions = [];

// Create installment subscription
app.post('/api/subscriptions/create-installment', (req, res) => {
  console.log('📝 Creating subscription:', req.body);
  
  const subscription = {
    id: Date.now(),
    ...req.body,
    status: 'active',
    paymentsMade: 1,
    createdAt: new Date(),
  };
  
  subscriptions.push(subscription);
  
  res.json({
    status: 'success',
    data: {
      subscriptionId: subscription.id,
      message: 'Installment plan activated successfully'
    }
  });
});

// Get subscription status
app.get('/api/subscriptions/status', (req, res) => {
  const { email } = req.query;
  const userSubscriptions = subscriptions.filter(s => s.customerEmail === email);
  res.json({ status: 'success', data: { subscriptions: userSubscriptions } });
});

// Get payment history
app.get('/api/subscriptions/history', (req, res) => {
  const { email } = req.query;
  const history = subscriptions.filter(s => s.customerEmail === email);
  res.json({ status: 'success', data: { history } });
});

// Cancel subscription
app.post('/api/subscriptions/cancel', (req, res) => {
  const { subscriptionId, customerEmail } = req.body;
  const subscription = subscriptions.find(s => s.id == subscriptionId);
  
  if (subscription && subscription.customerEmail === customerEmail) {
    subscription.status = 'cancelled';
    res.json({ status: 'success', message: 'Subscription cancelled' });
  } else {
    res.status(404).json({ status: 'error', message: 'Subscription not found' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    subscriptions: subscriptions.length
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ status: 'error', message: err.message });
});

module.exports = app;
