// scripts/fix-homepage.js
const mongoose = require('mongoose');

async function fixHomepage() {
  try {
    // Connect to your database
    await mongoose.connect('mongodb://localhost:27017/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Get the Page model
    const Page = mongoose.model('Page', new mongoose.Schema({
      title: String,
      slug: String,
      isHomepage: Boolean,
      metaTitle: String,
      metaDescription: String,
      components: Array,
      published: Boolean
    }, { timestamps: true }));

    // List all pages
    const pages = await Page.find({});
    console.log('📄 All pages:');
    pages.forEach(page => {
      console.log(`- ${page.title} (slug: ${page.slug}, homepage: ${page.isHomepage})`);
    });

    // Ask which page to set as homepage
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Enter the ID of the page to set as homepage: ', async (pageId) => {
      const page = await Page.findById(pageId);
      if (!page) {
        console.log('❌ Page not found');
        process.exit(1);
      }

      // Clear existing homepage
      await Page.updateMany({ isHomepage: true }, { $set: { isHomepage: false } });
      
      // Set new homepage
      page.isHomepage = true;
      page.slug = '';
      await page.save();
      
      console.log(`✅ Set "${page.title}" as homepage`);
      
      // Verify
      const homepage = await Page.findOne({ isHomepage: true });
      console.log(`🏠 Current homepage: ${homepage ? homepage.title : 'None'}`);
      
      readline.close();
      mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixHomepage();