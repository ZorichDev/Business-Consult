const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  flutterwaveToken: { type: String, sparse: true },
  createdAt: { type: Date, default: Date.now },
});

// Only keep one index definition
userSchema.index({ email: 1 });
userSchema.index({ flutterwaveToken: 1 });

module.exports = mongoose.model('User', userSchema);