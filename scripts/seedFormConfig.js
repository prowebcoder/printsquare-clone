import mongoose from 'mongoose';
import FormConfiguration from '../models/FormConfiguration.js';
import dbConnect from '../lib/mongodb.js';

async function seedFormConfig() {
  try {
    await dbConnect();
    
    const perfectBindingConfig = {
      formId: 'perfect-binding',
      formTitle: 'Perfect Binding Quote',
      sections: [
        {
          sectionId: 'size-binding',
          sectionTitle: 'Size & Binding',
          fields: [
            {
              fieldId: 'size-unit',
              fieldType: 'radio',
              label: 'Size Unit',
              description: 'Select the unit for size measurements',
              required: true,
              defaultValue: 'INCH',
              options: [
                { value: 'INCH', label: 'Inch', price: 0 },
                { value: 'MM', label: 'Millimeter', price: 0 }
              ],
              pricing: { type: 'fixed', value: 0 }
            },
            {
              fieldId: 'paper-unit',
              fieldType: 'radio',
              label: 'Paper Unit',
              description: 'Select the unit for paper weight',
              required: true,
              defaultValue: 'US',
              options: [
                { value: 'GSM', label: 'Grammage, gsm', price: 0 },
                { value: 'US', label: 'US Weight, pound', price: 0 },
                { value: 'PT', label: 'Caliper, point', price: 0 }
              ],
              pricing: { type: 'fixed', value: 0 }
            },
            {
              fieldId: 'book-size',
              fieldType: 'select',
              label: 'Book Size',
              description: 'Select the size of your book',
              required: true,
              defaultValue: '8.5 x 11',
              options: [
                { value: '5.5 x 8.5', label: '5.5 x 8.5', price: 0 },
                { value: '7.5 x 10', label: '7.5 x 10', price: 50 },
                { value: '8.5 x 11', label: '8.5 x 11', price: 0 },
                { value: '9 x 12', label: '9 x 12', price: 75 }
              ],
              pricing: { type: 'fixed', value: 0 }
            }
          ]
        },
        {
          sectionId: 'cover-options',
          sectionTitle: 'Cover Options',
          fields: [
            {
              fieldId: 'cover-paper',
              fieldType: 'select',
              label: 'Cover Paper',
              description: 'Select the paper type for the cover',
              required: true,
              defaultValue: 'MATTE',
              options: [
                { value: 'MATTE', label: 'Matte', price: 0 },
                { value: 'GLOSS', label: 'Gloss', price: 25 },
                { value: 'HI-PLUS', label: 'Hi-Plus', price: 50 }
              ],
              pricing: { type: 'fixed', value: 0 }
            },
            {
              fieldId: 'cover-finish',
              fieldType: 'select',
              label: 'Cover Finish',
              description: 'Select the finish for the cover',
              required: true,
              defaultValue: 'MATTE_LAM',
              options: [
                { value: 'MATTE_LAM', label: 'Matte Lamination', price: 0 },
                { value: 'GLOSS_LAM', label: 'Gloss Lamination', price: 30 },
                { value: 'UV_COAT', label: 'UV Coating', price: 45 }
              ],
              pricing: { type: 'fixed', value: 0 }
            }
          ]
        },
        {
          sectionId: 'inside-pages',
          sectionTitle: 'Inside Pages',
          fields: [
            {
              fieldId: 'page-count',
              fieldType: 'number',
              label: 'Page Count',
              description: 'Number of inside pages (must be multiple of 2)',
              required: true,
              defaultValue: 96,
              validation: { min: 24, max: 880 },
              pricing: { type: 'per_unit', value: 0.5 }
            },
            {
              fieldId: 'inside-paper',
              fieldType: 'select',
              label: 'Inside Paper',
              description: 'Select the paper for inside pages',
              required: true,
              defaultValue: 'MATTE',
              options: [
                { value: 'MATTE', label: 'Matte', price: 0 },
                { value: 'GLOSS', label: 'Gloss', price: 0.1 },
                { value: 'UNCOATED', label: 'Uncoated', price: -0.05 }
              ],
              pricing: { type: 'per_unit', value: 0 }
            }
          ]
        },
        {
          sectionId: 'quantity',
          sectionTitle: 'Quantity & Options',
          fields: [
            {
              fieldId: 'quantity',
              fieldType: 'number',
              label: 'Quantity',
              description: 'Number of copies',
              required: true,
              defaultValue: 200,
              validation: { min: 1, max: 100000 },
              pricing: { type: 'per_unit', value: 2 }
            },
            {
              fieldId: 'proof-type',
              fieldType: 'select',
              label: 'Proof Type',
              description: 'Select the type of proof you need',
              required: true,
              defaultValue: 'ONLINE',
              options: [
                { value: 'ONLINE', label: 'E-Proof (Free)', price: 0 },
                { value: 'DIGITAL', label: 'Digital Proof (+$50)', price: 50 }
              ],
              pricing: { type: 'fixed', value: 0 }
            }
          ]
        }
      ],
      pricingConfig: {
        basePrice: 500,
        calculations: []
      }
    };

    // Clear existing configuration
    await FormConfiguration.deleteOne({ formId: 'perfect-binding' });
    
    // Insert new configuration
    await FormConfiguration.create(perfectBindingConfig);
    
    console.log('✅ Form configuration seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding form configuration:', error);
    process.exit(1);
  }
}

seedFormConfig();