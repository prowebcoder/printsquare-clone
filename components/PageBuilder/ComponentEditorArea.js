// components/PageBuilder/ComponentEditorArea.js
import ComponentEditor from './editors/ComponentEditor';
import StyleEditor from './editors/StyleEditor';

const ComponentEditorArea = ({ component, onUpdateContent, onUpdateStyles }) => {
  if (!component) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-lg font-medium">Select a component to edit</p>
          <p className="text-sm mt-2">Choose a component from the sidebar to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-2 rounded bg-blue-100 text-blue-600">
          {getComponentIcon(component.type)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 capitalize">{component.type}</h3>
          <p className="text-sm text-gray-500">Editing component</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <ComponentEditor
          component={component}
          onUpdateContent={onUpdateContent}
          onUpdateStyles={onUpdateStyles}
        />
        
        <StyleEditor 
          styles={component.styles} 
          onUpdate={(updates) => onUpdateStyles(component.id, updates)} 
        />
      </div>
    </div>
  );
};

// Helper function to get component icon (reuse from componentUtils)
const getComponentIcon = (type) => {
  const icons = {
    text: '📝',
    heading: '🔤',
    hero: '⭐',
    image: '🖼️',
    aboutHero: '👥',
    aboutUs: '🏢',
    freeSample: '📦',
    heroBanner: '🎯',
    imageBanner: '🖼️',
    imageBannerTwo: '🖼️',
    method: '📋',
    notice: '📢',
    orderProcess: '🛒',
    portfolio: '📚',
    pricing: '💰',
    quickGuides: '📖',
    videoBanner: '🎬',
    videoWithText: '🎥',
    form: '📄',
    multiColumn: '📊',
    weightConverter: '🧮',
    multiTable: '📋',
    tabsFaq: '❓',
    tabsGallery: '� tabs',
    serviceBox: '🗂️',
    textBox: '📄',
    contactUs: '📞',
  };
  return icons[type] || '📄';
};

export default ComponentEditorArea;