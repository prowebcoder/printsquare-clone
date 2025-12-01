// models/Page.js
import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: false });

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  components: {
    type: [componentSchema],
    default: []
  },
  metaTitle: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add this line ONLY if you want to add the static method
// pageSchema.statics.findBySlug = async function(slug) {
//   return this.findOne({ slug, published: true }).lean();
// };

// Remove these lines - they cause issues:
// delete mongoose.connections[0].models.Page;
// delete mongoose.models.Page;

export default mongoose.models.Page || mongoose.model('Page', pageSchema);