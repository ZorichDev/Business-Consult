const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');
const flutterwave = require('./flutterwave');

class SubscriptionService {
  generateSubscriptionId() {
    return `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async createSubscription(data) {
    const { customerName, customerEmail, customerPhone, planId, planName, amount, cardToken } = data;
    
    let user = await User.findOne({ email: customerEmail });
    if (!user) {
      user = new User({ name: customerName, email: customerEmail, phone: customerPhone });
      await user.save();
    }
    
    user.flutterwaveToken = cardToken;
    await user.save();
    
    const subscription = new Subscription({
      subscriptionId: this.generateSubscriptionId(),
      userId: user._id,
      planId, 
      planName, 
      amount, 
      cardToken,
      startDate: new Date(),
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    
    await subscription.save();
    return { success: true, subscriptionId: subscription.subscriptionId, user };
  }

  async cancelSubscription(subscriptionId, email) {
    const subscription = await Subscription.findOne({ subscriptionId }).populate('userId');
    if (!subscription) throw new Error('Subscription not found');
    if (subscription.userId.email !== email) throw new Error('Unauthorized');
    
    subscription.status = 'cancelled';
    subscription.endDate = new Date();
    await subscription.save();
    return { success: true };
  }

  async getSubscriptionStatus(email) {
    const user = await User.findOne({ email });
    if (!user) return { subscriptions: [] };
    
    const subscriptions = await Subscription.find({ 
      userId: user._id,
      status: 'active'
    });
    
    return { subscriptions };
  }

  async getPaymentHistory(email) {
    const user = await User.findOne({ email });
    if (!user) return { history: [] };
    
    const history = await Payment.find({ userId: user._id })
      .populate('subscriptionId')
      .sort({ paymentDate: -1 });
    
    return { history };
  }
}

module.exports = new SubscriptionService();