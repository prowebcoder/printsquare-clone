'use client';
import { useState } from 'react';

const fieldTypes = [
  { value: 'select', label: 'Dropdown Select' },
  { value: 'radio', label: 'Radio Group' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'number', label: 'Number Input' },
  { value: 'text', label: 'Text Input' },
  { value: 'toggle', label: 'Toggle Switch' },
];

const pricingTypes = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'per_unit', label: 'Price Per Unit' },
  { value: 'calculated', label: 'Calculated' },
];

export default function DynamicFormEditor({ formConfig, onSave, saving }) {
  const [config, setConfig] = useState(formConfig);
  const [activeSection, setActiveSection] = useState(0);

  const addSection = () => {
    const newSection = {
      sectionId: `section-${Date.now()}`,
      sectionTitle: 'New Section',
      fields: []
    };
    setConfig(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (index, updates) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (index) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const addField = (sectionIndex) => {
    const newField = {
      fieldId: `field-${Date.now()}`,
      fieldType: 'text',
      label: 'New Field',
      description: '',
      required: false,
      options: [],
      defaultValue: '',
      validation: {},
      dependencies: [],
      pricing: { type: 'fixed', value: 0 }
    };
    
    updateSection(sectionIndex, {
      fields: [...config.sections[sectionIndex].fields, newField]
    });
  };

  const updateField = (sectionIndex, fieldIndex, updates) => {
    const section = config.sections[sectionIndex];
    const updatedFields = section.fields.map((field, i) => 
      i === fieldIndex ? { ...field, ...updates } : field
    );
    
    updateSection(sectionIndex, { fields: updatedFields });
  };

  const deleteField = (sectionIndex, fieldIndex) => {
    const section = config.sections[sectionIndex];
    const updatedFields = section.fields.filter((_, i) => i !== fieldIndex);
    updateSection(sectionIndex, { fields: updatedFields });
  };

  const addOption = (sectionIndex, fieldIndex) => {
    const newOption = {
      value: `option-${Date.now()}`,
      label: 'New Option',
      description: '',
      price: 0
    };
    
    const field = config.sections[sectionIndex].fields[fieldIndex];
    updateField(sectionIndex, fieldIndex, {
      options: [...field.options, newOption]
    });
  };

  const updateOption = (sectionIndex, fieldIndex, optionIndex, updates) => {
    const field = config.sections[sectionIndex].fields[fieldIndex];
    const updatedOptions = field.options.map((option, i) => 
      i === optionIndex ? { ...option, ...updates } : option
    );
    
    updateField(sectionIndex, fieldIndex, { options: updatedOptions });
  };

  const deleteOption = (sectionIndex, fieldIndex, optionIndex) => {
    const field = config.sections[sectionIndex].fields[fieldIndex];
    const updatedOptions = field.options.filter((_, i) => i !== optionIndex);
    updateField(sectionIndex, fieldIndex, { options: updatedOptions });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Form Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Form Title
        </label>
        <input
          type="text"
          value={config.formTitle}
          onChange={(e) => setConfig(prev => ({ ...prev, formTitle: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {config.sections.map((section, sectionIndex) => (
          <div key={section.sectionId} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={section.sectionTitle}
                onChange={(e) => updateSection(sectionIndex, { sectionTitle: e.target.value })}
                className="text-lg font-semibold border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1"
              />
              <button
                onClick={() => deleteSection(sectionIndex)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete Section
              </button>
            </div>

            {/* Section Fields */}
            <div className="space-y-4">
              {section.fields.map((field, fieldIndex) => (
                <div key={field.fieldId} className="border-l-4 border-blue-500 pl-4 bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-start mb-3">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(sectionIndex, fieldIndex, { label: e.target.value })}
                      className="text-md font-medium border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1"
                    />
                    <button
                      onClick={() => deleteField(sectionIndex, fieldIndex)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete Field
                    </button>
                  </div>

                  {/* Field Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field Type
                      </label>
                      <select
                        value={field.fieldType}
                        onChange={(e) => updateField(sectionIndex, fieldIndex, { fieldType: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      >
                        {fieldTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(sectionIndex, fieldIndex, { required: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">Required Field</span>
                      </label>
                    </div>
                  </div>

                  {/* Field Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={field.description}
                      onChange={(e) => updateField(sectionIndex, fieldIndex, { description: e.target.value })}
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>

                  {/* Options for select/radio fields */}
                  {(field.fieldType === 'select' || field.fieldType === 'radio') && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Options
                        </label>
                        <button
                          onClick={() => addOption(sectionIndex, fieldIndex)}
                          className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Add Option
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {field.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2 p-2 bg-white border rounded">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Value"
                                value={option.value}
                                onChange={(e) => updateOption(sectionIndex, fieldIndex, optionIndex, { value: e.target.value })}
                                className="p-1 border border-gray-300 rounded text-sm"
                              />
                              <input
                                type="text"
                                placeholder="Label"
                                value={option.label}
                                onChange={(e) => updateOption(sectionIndex, fieldIndex, optionIndex, { label: e.target.value })}
                                className="p-1 border border-gray-300 rounded text-sm"
                              />
                              <input
                                type="text"
                                placeholder="Description"
                                value={option.description}
                                onChange={(e) => updateOption(sectionIndex, fieldIndex, optionIndex, { description: e.target.value })}
                                className="p-1 border border-gray-300 rounded text-sm"
                              />
                              <input
                                type="number"
                                placeholder="Price"
                                value={option.price}
                                onChange={(e) => updateOption(sectionIndex, fieldIndex, optionIndex, { price: parseFloat(e.target.value) || 0 })}
                                className="p-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <button
                              onClick={() => deleteOption(sectionIndex, fieldIndex, optionIndex)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Configuration */}
                  <div className="border-t pt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pricing
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        value={field.pricing.type}
                        onChange={(e) => updateField(sectionIndex, fieldIndex, { 
                          pricing: { ...field.pricing, type: e.target.value }
                        })}
                        className="p-2 border border-gray-300 rounded-md text-sm"
                      >
                        {pricingTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={field.pricing.value}
                        onChange={(e) => updateField(sectionIndex, fieldIndex, {
                          pricing: { ...field.pricing, value: parseFloat(e.target.value) || 0 }
                        })}
                        className="p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Price value"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Field Button */}
            <button
              onClick={() => addField(sectionIndex)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm"
            >
              Add Field to Section
            </button>
          </div>
        ))}
      </div>

      {/* Add Section Button */}
      <button
        onClick={addSection}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add New Section
      </button>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onSave(config)}
          disabled={saving}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Form Configuration'}
        </button>
      </div>
    </div>
  );
}