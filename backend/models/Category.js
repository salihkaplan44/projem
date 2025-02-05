const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  }
}, {
  timestamps: true
});

// Slug oluşturma middleware'i
categorySchema.pre('save', function(next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      locale: 'tr'
    });
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema); 