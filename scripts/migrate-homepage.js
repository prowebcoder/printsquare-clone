// scripts/migrate-homepage.js
const mongoose = require('mongoose');
require('dotenv').config();

async function migrateHomepage() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const Page = mongoose.model('Page', new mongoose.Schema({
      title: String,
      slug: String,
      isHomepage: { type: Boolean, default: false },
      metaTitle: String,
      metaDescription: String,
      components: Array,
      published: Boolean
    }));

    // Check if any page has slug 'home'
    const homePage = await Page.findOne({ slug: 'home' });
    
    if (homePage) {
      console.log('🏠 Found page with slug "home":', homePage.title);
      
      // Update all pages to remove isHomepage flag
      await Page.updateMany({}, { $set: { isHomepage: false } });
      
      // Set this page as homepage
      homePage.isHomepage = true;
      homePage.slug = '';
      await homePage.save();
      
      console.log('✅ Set page as homepage:', homePage.title);
    } else {
      console.log('❌ No page with slug "home" found');
      
      // Check if we have a homepage set
      const existingHomepage = await Page.findOne({ isHomepage: true });
      if (!existingHomepage) {
        console.log('⚠️ No homepage set. You need to set one from the admin dashboard.');
      }
    }

    console.log('✅ Migration completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrateHomepage();