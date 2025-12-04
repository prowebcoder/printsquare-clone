"use client";  // Add this at the top since we're using React state

import { useState, useEffect } from 'react';

export default function WeightConverterRenderer({ component, index }) {
  const content = component.content || {};
  const { title = 'Paper Weight Converter', description = 'Convert between pounds (lbs) and grams per square meter (gsm) for different paper types.' } = content;

  // Use local state for interactive elements
  const [conversionOption, setConversionOption] = useState(content.conversionOption || 'lbsToGsm');
  const [weight, setWeight] = useState(content.weight || '');
  const [results, setResults] = useState(content.results || {});

  // Paper type conversion factors (same as in editor)
  const paperTypes = {
    text: { name: 'Text', lbsToGsmFactor: 1.4805, gsmToLbsFactor: 0.6754 },
    cover: { name: 'Cover', lbsToGsmFactor: 2.7048, gsmToLbsFactor: 0.3697 },
    index: { name: 'Index', lbsToGsmFactor: 1.8078, gsmToLbsFactor: 0.5532 },
    vellum: { name: 'Vellum', lbsToGsmFactor: 2.1942, gsmToLbsFactor: 0.4557 },
    tag: { name: 'Tag', lbsToGsmFactor: 1.6279, gsmToLbsFactor: 0.6143 }
  };

  // Update state when content changes (if component is edited in admin)
  useEffect(() => {
    setConversionOption(content.conversionOption || 'lbsToGsm');
    setWeight(content.weight || '');
    setResults(content.results || {});
  }, [content]);

  const handleConvert = () => {
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setResults({});
      return;
    }

    const newResults = {};
    
    Object.keys(paperTypes).forEach(type => {
      if (conversionOption === 'lbsToGsm') {
        newResults[type] = (weightValue * paperTypes[type].lbsToGsmFactor).toFixed(2);
      } else {
        newResults[type] = (weightValue * paperTypes[type].gsmToLbsFactor).toFixed(2);
      }
    });

    setResults(newResults);
  };

  const paperTypeList = [
    { key: 'text', name: 'Text' },
    { key: 'cover', name: 'Cover' },
    { key: 'index', name: 'Index' },
    { key: 'vellum', name: 'Vellum' },
    { key: 'tag', name: 'Tag' }
  ];

  // Handle Enter key press for conversion
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <section key={component.id || index} className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Converter Interface */}
        <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conversion Option
                </label>
                <select
                  value={conversionOption}
                  onChange={(e) => setConversionOption(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="lbsToGsm">lbs to gsm</option>
                  <option value="gsmToLbs">gsm to lbs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter weight"
                  min="0"
                  step="0.01"
                />
              </div>

              <button
                onClick={handleConvert}
                disabled={!weight || parseFloat(weight) <= 0}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Convert
              </button>
              
              <div className="text-sm text-gray-500">
                <p>Press Enter or click Convert to calculate</p>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Conversion Results
              </h3>
              <div className="space-y-3">
                {paperTypeList.map((paperType) => (
                  <div key={paperType.key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{paperType.name}</span>
                    <span className="text-gray-900 font-mono text-lg">
                      {results[paperType.key] || '0.00'}
                    </span>
                  </div>
                ))}
              </div>

              {Object.keys(results).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Results will appear here</p>
                  <p className="text-sm mt-1">Enter weight and click convert</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conversion Factors Info */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="text-lg font-medium text-blue-800 mb-3">How It Works</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <p>This converter uses different factors for each paper type because paper thickness varies:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Text:</strong> 1 lb = 1.4805 gsm | 1 gsm = 0.6754 lb</li>
              <li><strong>Cover:</strong> 1 lb = 2.7048 gsm | 1 gsm = 0.3697 lb</li>
              <li><strong>Index:</strong> 1 lb = 1.8078 gsm | 1 gsm = 0.5532 lb</li>
              <li><strong>Vellum:</strong> 1 lb = 2.1942 gsm | 1 gsm = 0.4557 lb</li>
              <li><strong>Tag:</strong> 1 lb = 1.6279 gsm | 1 gsm = 0.6143 lb</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}