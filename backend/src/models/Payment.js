const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  paymentDate: { type: Date, default: Date.now },
});

// Indexes
paymentSchema.index({ transactionId: 1 }, { unique: true });
paymentSchema.index({ subscriptionId: 1 });
paymentSchema.index({ userId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);