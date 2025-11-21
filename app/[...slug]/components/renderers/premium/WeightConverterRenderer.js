// app/[...slug]/components/renderers/premium/WeightConverterRenderer.js
export default function WeightConverterRenderer({ component, index }) {
  const content = component.content || {};
  const { title = 'Paper Weight Converter', description = 'Convert between pounds (lbs) and grams per square meter (gsm) for different paper types.', conversionOption = 'lbsToGsm', weight = '', results = {} } = content;

  const paperTypes = [
    { key: 'text', name: 'Text' },
    { key: 'cover', name: 'Cover' },
    { key: 'index', name: 'Index' },
    { key: 'vellum', name: 'Vellum' },
    { key: 'tag', name: 'Tag' }
  ];

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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  disabled
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
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  placeholder="Enter weight"
                  disabled
                />
              </div>

              <button
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                disabled
              >
                Convert
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Conversion Results
              </h3>
              <div className="space-y-3">
                {paperTypes.map((paperType) => (
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

        {/* Info Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Note: This is a display preview. Use the page editor to configure the converter.
          </p>
        </div>
      </div>
    </section>
  );
}