const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');
const flutterwave = require('./flutterwave');

class SubscriptionService {
  generateSubscriptionId() {
    return `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async createSubscription(data) {
    const {
      customerName, customerEmail, customerPhone,
      planId, planName, totalAmount, numberOfInstallments,
      amountPerInstallment, paymentDay, startDate, cardToken,
      firstPaymentTransactionId,
    } = data;

    let user = await User.findOne({ email: customerEmail });
    if (!user) {
      user = new User({ name: customerName, email: customerEmail, phone: customerPhone });
    }
    user.flutterwaveToken = cardToken;
    await user.save();

    // Next payment = same paymentDay next month
    const next = new Date(startDate || Date.now());
    next.setMonth(next.getMonth() + 1);
    next.setDate(paymentDay || 1);

    const subscription = new Subscription({
      subscriptionId: this.generateSubscriptionId(),
      userId: user._id,
      planId, planName,
      amount: amountPerInstallment,
      totalAmount,
      numberOfInstallments,
      installmentsPaid: 1,
      amountPerInstallment,
      paymentDay,
      cardToken,
      startDate: new Date(startDate || Date.now()),
      nextPaymentDate: next,
    });

    await subscription.save();

    // Log first payment
    if (firstPaymentTransactionId) {
      await new Payment({
        transactionId: firstPaymentTransactionId,
        subscriptionId: subscription._id,
        userId: user._id,
        amount: amountPerInstallment,
        status: 'successful',
      }).save();
    }

    return { success: true, subscriptionId: subscription.subscriptionId };
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
      status: 'active',
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

  async getUpcomingPayments() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return Subscription.find({
      status: 'active',
      nextPaymentDate: { $gte: today, $lt: tomorrow },
      $expr: { $lt: ['$installmentsPaid', '$numberOfInstallments'] },
    }).populate('userId');
  }

  async processRecurringPayment(subscription) {
    try {
      const result = await flutterwave.tokenizedCharge({
        token: subscription.cardToken,
        email: subscription.userId.email,
        currency: 'NGN',
        amount: subscription.amountPerInstallment,
        tx_ref: `RPRO-AUTO-${Date.now()}`,
      });

      const success = result.status === 'success';

      await new Payment({
        transactionId: result.data?.id?.toString() || `FAIL-${Date.now()}`,
        subscriptionId: subscription._id,
        userId: subscription.userId._id,
        amount: subscription.amountPerInstallment,
        status: success ? 'successful' : 'failed',
      }).save();

      if (success) {
        subscription.installmentsPaid += 1;
        const next = new Date(subscription.nextPaymentDate);
        next.setMonth(next.getMonth() + 1);
        next.setDate(subscription.paymentDay);

        if (subscription.installmentsPaid >= subscription.numberOfInstallments) {
          subscription.status = 'completed';
        } else {
          subscription.nextPaymentDate = next;
        }
        await subscription.save();
      }

      return { success };
    } catch (err) {
      console.error('Recurring charge failed:', err);
      return { success: false };
    }
  }
}

module.exports = new SubscriptionService();