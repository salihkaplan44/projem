const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'Edadan Aksesuar'
  },
  siteDescription: {
    type: String,
    default: 'Şık ve Zarif Tasarımlar'
  },
  logo: {
    type: String
  },
  contact: {
    address: String,
    phone: String,
    email: String,
    whatsapp: String,
    instagram: String
  },
  pages: {
    aboutUs: String,
    privacyPolicy: String,
    termsOfService: String
  }
}, {
  timestamps: true
});

// Sadece bir ayar kaydı olmasını sağla
settingsSchema.pre('save', async function(next) {
  const count = await this.constructor.countDocuments();
  if (count > 0 && !this.isModified()) {
    const error = new Error('Sadece bir ayar kaydı olabilir');
    next(error);
  }
  next();
});

module.exports = mongoose.model('Settings', settingsSchema); 