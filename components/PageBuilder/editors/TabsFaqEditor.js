// components/PageBuilder/editors/TabsFaqEditor.js
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Trash2, GripVertical, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Unlink } from 'lucide-react';

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const editorRef = useRef(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState('left');

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || '';
      updateToolbarState();
    }
  }, []);

  // Update content when value changes from parent
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
      updateToolbarState();
    }
  }, [value]);

  const updateToolbarState = () => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;
      
      if (parentElement) {
        setIsBold(parentElement.style.fontWeight === 'bold' || 
                 parentElement.tagName === 'B' || 
                 parentElement.tagName === 'STRONG');
        setIsItalic(parentElement.style.fontStyle === 'italic' || 
                   parentElement.tagName === 'I' || 
                   parentElement.tagName === 'EM');
        setIsUnderline(parentElement.style.textDecoration === 'underline');
        setAlignment(parentElement.style.textAlign || 'left');
      }
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      updateToolbarState();
    }
  };

  const handleKeyDown = (e) => {
    // Handle Enter key for proper line breaks
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.execCommand('insertHTML', false, '<p><br></p>');
      handleInput();
    }
    
    // Handle Shift+Enter for line break
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      document.execCommand('insertHTML', false, '<br>');
      handleInput();
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleInput();
  };

  const toggleFormat = (command, style, stateSetter) => {
    if (editorRef.current) {
      editorRef.current.focus();
      execCommand(command);
      
      // Toggle state
      if (stateSetter) {
        if (command === 'bold') setIsBold(!isBold);
        if (command === 'italic') setIsItalic(!isItalic);
        if (command === 'underline') setIsUnderline(!isUnderline);
      }
    }
  };

  const toggleList = (type) => {
    if (editorRef.current) {
      editorRef.current.focus();
      
      // Check if we're already in a list of this type
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let parent = range.commonAncestorContainer;
        
        // Find the list parent
        while (parent && parent !== editorRef.current) {
          if (parent.tagName === 'UL' || parent.tagName === 'OL') {
            // We're in a list, check if it's the same type
            if ((type === 'insertUnorderedList' && parent.tagName === 'UL') ||
                (type === 'insertOrderedList' && parent.tagName === 'OL')) {
              // Remove the list
              execCommand('removeFormat');
              return;
            }
            break;
          }
          parent = parent.parentNode;
        }
      }
      
      // Create new list
      execCommand(type);
    }
  };

  const insertLink = () => {
    if (!linkUrl.trim()) {
      setShowLinkInput(false);
      return;
    }
    
    const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    execCommand('createLink', url);
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const removeLink = () => {
    execCommand('unlink');
  };

  const setTextAlignment = (align) => {
    if (editorRef.current) {
      editorRef.current.focus();
      execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1));
      setAlignment(align);
    }
  };

  const clearFormatting = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      execCommand('removeFormat');
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      setAlignment('left');
    }
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-t-lg bg-gray-50">
        {/* Formatting buttons */}
        <button
          type="button"
          onClick={() => toggleFormat('bold', 'bold', setIsBold)}
          className={`p-1 rounded ${isBold ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => toggleFormat('italic', 'italic', setIsItalic)}
          className={`p-1 rounded ${isItalic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => toggleFormat('underline', 'underline', setIsUnderline)}
          className={`p-1 rounded ${isUnderline ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
          title="Underline"
        >
          <Underline size={16} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Lists */}
        <button
          type="button"
          onClick={() => toggleList('insertUnorderedList')}
          className="p-1 rounded hover:bg-gray-200"
          title="Bulleted List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => toggleList('insertOrderedList')}
          className="p-1 rounded hover:bg-gray-200"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Alignment */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTextAlignment('left')}
            className={`p-1 rounded ${alignment === 'left' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setTextAlignment('center')}
            className={`p-1 rounded ${alignment === 'center' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            type="button"
            onClick={() => setTextAlignment('right')}
            className={`p-1 rounded ${alignment === 'right' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Links */}
        {!showLinkInput ? (
          <button
            type="button"
            onClick={() => setShowLinkInput(true)}
            className="p-1 rounded hover:bg-gray-200"
            title="Insert Link"
          >
            <Link size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={removeLink}
            className="p-1 rounded hover:bg-gray-200"
            title="Remove Link"
          >
            <Unlink size={16} />
          </button>
        )}
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Clear formatting */}
        <button
          type="button"
          onClick={clearFormatting}
          className="px-2 py-1 text-xs rounded hover:bg-gray-200"
        >
          Clear
        </button>
      </div>
      
      {/* Link Input */}
      {showLinkInput && (
        <div className="p-2 border border-blue-300 rounded bg-blue-50">
          <div className="flex items-center gap-2 mb-1">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-2 py-1 text-sm border rounded"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && insertLink()}
            />
            <button
              type="button"
              onClick={insertLink}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-600">
            Enter URL and press Enter or click Insert
          </p>
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onClick={updateToolbarState}
        onBlur={handleInput}
        className="min-h-[120px] p-3 border border-gray-300 rounded-b-lg bg-white overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ 
          textAlign: alignment,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
        data-placeholder={placeholder}
      />
      
      {/* Placeholder */}
      {(!value || value === '<p></p>' || value === '<p><br></p>') && (
        <div className="absolute top-12 left-3 pointer-events-none text-gray-400">
          {placeholder}
        </div>
      )}
      
      {/* Help Text */}
      <div className="text-xs text-gray-500 mt-1">
        <div className="flex flex-wrap gap-2">
          <span>• <strong>Enter:</strong> New paragraph</span>
          <span>• <strong>Shift+Enter:</strong> Line break</span>
          <span>• <strong>Ctrl+B/I/U:</strong> Bold/Italic/Underline</span>
          <span>• Select text to format</span>
        </div>
      </div>
    </div>
  );
};

const TabsFaqEditor = ({ component, onUpdate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const hasInitializedRef = useRef(false);

  // Initialize only once on mount
  useEffect(() => {
    if (!hasInitializedRef.current && (!component.content?.tabs || component.content.tabs.length === 0)) {
      const defaultTabs = [
        {
          name: 'ORDER',
          faqs: [
            {
              question: 'Terms of Portfolio usage agreement',
              answer: '<p>All designs and content submitted for printing remain the intellectual property of the client. Print Seoul only uses them for printing and delivery purposes.</p>'
            }
          ]
        }
      ];
      onUpdate(component.id, { tabs: defaultTabs });
      hasInitializedRef.current = true;
    }
  }, []);

  // Memoized handlers
  const handleTabChange = useCallback((tabIndex, field, value) => {
    const tabs = [...(component.content?.tabs || [])];
    tabs[tabIndex] = { ...tabs[tabIndex], [field]: value };
    onUpdate(component.id, { tabs });
  }, [component.content?.tabs, component.id, onUpdate]);

  const handleFaqChange = useCallback((tabIndex, faqIndex, field, value) => {
    const tabs = [...(component.content?.tabs || [])];
    if (tabs[tabIndex]?.faqs?.[faqIndex]) {
      tabs[tabIndex].faqs[faqIndex] = { 
        ...tabs[tabIndex].faqs[faqIndex], 
        [field]: value 
      };
      onUpdate(component.id, { tabs });
    }
  }, [component.content?.tabs, component.id, onUpdate]);

  const addTab = useCallback(() => {
    const tabs = [...(component.content?.tabs || [])];
    tabs.push({
      name: `Tab ${tabs.length + 1}`,
      faqs: []
    });
    onUpdate(component.id, { tabs });
    setActiveTab(tabs.length - 1);
  }, [component.content?.tabs, component.id, onUpdate]);

  const removeTab = useCallback((index) => {
    const tabs = [...(component.content?.tabs || [])];
    tabs.splice(index, 1);
    onUpdate(component.id, { tabs });
    if (activeTab >= tabs.length) {
      setActiveTab(Math.max(0, tabs.length - 1));
    }
  }, [component.content?.tabs, component.id, onUpdate, activeTab]);

  const addFaq = useCallback((tabIndex) => {
    const tabs = [...(component.content?.tabs || [])];
    if (tabs[tabIndex]) {
      tabs[tabIndex].faqs = tabs[tabIndex].faqs || [];
      tabs[tabIndex].faqs.push({
        question: 'New question?',
        answer: '<p>Answer goes here...</p>'
      });
      onUpdate(component.id, { tabs });
    }
  }, [component.content?.tabs, component.id, onUpdate]);

  const removeFaq = useCallback((tabIndex, faqIndex) => {
    const tabs = [...(component.content?.tabs || [])];
    if (tabs[tabIndex]?.faqs?.[faqIndex]) {
      tabs[tabIndex].faqs.splice(faqIndex, 1);
      onUpdate(component.id, { tabs });
    }
  }, [component.content?.tabs, component.id, onUpdate]);

  const moveFaq = useCallback((tabIndex, fromIndex, toIndex) => {
    const tabs = [...(component.content?.tabs || [])];
    const faqs = tabs[tabIndex]?.faqs || [];
    if (fromIndex >= 0 && fromIndex < faqs.length && 
        toIndex >= 0 && toIndex < faqs.length) {
      const [movedFaq] = faqs.splice(fromIndex, 1);
      faqs.splice(toIndex, 0, movedFaq);
      onUpdate(component.id, { tabs });
    }
  }, [component.content?.tabs, component.id, onUpdate]);

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

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab, index) => (
            <div
              key={`tab-header-${index}`}
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
              {tabs.length > 1 && (
                <button
                  onClick={() => removeTab(index)}
                  className="px-2 py-2 rounded-r-full hover:bg-red-100 hover:text-red-700 flex items-center"
                >
                  <Trash2 size={14} />
                </button>
              )}
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
                {tabs[activeTab].faqs?.map((faq, faqIndex) => (
                  <div key={`faq-${activeTab}-${faqIndex}`} className="border rounded-lg p-4 bg-gray-50">
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
                          <RichTextEditor
                            value={faq.answer || ''}
                            onChange={(value) => handleFaqChange(activeTab, faqIndex, 'answer', value)}
                            placeholder="Enter answer (supports rich text formatting)"
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
                      {faqIndex < (tabs[activeTab].faqs?.length || 0) - 1 && (
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