// components/PageBuilder/PageBuilder.js
'use client';
import { useState, useEffect, useCallback } from 'react';
import ComponentToolbar from './ComponentToolbar';
import ComponentList from './ComponentList';
import { getDefaultContent, getDefaultStyles } from './utils/componentDefaults';

export default function PageBuilder({ onComponentsChange, initialComponents = [] }) {
  const [components, setComponents] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize components properly
  useEffect(() => {
    if (!isInitialized && initialComponents) {
      console.log('🔄 Initializing PageBuilder with:', initialComponents);
      
      const processedComponents = Array.isArray(initialComponents) 
        ? initialComponents.map((comp, index) => ({
            ...comp,
            id: comp.id || `comp-${Date.now()}-${index}`,
            order: comp.order || index,
            styles: comp.styles || getDefaultStyles(comp.type)
          }))
        : [];
      
      setComponents(processedComponents);
      setIsInitialized(true);
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
    const newComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      order: components.length
    };
    
    setComponents(prev => [...prev, newComponent]);
  }, [components.length]);

  const updateComponentContent = useCallback((id, contentUpdates) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { 
        ...comp, 
        content: { ...comp.content, ...contentUpdates } 
      } : comp
    ));
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
    setComponents(prev => prev.filter(comp => comp.id !== id));
  }, []);

  const moveComponent = useCallback((index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === components.length - 1)) return;
    
    const newIndex = direction === 'up' ? index - 1 : direction === 'down' ? index + 1 : index;
    const newComponents = [...components];
    [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
    setComponents(newComponents);
  }, [components]);

  return (
    <div className="space-y-6">
      <ComponentToolbar onAddComponent={addComponent} />
      
      <ComponentList
        components={components}
        onMoveComponent={moveComponent}
        onRemoveComponent={removeComponent}
        onUpdateComponentContent={updateComponentContent}
        onUpdateComponentStyles={updateComponentStyles}
      />
    </div>
  );
}