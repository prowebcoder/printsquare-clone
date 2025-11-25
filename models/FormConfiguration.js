import mongoose from 'mongoose';

const formConfigSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['print-quote', 'saddle-quote', 'wire-quote', 'hard-quote']
  },
  type: { 
    type: String, 
    enum: ['predefined', 'custom'], 
    default: 'predefined' 
  },
  description: String,
  config: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  submissions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create compound index for better query performance
formConfigSchema.index({ name: 1, type: 1 });

export default mongoose.models.FormConfiguration || 
       mongoose.model('FormConfiguration', formConfigSchema);