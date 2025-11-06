import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true,
    unique: true,
  },
  pageName: {
    type: String,
    required: true,
  },
  sections: [{
    sectionId: String,
    sectionName: String,
    content: mongoose.Schema.Types.Mixed, // Flexible content structure
    images: [{
      key: String,
      url: String,
      alt: String,
    }],
    order: Number,
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Content || mongoose.model('Content', contentSchema);