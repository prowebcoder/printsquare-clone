// components/PageBuilder/ComponentList.js
import { Layout } from 'lucide-react';
import ComponentItem from './ComponentItem';

const ComponentList = ({ 
  components, 
  onMoveComponent, 
  onRemoveComponent, 
  onUpdateComponentContent,
  onUpdateComponentStyles 
}) => {
  return (
    <div className="space-y-4">
      {components.map((component, index) => (
        <ComponentItem
          key={component.id}
          component={component}
          index={index}
          totalComponents={components.length}
          onMove={onMoveComponent}
          onRemove={onRemoveComponent}
          onUpdateContent={onUpdateComponentContent}
          onUpdateStyles={onUpdateComponentStyles}
        />
      ))}
      
      {components.length === 0 && (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <Layout size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No components added yet</p>
          <p className="text-sm">Use the toolbar above to add components to your page</p>
        </div>
      )}
    </div>
  );
};

export default ComponentList;