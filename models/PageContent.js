// models/PageContent.js
import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  sectionId: { type: String, required: true },
  content: { 
    type: mongoose.Schema.Types.Mixed, 
    default: {},
    get: function(data) {
      // When getting the data, ensure it's a plain object
      try {
        return JSON.parse(JSON.stringify(data || {}));
      } catch {
        return {};
      }
    },
    set: function(data) {
      // When setting, ensure it's a plain object
      try {
        return JSON.parse(JSON.stringify(data || {}));
      } catch {
        return {};
      }
    }
  },
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
  timestamps: true,
  
  // CRITICAL: Add these options
  toJSON: { 
    getters: true,
    virtuals: false, // Disable virtuals in JSON
    transform: function(doc, ret) {
      // Remove Mongoose internal properties
      delete ret._id;
      delete ret.__v;
      delete ret.$__;
      delete ret.$isNew;
      delete ret.$errors;
      return ret;
    }
  },
  toObject: {
    getters: true,
    virtuals: false,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.$__;
      delete ret.$isNew;
      delete ret.$errors;
      return ret;
    }
  }
});

// Create compound index
PageContentSchema.index({ page: 1, sectionId: 1 }, { unique: true });

// Add a static method to get plain objects
PageContentSchema.statics.findPlain = async function(query) {
  const result = await this.findOne(query).lean({ virtuals: false });
  return result;
};

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);