// components/PageBuilder/PageBuilder.js
'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ComponentToolbar from './ComponentToolbar';
import ComponentSidebar from './ComponentSidebar';
import ComponentEditorArea from './ComponentEditorArea';
import { getDefaultContent, getDefaultStyles } from './utils/componentDefaults';

export default function PageBuilder({ onComponentsChange, initialComponents = [] }) {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize components properly
   useEffect(() => {
    if (!isInitialized && initialComponents) {
      console.log('🔄 Initializing PageBuilder with:', initialComponents);
      
      const processedComponents = Array.isArray(initialComponents) 
        ? initialComponents.map((comp, index) => ({
            ...comp,
            id: comp.id || `comp-${Date.now()}-${index}`,
            order: comp.order || index,
            styles: comp.styles || getDefaultStyles(comp.type),
            content: comp.content || getDefaultContent(comp.type)
          }))
        : [];
      
      setComponents(processedComponents);
      setIsInitialized(true);
      
      // Select first component if available
      if (processedComponents.length > 0) {
        setSelectedComponent(processedComponents[0].id);
      }
    }
  }, [initialComponents, isInitialized]);

  // Notify parent of changes
  useEffect(() => {
    if (isInitialized) {
      console.log('📤 Sending components to parent:', components);
      onComponentsChange(components);
    }
  }, [components, onComponentsChange, isInitialized]);

  const addComponent = useCallback((type) => {
    console.log('🔄 Adding component type:', type);
    
    const defaultContent = getDefaultContent(type);
    const defaultStyles = getDefaultStyles(type);

    if (type === 'tabsFaq') {
      if (!defaultContent.tabs || defaultContent.tabs.length === 0) {
        defaultContent.tabs = [
          {
            name: 'ORDER',
            faqs: [
              {
                question: 'Terms of Portfolio usage agreement',
                answer: 'All designs and content submitted for printing remain the intellectual property of the client. Print Seoul only uses them for printing and delivery purposes.'
              }
            ]
          }
        ];
      }
    }
  
  const newComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      content: defaultContent,
      styles: defaultStyles,
      order: components.length
    };
    
    console.log('✅ New component created:', newComponent);
    
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    setSelectedComponent(newComponent.id);
  }, [components.length]);

 const updateComponentContent = useCallback((id, contentUpdates) => {
  try {
    setComponents(prev => {
      if (!Array.isArray(prev)) {
        console.error('Components state is not an array:', prev);
        return prev;
      }
      
      return prev.map(comp => {
        if (comp.id === id) {
          return {
            ...comp,
            content: {
              ...(comp.content || {}),
              ...contentUpdates
            }
          };
        }
        return comp;
      });
    });
  } catch (error) {
    console.error('Error updating component content:', error);
  }
}, []);

  const updateComponentStyles = useCallback((id, styleUpdates) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { 
        ...comp, 
        styles: { ...comp.styles, ...styleUpdates } 
      } : comp
    ));
  }, []);

  const removeComponent = useCallback((id) => {
    setComponents(prev => {
      const newComponents = prev.filter(comp => comp.id !== id);
      
      // Update selection if needed
      if (selectedComponent === id) {
        if (newComponents.length > 0) {
          setSelectedComponent(newComponents[0].id);
        } else {
          setSelectedComponent(null);
        }
      }
      
      return newComponents;
    });
  }, [selectedComponent]);

  const duplicateComponent = useCallback((id) => {
    const componentToDuplicate = components.find(comp => comp.id === id);
    if (componentToDuplicate) {
      const duplicatedComponent = {
        ...componentToDuplicate,
        id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        order: components.length
      };
      
      const updatedComponents = [...components, duplicatedComponent];
      setComponents(updatedComponents);
      setSelectedComponent(duplicatedComponent.id);
    }
  }, [components]);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newComponents = arrayMove(items, oldIndex, newIndex);
        
        // Update orders
        return newComponents.map((comp, index) => ({
          ...comp,
          order: index
        }));
      });
    }
  }, []);

  const selectedComponentData = components.find(comp => comp.id === selectedComponent);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Components</h3>
        <ComponentToolbar onAddComponent={addComponent} />
      </div>
      
      <div className="flex gap-6 min-h-[600px]">
        {/* Sidebar - Component List */}
        <div className="w-1/3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={components} strategy={verticalListSortingStrategy}>
              <ComponentSidebar
                components={components}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                onRemoveComponent={removeComponent}
                onDuplicateComponent={duplicateComponent}
              />
            </SortableContext>
          </DndContext>
        </div>
        
        {/* Main Editor Area */}
        <div className="w-2/3">
          <ComponentEditorArea
            component={selectedComponentData}
            onUpdateContent={updateComponentContent}
            onUpdateStyles={updateComponentStyles}
          />
        </div>
      </div>
    </div>
  );
}