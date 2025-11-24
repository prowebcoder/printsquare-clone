"use client";

import { Trash2, Plus } from 'lucide-react';

const TabsFaqEditor = ({ component, onUpdate }) => {
  const content = component.content || {};

  const handleTabChange = (index, field, value) => {
    const newTabs = [...(content.tabs || [])];
    newTabs[index] = { ...newTabs[index], [field]: value };
    onUpdate(component.id, { tabs: newTabs });
  };

  const handleFaqChange = (tabIndex, faqIndex, field, value) => {
    const newTabs = [...(content.tabs || [])];
    if (!newTabs[tabIndex].faqs) newTabs[tabIndex].faqs = [];
    newTabs[tabIndex].faqs[faqIndex] = { 
      ...newTabs[tabIndex].faqs[faqIndex], 
      [field]: value 
    };
    onUpdate(component.id, { tabs: newTabs });
  };

  const addTab = () => {
    const newTabs = [...(content.tabs || []), {
      title: 'New Tab',
      faqs: []
    }];
    onUpdate(component.id, { tabs: newTabs });
  };

  const removeTab = (index) => {
    const newTabs = (content.tabs || []).filter((_, i) => i !== index);
    onUpdate(component.id, { tabs: newTabs });
  };

  const addFaq = (tabIndex) => {
    const newTabs = [...(content.tabs || [])];
    if (!newTabs[tabIndex].faqs) newTabs[tabIndex].faqs = [];
    newTabs[tabIndex].faqs.push({
      question: 'New Question?',
      answer: 'Answer goes here...'
    });
    onUpdate(component.id, { tabs: newTabs });
  };

  const removeFaq = (tabIndex, faqIndex) => {
    const newTabs = [...(content.tabs || [])];
    newTabs[tabIndex].faqs = newTabs[tabIndex].faqs.filter((_, i) => i !== faqIndex);
    onUpdate(component.id, { tabs: newTabs });
  };

  return (
    <div className="space-y-6 p-3">
      {/* Section Background */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <select
          value={content.backgroundType || 'solid'}
          onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
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
              value={content.backgroundColor || '#FAFAFA'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.backgroundColor || '#FAFAFA'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FAFAFA"
            />
          </div>
        )}

        {content.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={content.gradientFrom || '#FAFAFA'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientFrom || '#FAFAFA'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FAFAFA"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={content.gradientTo || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.gradientTo || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        )}
      </div>

      {/* Title Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={content.title || 'Frequently Asked Questions'}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Section title"
        />
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Title Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={content.titleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={content.titleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#0B1633"
            />
          </div>
        </div>
      </div>

      {/* Tabs Styling */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tabs Styling</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tab Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.tabBgColor || '#F3F4F6'}
                onChange={(e) => onUpdate(component.id, { tabBgColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.tabBgColor || '#F3F4F6'}
                onChange={(e) => onUpdate(component.id, { tabBgColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#F3F4F6"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Active Tab Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.activeTabBgColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { activeTabBgColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.activeTabBgColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { activeTabBgColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tab Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.tabTextColor || '#6B7280'}
                onChange={(e) => onUpdate(component.id, { tabTextColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.tabTextColor || '#6B7280'}
                onChange={(e) => onUpdate(component.id, { tabTextColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#6B7280"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Active Tab Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.activeTabTextColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { activeTabTextColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.activeTabTextColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { activeTabTextColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#0B1633"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content Styling */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">FAQ Content Styling</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Question Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.questionColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { questionColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.questionColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { questionColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#0B1633"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Answer Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.answerColor || '#6B7280'}
                onChange={(e) => onUpdate(component.id, { answerColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.answerColor || '#6B7280'}
                onChange={(e) => onUpdate(component.id, { answerColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#6B7280"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and FAQs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Tabs & FAQs</label>
          <button
            type="button"
            onClick={addTab}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus size={14} />
            Add Tab
          </button>
        </div>

        {content.tabs?.map((tab, tabIndex) => (
          <div key={tabIndex} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium">Tab {tabIndex + 1}</h4>
              <button
                type="button"
                onClick={() => removeTab(tabIndex)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <input
              type="text"
              value={tab.title}
              onChange={(e) => handleTabChange(tabIndex, 'title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
              placeholder="Tab title"
            />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">FAQs</label>
                <button
                  type="button"
                  onClick={() => addFaq(tabIndex)}
                  className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 flex items-center gap-1"
                >
                  <Plus size={12} />
                  Add FAQ
                </button>
              </div>

              {tab.faqs?.map((faq, faqIndex) => (
                <div key={faqIndex} className="border p-3 rounded bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500">FAQ {faqIndex + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeFaq(tabIndex, faqIndex)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(tabIndex, faqIndex, 'question', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(tabIndex, faqIndex, 'answer', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={3}
                    placeholder="Answer"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsFaqEditor;