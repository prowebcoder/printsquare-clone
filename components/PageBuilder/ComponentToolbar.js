// components/PageBuilder/ComponentToolbar.js
import { useState } from 'react';
import { getComponentIcon } from './utils/componentUtils';

const ComponentToolbar = ({ onAddComponent }) => {
  const [activeCategory, setActiveCategory] = useState('premium');

  const componentCategories = {
    premium: [
      // About Pages
      { type: 'aboutHero', name: 'About Hero', category: 'About' },
      { type: 'aboutUs', name: 'About Us', category: 'About' },
      { type: 'freeSample', name: 'Image with Text', category: 'Services' },
      
      // Homepage Components
      { type: 'heroBanner', name: 'Hero Banner', category: 'Home' },
      { type: 'imageBanner', name: 'Image Banner', category: 'Home' },
      { type: 'imageBannerTwo', name: 'Image Banner 2', category: 'Home' },
      { type: 'method', name: 'Proof Method', category: 'Services' },
      { type: 'notice', name: 'Notices', category: 'Content' },
      { type: 'orderProcess', name: 'Order Process', category: 'Services' },
      { type: 'portfolio', name: 'Portfolio', category: 'Showcase' },
      { type: 'pricing', name: 'Pricing', category: 'Services' },
      { type: 'quickGuides', name: 'Quick Guides', category: 'Resources' },
      { type: 'videoBanner', name: 'Video Banner', category: 'Home' },
      { type: 'multiColumn', name: 'Multi Column', category: 'Layout' },
      
      // Form Components
      { type: 'form', name: 'Basic Form', category: 'Forms' },
    ],
    basic: [
      { type: 'text', name: 'Text', category: 'Basic' },
      { type: 'heading', name: 'Heading', category: 'Basic' },
      { type: 'hero', name: 'Hero', category: 'Basic' },
      { type: 'image', name: 'Image', category: 'Basic' },
    ]
  };

  // Group premium components by category
  const premiumByCategory = componentCategories.premium.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = [];
    acc[comp.category].push(comp);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveCategory('premium')}
          className={`px-4 py-2 font-medium text-sm ${
            activeCategory === 'premium'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Premium Components
        </button>
        <button
          onClick={() => setActiveCategory('basic')}
          className={`px-4 py-2 font-medium text-sm ${
            activeCategory === 'basic'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Basic Components
        </button>
      </div>

      {/* Components Grid */}
      <div className="max-h-60 overflow-y-auto">
        {activeCategory === 'premium' ? (
          <div className="space-y-4">
            {Object.entries(premiumByCategory).map(([category, comps]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {comps.map((comp) => (
                    <button 
                      key={comp.type}
                      onClick={() => onAddComponent(comp.type)} 
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
                    >
                      <span className="text-gray-600">
                        {getComponentIcon(comp.type)}
                      </span>
                      <span className="text-gray-800">{comp.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {componentCategories.basic.map((comp) => (
              <button 
                key={comp.type}
                onClick={() => onAddComponent(comp.type)} 
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <span className="text-gray-600">
                  {getComponentIcon(comp.type)}
                </span>
                <span className="text-gray-800">{comp.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentToolbar;