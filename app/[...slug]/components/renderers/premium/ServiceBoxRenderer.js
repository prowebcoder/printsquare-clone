// components/PageBuilder/renderers/premium/ServiceBoxRenderer.js
"use client";

import React from 'react';
import { 
  Wrench, 
  Printer, 
  Layers, 
  Settings,
  Package,
  Shield,
  Zap,
  Cpu,
  HardDrive,
  Tool,
  Filter,
  Thermometer,
  Box,
  Cogs
} from "lucide-react";

// Icon mapping
const iconComponents = {
  wrench: Wrench,
  printer: Printer,
  layers: Layers,
  settings: Settings,
  package: Package,
  shield: Shield,
  zap: Zap,
  cpu: Cpu,
  hardDrive: HardDrive,
  tool: Tool,
  filter: Filter,
  thermometer: Thermometer,
  box: Box,
  cogs: Cogs
};

export default function ServiceBoxRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.description || 
                    content.boxes?.length > 0;

  if (!hasContent) {
    return null;
  }

  // Get background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#0B1633' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#0B1633'}, ${content.gradientTo || '#1a2239'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Get box background style
  const getBoxBackgroundStyle = (box) => {
    if (box.boxBgType === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${box.boxGradientFrom || '#121A2C'}, ${box.boxGradientTo || '#1a2239'})`,
        borderColor: box.borderColor || '#2E3850'
      };
    }
    return {
      backgroundColor: box.boxSolidColor || '#121A2C',
      borderColor: box.borderColor || '#2E3850'
    };
  };

  // Get icon color style
  const getIconColor = (box, index) => {
    if (box.iconColor) return box.iconColor;
    
    // Default alternating colors based on index
    return index % 2 === 0 ? (content.iconColor1 || '#E21B36') : (content.iconColor2 || '#FF4B2B');
  };

  // Get item hover style
  const getItemHoverStyle = () => {
    return {
      borderLeftColor: content.itemHoverBorderColor || '#E21B36',
      color: content.itemHoverTextColor || '#FF4B2B'
    };
  };

  return (
    <section
      key={component.id || index}
      className="relative py-20 px-6 sm:px-10 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative background elements */}
      {content.showDecorativeElements && (
        <>
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#E21B36]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF4B2B]/5 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <header className="text-center mb-14">
          {content.title && (
            <h2 
              className={`font-extrabold tracking-tight ${content.titleSize || 'text-4xl sm:text-5xl'}`}
              style={{ color: content.titleColor || '#FFFFFF' }}
            >
              {content.title}
            </h2>
          )}
          {content.description && (
            <p 
              className={`mt-4 mx-auto ${content.descriptionSize || 'text-base sm:text-lg'}`}
              style={{ 
                color: content.descriptionColor || '#D6D9E0',
                maxWidth: content.descriptionMaxWidth || '42rem'
              }}
            >
              {content.description}
            </p>
          )}
        </header>

        {/* Boxes Grid */}
        <div className={`grid grid-cols-1 ${content.boxesPerRow === 2 ? 'sm:grid-cols-2' : content.boxesPerRow === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-8`}>
          {content.boxes?.map((box, boxIndex) => {
            const IconComponent = iconComponents[box.icon] || Wrench;
            
            return (
              <div
                key={boxIndex}
                className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border flex flex-col group"
                style={{
                  ...getBoxBackgroundStyle(box),
                  borderRadius: content.boxBorderRadius || '1rem',
                  borderWidth: box.borderWidth || '1px'
                }}
              >
                {/* Box Header with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: box.iconBgColor || 'rgba(226, 27, 54, 0.1)',
                      borderRadius: content.iconBorderRadius || '0.5rem'
                    }}
                  >
                    <IconComponent 
                      className={`${content.iconSize || 'w-6 h-6'}`}
                      style={{ color: getIconColor(box, boxIndex) }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-semibold"
                    style={{ color: box.titleColor || content.boxTitleColor || '#FFFFFF' }}
                  >
                    {box.title}
                  </h3>
                </div>

                {/* Items List */}
                <ul className="space-y-3 flex-grow">
                  {box.items?.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`border-l-2 pl-3 transition-all duration-300 hover:pl-4 ${content.itemHoverEffect ? 'hover:scale-[1.02]' : ''}`}
                      style={{
                        borderLeftColor: content.itemBorderColor || '#2E3850',
                        color: content.itemTextColor || '#D6D9E0',
                        fontSize: content.itemFontSize || '0.875rem',
                        ...getItemHoverStyle()
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Optional Call to Action */}
                {box.ctaText && (
                  <div className="mt-6 pt-6 border-t" style={{ borderColor: box.borderColor || '#2E3850' }}>
                    <button
                      className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
                      style={{
                        backgroundColor: box.ctaBgColor || 'transparent',
                        color: box.ctaTextColor || '#E21B36',
                        border: box.ctaBorder ? `1px solid ${box.ctaBorderColor || '#E21B36'}` : 'none'
                      }}
                      onClick={() => box.ctaLink && window.open(box.ctaLink, '_blank')}
                    >
                      {box.ctaText}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Boxes Message */}
        {(!content.boxes || content.boxes.length === 0) && (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-300 rounded-2xl">
            <p className="text-lg">No service boxes added yet.</p>
            <p className="text-sm mt-2">Add boxes in the editor to display content here.</p>
          </div>
        )}
      </div>
    </section>
  );
}