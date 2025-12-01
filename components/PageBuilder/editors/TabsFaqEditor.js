// components/PageBuilder/editors/TabsFaqEditor.js
"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const TabsFaqEditor = ({ component, onUpdate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize with default data only once when component is first created
  useEffect(() => {
    if (!isInitialized && (!component.content?.tabs || component.content.tabs.length === 0)) {
      const defaultTabs = [
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
      onUpdate(component.id, { tabs: defaultTabs });
      setIsInitialized(true);
    }
  }, [component.content?.tabs, component.id, onUpdate, isInitialized]);

  const handleTabChange = (tabIndex, field, value) => {
    const tabs = [...(component.content?.tabs || [])];
    tabs[tabIndex] = { ...tabs[tabIndex], [field]: value };
    onUpdate(component.id, { tabs });
  };

  const handleFaqChange = (tabIndex, faqIndex, field, value) => {
    const tabs = [...(component.content?.tabs || [])];
    tabs[tabIndex].faqs[faqIndex] = { 
      ...tabs[tabIndex].faqs[faqIndex], 
      [field]: value 
    };
    onUpdate(component.id, { tabs });
  };

  const addTab = () => {
    const tabs = [...(component.content?.tabs || [])];
    tabs.push({
      name: `Tab ${tabs.length + 1}`,
      faqs: []
    });
    onUpdate(component.id, { tabs });
    setActiveTab(tabs.length - 1);
  };

  const removeTab = (index) => {
    const tabs = [...(component.content?.tabs || [])];
    tabs.splice(index, 1);
    onUpdate(component.id, { tabs });
    if (activeTab >= tabs.length) {
      setActiveTab(Math.max(0, tabs.length - 1));
    }
  };

  const addFaq = (tabIndex) => {
    const tabs = [...(component.content?.tabs || [])];
    tabs[tabIndex].faqs.push({
      question: 'New question?',
      answer: 'Answer goes here...'
    });
    onUpdate(component.id, { tabs });
  };

  const removeFaq = (tabIndex, faqIndex) => {
    const tabs = [...(component.content?.tabs || [])];
    tabs[tabIndex].faqs.splice(faqIndex, 1);
    onUpdate(component.id, { tabs });
  };

  const moveFaq = (tabIndex, fromIndex, toIndex) => {
    const tabs = [...(component.content?.tabs || [])];
    const faqs = tabs[tabIndex].faqs;
    const [movedFaq] = faqs.splice(fromIndex, 1);
    faqs.splice(toIndex, 0, movedFaq);
    onUpdate(component.id, { tabs });
  };

  const tabs = component.content?.tabs || [];

  return (
    <div className="space-y-6 p-3">
      {/* Section Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={component.content?.title || 'Frequently Asked Questions'}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Section title"
        />
      </div>

      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <select
          value={component.content?.backgroundType || 'gradient'}
          onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="none">None (Transparent)</option>
        </select>

        {component.content?.backgroundType === 'solid' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.backgroundColor || '#f5f3ef'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.backgroundColor || '#f5f3ef'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#f5f3ef"
            />
          </div>
        )}

        {component.content?.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={component.content?.gradientFrom || '#f5f3ef'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#f5f3ef'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#f5f3ef"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#e8e3dd'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#e8e3dd'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#e8e3dd"
              />
            </div>
          </div>
        )}
      </div>

      {/* Title Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.titleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.titleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#0B1633"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.highlightedColor || '#FF4B2B'}
              onChange={(e) => onUpdate(component.id, { highlightedColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.highlightedColor || '#FF4B2B'}
              onChange={(e) => onUpdate(component.id, { highlightedColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FF4B2B"
            />
          </div>
        </div>
      </div>

      {/* Tab Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Active Tab Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.activeTabBg || '#e21b36'}
              onChange={(e) => onUpdate(component.id, { activeTabBg: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.activeTabBg || '#e21b36'}
              onChange={(e) => onUpdate(component.id, { activeTabBg: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#e21b36"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Active Tab Text</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.activeTabText || '#ffffff'}
              onChange={(e) => onUpdate(component.id, { activeTabText: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.activeTabText || '#ffffff'}
              onChange={(e) => onUpdate(component.id, { activeTabText: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Inactive Tab Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.inactiveTabBg || '#ffffff'}
              onChange={(e) => onUpdate(component.id, { inactiveTabBg: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.inactiveTabBg || '#ffffff'}
              onChange={(e) => onUpdate(component.id, { inactiveTabBg: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#ffffff"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Inactive Tab Text</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.inactiveTabText || '#666666'}
              onChange={(e) => onUpdate(component.id, { inactiveTabText: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.inactiveTabText || '#666666'}
              onChange={(e) => onUpdate(component.id, { inactiveTabText: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#666666"
            />
          </div>
        </div>
      </div>

      {/* Tabs Management */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">FAQ Tabs</h3>
          <button
            onClick={addTab}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Tab
          </button>
        </div>

        {/* Tab Headers - FIXED: No nested buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex items-center gap-0 rounded-full font-medium text-sm transition-all ${
                activeTab === index
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <button
                onClick={() => setActiveTab(index)}
                className="px-4 py-2 rounded-l-full flex-1 text-left"
              >
                {tab.name}
              </button>
              <button
                onClick={() => removeTab(index)}
                className="px-2 py-2 rounded-r-full hover:bg-red-100 hover:text-red-700 flex items-center"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        {tabs[activeTab] && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tab Name</label>
              <input
                type="text"
                value={tabs[activeTab].name}
                onChange={(e) => handleTabChange(activeTab, 'name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Tab name"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">FAQs</label>
                <button
                  onClick={() => addFaq(activeTab)}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  <Plus size={14} />
                  Add FAQ
                </button>
              </div>

              <div className="space-y-3">
                {tabs[activeTab].faqs.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center gap-1 text-gray-400 mt-2">
                        <GripVertical size={16} />
                        <span className="text-xs">{faqIndex + 1}</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleFaqChange(activeTab, faqIndex, 'question', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="Enter question"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Answer</label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(activeTab, faqIndex, 'answer', e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="Enter answer"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeFaq(activeTab, faqIndex)}
                        className="p-1 text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {faqIndex > 0 && (
                        <button
                          onClick={() => moveFaq(activeTab, faqIndex, faqIndex - 1)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Move Up
                        </button>
                      )}
                      {faqIndex < tabs[activeTab].faqs.length - 1 && (
                        <button
                          onClick={() => moveFaq(activeTab, faqIndex, faqIndex + 1)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Move Down
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsFaqEditor;