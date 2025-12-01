// components/PageBuilder/renderers/premium/TabsGalleryRenderer.js
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function TabsGalleryRenderer({ component, index }) {
  const content = component.content || {};
  const [activeTab, setActiveTab] = useState(content.tabs?.[0]?.id || "sheetfed");

  // Check if there's content to show
  const hasContent = content.title || content.description || content.tabs?.length > 0;

  if (!hasContent) {
    return null;
  }

  // Get background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#FFFFFF' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#FFFFFF'}, ${content.gradientTo || '#F8F9FB'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Get active tab style
  const getActiveTabStyle = () => {
    if (content.activeTabBgType === 'gradient') {
      return {
        background: `linear-gradient(to right, ${content.activeTabGradientFrom || '#E21B36'}, ${content.activeTabGradientTo || '#FF4B2B'})`,
        color: content.activeTabTextColor || '#FFFFFF',
        border: 'none'
      };
    }
    return {
      backgroundColor: content.activeTabSolidColor || '#E21B36',
      color: content.activeTabTextColor || '#FFFFFF',
      border: 'none'
    };
  };

  // Get inactive tab style
  const getInactiveTabStyle = () => {
    return {
      backgroundColor: content.inactiveTabBgColor || '#FFFFFF',
      color: content.inactiveTabTextColor || '#000000',
      borderColor: content.inactiveTabBorderColor || '#E5E7EB'
    };
  };

  return (
    <section
      key={component.id || index}
      className="relative py-20 px-6 sm:px-10 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative elements - Only show if not using gradient background */}
      {content.backgroundType !== 'gradient' && content.showDecorativeElements && (
        <>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        {(content.title || content.description) && (
          <header className="text-center mb-12">
            {content.title && (
              <h2 
                className={`font-extrabold tracking-tight text-gray-900 ${content.titleSize || 'text-4xl sm:text-5xl'}`}
                style={{ color: content.titleColor || '#1F2937' }}
              >
                {content.title}
              </h2>
            )}
            {content.description && (
              <p 
                className={`mt-4 text-gray-700 mx-auto ${content.descriptionSize || 'text-base sm:text-lg'}`}
                style={{ 
                  color: content.descriptionColor || '#4B5563',
                  maxWidth: content.descriptionMaxWidth || '42rem'
                }}
              >
                {content.description.replace(
                  /Printseoul|PrintSeoul/g, 
                  (match) => `<strong style="color: ${content.highlightColor || '#E21B36'}">${match}</strong>`
                )}
              </p>
            )}
          </header>
        )}

        {/* Tabs Navigation */}
        {content.tabs && content.tabs.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {content.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={activeTab === tab.id ? getActiveTabStyle() : getInactiveTabStyle()}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border shadow-sm hover:shadow-md ${
                  activeTab === tab.id 
                    ? 'shadow-md' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Gallery */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {content.galleries?.[activeTab]?.map((image, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 group"
                  style={{
                    borderRadius: content.imageBorderRadius || '1rem'
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${activeTab} image ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized={image.url.startsWith('blob:')}
                  />
                  <div 
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"
                    style={{
                      borderRadius: content.imageBorderRadius || '1rem'
                    }}
                  ></div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Message when no images */}
        {(!content.galleries || !content.galleries[activeTab] || content.galleries[activeTab].length === 0) && (
          <div className="text-center py-12 text-gray-500">
            No images added for this category yet.
          </div>
        )}
      </div>
    </section>
  );
}