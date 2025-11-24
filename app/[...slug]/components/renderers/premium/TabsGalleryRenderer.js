// app/[...slug]/components/renderers/premium/TabsGalleryRenderer.js
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppImage from "../../AppImage";

export default function TabsGalleryRenderer({ component, index }) {
  const content = component.content || {};
  const [activeTab, setActiveTab] = useState(content.tabs?.[0]?.id || 'sheetfed');
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.description || 
                    content.tabs?.some(tab => tab.images?.length > 0);

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  const currentTab = content.tabs?.find(tab => tab.id === activeTab);

  return (
    <section 
      key={component.id || index}
      className="py-20 px-6 sm:px-10"
      style={{ backgroundColor: content.backgroundColor || '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          {content.title && (
            <h2 
              className={`tracking-tight leading-tight ${content.titleSize || 'text-5xl'} ${content.fontWeight || 'font-extrabold'}`}
              style={{ color: content.titleColor || '#1F2937' }}
            >
              {content.title}
            </h2>
          )}
          {content.description && (
            <p 
              className={`mt-4 max-w-3xl mx-auto ${content.textSize || 'text-lg'}`}
              style={{ color: content.textColor || '#6B7280' }}
            >
              {content.description}
            </p>
          )}
        </header>

        {/* Tabs Navigation */}
        {content.tabs?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {content.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeTab === tab.id
                    ? 'text-white border-transparent shadow-md'
                    : 'bg-white border-gray-200 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id 
                    ? (content.activeTabBgColor || '#E21B36')
                    : (content.inactiveTabBgColor || '#FFFFFF'),
                  color: activeTab === tab.id 
                    ? (content.activeTabTextColor || '#FFFFFF')
                    : (content.inactiveTabTextColor || '#6B7280')
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Gallery */}
        {currentTab?.images && currentTab.images.length > 0 && (
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
                {currentTab.images.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 group"
                  >
                    <AppImage
                      src={src}
                      alt={`${currentTab.label} ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 rounded-2xl"></div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {(!currentTab?.images || currentTab.images.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No images available for this category
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Add images in the editor to display them here
            </p>
          </div>
        )}
      </div>
    </section>
  );
}