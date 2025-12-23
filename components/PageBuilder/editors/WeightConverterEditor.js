// components/PageBuilder/editors/WeightConverterEditor.js
"use client";

import { useState, useEffect } from 'react';

const WeightConverterEditor = ({ component, onUpdate }) => {
  const [title, setTitle] = useState(component.content?.title || 'Paper Weight Converter');
  const [description, setDescription] = useState(component.content?.description || 'Convert between pounds (lbs) and grams per square meter (gsm) for different paper types.');
  const [conversionOption, setConversionOption] = useState(component.content?.conversionOption || 'lbsToGsm');
  const [weight, setWeight] = useState(component.content?.weight || '');
  
  // Paper type conversion factors
  const paperTypes = {
    text: { name: 'Text', lbsToGsmFactor: 1.4805, gsmToLbsFactor: 0.6754 },
    cover: { name: 'Cover', lbsToGsmFactor: 2.7048, gsmToLbsFactor: 0.3697 },
    index: { name: 'Index', lbsToGsmFactor: 1.8078, gsmToLbsFactor: 0.5532 },
    vellum: { name: 'Vellum', lbsToGsmFactor: 2.1942, gsmToLbsFactor: 0.4557 },
    tag: { name: 'Tag', lbsToGsmFactor: 1.6279, gsmToLbsFactor: 0.6143 }
  };

  // Update local state when component prop changes
  useEffect(() => {
    if (component.content) {
      setTitle(component.content.title || 'Paper Weight Converter');
      setDescription(component.content.description || 'Convert between pounds (lbs) and grams per square meter (gsm) for different paper types.');
      setConversionOption(component.content.conversionOption || 'lbsToGsm');
      setWeight(component.content.weight || '');
    }
  }, [component.content]);

  const handleTitleChange = (value) => {
    setTitle(value);
    onUpdate(component.id, { 
      ...component.content,
      title: value 
    });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    onUpdate(component.id, { 
      ...component.content,
      description: value 
    });
  };

  const handleConversionOptionChange = (value) => {
    setConversionOption(value);
    onUpdate(component.id, { 
      ...component.content,
      conversionOption: value,
      results: {} // Clear results when option changes
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
    if (isNaN(weightValue) || weightValue <= 0) {
      onUpdate(component.id, { 
        ...component.content,
        results: {}
      });
      return;
    }

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

  const getUnitLabels = () => {
    if (conversionOption === 'lbsToGsm') {
      return { input: 'lbs', output: 'gsm' };
    }
    return { input: 'gsm', output: 'lbs' };
  };

  const unitLabels = getUnitLabels();

  return (
    <div className="space-y-6">
      {/* Component Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Component Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter component title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Enter description"
        />
      </div>

      {/* Converter Settings */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Converter Settings</h3>
        
        {/* Conversion Option */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Direction
          </label>
          <select
            value={conversionOption}
            onChange={(e) => handleConversionOptionChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="lbsToGsm">lbs → gsm (Pounds to Grams per square meter)</option>
            <option value="gsmToLbs">gsm → lbs (Grams per square meter to Pounds)</option>
          </select>
        </div>

        {/* Weight Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Weight in {unitLabels.input}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => handleWeightChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter default weight"
            min="0"
            step="0.01"
          />
          <p className="text-xs text-gray-500 mt-1">
            This will be the pre-filled value when users see the converter
          </p>
        </div>

        {/* Convert Button */}
        <button
          type="button"
          onClick={handleConvert}
          disabled={!weight || parseFloat(weight) <= 0}
          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate and Save Results
        </button>

        <p className="text-xs text-gray-500 mt-2">
          Click to calculate and save results for the default weight
        </p>
      </div>

      {/* Results Preview */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h4 className="text-lg font-medium text-green-800 mb-3">Results Preview ({unitLabels.output})</h4>
        
        {component.content?.results && Object.keys(component.content.results).length > 0 ? (
          <div className="space-y-3">
            {Object.keys(paperTypes).map((type) => (
              <div key={type} className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-100">
                <div>
                  <span className="font-medium text-gray-700">{paperTypes[type].name}</span>
                  <span className="text-sm text-gray-500 ml-2">Paper</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-900 font-mono text-lg block">
                    {component.content.results[type] || '0.00'}
                  </span>
                  <span className="text-sm text-gray-500">{unitLabels.output}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-green-600 bg-white rounded border border-green-100">
            <div className="text-2xl mb-2">📊</div>
            <p>No results calculated yet</p>
            <p className="text-sm mt-1">Enter a weight and click "Calculate and Save Results"</p>
          </div>
        )}
      </div>

      {/* Conversion Factors Info */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-medium text-blue-800 mb-3">Conversion Factors</h4>
        <div className="text-sm text-blue-700 space-y-2">
          <p>This converter uses industry-standard conversion factors:</p>
          <ul className="space-y-1">
            <li><strong>Text:</strong> 1 lb = 1.4805 gsm | 1 gsm = 0.6754 lb</li>
            <li><strong>Cover:</strong> 1 lb = 2.7048 gsm | 1 gsm = 0.3697 lb</li>
            <li><strong>Index:</strong> 1 lb = 1.8078 gsm | 1 gsm = 0.5532 lb</li>
            <li><strong>Vellum:</strong> 1 lb = 2.1942 gsm | 1 gsm = 0.4557 lb</li>
            <li><strong>Tag:</strong> 1 lb = 1.6279 gsm | 1 gsm = 0.6143 lb</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeightConverterEditor;