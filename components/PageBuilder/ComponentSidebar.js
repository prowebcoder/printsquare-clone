// components/PageBuilder/ComponentSidebar.js
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Copy, GripVertical } from 'lucide-react';
import { getComponentIcon } from './utils/componentUtils';

const SortableComponentItem = ({ 
  component, 
  index,
  isSelected,
  onSelect, 
  onRemove,
  onDuplicate
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getComponentDisplayName = (component) => {
    const nameMap = {
      'text': 'Text',
      'heading': 'Heading',
      'hero': 'Hero',
      'image': 'Image',
      'aboutHero': 'About Hero',
      'aboutUs': 'About Us',
      'freeSample': 'Image with Text',
      'heroBanner': 'Hero Banner',
      'imageBanner': 'Image Banner',
      'imageBannerTwo': 'Image Banner 2',
      'method': 'Proof Method',
      'notice': 'Notices',
      'orderProcess': 'Order Process',
      'portfolio': 'Portfolio',
      'pricing': 'Pricing',
      'quickGuides': 'Quick Guides',
      'videoBanner': 'Video Banner',
      'videoWithText': 'Video with Text',
      'form': 'Basic Form',
      'multiColumn': 'Multi Column',
      'weightCalculator': 'Weight Calculator',
      'multiTable': 'Tables',
      'tabsFaq': 'FAQ Tabs',
      'tabsGallery': 'Tabs Gallery',
      'serviceBox': 'Service Box',
      'textBox': 'Text Box',
      'contactUs': 'Contact Us',
      'portfolioShowcase': 'Portfolio Showcase',
    };
    
    return nameMap[component.type] || component.type;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg p-3 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onSelect(component.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            {...attributes}
            {...listeners}
            className="text-gray-400 flex-shrink-0 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} />
          </div>
          <div className={`p-2 rounded ${
            component.type !== 'text' && component.type !== 'heading' && component.type !== 'hero' && component.type !== 'image'
              ? 'bg-purple-100 text-purple-600' 
              : 'bg-blue-100 text-blue-600'
          } flex-shrink-0`}>
            {getComponentIcon(component.type)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm text-gray-800 truncate">
              {getComponentDisplayName(component)}
            </div>
            <div className="text-xs text-gray-500">
              Order: {index + 1}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(component.id);
            }}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
            title="Duplicate"
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove(component.id);
            }}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ComponentSidebar = ({ 
  components, 
  selectedComponent,
  onSelectComponent, 
  onRemoveComponent,
  onDuplicateComponent
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Page Components ({components.length})</h3>
      
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {components.map((component, index) => (
          <SortableComponentItem
            key={component.id}
            component={component}
            index={index}
            isSelected={selectedComponent === component.id}
            onSelect={onSelectComponent}
            onRemove={onRemoveComponent}
            onDuplicate={onDuplicateComponent}
          />
        ))}
        
        {components.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-sm">No components added yet</p>
            <p className="text-xs mt-1">Use the toolbar above to add components</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentSidebar;