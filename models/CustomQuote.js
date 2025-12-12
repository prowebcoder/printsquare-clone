// models/CustomQuote.js
import mongoose from 'mongoose';

const customQuoteSchema = new mongoose.Schema({
  quoteId: {
    type: String,
    required: true,
    unique: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  binding: {
    type: String,
    required: true,
    enum: ['PERFECT', 'SADDLE', 'HARDCOVER', 'WIRE']
  },
  dimensions: {
    width: String,
    height: String
  },
  pageCount: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  quoteAmount: {
    type: Number,
    default: null
  },
  adminNotes: String,
  estimatedCompletion: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

customQuoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.CustomQuote || mongoose.model('CustomQuote', customQuoteSchema);