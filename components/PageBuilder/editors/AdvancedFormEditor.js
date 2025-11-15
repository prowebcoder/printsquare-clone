// components/PageBuilder/editors/AdvancedFormEditor.js
import { useState, useCallback, useRef } from 'react';
import { 
  Trash2, Plus, Move, Settings, Copy, Eye, EyeOff, 
  Calculator, TestTube, Layers, Download, Upload,
  ChevronDown, ChevronRight, GripVertical, Image
} from 'lucide-react';

const AdvancedFormEditor = ({ component, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('fields');
  const [selectedField, setSelectedField] = useState(null);
  const [formConfig, setFormConfig] = useState(component.content?.formConfig || {
    title: 'Advanced Form',
    submitText: 'Submit',
    successMessage: 'Thank you for your submission!',
    errorMessage: 'There was an error submitting the form.',
    enableMultiStep: false,
    steps: ['Step 1'],
    enableCalculations: false,
    calculationFormula: '',
  });

  const [fields, setFields] = useState(component.content?.fields || []);
  const [templates, setTemplates] = useState(component.content?.templates || {});
  const [showFormulaTester, setShowFormulaTester] = useState(false);
  const [testFormula, setTestFormula] = useState('');
  const [testResult, setTestResult] = useState('');
  const [draggedField, setDraggedField] = useState(null);

  // Field type definitions with icons
  const fieldTypes = [
    { type: 'text', name: 'Text Input', icon: 'T' },
    { type: 'textarea', name: 'Text Area', icon: '📝' },
    { type: 'email', name: 'Email', icon: '✉️' },
    { type: 'number', name: 'Number', icon: '🔢' },
    { type: 'tel', name: 'Phone', icon: '📞' },
    { type: 'url', name: 'URL', icon: '🔗' },
    { type: 'date', name: 'Date', icon: '📅' },
    { type: 'datetime-local', name: 'Date Time', icon: '⏰' },
    { type: 'time', name: 'Time', icon: '🕒' },
    { type: 'range', name: 'Range', icon: '🎚️' },
    { type: 'color', name: 'Color', icon: '🎨' },
    { type: 'file', name: 'File', icon: '📎' },
    { type: 'select', name: 'Dropdown', icon: '📋' },
    { type: 'radio', name: 'Radio', icon: '⭕' },
    { type: 'checkbox', name: 'Checkbox', icon: '☑️' },
    { type: 'checkbox-group', name: 'Checkbox Group', icon: '✅' },
    { type: 'calculation', name: 'Calculation', icon: '🧮' },
    { type: 'section', name: 'Section', icon: '📁' },
  ];

  // Predefined templates
  const formTemplates = {
    contact: {
      name: 'Contact Form',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
          step: 1
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true,
          step: 1
        },
        {
          id: 'message',
          type: 'textarea',
          label: 'Message',
          placeholder: 'Enter your message',
          required: false,
          step: 1
        }
      ]
    },
    booking: {
      name: 'Booking Form',
      fields: [
        {
          id: 'service',
          type: 'select',
          label: 'Service Type',
          options: ['Printing', 'Binding', 'Finishing', 'Consultation'],
          required: true,
          step: 1
        },
        {
          id: 'date',
          type: 'date',
          label: 'Preferred Date',
          required: true,
          step: 1
        },
        {
          id: 'quantity',
          type: 'number',
          label: 'Quantity',
          placeholder: 'Enter quantity',
          required: true,
          step: 1
        }
      ]
    },
    order: {
      name: 'Order Form',
      fields: [
        {
          id: 'product',
          type: 'select',
          label: 'Product Type',
          options: ['Books', 'Brochures', 'Flyers', 'Business Cards'],
          required: true,
          step: 1
        },
        {
          id: 'specifications',
          type: 'textarea',
          label: 'Specifications',
          placeholder: 'Enter product specifications',
          required: false,
          step: 1
        },
        {
          id: 'deadline',
          type: 'date',
          label: 'Deadline',
          required: true,
          step: 1
        }
      ]
    },
    printing: {
      name: 'Printing Quote Form',
      fields: [
        // Size Section
        {
          id: 'size-section',
          type: 'section',
          label: 'Size',
          step: 1
        },
        {
          id: 'size',
          type: 'select',
          label: 'Select Size',
          options: [
            '5.5 x 8.5',
            '7.5 x 10',
            '8.5 x 11',
            '9 x 12',
            '8.5 x 5.5',
            '10 x 7.5',
            '11 x 8.5',
            'Custom Size'
          ],
          required: true,
          step: 1,
          conditionalLogic: {
            field: 'size',
            value: 'Custom Size',
            action: 'show',
            target: 'custom-size'
          }
        },
        {
          id: 'custom-size',
          type: 'text',
          label: 'Custom Size',
          placeholder: 'Enter custom size (e.g., 12 x 18)',
          required: false,
          step: 1,
          hidden: true
        },
        // Edges Section
        {
          id: 'edges-section',
          type: 'section',
          label: 'Edges',
          step: 1
        },
        {
          id: 'binding-edge',
          type: 'radio-image',
          label: 'Binding Edge',
          options: [
            { value: 'edge01', label: 'Edge 01', image: '/forms/edge01.png' },
            { value: 'edge02', label: 'Edge 02', image: '/forms/edge02.png' },
            { value: 'edge03', label: 'Edge 03', image: '/forms/edge03.png' }
          ],
          required: true,
          step: 1
        },
        // Cover Section
        {
          id: 'cover-section',
          type: 'section',
          label: 'Cover',
          step: 2
        },
        {
          id: 'cover-paper',
          type: 'select',
          label: 'Paper',
          options: ['Matte', 'Gloss', 'Hi-Plus', 'Hi-Q Matte', 'Premium'],
          required: true,
          step: 2
        },
        {
          id: 'cover-print-color',
          type: 'radio-image',
          label: 'Print Color',
          options: [
            { value: 'd1', label: 'Full color', image: '/forms/d1.png' },
            { value: 'd2', label: 'Full color + 1 Spot color', image: '/forms/d2.png' },
            { value: 'd3', label: 'Full color + 2 Spot color', image: '/forms/d3.png' },
            { value: 'd4', label: 'Black only', image: '/forms/d4.png' },
            { value: 'd5', label: 'Black + 1 Spot color', image: '/forms/d5.png' },
            { value: 'd6', label: 'Black + 2 Spot color', image: '/forms/d6.png' }
          ],
          required: true,
          step: 2
        },
        {
          id: 'cover-finish',
          type: 'select',
          label: 'Cover Finish',
          options: ['Matte Lamination', 'Gloss Lamination', 'Hi-Plus Lamination', 'Hi-Q Matte Lamination'],
          required: true,
          step: 2
        },
        // Inside Page Section
        {
          id: 'inside-page-section',
          type: 'section',
          label: 'Inside Page',
          step: 3
        },
        {
          id: 'page-count',
          type: 'select',
          label: 'Page Count',
          options: Array.from({ length: 80 }, (_, i) => `${(i + 1) * 10} pages`),
          required: true,
          step: 3
        },
        {
          id: 'inside-paper',
          type: 'select',
          label: 'Paper',
          options: ['Matte', 'Gloss', 'Hi-Plus', 'Hi-Q Matte', 'Premium'],
          required: true,
          step: 3
        },
        {
          id: 'inside-print-color',
          type: 'radio-image',
          label: 'Print Color',
          options: [
            { value: 'd1', label: 'Full color', image: '/forms/d1.png' },
            { value: 'd2', label: 'Full color + 1 Spot color', image: '/forms/d2.png' },
            { value: 'd3', label: 'Full color + 2 Spot color', image: '/forms/d3.png' },
            { value: 'd4', label: 'Black only', image: '/forms/d4.png' },
            { value: 'd5', label: 'Black + 1 Spot color', image: '/forms/d5.png' },
            { value: 'd6', label: 'Black + 2 Spot color', image: '/forms/d6.png' }
          ],
          required: true,
          step: 3
        }
      ]
    }
  };

  // Update parent when form changes
  const updateForm = useCallback((newFields, newConfig = formConfig) => {
    setFields(newFields);
    setFormConfig(newConfig);
    onUpdate(component.id, { 
      fields: newFields,
      formConfig: newConfig,
      templates: templates
    });
  }, [component.id, onUpdate, formConfig, templates]);

  // Field management functions
  const addField = (type) => {
    const newField = {
      id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}`,
      required: false,
      step: 1,
      options: (type === 'select' || type === 'radio' || type === 'checkbox-group' || type === 'radio-image') 
        ? type === 'radio-image' 
          ? [] 
          : ['Option 1', 'Option 2']
        : [],
      validation: {
        min: type === 'number' || type === 'range' ? 0 : null,
        max: type === 'number' || type === 'range' ? 100 : null,
        pattern: '',
        minLength: null,
        maxLength: null,
      },
      calculation: type === 'calculation' ? { formula: '', dependsOn: [] } : null,
      conditionalLogic: null
    };
    
    const updatedFields = [...fields, newField];
    updateForm(updatedFields);
    setSelectedField(newField.id);
  };

  const removeField = (fieldId) => {
    const updatedFields = fields.filter(field => field.id !== fieldId);
    updateForm(updatedFields);
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  };

  const updateField = (fieldId, updates) => {
    const updatedFields = fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    );
    updateForm(updatedFields);
  };

  const duplicateField = (fieldId) => {
    const fieldToDuplicate = fields.find(f => f.id === fieldId);
    if (fieldToDuplicate) {
      const duplicatedField = {
        ...fieldToDuplicate,
        id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        label: `${fieldToDuplicate.label} (Copy)`
      };
      const fieldIndex = fields.findIndex(f => f.id === fieldId);
      const updatedFields = [
        ...fields.slice(0, fieldIndex + 1),
        duplicatedField,
        ...fields.slice(fieldIndex + 1)
      ];
      updateForm(updatedFields);
      setSelectedField(duplicatedField.id);
    }
  };

  // Drag and drop functionality
  const handleDragStart = (e, field) => {
    setDraggedField(field);
    e.dataTransfer.setData('text/plain', field.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedField) {
      const currentIndex = fields.findIndex(f => f.id === draggedField.id);
      if (currentIndex !== -1 && currentIndex !== targetIndex) {
        const newFields = [...fields];
        const [movedField] = newFields.splice(currentIndex, 1);
        newFields.splice(targetIndex, 0, movedField);
        updateForm(newFields);
      }
    }
    setDraggedField(null);
  };

  // Template functions
  const applyTemplate = (templateKey) => {
    const template = formTemplates[templateKey];
    if (template) {
      updateForm([...template.fields], {
        ...formConfig,
        title: template.name,
        enableMultiStep: templateKey === 'printing'
      });
    }
  };

  // Conditional logic functions
  const addConditionalLogic = (fieldId) => {
    updateField(fieldId, {
      conditionalLogic: {
        field: '',
        value: '',
        action: 'show',
        target: ''
      }
    });
  };

  const updateConditionalLogic = (fieldId, updates) => {
    const field = fields.find(f => f.id === fieldId);
    if (field) {
      updateField(fieldId, {
        conditionalLogic: { ...field.conditionalLogic, ...updates }
      });
    }
  };

  // Formula testing
  const testCalculationFormula = () => {
    try {
      // Simple formula evaluation (in real implementation, use a safe evaluator)
      const result = eval(testFormula); // Note: In production, use a safe expression evaluator
      setTestResult(`Result: ${result}`);
    } catch (error) {
      setTestResult(`Error: ${error.message}`);
    }
  };

  // Render field editor based on field type
  const renderFieldEditor = (field, index) => {
    const isSelected = selectedField === field.id;
    
    return (
      <div 
        key={field.id} 
        className={`border rounded-lg p-4 mb-4 bg-white transition-all duration-200 ${
          isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:border-gray-300'
        }`}
        draggable
        onDragStart={(e) => handleDragStart(e, field)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
        onClick={() => setSelectedField(field.id)}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <GripVertical size={16} className="text-gray-400 cursor-move" />
            <span className="font-medium capitalize bg-gray-100 px-2 py-1 rounded text-sm">
              {field.type}
            </span>
            <span className="text-sm text-gray-500">Field {index + 1}</span>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => duplicateField(field.id)}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
              title="Duplicate Field"
            >
              <Copy size={16} />
            </button>
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
              title="Delete Field"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Basic Field Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

          {field.type !== 'section' && (
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
          )}
        </div>

        {field.type !== 'section' && (
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
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

            {formConfig.enableMultiStep && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step</label>
                <select
                  value={field.step || 1}
                  onChange={(e) => updateField(field.id, { step: parseInt(e.target.value) })}
                  className="p-2 border border-gray-300 rounded text-sm"
                >
                  {formConfig.steps.map((_, index) => (
                    <option key={index + 1} value={index + 1}>Step {index + 1}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Field Type Specific Settings */}
        {renderFieldTypeSettings(field)}

        {/* Conditional Logic */}
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Conditional Logic</label>
            {!field.conditionalLogic && (
              <button
                type="button"
                onClick={() => addConditionalLogic(field.id)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Condition
              </button>
            )}
          </div>
          
          {field.conditionalLogic && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-gray-50 rounded">
              <select
                value={field.conditionalLogic.field}
                onChange={(e) => updateConditionalLogic(field.id, { field: e.target.value })}
                className="p-2 border border-gray-300 rounded text-sm"
              >
                <option value="">Select Field</option>
                {fields.filter(f => f.id !== field.id).map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
              
              <select
                value={field.conditionalLogic.action}
                onChange={(e) => updateConditionalLogic(field.id, { action: e.target.value })}
                className="p-2 border border-gray-300 rounded text-sm"
              >
                <option value="show">Show when</option>
                <option value="hide">Hide when</option>
              </select>
              
              <input
                type="text"
                value={field.conditionalLogic.value}
                onChange={(e) => updateConditionalLogic(field.id, { value: e.target.value })}
                placeholder="Value"
                className="p-2 border border-gray-300 rounded text-sm"
              />
              
              <button
                type="button"
                onClick={() => updateField(field.id, { conditionalLogic: null })}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFieldTypeSettings = (field) => {
    switch (field.type) {
      case 'select':
      case 'radio':
      case 'checkbox-group':
        return (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...field.options];
                    newOptions[optionIndex] = e.target.value;
                    updateField(field.id, { options: newOptions });
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder={`Option ${optionIndex + 1}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newOptions = field.options.filter((_, i) => i !== optionIndex);
                    updateField(field.id, { options: newOptions });
                  }}
                  className="p-2 text-red-600 hover:bg-red-100 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newOptions = [...field.options, `Option ${field.options.length + 1}`];
                updateField(field.id, { options: newOptions });
              }}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              <Plus size={14} />
              Add Option
            </button>
          </div>
        );

      case 'radio-image':
        return (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Options</label>
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex gap-2 mb-3 p-3 border rounded">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={option.value}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[optionIndex] = { ...option, value: e.target.value };
                      updateField(field.id, { options: newOptions });
                    }}
                    className="p-2 border border-gray-300 rounded text-sm"
                    placeholder="Value"
                  />
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[optionIndex] = { ...option, label: e.target.value };
                      updateField(field.id, { options: newOptions });
                    }}
                    className="p-2 border border-gray-300 rounded text-sm"
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={option.image}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[optionIndex] = { ...option, image: e.target.value };
                      updateField(field.id, { options: newOptions });
                    }}
                    className="p-2 border border-gray-300 rounded text-sm col-span-2"
                    placeholder="Image URL"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newOptions = field.options.filter((_, i) => i !== optionIndex);
                    updateField(field.id, { options: newOptions });
                  }}
                  className="p-2 text-red-600 hover:bg-red-100 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newOptions = [...field.options, { value: '', label: '', image: '' }];
                updateField(field.id, { options: newOptions });
              }}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              <Plus size={14} />
              Add Image Option
            </button>
          </div>
        );

      case 'calculation':
        return (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Formula</label>
            <input
              type="text"
              value={field.calculation?.formula || ''}
              onChange={(e) => updateField(field.id, { 
                calculation: { ...field.calculation, formula: e.target.value } 
              })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="e.g., field1 * field2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use field IDs in formulas. Example: {`{quantity} * {price}`}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Configuration */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Settings size={16} />
          Form Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="multi-step"
              checked={formConfig.enableMultiStep}
              onChange={(e) => updateForm(fields, { 
                ...formConfig, 
                enableMultiStep: e.target.checked 
              })}
              className="mr-2"
            />
            <label htmlFor="multi-step" className="text-sm font-medium text-gray-700">
              Enable Multi-Step Form
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="calculations"
              checked={formConfig.enableCalculations}
              onChange={(e) => updateForm(fields, { 
                ...formConfig, 
                enableCalculations: e.target.checked 
              })}
              className="mr-2"
            />
            <label htmlFor="calculations" className="text-sm font-medium text-gray-700">
              Enable Calculations
            </label>
          </div>
        </div>

        {formConfig.enableMultiStep && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Form Steps</label>
            {formConfig.steps.map((step, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => {
                    const newSteps = [...formConfig.steps];
                    newSteps[index] = e.target.value;
                    updateForm(fields, { ...formConfig, steps: newSteps });
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder={`Step ${index + 1} title`}
                />
                {formConfig.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newSteps = formConfig.steps.filter((_, i) => i !== index);
                      updateForm(fields, { ...formConfig, steps: newSteps });
                    }}
                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newSteps = [...formConfig.steps, `Step ${formConfig.steps.length + 1}`];
                updateForm(fields, { ...formConfig, steps: newSteps });
              }}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              <Plus size={14} />
              Add Step
            </button>
          </div>
        )}
      </div>

      {/* Templates */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Layers size={16} />
          Form Templates
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(formTemplates).map(([key, template]) => (
            <button
              key={key}
              type="button"
              onClick={() => applyTemplate(key)}
              className="p-3 border border-gray-200 rounded text-sm hover:bg-gray-50 text-left"
            >
              <div className="font-medium">{template.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {template.fields.length} fields
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor Tabs */}
      <div className="border rounded-lg bg-white">
        <div className="border-b">
          <nav className="flex -mb-px">
            {['fields', 'preview', 'calculations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'fields' && 'Form Fields'}
                {tab === 'preview' && 'Live Preview'}
                {tab === 'calculations' && 'Calculations'}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'fields' && (
            <div className="space-y-4">
              {/* Add Field Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {fieldTypes.map((fieldType) => (
                  <button
                    key={fieldType.type}
                    type="button"
                    onClick={() => addField(fieldType.type)}
                    className="flex flex-col items-center gap-1 p-3 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{fieldType.icon}</span>
                    <span>{fieldType.name}</span>
                  </button>
                ))}
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
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-4">Live Form Preview</h3>
              <div className="bg-white p-6 rounded border max-w-2xl mx-auto">
                <FormPreview 
                  fields={fields} 
                  formConfig={formConfig} 
                  selectedField={selectedField}
                  onFieldSelect={setSelectedField}
                />
              </div>
            </div>
          )}

          {activeTab === 'calculations' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Formula Testing</h3>
                <button
                  type="button"
                  onClick={() => setShowFormulaTester(!showFormulaTester)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  <TestTube size={14} />
                  {showFormulaTester ? 'Hide Tester' : 'Show Tester'}
                </button>
              </div>

              {showFormulaTester && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Formula
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={testFormula}
                      onChange={(e) => setTestFormula(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="Enter formula to test"
                    />
                    <button
                      type="button"
                      onClick={testCalculationFormula}
                      className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Test
                    </button>
                  </div>
                  {testResult && (
                    <div className="p-2 bg-white border rounded text-sm font-mono">
                      {testResult}
                    </div>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Available Fields for Calculations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {fields.filter(f => f.type === 'number' || f.type === 'calculation').map(field => (
                    <div key={field.id} className="p-2 border rounded text-sm bg-white">
                      <code>{`{${field.id}}`}</code> - {field.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Preview component for live form preview
const FormPreview = ({ fields, formConfig, selectedField, onFieldSelect }) => {
  const [formValues, setFormValues] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (fieldId, value) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const renderPreviewField = (field) => {
    const commonProps = {
      id: field.id,
      name: field.id,
      required: field.required,
      placeholder: field.placeholder,
      value: formValues[field.id] || '',
      onChange: (e) => handleChange(field.id, e.target.value),
      className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        selectedField === field.id ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300'
      }`
    };

    switch (field.type) {
      case 'section':
        return (
          <div 
            className={`border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 ${
              selectedField === field.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onFieldSelect(field.id)}
          >
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
                  id={`preview-${field.id}-${index}`}
                  name={`preview-${field.id}`}
                  value={option}
                  checked={formValues[field.id] === option}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={`preview-${field.id}-${index}`} className="text-sm">
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
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  formValues[field.id] === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`preview-${field.id}`}
                  value={option.value}
                  checked={formValues[field.id] === option.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="h-16 bg-gray-100 rounded mb-2 flex items-center justify-center">
                    {option.image ? (
                      <img 
                        src={option.image} 
                        alt={option.label}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Image size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div className="text-sm font-medium">{option.label}</div>
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
              id={`preview-${field.id}`}
              checked={formValues[field.id] || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
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
              {...commonProps}
              min={field.validation?.min || 0}
              max={field.validation?.max || 100}
              step={field.step || 1}
            />
            {field.showValue && (
              <div className="text-sm text-gray-500 text-center mt-2">
                Value: {formValues[field.id] || (field.validation?.min || 0)}
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
          />
        );

      case 'calculation':
        return (
          <input
            type="text"
            {...commonProps}
            value={formValues[field.id] || '0'}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        );

      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  const currentStepFields = fields.filter(field => 
    (!formConfig.enableMultiStep || field.step === currentStep) &&
    field.type !== 'section'
  );

  return (
    <div onClick={() => onFieldSelect(null)}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {formConfig.title}
      </h2>

      {/* Multi-step navigation */}
      {formConfig.enableMultiStep && formConfig.steps.length > 1 && (
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {formConfig.steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentStep(index + 1);
                  }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep === index + 1
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : currentStep > index + 1
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {index + 1}
                </button>
                <span className={`ml-2 text-sm ${
                  currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < formConfig.steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <form className="space-y-6">
        {fields
          .filter(field => !formConfig.enableMultiStep || field.step === currentStep)
          .map((field) => (
            <div 
              key={field.id} 
              className={`space-y-2 ${
                field.type === 'section' ? 'cursor-pointer' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onFieldSelect(field.id);
              }}
            >
              {field.type !== 'section' && (
                <label 
                  htmlFor={field.id} 
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
              {renderPreviewField(field)}
            </div>
          ))}

        <div className="flex justify-between pt-6">
          {formConfig.enableMultiStep && currentStep > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentStep(currentStep - 1);
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          
          <button
            type="button"
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
              formConfig.enableMultiStep && currentStep < formConfig.steps.length 
                ? 'ml-auto' 
                : 'w-full'
            }`}
          >
            {formConfig.enableMultiStep && currentStep < formConfig.steps.length 
              ? 'Next' 
              : formConfig.submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedFormEditor;