// components/pages/quote/saddle-stitching/SaddleStitchingForm.js
import React, { useState, useEffect } from 'react';

const DEFAULT_FORM_CONFIG = {
  general: {
    title: "Saddle Stitching Quote",
    description: "Configure your perfect booklet with our professional saddle stitching services.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  sizes: ['5.5 x 8.5', '8.5 x 11', '11 x 17', 'Custom Size'],
  quantities: [100, 250, 500, 1000, 2500, 5000],
};

export default function SaddleStitchingForm() {
  const [formConfig, setFormConfig] = useState(DEFAULT_FORM_CONFIG);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('8.5 x 11');
  const [quantity, setQuantity] = useState(500);

  useEffect(() => {
    fetchFormConfig();
  }, []);

  const fetchFormConfig = async () => {
    try {
      const res = await fetch('/api/forms/saddle-quote');
      if (res.ok) {
        const config = await res.json();
        if (config && Object.keys(config).length > 0) {
          setFormConfig({
            ...DEFAULT_FORM_CONFIG,
            ...config,
            general: { ...DEFAULT_FORM_CONFIG.general, ...config.general }
          });
        }
      }
    } catch (error) {
      console.error('Error fetching form config:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {formConfig.general.title}
        </h1>
        <p className="text-lg text-gray-600">
          {formConfig.general.description}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Booklet Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              {formConfig.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              {formConfig.quantities.map(qty => (
                <option key={qty} value={qty}>{qty.toLocaleString()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
          {formConfig.general.submitButtonText}
        </button>
      </div>
    </div>
  );
}