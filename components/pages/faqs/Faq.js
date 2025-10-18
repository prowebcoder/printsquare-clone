"use client";
import React, { useState } from "react";
import { faqData } from "../../data/FaqData";

export default function Faq() {
  const tabs = Object.keys(faqData);
  const [activeTab, setActiveTab] = useState("ORDER");
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5f3ef] to-[#e8e3dd]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Frequently Asked <span className="text-[#ec8f34]">Questions</span>
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenIndex(null);
              }}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                activeTab === tab
                  ? "bg-[#ec8f34] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-lg divide-y">
          {faqData[activeTab].map((item, index) => (
            <div key={index} className="p-5">
              <button
                className="flex justify-between w-full text-left text-lg font-semibold text-gray-800"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                {item.question}
                <span
                  className={`transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  } text-[#ec8f34] text-2xl leading-none`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
