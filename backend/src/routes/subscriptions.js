const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/create', subscriptionController.createSubscription);
router.post('/cancel', subscriptionController.cancelSubscription);
router.get('/status', subscriptionController.getSubscriptionStatus);
router.get('/history', subscriptionController.getPaymentHistory);

module.exports = router;