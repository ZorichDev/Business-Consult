const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.log('⚠️ MongoDB not available - running without database');
    return false;
  }
};

module.exports = connectDB;