"use client";

import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FaqRenderer({ component, index }) {
  const content = component.content || {};
  const [openItem, setOpenItem] = useState(null);

  // Initialize open state based on firstItemOpen setting
  useEffect(() => {
    if (content.firstItemOpen && content.faqItems && content.faqItems.length > 0) {
      setOpenItem(0);
    } else {
      setOpenItem(null);
    }
  }, [content.firstItemOpen, content.faqItems]);

  // Check if there's any content to show
  const hasContent = content.title || 
                    content.subtitle || 
                    content.faqItems?.length > 0;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#FFFFFF' };
      case 'gradient':
        return { 
          background: `linear-gradient(to bottom, ${content.gradientFrom || '#F8F9FB'}, ${content.gradientTo || '#FFFFFF'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section
      key={component.id || index}
      className="relative py-16 px-6 md:px-12"
      style={getBackgroundStyle()}
    >
      {/* Decorative elements - Only show if not using gradient background */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/5 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Title Section */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.title && (
              <h2 
                className={`font-bold mb-4 ${content.titleSize || 'text-3xl md:text-4xl'}`}
                style={{ color: content.titleColor || '#0B1633' }}
              >
                {content.title}
              </h2>
            )}
            {content.subtitle && (
              <p 
                className="text-lg"
                style={{ color: content.subtitleColor || '#666666' }}
              >
                {content.subtitle}
              </p>
            )}
          </div>
        )}

        {/* FAQ Accordion */}
        {content.faqItems && content.faqItems.length > 0 && (
          <div className="space-y-4">
            {content.faqItems.map((item, index) => (
              <div
                key={item.key || index}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
                  style={{ 
                    backgroundColor: content.questionBgColor || '#F8F9FB',
                    color: content.questionTextColor || '#0B1633'
                  }}
                  aria-expanded={openItem === index}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold"
                          style={{ 
                            backgroundColor: content.iconColor || '#E21B36',
                            color: '#FFFFFF'
                          }}>
                      Q{index + 1}
                    </span>
                    <span className="text-lg font-semibold pr-4">{item.question}</span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {openItem === index ? (
                      <Minus 
                        size={24} 
                        style={{ color: content.iconColor || '#E21B36' }}
                        className="transition-transform duration-300"
                      />
                    ) : (
                      <Plus 
                        size={24} 
                        style={{ color: content.iconColor || '#E21B36' }}
                        className="transition-transform duration-300"
                      />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openItem === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div 
                    className="p-6 pt-3"
                    style={{ 
                      backgroundColor: content.answerBgColor || '#FFFFFF',
                      color: content.answerTextColor || '#666666'
                    }}
                  >
                    <div className="pl-10">
                      <div className="border-l-2 pl-4"
                           style={{ borderColor: content.iconColor || '#E21B36' }}>
                        <p className="text-base leading-relaxed whitespace-pre-line">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {(!content.faqItems || content.faqItems.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQ Items</h3>
            <p className="text-gray-500">Add some questions and answers to get started.</p>
          </div>
        )}
      </div>
    </section>
  );
}