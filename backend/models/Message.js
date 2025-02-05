const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Mesaj gönderildiğinde order'ı güncelle
messageSchema.post('save', async function() {
  await this.model('Order').findByIdAndUpdate(
    this.order,
    { $addToSet: { messages: this._id } }
  );
});

module.exports = mongoose.model('Message', messageSchema); 