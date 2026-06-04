const subscriptionService = require('../services/subscriptionService');

exports.createSubscription = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      planId,
      planName,
      totalAmount,
      numberOfInstallments,
      amountPerInstallment,
      paymentDay,
      startDate,
      cardToken,
      firstPaymentTransactionId,
    } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !planId || !cardToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields',
      });
    }

    // Block transfer payments — card token required for auto-debit
    if (!cardToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Card payment required for installment plans. Bank transfer is not supported.',
      });
    }

    const result = await subscriptionService.createSubscription({
      customerName,
      customerEmail,
      customerPhone,
      planId,
      planName,
      totalAmount,
      numberOfInstallments,
      amountPerInstallment,
      paymentDay,
      startDate,
      cardToken,
      firstPaymentTransactionId,
    });

    res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId, customerEmail } = req.body;

    const result = await subscriptionService.cancelSubscription(subscriptionId, customerEmail);

    res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required',
      });
    }

    const result = await subscriptionService.getSubscriptionStatus(email);

    res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Get subscription status error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required',
      });
    }

    const result = await subscriptionService.getPaymentHistory(email);

    res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};