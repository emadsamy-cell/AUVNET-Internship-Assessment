const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

wishlistSchema.index({ petyId: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
