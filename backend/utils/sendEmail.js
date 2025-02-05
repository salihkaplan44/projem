const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Transporter oluştur
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Mail seçenekleri
  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  // Mail gönder
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail; 