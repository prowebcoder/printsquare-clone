// app/[...slug]/components/renderers/premium/TabsFaqRenderer.js
"use client";

import React, { useState, memo } from "react";

function TabsFaqRenderer({ component }) {
  const content = component.content || {};
  const tabs = content.tabs || [];

  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  // Return nothing if section has no content
  if (!content.title && tabs.length === 0) return null;

  // Background styling function
  const getBackgroundStyle = () => {
    if (content.backgroundType === "solid") {
      return { backgroundColor: content.backgroundColor || "#f5f3ef" };
    }
    if (content.backgroundType === "gradient") {
      return {
        background: `linear-gradient(to bottom, ${
          content.gradientFrom || "#f5f3ef"
        }, ${content.gradientTo || "#e8e3dd"})`,
      };
    }
    return {};
  };

  // Title split logic (safe for single-word titles)
  const titleWords = content.title ? content.title.split(" ") : [];
  const mainTitle = titleWords.slice(0, -1).join(" ");
  const lastWord = titleWords.slice(-1)[0];

  return (
    <section
      className="py-20 px-4"
      style={getBackgroundStyle()}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section Title */}
        {content.title && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span style={{ color: content.titleColor || "#0B1633" }}>
                {mainTitle}
              </span>{" "}
              <span style={{ color: content.highlightedColor || "#FF4B2B" }}>
                {lastWord}
              </span>
            </h1>
          </div>
        )}

        {/* Tabs */}
        {tabs.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab, tabIndex) => (
              <button
                key={`tab-${tabIndex}`}
                onClick={() => {
                  setActiveTab(tabIndex);
                  setOpenIndex(null);
                }}
                className="px-5 py-2 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor:
                    activeTab === tabIndex
                      ? content.activeTabBg || "#e21b36"
                      : content.inactiveTabBg || "#ffffff",
                  color:
                    activeTab === tabIndex
                      ? content.activeTabText || "#ffffff"
                      : content.inactiveTabText || "#666666",
                  boxShadow:
                    activeTab === tabIndex ? "0 0 10px rgba(0,0,0,0.15)" : "none",
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Accordion */}
        {tabs[activeTab]?.faqs?.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg divide-y">
            {tabs[activeTab].faqs.map((item, faqIndex) => (
              <div key={`faq-${activeTab}-${faqIndex}`} className="p-5">
                <button
                  className="flex justify-between w-full text-left text-lg font-semibold"
                  style={{ color: content.questionColor || "#1f2937" }}
                  onClick={() =>
                    setOpenIndex(openIndex === faqIndex ? null : faqIndex)
                  }
                >
                  {item.question}

                  <span
                    className={`transition-transform text-2xl leading-none ${
                      openIndex === faqIndex ? "rotate-45" : ""
                    }`}
                    style={{
                      color: content.highlightedColor || "#e21b36",
                      transformOrigin: "center",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === faqIndex ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p
                    className="text-gray-600"
                    style={{ color: content.answerColor || "#6b7280" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 text-lg">No FAQs added to this tab yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Add questions and answers in the editor.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

// Use memo to prevent unnecessary re-renders
export default memo(TabsFaqRenderer, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.component.content) === JSON.stringify(nextProps.component.content);
});