"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function TabsGallery() {
  const [activeTab, setActiveTab] = useState("sheetfed");

  const tabs = [
    { id: "sheetfed", label: "Sheet-Fed Press" },
    { id: "webfed", label: "Web-Fed Press" },
    { id: "binding", label: "Binding Machines" },
    { id: "smallprint", label: "From Small Print Run To Bulk Printing" },
  ];

  const gallery = {
    sheetfed: [
      "/printing-service/sfp1.png",
      "/printing-service/sfp2.png",
      "/printing-service/sfp3.png",
      "/printing-service/sfp4.png",
      "/printing-service/sfp5.png",
      "/printing-service/sfp6.png",
    ],
    webfed: [
      "/printing-service/wfp1.png",
      "/printing-service/wfp2.png",
    ],
    binding: [
      "/printing-service/bm1.png",
      "/printing-service/bm2.png",
      "/printing-service/bm3.png",
      "/printing-service/bm4.png",
    ],
    smallprint: [
      "/printing-service/spr1.png",
      "/printing-service/spr2.png",
    ],
  };

  return (
    <section className="bg-white py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Our Advanced Printing Facilities
          </h2>
          <p className="mt-4 text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
            From small runs to large-scale printing, <strong className="text-[#E21B36]">PrintSeoul</strong> delivers precision and quality at every stage.
          </p>
        </header>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white border-transparent shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
              {gallery[activeTab].map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 group"
                >
                  <Image
                    src={src}
                    alt={`Gallery ${activeTab} ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 rounded-2xl"></div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
