const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using Gmail's service
  auth: {
    user: process.env.SMTP_USER,    // Your Gmail address (e.g., your-email@gmail.com)
    pass: process.env.SMTP_PASS     // Google App Password
  }
});

exports.sendContactEmail = async (options) => {
  const message = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments || []
  };

  await transporter.sendMail(message);
};