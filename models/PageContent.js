import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  sectionId: { type: String, required: true },
  content: { type: Object, default: {} },
  images: [{
    key: String,
    url: String,
    alt: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, { 
  timestamps: true 
});

// Create compound index
PageContentSchema.index({ page: 1, sectionId: 1 }, { unique: true });

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);