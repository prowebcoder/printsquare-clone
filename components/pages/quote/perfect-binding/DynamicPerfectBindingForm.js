'use client';
import React, { useState, useEffect } from 'react';

// Reusable form components
const RadioGroup = ({ label, name, options, selected, onChange, description }) => (
  <div className="mb-4">
    <p className="text-sm font-semibold text-gray-700 mb-2">{label}:</p>
    {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={onChange}
            className="form-radio text-indigo-600 h-4 w-4"
          />
          <span className="ml-2 text-sm text-gray-600">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const SelectDropdown = ({ label, options, selected, onChange, description }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
    <select
      value={selected}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const DynamicPerfectBindingForm = () => {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFormConfig();
  }, []);

  const fetchFormConfig = async () => {
    try {
      const response = await fetch('/api/forms/perfect-binding');
      if (response.ok) {
        const data = await response.json();
        setFormConfig(data.formConfig);
        
        // Initialize form data with default values
        const initialData = {};
        data.formConfig.sections.forEach(section => {
          section.fields.forEach(field => {
            if (field.defaultValue !== undefined) {
              initialData[field.fieldId] = field.defaultValue;
            }
          });
        });
        setFormData(initialData);
      }
    } catch (error) {
      console.error('Failed to fetch form configuration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const calculatePrice = () => {
    if (!formConfig) return 0;

    let total = formConfig.pricingConfig.basePrice;

    formConfig.sections.forEach(section => {
      section.fields.forEach(field => {
        const fieldValue = formData[field.fieldId];
        if (fieldValue !== undefined && field.pricing) {
          if (field.pricing.type === 'fixed') {
            total += field.pricing.value;
          } else if (field.pricing.type === 'per_unit') {
            total += field.pricing.value * (parseInt(fieldValue) || 1);
          }
          
          // Handle option-specific pricing
          if (field.options) {
            const selectedOption = field.options.find(opt => opt.value === fieldValue);
            if (selectedOption && selectedOption.price) {
              total += selectedOption.price;
            }
          }
        }
      });
    });

    return total;
  };

  if (loading) {
    return <div className="p-8 text-center">Loading form...</div>;
  }

  if (!formConfig) {
    return <div className="p-8 text-center text-red-600">Form configuration not found.</div>;
  }

  const totalPrice = calculatePrice();

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        {formConfig.formTitle}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Sections */}
        <div className="lg:col-span-2 space-y-6">
          {formConfig.sections.map((section) => (
            <div key={section.sectionId} className="bg-white p-4 rounded-lg shadow-md border">
              <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">
                {section.sectionTitle}
              </h2>

              <div className="space-y-4">
                {section.fields.map((field) => {
                  const commonProps = {
                    label: field.label,
                    description: field.description,
                    selected: formData[field.fieldId],
                    onChange: (e) => handleFieldChange(field.fieldId, e.target.value)
                  };

                  switch (field.fieldType) {
                    case 'select':
                      return (
                        <SelectDropdown
                          key={field.fieldId}
                          {...commonProps}
                          options={field.options || []}
                        />
                      );

                    case 'radio':
                      return (
                        <RadioGroup
                          key={field.fieldId}
                          {...commonProps}
                          name={field.fieldId}
                          options={field.options || []}
                        />
                      );

                    case 'number':
                      return (
                        <div key={field.fieldId} className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            {field.label}
                          </label>
                          {field.description && (
                            <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                          )}
                          <input
                            type="number"
                            value={formData[field.fieldId] || ''}
                            onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            min={field.validation?.min}
                            max={field.validation?.max}
                            required={field.required}
                          />
                        </div>
                      );

                    case 'checkbox':
                      return (
                        <div key={field.fieldId} className="mb-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData[field.fieldId] || false}
                              onChange={(e) => handleFieldChange(field.fieldId, e.target.checked)}
                              className="rounded text-indigo-600"
                              required={field.required}
                            />
                            <span className="text-sm font-semibold text-gray-700">
                              {field.label}
                            </span>
                          </label>
                          {field.description && (
                            <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                          )}
                        </div>
                      );

                    default:
                      return (
                        <div key={field.fieldId} className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            {field.label}
                          </label>
                          {field.description && (
                            <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                          )}
                          <input
                            type="text"
                            value={formData[field.fieldId] || ''}
                            onChange={(e) => handleFieldChange(field.fieldId, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required={field.required}
                          />
                        </div>
                      );
                  }
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md border sticky top-4">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Price Summary</h3>
            
            <div className="space-y-2 text-sm">
              {formConfig.sections.map(section =>
                section.fields.map(field => {
                  const fieldValue = formData[field.fieldId];
                  if (!fieldValue || !field.pricing) return null;

                  let fieldPrice = 0;
                  if (field.pricing.type === 'fixed') {
                    fieldPrice = field.pricing.value;
                  } else if (field.pricing.type === 'per_unit') {
                    fieldPrice = field.pricing.value * (parseInt(fieldValue) || 1);
                  }

                  // Add option-specific pricing
                  if (field.options) {
                    const selectedOption = field.options.find(opt => opt.value === fieldValue);
                    if (selectedOption && selectedOption.price) {
                      fieldPrice += selectedOption.price;
                    }
                  }

                  if (fieldPrice > 0) {
                    return (
                      <div key={field.fieldId} className="flex justify-between">
                        <span>{field.label}:</span>
                        <span>${fieldPrice.toFixed(2)}</span>
                      </div>
                    );
                  }
                  return null;
                })
              )}
            </div>

            <div className="border-t mt-4 pt-4 font-bold text-lg">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                console.log('Form Data:', formData);
                console.log('Total Price:', totalPrice);
                alert(`Order submitted! Total: $${totalPrice.toFixed(2)}`);
              }}
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-semibold"
            >
              Add to Cart - ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPerfectBindingForm;