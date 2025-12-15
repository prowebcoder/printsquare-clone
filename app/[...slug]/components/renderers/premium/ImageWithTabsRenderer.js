// app/[...slug]/components/renderers/premium/ImageWithTabsRenderer.js
"use client";

import { useState } from 'react';
import AppImage from "../../AppImage";

export default function ImageWithTabsRenderer({ component, index }) {
  const content = component.content || {};
  const tabs = content.tabs || [];
  const [activeTab, setActiveTab] = useState(content.activeTab || (tabs[0]?.id || ''));
  const imagePosition = content.imagePosition || 'left';
  
  // If no tabs or content, don't render
  if (!tabs.length) {
    return null;
  }

  // Find active tab data
  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  // Get background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#FFFFFF' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#f8f9fa'}, ${content.gradientTo || '#e9ecef'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Get image URL - ensure absolute path
  const getImageUrl = (url) => {
    if (!url) return '/images/placeholder.jpg';
    if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('/')) {
      return url;
    }
    return `/${url}`;
  };

  const imageUrl = getImageUrl(activeTabData.image);

  return (
    <section 
      className="relative py-12 md:py-16"
      style={getBackgroundStyle()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        {content.title && (
          <div className="text-center mb-10 md:mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: content.titleColor || '#000000' }}
            >
              {content.title}
            </h2>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium rounded-lg transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'shadow-md transform -translate-y-1' 
                  : 'hover:shadow-sm'
              }`}
              style={{
                backgroundColor: activeTab === tab.id 
                  ? (content.activeTabBgColor || '#e21b36')
                  : (content.inactiveTabBgColor || '#f8f9fa'),
                color: activeTab === tab.id 
                  ? (content.activeTabTextColor || '#FFFFFF')
                  : (content.inactiveTabTextColor || '#6c757d'),
                borderRadius: content.tabBorderRadius ? `${content.tabBorderRadius}rem` : '0.5rem'
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`flex flex-col ${imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-8 md:gap-12 lg:gap-16`}>
          
          {/* Image Column */}
          <div className="lg:w-1/2 w-full">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <div className="relative h-64 md:h-80 lg:h-96 w-full">
                <AppImage
                  src={imageUrl}
                  alt={activeTabData.title || 'Tab Image'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain"
                  priority={index < 3}
                />
              </div>
              
              {/* Image Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm md:text-base font-medium">
                  {activeTabData.title} - Preview
                </p>
              </div>
            </div>
            
            {/* Tab Images Preview (Thumbnails) */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">All tab images:</p>
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeTab === tab.id 
                        ? 'border-blue-500 scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={getImageUrl(tab.image)}
                      alt={tab.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                      {tab.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:w-1/2 w-full">
            <div 
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
              style={{ 
                backgroundColor: content.contentBgColor || '#FFFFFF',
                color: content.contentTextColor || '#000000'
              }}
            >
              {/* Active Tab Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                {activeTabData.title}
              </h3>
              
              {/* Numbered Content List */}
              <div className="space-y-4 md:space-y-6">
                {activeTabData.content && activeTabData.content.length > 0 ? (
                  activeTabData.content.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                        style={{ backgroundColor: content.listNumberColor || '#e21b36' }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 md:text-lg leading-relaxed">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 italic text-center py-8">
                    No content added for this tab. Please add content in the editor.
                  </div>
                )}
              </div>

              {/* Tab Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Currently viewing: <span className="font-semibold">{activeTabData.title}</span>
                  </span>
                  <span>
                    {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length} tabs
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Click on any tab above to view its content and image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}