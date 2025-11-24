"use client";

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function TabsFaqRenderer({ component }) {
  const content = component.content || {};
  const [activeTab, setActiveTab] = useState(0);
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (tabIndex, faqIndex) => {
    setOpenFaqs(prev => ({
      ...prev,
      [`${tabIndex}-${faqIndex}`]: !prev[`${tabIndex}-${faqIndex}`]
    }));
  };

  // Check if there's any content to show
  const hasContent = content.title || content.tabs?.length > 0;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#FAFAFA' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#FAFAFA'}, ${content.gradientTo || '#FFFFFF'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative gradient circles */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        {content.title && (
          <div className="text-center mb-14">
            <h2 
              className="text-4xl md:text-5xl font-bold tracking-wide"
              style={{ color: content.titleColor || '#0B1633' }}
            >
              {content.title}
            </h2>
            <div 
              className="w-24 h-1 mx-auto mt-4 rounded-full"
              style={{
                background: `linear-gradient(to right, ${content.tabBgColor || '#F3F4F6'}, ${content.activeTabBgColor || '#FFFFFF'})`
              }}
            ></div>
          </div>
        )}

        {/* Tabs and Content */}
        {content.tabs && content.tabs.length > 0 && (
          <div className="max-w-6xl mx-auto">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {content.tabs.map((tab, tabIndex) => (
                <button
                  key={tabIndex}
                  onClick={() => setActiveTab(tabIndex)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tabIndex 
                      ? 'shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: activeTab === tabIndex 
                      ? (content.activeTabBgColor || '#FFFFFF')
                      : (content.tabBgColor || '#F3F4F6'),
                    color: activeTab === tabIndex
                      ? (content.activeTabTextColor || '#0B1633')
                      : (content.tabTextColor || '#6B7280'),
                  }}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {content.tabs[activeTab]?.faqs?.map((faq, faqIndex) => (
                <div
                  key={faqIndex}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFaq(activeTab, faqIndex)}
                    className="w-full py-6 text-left flex justify-between items-center hover:bg-gray-50 px-4 rounded-lg transition-colors"
                  >
                    <h3 
                      className="text-lg font-semibold pr-4"
                      style={{ color: content.questionColor || '#0B1633' }}
                    >
                      {faq.question}
                    </h3>
                    <div 
                      className="flex-shrink-0 p-1 rounded-full"
                      style={{ backgroundColor: content.tabBgColor || '#F3F4F6' }}
                    >
                      {openFaqs[`${activeTab}-${faqIndex}`] ? (
                        <Minus size={20} style={{ color: content.activeTabTextColor || '#0B1633' }} />
                      ) : (
                        <Plus size={20} style={{ color: content.tabTextColor || '#6B7280' }} />
                      )}
                    </div>
                  </button>
                  
                  {openFaqs[`${activeTab}-${faqIndex}`] && (
                    <div 
                      className="px-4 pb-6"
                      style={{ color: content.answerColor || '#6B7280' }}
                    >
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}

              {(!content.tabs[activeTab]?.faqs || content.tabs[activeTab]?.faqs.length === 0) && (
                <div className="text-center py-12 text-gray-500">
                  <p>No FAQs added to this tab yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}