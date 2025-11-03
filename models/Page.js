// models/Page.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

const SectionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'hero', 'pricing', 'portfolio', etc.
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  images: [ImageSchema],
  order: { type: Number, default: 0 }
});

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  sections: [SectionSchema],
  metadata: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' }
  },
  isActive: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);