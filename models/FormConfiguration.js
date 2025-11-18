// models/FormConfiguration.js
import mongoose from 'mongoose';

const formConfigurationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true 
  },
  type: { 
    type: String, 
    enum: ['predefined', 'custom'], 
    default: 'custom' 
  },
  description: String,
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  submissions: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  // Disable auto-indexing to prevent conflicts
  autoIndex: false
});

// Create indexes manually
formConfigurationSchema.index({ name: 1 }, { unique: true });

// Update the updatedAt field before saving
formConfigurationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
formConfigurationSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Check if model exists to prevent OverwriteModelError
export default mongoose.models.FormConfiguration || 
  mongoose.model('FormConfiguration', formConfigurationSchema);