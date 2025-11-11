// components/PageBuilder/editors/FormEditor.js
import { useState } from 'react';
import { Trash2, Plus, Move, Settings } from 'lucide-react';

const FormEditor = ({ component, onUpdate }) => {
  const [fields, setFields] = useState(component.content?.fields || []);
  const [formConfig, setFormConfig] = useState(component.content?.formConfig || {
    title: 'Contact Form',
    submitText: 'Submit',
    successMessage: 'Thank you for your submission!',
    errorMessage: 'There was an error submitting the form.',
  });

  // Update parent when fields or config change
  const updateForm = (newFields, newConfig = formConfig) => {
    setFields(newFields);
    setFormConfig(newConfig);
    onUpdate(component.id, { 
      fields: newFields,
      formConfig: newConfig
    });
  };

  const addField = (type) => {
    const newField = {
      id: `field-${Date.now()}`,
      type: type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}`,
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : [],
      validation: {
        min: type === 'number' || type === 'range' ? 0 : null,
        max: type === 'number' || type === 'range' ? 100 : null,
        pattern: '',
        minLength: null,
        maxLength: null,
      }
    };
    updateForm([...fields, newField]);
  };

  const removeField = (fieldId) => {
    updateForm(fields.filter(field => field.id !== fieldId));
  };

  const updateField = (fieldId, updates) => {
    const updatedFields = fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    );
    updateForm(updatedFields);
  };

  const updateFieldOption = (fieldId, optionIndex, value) => {
    const updatedFields = fields.map(field => {
      if (field.id === fieldId) {
        const newOptions = [...field.options];
        newOptions[optionIndex] = value;
        return { ...field, options: newOptions };
      }
      return field;
    });
    updateForm(updatedFields);
  };

  const addFieldOption = (fieldId) => {
    const updatedFields = fields.map(field => {
      if (field.id === fieldId) {
        return { 
          ...field, 
          options: [...field.options, `Option ${field.options.length + 1}`] 
        };
      }
      return field;
    });
    updateForm(updatedFields);
  };

  const removeFieldOption = (fieldId, optionIndex) => {
    const updatedFields = fields.map(field => {
      if (field.id === fieldId) {
        return { 
          ...field, 
          options: field.options.filter((_, index) => index !== optionIndex) 
        };
      }
      return field;
    });
    updateForm(updatedFields);
  };

  const moveField = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === fields.length - 1)) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newFields = [...fields];
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    updateForm(newFields);
  };

  const fieldTypes = [
    { type: 'text', name: 'Text Input' },
    { type: 'textarea', name: 'Text Area' },
    { type: 'email', name: 'Email' },
    { type: 'number', name: 'Number' },
    { type: 'tel', name: 'Phone' },
    { type: 'url', name: 'URL' },
    { type: 'date', name: 'Date' },
    { type: 'datetime-local', name: 'Date Time' },
    { type: 'time', name: 'Time' },
    { type: 'range', name: 'Range Slider' },
    { type: 'color', name: 'Color Picker' },
    { type: 'file', name: 'File Upload' },
    { type: 'select', name: 'Dropdown Select' },
    { type: 'radio', name: 'Radio Buttons' },
    { type: 'checkbox', name: 'Checkbox' },
    { type: 'checkbox-group', name: 'Checkbox Group' },
  ];

  const renderFieldEditor = (field, index) => {
    return (
      <div key={field.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="font-medium capitalize">{field.type}</span>
            <span className="text-sm text-gray-500">Field {index + 1}</span>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => moveField(index, 'up')}
              disabled={index === 0}
              className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30"
            >
              <Move size={16} className="rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => moveField(index, 'down')}
              disabled={index === fields.length - 1}
              className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30"
            >
              <Move size={16} className="-rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="p-1 text-red-600 hover:bg-red-200 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Field Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Field label"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder Text</label>
            <input
              type="text"
              value={field.placeholder}
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Placeholder text"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={field.required}
            onChange={(e) => updateField(field.id, { required: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor={`required-${field.id}`} className="text-sm font-medium text-gray-700">
            Required Field
          </label>
        </div>

        {/* Options for select, radio, checkbox groups */}
        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox-group') && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateFieldOption(field.id, optionIndex, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder={`Option ${optionIndex + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeFieldOption(field.id, optionIndex)}
                  className="p-2 text-red-600 hover:bg-red-200 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addFieldOption(field.id)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              <Plus size={14} />
              Add Option
            </button>
          </div>
        )}

        {/* Validation Settings */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {(field.type === 'number' || field.type === 'range') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Value</label>
                <input
                  type="number"
                  value={field.validation?.min || ''}
                  onChange={(e) => updateField(field.id, { 
                    validation: { ...field.validation, min: e.target.value } 
                  })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Value</label>
                <input
                  type="number"
                  value={field.validation?.max || ''}
                  onChange={(e) => updateField(field.id, { 
                    validation: { ...field.validation, max: e.target.value } 
                  })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </>
          )}

          {(field.type === 'text' || field.type === 'textarea' || field.type === 'email') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Length</label>
                <input
                  type="number"
                  value={field.validation?.minLength || ''}
                  onChange={(e) => updateField(field.id, { 
                    validation: { ...field.validation, minLength: e.target.value } 
                  })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Length</label>
                <input
                  type="number"
                  value={field.validation?.maxLength || ''}
                  onChange={(e) => updateField(field.id, { 
                    validation: { ...field.validation, maxLength: e.target.value } 
                  })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </>
          )}

          {field.type === 'text' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Validation Pattern (Regex)</label>
              <input
                type="text"
                value={field.validation?.pattern || ''}
                onChange={(e) => updateField(field.id, { 
                  validation: { ...field.validation, pattern: e.target.value } 
                })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="e.g., [A-Za-z]{3,}"
              />
              <p className="text-xs text-gray-500 mt-1">Regular expression pattern for validation</p>
            </div>
          )}
        </div>

        {/* Range-specific settings */}
        {field.type === 'range' && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Step</label>
              <input
                type="number"
                value={field.step || 1}
                onChange={(e) => updateField(field.id, { step: parseFloat(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Value</label>
              <input
                type="number"
                value={field.defaultValue || ''}
                onChange={(e) => updateField(field.id, { defaultValue: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`show-value-${field.id}`}
                  checked={field.showValue || false}
                  onChange={(e) => updateField(field.id, { showValue: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor={`show-value-${field.id}`} className="text-sm font-medium text-gray-700">
                  Show Value
                </label>
              </div>
            </div>
          </div>
        )}

        {/* File-specific settings */}
        {field.type === 'file' && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accept File Types</label>
              <input
                type="text"
                value={field.accept || ''}
                onChange={(e) => updateField(field.id, { accept: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="e.g., .pdf,.doc,.docx,image/*"
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated file types or MIME types</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Multiple Files</label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`multiple-${field.id}`}
                  checked={field.multiple || false}
                  onChange={(e) => updateField(field.id, { multiple: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor={`multiple-${field.id}`} className="text-sm font-medium text-gray-700">
                  Allow multiple file selection
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Form Configuration */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Settings size={16} />
          Form Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
            <input
              type="text"
              value={formConfig.title}
              onChange={(e) => updateForm(fields, { ...formConfig, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Form title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Submit Button Text</label>
            <input
              type="text"
              value={formConfig.submitText}
              onChange={(e) => updateForm(fields, { ...formConfig, submitText: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Submit button text"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Success Message</label>
            <input
              type="text"
              value={formConfig.successMessage}
              onChange={(e) => updateForm(fields, { ...formConfig, successMessage: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Success message"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Error Message</label>
            <input
              type="text"
              value={formConfig.errorMessage}
              onChange={(e) => updateForm(fields, { ...formConfig, errorMessage: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Error message"
            />
          </div>
        </div>
      </div>

      {/* Add Field Buttons */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-medium text-gray-700 mb-3">Add Form Fields</h3>
        <div className="flex flex-wrap gap-2">
          {fieldTypes.map((fieldType) => (
            <button
              key={fieldType.type}
              type="button"
              onClick={() => addField(fieldType.type)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              <Plus size={14} />
              {fieldType.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields List */}
      <div>
        <h3 className="font-medium text-gray-700 mb-3">
          Form Fields ({fields.length})
        </h3>
        {fields.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>No form fields added yet</p>
            <p className="text-sm">Use the buttons above to add form fields</p>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => renderFieldEditor(field, index))}
          </div>
        )}
      </div>

      {/* Form Preview */}
      {fields.length > 0 && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium text-gray-700 mb-3">Form Preview</h3>
          <div className="bg-white p-4 rounded border">
            <h4 className="text-lg font-medium mb-4">{formConfig.title}</h4>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderFieldPreview(field)}
                </div>
              ))}
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {formConfig.submitText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to render field preview
const renderFieldPreview = (field) => {
  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          placeholder={field.placeholder}
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
        />
      );
    
    case 'select':
      return (
        <select className="w-full p-2 border border-gray-300 rounded">
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
                id={`preview-${field.id}-${index}`}
                name={`preview-${field.id}`}
                className="mr-2"
              />
              <label htmlFor={`preview-${field.id}-${index}`} className="text-sm">
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
            id={`preview-${field.id}`}
            className="mr-2"
          />
          <label htmlFor={`preview-${field.id}`} className="text-sm">
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
                id={`preview-${field.id}-${index}`}
                className="mr-2"
              />
              <label htmlFor={`preview-${field.id}-${index}`} className="text-sm">
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
            min={field.validation?.min || 0}
            max={field.validation?.max || 100}
            step={field.step || 1}
            defaultValue={field.defaultValue || (field.validation?.min || 0)}
            className="w-full"
          />
          {field.showValue && (
            <div className="text-sm text-gray-500 text-center mt-1">
              Value: {field.defaultValue || (field.validation?.min || 0)}
            </div>
          )}
        </div>
      );
    
    case 'color':
      return (
        <input
          type="color"
          className="w-full h-10 border border-gray-300 rounded"
        />
      );
    
    default:
      return (
        <input
          type={field.type}
          placeholder={field.placeholder}
          className="w-full p-2 border border-gray-300 rounded"
        />
      );
  }
};

export default FormEditor;