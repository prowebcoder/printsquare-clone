// models/Page.js
import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Page title is required'],
    trim: true,
    minlength: [1, 'Page title cannot be empty']
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    default: '',
    // Make slug not required for homepage
    validate: {
      validator: function(v) {
        // If it's homepage, slug should be empty
        if (this.isHomepage) {
          return v === '';
        }
        // If not homepage, slug should not be empty
        return v && v.length > 0;
      },
      message: props => props.isHomepage 
        ? 'Homepage must have empty slug' 
        : 'Slug is required for non-homepage pages'
    }
  },
  isHomepage: {
    type: Boolean,
    default: false,
    index: true
  },
  metaTitle: {
    type: String,
    trim: true,
    default: '',
    maxlength: [70, 'Meta title cannot exceed 70 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    default: '',
    maxlength: [200, 'Meta description cannot exceed 200 characters']
  },
  components: {
    type: Array,
    default: []
  },
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
PageSchema.index({ slug: 1 }, { unique: true, sparse: true });
PageSchema.index({ isHomepage: 1 });
PageSchema.index({ published: 1 });

// Virtual for display slug
PageSchema.virtual('displaySlug').get(function() {
  if (this.isHomepage || this.slug === '') {
    return 'home';
  }
  return this.slug;
});

// Pre-save middleware to ensure only one homepage
PageSchema.pre('save', async function(next) {
  // If this page is being set as homepage
  if (this.isHomepage && this.isModified('isHomepage')) {
    try {
      // Clear any existing homepage
      await mongoose.model('Page').updateMany(
        { _id: { $ne: this._id }, isHomepage: true },
        { $set: { isHomepage: false } }
      );
      // Set slug to empty for homepage
      this.slug = '';
    } catch (error) {
      return next(error);
    }
  }
  
  // If not homepage and slug is empty, generate from title
  if (!this.isHomepage && (!this.slug || this.slug.trim() === '')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
  }
  
  next();
});

// Prevent duplicate homepage on update
PageSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  if (update.$set && update.$set.isHomepage === true) {
    try {
      const pageId = this.getQuery()._id;
      // Clear any existing homepage
      await mongoose.model('Page').updateMany(
        { _id: { $ne: pageId }, isHomepage: true },
        { $set: { isHomepage: false } }
      );
      
      // Set slug to empty for the new homepage
      update.$set.slug = '';
    } catch (error) {
      return next(error);
    }
  }
  
  next();
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);