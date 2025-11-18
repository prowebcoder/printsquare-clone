// scripts/seed.js
const mongoose = require('mongoose');

// Use your connection string directly
const MONGODB_URI = 'mongodb+srv://dhiman639:roAvGjcDJ4LeVFYo@cluster0.0ykzr5f.mongodb.net/printseoul';

async function seed() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Define the schema
    const formConfigSchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      type: { type: String, enum: ['predefined', 'custom'], default: 'custom' },
      description: String,
      config: { type: mongoose.Schema.Types.Mixed, default: {} },
      status: { type: String, enum: ['draft', 'published'], default: 'draft' },
      submissions: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const FormConfiguration = mongoose.model('FormConfiguration', formConfigSchema);

    // Clear existing
    await FormConfiguration.deleteMany({ 
      name: { $in: ['print-quote', 'saddle-quote'] } 
    });
    console.log('🧹 Cleared existing configurations');

    // Print Quote Config
    const printConfig = {
      general: {
        title: "Book Printing Quote",
        description: "Configure your perfect book with our professional printing services. Get instant pricing and add to cart in minutes.",
        submitButtonText: "Add to Cart",
        shippingButtonText: "Calculate Shipping"
      },
      bindingTypes: [
        { value: 'PERFECT', label: 'Perfect Binding' },
        { value: 'SADDLE', label: 'Saddle Stitching' },
        { value: 'HARDCOVER', label: 'Hardcover Book' },
        { value: 'WIRE', label: 'Wire Binding' },
      ],
      sizes: ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', '8.5 x 5.5', '10 x 7.5', '11 x 8.5', 'Custom Size'],
      paperOptions: {
        cover: [
          { value: 'MATTE', label: 'Matte', price: 0 },
          { value: 'GLOSS', label: 'Gloss', price: 0 },
          { value: 'HI-PLUS', label: 'Hi-Plus', price: 50 },
        ],
        inside: [
          { value: 'GLOSS', label: 'Gloss', price: 0 },
          { value: 'MATTE', label: 'Matte', price: 0 },
          { value: 'UNCOATED', label: 'Uncoated', price: 0 },
        ]
      },
      printColors: [
        { value: 'CMYK', label: 'Full color', price: 0 },
        { value: 'BW', label: 'Black only', price: -50 },
      ],
      quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
      pricing: {
        baseSetupCost: 200,
        costPerPage: 0.05,
        customSizeMultiplier: 1.2,
        standardSizeMultiplier: 1.1
      }
    };

    // Saddle Quote Config
    const saddleConfig = {
      general: {
        title: "Saddle Stitching Quote",
        description: "Configure your perfect booklet with our professional saddle stitching services. Get instant pricing and add to cart in minutes.",
        submitButtonText: "Add to Cart",
        shippingButtonText: "Calculate Shipping"
      },
      sizes: ['5.5 x 8.5', '8.5 x 11', '11 x 17', '8.5 x 5.5', 'Custom Size'],
      paperOptions: {
        cover: [
          { value: 'MATTE', label: 'Matte', price: 0 },
          { value: 'GLOSS', label: 'Gloss', price: 0 },
          { value: 'HI-PLUS', label: 'Hi-Plus', price: 25 },
        ],
        inside: [
          { value: 'GLOSS', label: 'Gloss', price: 0 },
          { value: 'MATTE', label: 'Matte', price: 0 },
          { value: 'UNCOATED', label: 'Uncoated', price: 0 },
        ]
      },
      printColors: [
        { value: 'CMYK', label: 'Full color', price: 0 },
        { value: 'BW', label: 'Black only', price: -50 },
      ],
      quantities: [100, 250, 500, 1000, 2500, 5000],
      customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 17\" × 22\"",
      pricing: {
        baseSetupCost: 100,
        costPerPage: 0.03,
        customSizeMultiplier: 1.1,
        standardSizeMultiplier: 1.0
      }
    };

    // Create documents
    await FormConfiguration.create([
      {
        name: 'print-quote',
        type: 'predefined',
        description: 'Book printing quote calculator with pricing options',
        config: printConfig,
        status: 'published',
        submissions: 0
      },
      {
        name: 'saddle-quote',
        type: 'predefined',
        description: 'Saddle stitching quote calculator with pricing options',
        config: saddleConfig,
        status: 'published',
        submissions: 0
      }
    ]);

    console.log('✅ Form configurations created successfully');

    // Verify
    const count = await FormConfiguration.countDocuments();
    console.log(`📊 Total configurations in database: ${count}`);

    await mongoose.connection.close();
    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seed();
}

module.exports = { seed };