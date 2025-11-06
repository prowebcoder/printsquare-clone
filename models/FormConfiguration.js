import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  value: String,
  label: String,
  description: String,
  image: String,
  price: { type: Number, default: 0 }
});

const FieldSchema = new mongoose.Schema({
  fieldId: String,
  fieldType: String,
  label: String,
  description: String,
  required: { type: Boolean, default: false },
  options: [OptionSchema],
  defaultValue: mongoose.Schema.Types.Mixed,
  validation: {
    min: Number,
    max: Number,
    pattern: String
  },
  dependencies: [{
    fieldId: String,
    value: mongoose.Schema.Types.Mixed,
    action: String
  }],
  pricing: {
    type: { type: String, default: 'fixed' },
    value: { type: Number, default: 0 },
    formula: String
  }
});

const SectionSchema = new mongoose.Schema({
  sectionId: String,
  sectionTitle: String,
  fields: [FieldSchema]
});

const FormConfigurationSchema = new mongoose.Schema({
  formId: { type: String, required: true, unique: true },
  formTitle: { type: String, required: true },
  sections: [SectionSchema],
  pricingConfig: {
    basePrice: { type: Number, default: 0 },
    calculations: [{
      fieldId: String,
      operation: String,
      value: Number
    }]
  }
}, { timestamps: true });

export default mongoose.models.FormConfiguration || mongoose.model('FormConfiguration', FormConfigurationSchema);