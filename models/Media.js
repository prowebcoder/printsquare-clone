// printsquare-clone/models/Media.js
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  filename: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: 0
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Pre-save middleware
mediaSchema.pre('save', function(next) {
  console.log(`💾 Media pre-save: ${this.originalName}`);
  next();
});

// Post-save middleware
mediaSchema.post('save', function(doc) {
  console.log(`✅ Media post-save: ${doc._id} - ${doc.originalName}`);
});

// Post-save error handler
mediaSchema.post('save', function(error, doc, next) {
  if (error) {
    console.error('❌ Media save error:', error);
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Filename already exists'));
    } else {
      next(error);
    }
  } else {
    next();
  }
});

// Static method to check connection
mediaSchema.statics.checkConnection = async function() {
  try {
    const count = await this.estimatedDocumentCount();
    console.log(`📊 Media collection count: ${count}`);
    return true;
  } catch (error) {
    console.error('❌ Media connection check failed:', error);
    return false;
  }
};

export default mongoose.models.Media || mongoose.model('Media', mediaSchema);