// components/PageBuilder/renderers/premium/TextBoxRenderer.js
"use client";

import React from 'react';
import { 
  Printer, 
  Star, 
  Award,
  CheckCircle,
  Shield,
  Trophy,
  Heart,
  Zap,
  Target,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";

// Icon mapping
const iconComponents = {
  printer: Printer,
  star: Star,
  award: Award,
  checkCircle: CheckCircle,
  shield: Shield,
  trophy: Trophy,
  heart: Heart,
  zap: Zap,
  target: Target,
  users: Users,
  clock: Clock,
  trendingUp: TrendingUp
};

export default function TextBoxRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.description || 
                    content.highlights?.length > 0;

  if (!hasContent) {
    return null;
  }

  // Get background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#F8F9FB' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#F8F9FB'}, ${content.gradientTo || '#FFFFFF'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Get decorative background style
  const getDecorativeStyle = (position) => {
    if (content.decorativeType === 'gradient') {
      return {
        background: `linear-gradient(to bottom right, 
          ${content.decorativeGradientFrom || '#E21B36'}/20, 
          ${content.decorativeGradientTo || '#FF4B2B'}/20)`,
        filter: 'blur(3rem)'
      };
    }
    return {
      backgroundColor: content.decorativeColor || '#E21B36',
      opacity: content.decorativeOpacity || 0.2,
      filter: 'blur(3rem)'
    };
  };

  // Get container style
  const getContainerStyle = () => {
    const style = {
      backgroundColor: content.containerBgColor || '#FFFFFF',
      borderColor: content.containerBorderColor || '#EAEAEA',
      borderRadius: content.containerBorderRadius || '1.5rem',
      borderWidth: content.containerBorderWidth || '1px',
      boxShadow: content.containerShadow || '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    };
    return style;
  };

  // Get icon container style
  const getIconContainerStyle = () => {
    if (content.iconBgType === 'gradient') {
      return {
        background: `linear-gradient(to right, ${content.iconGradientFrom || '#E21B36'}, ${content.iconGradientTo || '#FF4B2B'})`
      };
    }
    return {
      backgroundColor: content.iconSolidColor || '#E21B36'
    };
  };

  // Get title style
  const getTitleStyle = () => {
    if (content.titleGradient) {
      return {
        background: `linear-gradient(to right, ${content.titleGradientFrom || '#E21B36'}, ${content.titleGradientTo || '#FF4B2B'})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      };
    }
    return {
      color: content.titleColor || '#1F2937'
    };
  };

  // Get highlight item style
  const getHighlightStyle = (highlight, index) => {
    const baseStyle = {
      backgroundColor: highlight.bgColor || content.highlightBgColor || '#FFE8E8',
      color: highlight.textColor || content.highlightTextColor || '#E21B36',
      borderColor: highlight.borderColor || content.highlightBorderColor || '#F5C2C2',
      borderRadius: content.highlightBorderRadius || '9999px'
    };

    // Apply gradient if specified
    if (highlight.bgType === 'gradient') {
      baseStyle.background = `linear-gradient(to right, ${highlight.gradientFrom || '#FFE8E8'}, ${highlight.gradientTo || '#FFD1D1'})`;
    }

    return baseStyle;
  };

  // Parse description with highlight
  const parseDescription = (text, highlightColor) => {
    if (!text) return null;
    
    const parts = text.split(/(Print Seoul|Printseoul)/gi);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === 'print seoul' || part.toLowerCase() === 'printseoul') {
        return (
          <strong 
            key={index} 
            style={{ 
              color: highlightColor || content.brandHighlightColor || '#1F2937',
              fontWeight: content.brandHighlightWeight || 600
            }}
          >
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Get icon component
  const IconComponent = iconComponents[content.icon] || Printer;
  const HighlightIcon = iconComponents[content.highlightIcon] || Star;

  return (
    <section
      key={component.id || index}
      className="relative py-20 px-6 sm:px-10 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative background elements */}
      {content.showDecorativeElements && (
        <>
          <div 
            className="absolute top-0 left-0 w-72 h-72 rounded-full"
            style={getDecorativeStyle('top-left')}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-72 h-72 rounded-full"
            style={getDecorativeStyle('bottom-right')}
          ></div>
        </>
      )}

      <div className="relative max-w-5xl mx-auto">
        <div 
          className="text-center p-10 sm:p-14"
          style={getContainerStyle()}
        >
          {/* Icon Section */}
          {content.showIcon && (
            <div className="flex justify-center mb-6">
              <div 
                className="p-4 rounded-full shadow-md"
                style={{
                  ...getIconContainerStyle(),
                  borderRadius: content.iconBorderRadius || '9999px'
                }}
              >
                <IconComponent 
                  className="text-white"
                  style={{
                    width: content.iconSize || '2rem',
                    height: content.iconSize || '2rem'
                  }}
                />
              </div>
            </div>
          )}

          {/* Title */}
          {content.title && (
            <h1 
              className={`font-bold tracking-tight ${content.titleSize || 'text-4xl sm:text-5xl'}`}
              style={getTitleStyle()}
            >
              {content.title}
            </h1>
          )}

          {/* Description */}
          {content.description && (
            <p 
              className={`mt-6 leading-relaxed mx-auto ${content.descriptionSize || 'text-base sm:text-lg'}`}
              style={{ 
                color: content.descriptionColor || '#4B5563',
                maxWidth: content.descriptionMaxWidth || '42rem'
              }}
            >
              {parseDescription(content.description, content.brandHighlightColor)}
            </p>
          )}

          {/* Highlights */}
          {content.highlights && content.highlights.length > 0 && (
            <div className={`mt-10 flex flex-wrap justify-center gap-4 ${content.highlightsLayout === 'vertical' ? 'flex-col items-center' : ''}`}>
              {content.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 shadow-sm border"
                  style={getHighlightStyle(highlight, index)}
                >
                  {content.showHighlightIcons && (
                    <HighlightIcon 
                      className="w-4 h-4"
                      style={{ 
                        color: highlight.iconColor || content.highlightIconColor || 'inherit'
                      }}
                    />
                  )}
                  <span 
                    className={`font-medium ${content.highlightTextSize || 'text-sm'}`}
                    style={{ 
                      color: highlight.textColor || content.highlightTextColor || 'inherit'
                    }}
                  >
                    {highlight.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}