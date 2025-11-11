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
    { type: 'form', name: 'Advanced Form', category: 'Forms' },
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
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
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
    </div>
  );
};

export default ComponentToolbar;