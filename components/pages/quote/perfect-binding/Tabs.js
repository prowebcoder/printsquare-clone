"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, FileText, Truck } from "lucide-react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("samples");

  const tabs = [
    { id: "samples", label: "Product Samples", icon: <Package className="w-5 h-5" /> },
    { id: "setup", label: "File Setup Guide", icon: <FileText className="w-5 h-5" /> },
    { id: "delivery", label: "Processing & Delivery", icon: <Truck className="w-5 h-5" /> },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#faf9f7] via-[#f0eeeb] to-[#e7e4e0] py-20 px-6 overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-5xl mx-auto backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-gray-200 p-10">
        {/* Header */}
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
          Learn More About Our Printing Process
        </h2>

        {/* Tabs Navigation */}
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md scale-105"
                    : "bg-white text-gray-600 border border-gray-200 hover:text-blue-600 hover:border-blue-400"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated Tab Content */}
        <div className="bg-white/90 border border-gray-100 rounded-2xl shadow-inner p-8 min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeTab === "samples" && (
              <motion.div
                key="samples"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Perfect Binding Quality Is Excellent
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Perfect binding is one of the most popular binding methods chosen by customers. 
                  If the spine width is more than 0.7", perfect binding offers better stability 
                  and a professional finish. Choose from a range of sizes and paper types for 
                  both cover and inside pages.
                </p>
              </motion.div>
            )}

            {activeTab === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  File Setup Guide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ensure your files are print-ready by including bleeds, crop marks, and 
                  using high-resolution images. Always export your artwork in CMYK mode for 
                  accurate color reproduction. Our team can review your files upon request.
                </p>
              </motion.div>
            )}

            {activeTab === "delivery" && (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Processing & Delivery
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Standard production takes 5 business days after final proof approval. 
                  Delivery times may vary depending on your location and courier availability. 
                  We offer both domestic and international shipping options for your convenience.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}