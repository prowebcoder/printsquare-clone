// components/PageBuilder/editors/WeightConverterEditor.js
"use client";

import { useState } from 'react';

const WeightConverterEditor = ({ component, onUpdate }) => {
  const [conversionOption, setConversionOption] = useState(component.content?.conversionOption || 'lbsToGsm');
  const [weight, setWeight] = useState(component.content?.weight || '');
  
  // Paper type conversion factors (based on your example data)
  const paperTypes = {
    text: { name: 'Text', lbsToGsmFactor: 1.4805, gsmToLbsFactor: 0.6754 },
    cover: { name: 'Cover', lbsToGsmFactor: 2.7048, gsmToLbsFactor: 0.3697 },
    index: { name: 'Index', lbsToGsmFactor: 1.8078, gsmToLbsFactor: 0.5532 },
    vellum: { name: 'Vellum', lbsToGsmFactor: 2.1942, gsmToLbsFactor: 0.4557 },
    tag: { name: 'Tag', lbsToGsmFactor: 1.6279, gsmToLbsFactor: 0.6143 }
  };

  const handleConversionOptionChange = (value) => {
    setConversionOption(value);
    onUpdate(component.id, { 
      ...component.content,
      conversionOption: value 
    });
  };

  const handleWeightChange = (value) => {
    setWeight(value);
    onUpdate(component.id, { 
      ...component.content,
      weight: value 
    });
  };

  const handleConvert = () => {
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) return;

    const results = {};
    
    Object.keys(paperTypes).forEach(type => {
      if (conversionOption === 'lbsToGsm') {
        results[type] = (weightValue * paperTypes[type].lbsToGsmFactor).toFixed(2);
      } else {
        results[type] = (weightValue * paperTypes[type].gsmToLbsFactor).toFixed(2);
      }
    });

    onUpdate(component.id, { 
      ...component.content,
      conversionOption,
      weight,
      results
    });
  };

  const handleTitleChange = (value) => {
    onUpdate(component.id, { 
      ...component.content,
      title: value 
    });
  };

  const handleDescriptionChange = (value) => {
    onUpdate(component.id, { 
      ...component.content,
      description: value 
    });
  };

  return (
    <div className="space-y-6">
      {/* Component Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Component Title
        </label>
        <input
          type="text"
          value={component.content?.title || 'Paper Weight Converter'}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter component title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={component.content?.description || 'Convert between pounds (lbs) and grams per square meter (gsm) for different paper types.'}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Enter description"
        />
      </div>

      {/* Converter Settings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Converter Settings</h3>
        
        {/* Conversion Option */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Option
          </label>
          <select
            value={conversionOption}
            onChange={(e) => handleConversionOptionChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="lbsToGsm">lbs to gsm</option>
            <option value="gsmToLbs">gsm to lbs</option>
          </select>
        </div>

        {/* Weight Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => handleWeightChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter weight"
            min="0"
            step="0.01"
          />
        </div>

        {/* Convert Button */}
        <button
          type="button"
          onClick={handleConvert}
          disabled={!weight || parseFloat(weight) <= 0}
          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Convert
        </button>

        <p className="text-xs text-gray-500 mt-2">
          Enter a weight value and click Convert to see the results
        </p>
      </div>

      {/* Results Preview */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="text-sm font-medium text-green-800 mb-3">Results Preview</h4>
        
        <div className="space-y-3">
          {Object.keys(paperTypes).map((type) => (
            <div key={type} className="flex items-center justify-between p-3 bg-white rounded border">
              <span className="font-medium text-gray-700 capitalize">{paperTypes[type].name}</span>
              <span className="text-gray-900 font-mono">
                {component.content?.results?.[type] || '0.00'}
              </span>
            </div>
          ))}
        </div>

        {(!component.content?.results || Object.keys(component.content.results).length === 0) && (
          <div className="text-center py-4 text-green-600">
            Results will appear here after conversion
          </div>
        )}
      </div>

      {/* Conversion Factors Info */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Conversion Factors</h4>
        <div className="text-xs text-blue-700 space-y-1">
          <p><strong>Text:</strong> 1 lb = 1.4805 gsm | 1 gsm = 0.6754 lb</p>
          <p><strong>Cover:</strong> 1 lb = 2.7048 gsm | 1 gsm = 0.3697 lb</p>
          <p><strong>Index:</strong> 1 lb = 1.8078 gsm | 1 gsm = 0.5532 lb</p>
          <p><strong>Vellum:</strong> 1 lb = 2.1942 gsm | 1 gsm = 0.4557 lb</p>
          <p><strong>Tag:</strong> 1 lb = 1.6279 gsm | 1 gsm = 0.6143 lb</p>
        </div>
      </div>
    </div>
  );
};

export default WeightConverterEditor;