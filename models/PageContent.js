import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  page: { type: String, required: true }, // 'home', 'about', 'contact', etc.
  sectionId: { type: String, required: true }, // 'hero', 'pricing', etc.
  content: { type: Object, default: {} }, // Flexible content structure
  images: [{
    key: String,
    url: String,
    alt: String
  }]
}, { timestamps: true });

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);