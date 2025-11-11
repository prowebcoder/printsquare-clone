// components/PageBuilder/renderers/FormRenderer.js
'use client';
import { useState } from 'react';

const FormRenderer = ({ component }) => {
  // Ensure we have the proper structure
  const formData = component.content || {};
  const fields = formData.fields || [];
  const formConfig = formData.formConfig || {
    title: 'Contact Form',
    submitText: 'Submit',
    successMessage: 'Thank you for your submission!',
    errorMessage: 'There was an error submitting the form.',
  };

  const [formValues, setFormValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (fieldId, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formValues);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage(formConfig.successMessage);
      setFormValues({}); // Reset form
    } catch (error) {
      setMessage(formConfig.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.id,
      name: field.id,
      required: field.required,
      placeholder: field.placeholder,
      value: formValues[field.id] || '',
      onChange: (e) => handleChange(field.id, e.target.value),
      className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${index}`}
                  name={field.id}
                  value={option}
                  checked={formValues[field.id] === option}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor={`${field.id}-${index}`} className="text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.id}
              name={field.id}
              checked={formValues[field.id] || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              className="mr-2 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor={field.id} className="text-sm text-gray-700">
              {field.placeholder}
            </label>
          </div>
        );

      case 'checkbox-group':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.id}-${index}`}
                  name={field.id}
                  value={option}
                  checked={formValues[field.id]?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = formValues[field.id] || [];
                    let newValues;
                    if (e.target.checked) {
                      newValues = [...currentValues, option];
                    } else {
                      newValues = currentValues.filter(v => v !== option);
                    }
                    handleChange(field.id, newValues);
                  }}
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor={`${field.id}-${index}`} className="text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case 'range':
        return (
          <div>
            <input
              type="range"
              {...commonProps}
              min={field.validation?.min || 0}
              max={field.validation?.max || 100}
              step={field.step || 1}
              className="w-full"
            />
            {field.showValue && (
              <div className="text-sm text-gray-500 text-center mt-2">
                Current Value: {formValues[field.id] || (field.validation?.min || 0)}
              </div>
            )}
          </div>
        );

      case 'color':
        return (
          <input
            type="color"
            {...commonProps}
            className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
          />
        );

      case 'file':
        return (
          <input
            type="file"
            {...commonProps}
            accept={field.accept}
            multiple={field.multiple}
            onChange={(e) => handleChange(field.id, e.target.files)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        );

      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  // Apply component styles
  const getStyleClasses = (styles) => {
    if (!styles) return '';
    
    const classMap = {
      backgroundColor: `bg-[${styles.backgroundColor}]`,
      textColor: `text-[${styles.textColor}]`,
      fontSize: {
        'xs': 'text-xs',
        'sm': 'text-sm',
        'base': 'text-base',
        'lg': 'text-lg',
        'xl': 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
      }[styles.fontSize] || 'text-base',
      textAlign: {
        'left': 'text-left',
        'center': 'text-center',
        'right': 'text-right',
        'justify': 'text-justify',
      }[styles.textAlign] || 'text-left',
      padding: {
        'none': 'p-0',
        'small': 'p-2',
        'medium': 'p-4',
        'large': 'p-6',
        'xlarge': 'p-8',
      }[styles.padding] || 'p-4',
      borderRadius: {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        'full': 'rounded-full',
      }[styles.borderRadius] || 'rounded-none',
      borderWidth: {
        '0': 'border-0',
        '1': 'border',
        '2': 'border-2',
        '4': 'border-4',
        '8': 'border-8',
      }[styles.borderWidth] || 'border-0',
      shadow: {
        'none': 'shadow-none',
        'sm': 'shadow-sm',
        'md': 'shadow-md',
        'lg': 'shadow-lg',
        'xl': 'shadow-xl',
      }[styles.shadow] || 'shadow-none',
    };

    return Object.entries(classMap)
      .filter(([key, value]) => styles[key])
      .map(([key, value]) => value)
      .concat(styles.customClasses?.split(' ') || [])
      .join(' ');
  };

  const styleClasses = getStyleClasses(component.styles);

  if (!fields || fields.length === 0) {
    return (
      <div className={`${styleClasses} max-w-2xl mx-auto p-6 text-center`}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Form Not Configured</h3>
          <p className="text-yellow-700">This form doesn't have any fields configured yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styleClasses} max-w-2xl mx-auto`}>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{formConfig.title}</h2>
        
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label 
              htmlFor={field.id} 
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {field.validation?.pattern && (
              <p className="text-xs text-gray-500">
                Pattern: {field.validation.pattern}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? 'Submitting...' : formConfig.submitText}
        </button>

        {message && (
          <div className={`p-4 rounded-lg ${
            message === formConfig.successMessage 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormRenderer;