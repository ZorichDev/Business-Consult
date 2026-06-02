const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: String, required: true },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, default: 'monthly' },
  status: { type: String, default: 'active' },
  startDate: { type: Date, required: true },
  nextPaymentDate: { type: Date, required: true },
  cardToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Indexes
subscriptionSchema.index({ subscriptionId: 1 }, { unique: true });
subscriptionSchema.index({ userId: 1 });
subscriptionSchema.index({ status: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);
