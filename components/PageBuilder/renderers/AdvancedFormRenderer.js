// components/PageBuilder/renderers/AdvancedFormRenderer.js
'use client';
import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calculator } from 'lucide-react';

const AdvancedFormRenderer = ({ component }) => {
  const formData = component.content || {};
  const fields = formData.fields || [];
  const formConfig = formData.formConfig || {
    title: 'Advanced Form',
    submitText: 'Submit',
    successMessage: 'Thank you for your submission!',
    errorMessage: 'There was an error submitting the form.',
    enableMultiStep: false,
    steps: ['Step 1'],
    enableCalculations: false,
  };

  const [formValues, setFormValues] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Calculate dynamic values
  useEffect(() => {
    if (formConfig.enableCalculations) {
      const calculatedValues = { ...formValues };
      let hasChanges = false;

      fields.forEach(field => {
        if (field.type === 'calculation' && field.calculation?.formula) {
          try {
            const result = evaluateFormula(field.calculation.formula, formValues, fields);
            if (calculatedValues[field.id] !== result) {
              calculatedValues[field.id] = result;
              hasChanges = true;
            }
          } catch (error) {
            console.warn(`Calculation error for field ${field.id}:`, error);
          }
        }
      });

      if (hasChanges) {
        setFormValues(calculatedValues);
      }
    }
  }, [formValues, fields, formConfig.enableCalculations]);

  // Evaluate calculation formulas safely
  const evaluateFormula = (formula, values, allFields) => {
    // Replace field references with actual values
    let expression = formula;
    const fieldRegex = /{([^}]+)}/g;
    let match;
    
    while ((match = fieldRegex.exec(expression)) !== null) {
      const fieldId = match[1];
      const fieldValue = parseFloat(values[fieldId]) || 0;
      expression = expression.replace(match[0], fieldValue);
    }

    // Safe evaluation (in production, use a proper expression evaluator)
    try {
      // Basic arithmetic operations only
      const safeExpression = expression
        .replace(/[^0-9+\-*/().]/g, '')
        .replace(/(\d)(\()/g, '$1*$2')
        .replace(/(\))(\d)/g, '$1*$2');
      
      // eslint-disable-next-line no-eval
      const result = eval(safeExpression);
      return isNaN(result) ? 0 : result;
    } catch (error) {
      console.error('Formula evaluation error:', error);
      return 0;
    }
  };

  // Check conditional logic
  const isFieldVisible = useCallback((field) => {
    if (!field.conditionalLogic) return true;

    const { field: triggerField, value, action } = field.conditionalLogic;
    const triggerValue = formValues[triggerField];
    
    if (action === 'show') {
      return triggerValue === value;
    } else if (action === 'hide') {
      return triggerValue !== value;
    }
    
    return true;
  }, [formValues]);

  // Validate field
  const validateField = (field, value) => {
    const errors = [];

    if (field.required && (!value || value.toString().trim() === '')) {
      errors.push('This field is required');
    }

    if (field.validation) {
      const { min, max, minLength, maxLength, pattern } = field.validation;

      if (min !== null && value < min) {
        errors.push(`Minimum value is ${min}`);
      }

      if (max !== null && value > max) {
        errors.push(`Maximum value is ${max}`);
      }

      if (minLength !== null && value.length < minLength) {
        errors.push(`Minimum length is ${minLength} characters`);
      }

      if (maxLength !== null && value.length > maxLength) {
        errors.push(`Maximum length is ${maxLength} characters`);
      }

      if (pattern && value && !new RegExp(pattern).test(value)) {
        errors.push('Invalid format');
      }
    }

    return errors;
  };

  // Validate current step
  const validateStep = (step) => {
    const stepErrors = {};
    const stepFields = fields.filter(field => 
      field.step === step && 
      isFieldVisible(field) &&
      field.type !== 'section'
    );

    stepFields.forEach(field => {
      const fieldErrors = validateField(field, formValues[field.id]);
      if (fieldErrors.length > 0) {
        stepErrors[field.id] = fieldErrors;
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleChange = (fieldId, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: null }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, formConfig.steps.length));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    if (!validateStep(currentStep)) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formValues);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage(formConfig.successMessage);
      setFormValues({});
      setCurrentStep(1);
    } catch (error) {
      setMessage(formConfig.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    if (!isFieldVisible(field)) return null;

    const commonProps = {
      id: field.id,
      name: field.id,
      required: field.required,
      placeholder: field.placeholder,
      value: formValues[field.id] || '',
      onChange: (e) => handleChange(field.id, e.target.value),
      className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
        errors[field.id] ? 'border-red-500' : 'border-gray-300'
      }`,
    };

    switch (field.type) {
      case 'section':
        return (
          <div key={field.id} className="border-l-4 border-blue-500 pl-4 py-4 my-6 bg-blue-50 rounded-r-lg">
            <h3 className="font-semibold text-lg text-gray-800">{field.label}</h3>
          </div>
        );

      case 'textarea':
        return <textarea {...commonProps} rows={4} />;

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option, index) => (
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

      case 'radio-image':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {field.options.map((option, index) => (
              <label 
                key={index}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formValues[field.id] === option.value 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={formValues[field.id] === option.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="h-20 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden">
                    {option.image ? (
                      <img 
                        src={option.image} 
                        alt={option.label}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image</div>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-800">{option.label}</div>
                </div>
              </label>
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
            {field.options.map((option, index) => (
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

      case 'calculation':
        return (
          <div className="relative">
            <input
              type="text"
              {...commonProps}
              value={formValues[field.id] || '0'}
              readOnly
              className="bg-gray-100 cursor-not-allowed pr-10"
            />
            <Calculator 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        );

      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  const currentStepFields = fields.filter(field => 
    field.step === currentStep || !formConfig.enableMultiStep
  );

  if (!fields || fields.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Form Not Configured</h3>
          <p className="text-yellow-700">This form doesn&apos;t have any fields configured yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {formConfig.title}
          </h2>
          
          {/* Multi-step Progress */}
          {formConfig.enableMultiStep && formConfig.steps.length > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-4">
                {formConfig.steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      currentStep === index + 1
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : currentStep > index + 1
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep === index + 1 ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                    {index < formConfig.steps.length - 1 && (
                      <div className="w-12 h-0.5 bg-gray-300 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-8">
          <div className="space-y-6">
            {currentStepFields.map((field) => (
              <div key={field.id} className="space-y-2">
                {field.type !== 'section' && (
                  <label 
                    htmlFor={field.id} 
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                {renderField(field)}
                {errors[field.id] && (
                  <div className="text-red-500 text-sm space-y-1">
                    {errors[field.id].map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            {formConfig.enableMultiStep && currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
            ) : (
              <div></div> // Spacer
            )}

            {formConfig.enableMultiStep && currentStep < formConfig.steps.length ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-auto"
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Submitting...' : formConfig.submitText}
              </button>
            )}
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message === formConfig.successMessage 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdvancedFormRenderer;