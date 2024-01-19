const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'your_email_service_provider', // e.g., 'gmail'
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
  });

  const mailOptions = {
    from: 'your_email@example.com',
    to,
    subject,
    text,
    attachments: [
      {
        filename: 'attachment.txt',
        content: attachment,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
