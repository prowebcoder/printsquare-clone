// components/PageBuilder/ComponentToolbar.js
import { getComponentIcon } from './utils/componentUtils';

const ComponentToolbar = ({ onAddComponent }) => {
  const premiumComponents = [
    // About Pages
    { type: 'aboutHero', name: 'About Hero', category: 'About' },
    { type: 'aboutUs', name: 'About Us', category: 'About' },
    { type: 'freeSample', name: 'Free Sample', category: 'Services' },
    
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
    
    // Form Components
    { type: 'form', name: 'Basic Form', category: 'Forms' },
   
  ];

  const basicComponents = [
    { type: 'text', name: 'Text', category: 'Basic' },
    { type: 'heading', name: 'Heading', category: 'Basic' },
    { type: 'hero', name: 'Hero', category: 'Basic' },
    { type: 'image', name: 'Image', category: 'Basic' },
  ];

  // Group premium components by category
  const premiumByCategory = premiumComponents.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = [];
    acc[comp.category].push(comp);
    return acc;
  }, {});

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Components</h3>
      
      {/* Premium Components by Category */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">Premium Components</h4>
        {Object.entries(premiumByCategory).map(([category, comps]) => (
          <div key={category} className="mb-4">
            <h5 className="text-sm font-medium text-gray-600 mb-2 px-1">{category}</h5>
            <div className="flex flex-wrap gap-2">
              {comps.map((comp) => (
                <button 
                  key={comp.type}
                  onClick={() => onAddComponent(comp.type)} 
                  className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg transition-all duration-200 text-sm shadow-sm hover:shadow-md ${
                    comp.category === 'Forms' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
                  }`}
                >
                  {getComponentIcon(comp.type)}
                  {comp.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Basic Components */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Basic Components</h4>
        <div className="flex flex-wrap gap-2">
          {basicComponents.map((comp) => (
            <button 
              key={comp.type}
              onClick={() => onAddComponent(comp.type)} 
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
            >
              {getComponentIcon(comp.type)}
              {comp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Component Descriptions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-md font-medium text-gray-700 mb-2">Form Components</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>• Basic Form</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Simple Forms</span>
          </div>
          <div className="flex justify-between items-center">
            <span>• Advanced Form</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Multi-step • Calculations • Conditional Logic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentToolbar;