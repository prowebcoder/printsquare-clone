const mongoose = require('mongoose');
require('dotenv').config();

const FormConfigurationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['predefined', 'custom'], default: 'custom' },
  description: String,
  config: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  submissions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const FormConfiguration = mongoose.models.FormConfiguration || 
  mongoose.model('FormConfiguration', FormConfigurationSchema);

// Default configuration
const DEFAULT_FORM_CONFIG = {
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
  // ... include all your default configuration here
};

async function seedFormConfig() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name');
    console.log('Connected to MongoDB');

    const result = await FormConfiguration.findOneAndUpdate(
      { name: 'print-quote' },
      {
        name: 'print-quote',
        type: 'predefined',
        description: 'Book printing quote calculator with pricing options',
        config: DEFAULT_FORM_CONFIG,
        status: 'published',
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    console.log('Form configuration seeded successfully:', result.name);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding form configuration:', error);
    process.exit(1);
  }
}

seedFormConfig();