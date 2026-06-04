const Subscription = require('../models/Subscription'); // ADD THIS LINE
const cron = require('node-cron');
const subscriptionService = require('../services/subscriptionService');
const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send email notification
async function sendPaymentNotification(email, subject, html) {
  try {
    await transporter.sendMail({
      from: `"R-Pro Business Consult" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

// Run every day at 9 AM to process due payments
cron.schedule('0 9 * * *', async () => {
  console.log('Running scheduled payment processing...');
  
  try {
    const subscriptions = await subscriptionService.getUpcomingPayments();
    
    for (const subscription of subscriptions) {
      console.log(`Processing payment for ${subscription.subscriptionId}`);
      
      const result = await subscriptionService.processRecurringPayment(subscription);
      
      if (result.success) {
        // Send success email
        await sendPaymentNotification(
          subscription.userId.email,
          'Payment Successful - R-Pro Subscription',
          `
            <h2>Payment Successful! 🎉</h2>
            <p>Dear ${subscription.userId.name},</p>
            <p>Your payment of ₦${subscription.amount.toLocaleString()} for the ${subscription.planName} plan has been processed successfully.</p>
            <p>Your next payment is scheduled for ${subscription.nextPaymentDate.toLocaleDateString()}.</p>
            <br/>
            <p>Thank you for choosing R-Pro Business Consult!</p>
          `
        );
      } else {
        // Send failure notification
        await sendPaymentNotification(
          subscription.userId.email,
          'Payment Failed - R-Pro Subscription',
          `
            <h2>Payment Failed ⚠️</h2>
            <p>Dear ${subscription.userId.name},</p>
            <p>Your payment of ₦${subscription.amount.toLocaleString()} for the ${subscription.planName} plan could not be processed.</p>
            <p>Please update your payment method to continue enjoying our services.</p>
            <br/>
            <a href="${process.env.FRONTEND_URL}/dashboard/subscription" style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Update Payment Method</a>
          `
        );
      }
    }
    
    console.log(`Processed ${subscriptions.length} payments`);
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

// Run every day at 8 AM to send reminders for upcoming payments (3 days before)
cron.schedule('0 8 * * *', async () => {
  console.log('Running payment reminder notifications...');
  
  try {
    const upcomingDate = new Date();
    upcomingDate.setDate(upcomingDate.getDate() + 3);
    
    const subscriptions = await Subscription.find({
      status: 'active',
      nextPaymentDate: { $lte: upcomingDate, $gte: new Date() },
    }).populate('userId');
    
    for (const subscription of subscriptions) {
      const daysUntil = Math.ceil((subscription.nextPaymentDate - new Date()) / (1000 * 60 * 60 * 24));
      
      await sendPaymentNotification(
        subscription.userId.email,
        'Payment Reminder - R-Pro Subscription',
        `
          <h2>Payment Reminder 📅</h2>
          <p>Dear ${subscription.userId.name},</p>
          <p>This is a reminder that your payment of ₦${subscription.amount.toLocaleString()} for the ${subscription.planName} plan is due in ${daysUntil} days (${subscription.nextPaymentDate.toLocaleDateString()}).</p>
          <p>Your card will be automatically charged. Please ensure you have sufficient funds.</p>
          <br/>
          <p>Thank you for being a valued customer!</p>
        `
      );
    }
    
    console.log(`Sent ${subscriptions.length} payment reminders`);
  } catch (error) {
    console.error('Reminder cron job error:', error);
  }
});

console.log('Cron jobs scheduled successfully');