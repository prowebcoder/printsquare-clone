const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

// Use ES6 imports style model definition
const PageContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  sectionId: { type: String, required: true },
  content: { type: Object, default: {} },
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
  timestamps: true 
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function seedPages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await PageContent.deleteMany({});
    console.log('Cleared existing page content');

    // About page seed data
    const aboutSections = [
      {
        page: 'about',
        sectionId: 'about-content',
        content: {
          title: 'About Print Seoul',
          image: '/about/About.jpg',
          quote: '“Precision in every print — from Seoul to the world.”',
          paragraphs: [
            'Print Seoul is a leading publication printer based in South Korea, specializing in premium-quality printing for books, magazines, catalogs, and corporate publications.',
            'With a perfect blend of traditional craftsmanship and modern printing technology, we bring creativity to life through precision and quality. Our Seoul-based facilities handle everything from design and prepress to high-resolution offset printing, binding, and finishing.',
            'Whether you need small-batch art books or large-scale commercial runs, Print Seoul ensures consistent quality, timely delivery, and eco-conscious production — using sustainable materials and environmentally friendly inks.',
            'Our mission is to make South Korean printing excellence accessible worldwide, providing creative professionals, publishers, and brands with a trusted partner for all publication needs.'
          ],
          buttonText: 'Get a Quote'
        }
      },
      {
        page: 'about',
        sectionId: 'hero',
        content: {
          title: 'About Us',
          subtitle: 'Precision. Passion. Printing Excellence from South Korea.'
        }
      }
    ];

    // Home page seed data
    const homeSections = [
      {
        page: 'home',
        sectionId: 'portfolio',
        content: {
          title: 'Our',
          highlightedTitle: 'Portfolio',
          subtitle: 'Showcase',
          buttonText: 'Learn More',
          buttonLink: '/portfolio'
        },
        images: [
          { key: 'portfolio-1', url: '/homepage/p1.jpg', alt: 'Portfolio image 1' },
          { key: 'portfolio-2', url: '/homepage/p2.jpg', alt: 'Portfolio image 2' },
          { key: 'portfolio-3', url: '/homepage/p3.jpg', alt: 'Portfolio image 3' },
          { key: 'portfolio-4', url: '/homepage/p4.jpg', alt: 'Portfolio image 4' },
          { key: 'portfolio-5', url: '/homepage/p5.jpg', alt: 'Portfolio image 5' },
          { key: 'portfolio-6', url: '/homepage/p6.jpg', alt: 'Portfolio image 6' },
          { key: 'portfolio-7', url: '/homepage/p7.jpg', alt: 'Portfolio image 7' },
          { key: 'portfolio-8', url: '/homepage/p8.jpg', alt: 'Portfolio image 8' },
          { key: 'portfolio-9', url: '/homepage/p9.jpg', alt: 'Portfolio image 9' },
          { key: 'portfolio-10', url: '/homepage/p10.jpg', alt: 'Portfolio image 10' },
        ]
      }
    ];

    const allSections = [...aboutSections, ...homeSections];

    for (const section of allSections) {
      await PageContent.findOneAndUpdate(
        { page: section.page, sectionId: section.sectionId },
        section,
        { upsert: true }
      );
      console.log(`Seeded ${section.page} - ${section.sectionId}`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

// Only run if called directly
if (require.main === module) {
  seedPages();
}

module.exports = { seedPages };