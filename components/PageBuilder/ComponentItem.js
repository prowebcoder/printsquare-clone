// components/PageBuilder/ComponentItem.js
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { getComponentIcon, getComponentCategory } from './utils/componentUtils';
import ComponentEditor from './editors/ComponentEditor';

const ComponentItem = ({ 
  component, 
  index, 
  totalComponents,
  onMove, 
  onRemove, 
  onUpdateContent,
  onUpdateStyles 
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4 pb-3 border-b">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded ${
            getComponentCategory(component.type) !== 'basic' 
              ? 'bg-purple-100 text-purple-600' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            {getComponentIcon(component.type)}
          </div>
          <div>
            <span className="font-medium capitalize text-gray-700">{component.type}</span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">
              Order: {index + 1}
            </span>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded ml-1">
              {getComponentCategory(component.type)}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => onMove(index, 'up')} 
            disabled={index === 0}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowUp size={16} />
          </button>
          <button 
            onClick={() => onMove(index, 'down')} 
            disabled={index === totalComponents - 1}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowDown size={16} />
          </button>
          <button 
            onClick={() => onRemove(component.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <ComponentEditor
        component={component}
        onUpdateContent={onUpdateContent}
        onUpdateStyles={onUpdateStyles}
      />
    </div>
  );
};

export default ComponentItem;