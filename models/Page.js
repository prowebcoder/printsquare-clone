// models/Page.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  section: String,
  uploadDate: { 
    type: Date, 
    default: Date.now 
  }
});

const SectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  images: [ImageSchema]
});

const PageSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  sections: [SectionSchema],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Check if the model already exists to prevent overwriting
export default mongoose.models.Page || mongoose.model('Page', PageSchema);