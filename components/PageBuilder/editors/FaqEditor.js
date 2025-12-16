// components/PageBuilder/editors/FaqEditor.js
"use client";

import { useState, useCallback } from 'react';
import { Plus, Minus, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

const FaqEditor = ({ component, onUpdate }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleFaqChange = useCallback((index, field, value) => {
    const newFaqItems = [...(component.content?.faqItems || [])];
    newFaqItems[index] = { ...newFaqItems[index], [field]: value };
    onUpdate(component.id, { faqItems: newFaqItems });
  }, [component.content?.faqItems, component.id, onUpdate]);

  const addFaqItem = useCallback(() => {
    const newFaqItems = [
      ...(component.content?.faqItems || []),
      {
        key: `faq-${Date.now()}`,
        question: '',
        answer: '',
        isOpen: false
      }
    ];
    onUpdate(component.id, { faqItems: newFaqItems });
  }, [component.content?.faqItems, component.id, onUpdate]);

  const removeFaqItem = useCallback((index) => {
    const newFaqItems = (component.content?.faqItems || []).filter((_, i) => i !== index);
    onUpdate(component.id, { faqItems: newFaqItems });
  }, [component.content?.faqItems, component.id, onUpdate]);

  const moveFaqItem = useCallback((index, direction) => {
    const newFaqItems = [...(component.content?.faqItems || [])];
    if (direction === 'up' && index > 0) {
      [newFaqItems[index], newFaqItems[index - 1]] = [newFaqItems[index - 1], newFaqItems[index]];
    } else if (direction === 'down' && index < newFaqItems.length - 1) {
      [newFaqItems[index], newFaqItems[index + 1]] = [newFaqItems[index + 1], newFaqItems[index]];
    }
    onUpdate(component.id, { faqItems: newFaqItems });
  }, [component.content?.faqItems, component.id, onUpdate]);

  const toggleAccordion = useCallback((index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  }, [openAccordion]);

  const handleFieldChange = useCallback((field, value) => {
    onUpdate(component.id, { [field]: value });
  }, [component.id, onUpdate]);

  // Memoize the content to prevent unnecessary re-renders
  const content = component.content || {};

  return (
    <div className="space-y-4 p-3">
      {/* Section Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Frequently Asked Questions"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.titleColor || '#0B1633'}
                onChange={(e) => handleFieldChange('titleColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.titleColor || '#0B1633'}
                onChange={(e) => handleFieldChange('titleColor', e.target.value)}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#0B1633"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Size</label>
            <select
              value={content.titleSize || 'text-3xl md:text-4xl'}
              onChange={(e) => handleFieldChange('titleSize', e.target.value)}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-2xl md:text-3xl">Small</option>
              <option value="text-3xl md:text-4xl">Medium</option>
              <option value="text-4xl md:text-5xl">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle/Description</label>
        <textarea
          value={content.subtitle || ''}
          onChange={(e) => handleFieldChange('subtitle', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Find answers to common questions about our services"
          rows="3"
        />
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Subtitle Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.subtitleColor || '#666666'}
              onChange={(e) => handleFieldChange('subtitleColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.subtitleColor || '#666666'}
              onChange={(e) => handleFieldChange('subtitleColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#666666"
            />
          </div>
        </div>
      </div>

      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <select
          value={content.backgroundType || 'solid'}
          onChange={(e) => handleFieldChange('backgroundType', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="none">None (Transparent)</option>
        </select>

        {content.backgroundType === 'solid' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.backgroundColor || '#FFFFFF'}
              onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.backgroundColor || '#FFFFFF'}
              onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        )}

        {content.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={content.gradientFrom || '#F8F9FB'}
                onChange={(e) => handleFieldChange('gradientFrom', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientFrom || '#F8F9FB'}
                onChange={(e) => handleFieldChange('gradientFrom', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#F8F9FB"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={content.gradientTo || '#FFFFFF'}
                onChange={(e) => handleFieldChange('gradientTo', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientTo || '#FFFFFF'}
                onChange={(e) => handleFieldChange('gradientTo', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        )}
      </div>

      {/* First Item Open Option */}
      <div className="flex items-center gap-2 p-3 border rounded-lg">
        <input
          type="checkbox"
          id="firstItemOpen"
          checked={content.firstItemOpen || false}
          onChange={(e) => handleFieldChange('firstItemOpen', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="firstItemOpen" className="text-sm font-medium text-gray-700">
          Open first FAQ item by default
        </label>
      </div>

      {/* Accordion Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.questionBgColor || '#F8F9FB'}
              onChange={(e) => handleFieldChange('questionBgColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.questionBgColor || '#F8F9FB'}
              onChange={(e) => handleFieldChange('questionBgColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#F8F9FB"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.questionTextColor || '#0B1633'}
              onChange={(e) => handleFieldChange('questionTextColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.questionTextColor || '#0B1633'}
              onChange={(e) => handleFieldChange('questionTextColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#0B1633"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Answer Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.answerBgColor || '#FFFFFF'}
              onChange={(e) => handleFieldChange('answerBgColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.answerBgColor || '#FFFFFF'}
              onChange={(e) => handleFieldChange('answerBgColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Answer Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.answerTextColor || '#666666'}
              onChange={(e) => handleFieldChange('answerTextColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.answerTextColor || '#666666'}
              onChange={(e) => handleFieldChange('answerTextColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#666666"
            />
          </div>
        </div>
      </div>

      {/* Accordion Icon Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accordion Icon Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={content.iconColor || '#E21B36'}
            onChange={(e) => handleFieldChange('iconColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={content.iconColor || '#E21B36'}
            onChange={(e) => handleFieldChange('iconColor', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded text-sm"
            placeholder="#E21B36"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">FAQ Items</label>
          <button
            type="button"
            onClick={addFaqItem}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus size={16} /> Add FAQ
          </button>
        </div>

        {(!content.faqItems || content.faqItems.length === 0) && (
          <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No FAQ items added yet.</p>
            <p className="text-sm text-gray-400 mt-1">
  Click &quot;Add FAQ&quot; to create your first question
</p>
          </div>
        )}

        <div className="space-y-3">
          {content.faqItems?.map((item, index) => (
            <div key={item.key || index} className="border rounded-lg overflow-hidden">
              <div 
                className="p-3 cursor-pointer flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
                style={{ backgroundColor: content.questionBgColor || '#F8F9FB' }}
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-medium text-gray-500">Q{index + 1}.</span>
                  <span 
                    className="font-medium truncate"
                    style={{ color: content.questionTextColor || '#0B1633' }}
                  >
                    {item.question || `Question ${index + 1}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveFaqItem(index, 'up');
                    }}
                    disabled={index === 0}
                    className={`p-1 ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveFaqItem(index, 'down');
                    }}
                    disabled={index === (content.faqItems?.length || 0) - 1}
                    className={`p-1 ${index === (content.faqItems?.length || 0) - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFaqItem(index);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 ml-1"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="ml-2">
                    {openAccordion === index ? (
                      <Minus size={20} style={{ color: content.iconColor || '#E21B36' }} />
                    ) : (
                      <Plus size={20} style={{ color: content.iconColor || '#E21B36' }} />
                    )}
                  </div>
                </div>
              </div>

              {openAccordion === index && (
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Question</label>
                    <input
                      type="text"
                      value={item.question || ''}
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Enter the question"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Answer</label>
                    <textarea
                      value={item.answer || ''}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Enter the answer"
                      rows="4"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqEditor;