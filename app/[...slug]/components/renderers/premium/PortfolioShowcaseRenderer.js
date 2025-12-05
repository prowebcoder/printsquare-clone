// components/PageBuilder/renderers/PortfolioShowcaseRenderer.js
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PortfolioShowcaseRenderer({ component, index }) {
  const content = component.content || {};
  const [bindingFilter, setBindingFilter] = useState("All");
  const [coverFilter, setCoverFilter] = useState("All");
  const [insideFilter, setInsideFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Use default data if no portfolioItems provided
  const portfolioData = content.portfolioItems || getDefaultPortfolioData();

  // Filter options
  const bindingOptions = content.bindingOptions || ["All", "Perfect Binding", "Saddle Binding", "Hardcover Binding", "Wire Binding"];
  const coverOptions = content.coverOptions || ["All", "Gloss", "Matte", "Hi Plus", "Hi Qmatte", "Uncoated"];
  const insideOptions = content.insideOptions || ["All", "Gloss", "Matte", "Hi Plus", "Hi Qmatte", "Uncoated"];

  // Items per page
  const ITEMS_PER_PAGE = content.itemsPerPage || 9;

  // Apply filters
  const filteredData = portfolioData.filter((item) => {
    return (
      (bindingFilter === "All" || item.category1 === bindingFilter) &&
      (coverFilter === "All" || item.category2 === coverFilter) &&
      (insideFilter === "All" || item.category3 === insideFilter)
    );
  });

  // Pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [bindingFilter, coverFilter, insideFilter]);

  // Get background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#F8F8F8' };
      case 'gradient':
        return { 
          background: `linear-gradient(to bottom right, ${content.gradientFrom || '#F8F8F8'}, ${content.gradientTo || '#EAEAEA'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Get grid classes based on settings
  const getGridClasses = () => {
    const desktopCols = content.desktopColumns || 3;
    const tabletCols = content.tabletColumns || 2;
    const mobileCols = content.mobileColumns || 1;
    
    return `grid grid-cols-${mobileCols} sm:grid-cols-${tabletCols} md:grid-cols-${desktopCols} gap-6`;
  };

  return (
    <section
      key={component.id || index}
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={getBackgroundStyle()}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          {content.title && (
            <h2 
              className={`font-extrabold leading-tight text-gray-900 ${content.titleSize || 'text-3xl sm:text-4xl'} mb-4`}
              style={{ color: content.titleColor || '#1F2937' }}
            >
              {content.title}
            </h2>
          )}
          {content.description && (
            <p 
              className={`text-gray-700 mx-auto max-w-3xl ${content.descriptionSize || 'text-base sm:text-lg'}`}
              style={{ color: content.descriptionColor || '#4B5563' }}
            >
              {content.description}
            </p>
          )}
        </div>

        {/* Filters - Only show if enabled */}
        {content.showFilters !== false && (
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12">
            <h3 className="text-gray-800 text-sm md:text-base font-medium mr-2">Filter:</h3>

            {/* Binding Filter */}
            <select
              value={bindingFilter}
              onChange={(e) => setBindingFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm text-gray-700 focus:ring-2 focus:ring-gray-400 bg-white shadow-sm min-w-[140px]"
            >
              {bindingOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* Cover Paper Filter */}
            <select
              value={coverFilter}
              onChange={(e) => setCoverFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm text-gray-700 focus:ring-2 focus:ring-gray-400 bg-white shadow-sm min-w-[140px]"
            >
              {coverOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* Inside Paper Filter */}
            <select
              value={insideFilter}
              onChange={(e) => setInsideFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm text-gray-700 focus:ring-2 focus:ring-gray-400 bg-white shadow-sm min-w-[140px]"
            >
              {insideOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center mb-6 text-sm text-gray-600">
          Showing {displayedData.length} of {filteredData.length} items
          {filteredData.length !== portfolioData.length && (
            <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
              Filtered
            </span>
          )}
        </div>

        {/* Image Grid */}
        <div className={getGridClasses()}>
          {displayedData.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 md:h-80 bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`Portfolio item ${item.id}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-white">
                  <p className="font-semibold text-sm md:text-base">{item.category1}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-gray-200">
                    <span>{item.category2}</span>
                    <span className="text-gray-400">•</span>
                    <span>{item.category3}</span>
                  </div>
                </div>
              </div>

              {/* Corner Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800">
                #{item.id}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {displayedData.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg mb-2">No items found</p>
              <p className="text-gray-400 text-sm">Try changing your filter settings</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 md:mt-12 gap-1 md:gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 md:px-4 py-2 rounded-md border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 md:px-4 py-2 rounded-md border text-sm font-medium ${
                    currentPage === pageNum
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                {currentPage < totalPages - 2 && totalPages > 6 && (
                  <span className="px-2 py-2 text-gray-500">...</span>
                )}
                {currentPage < totalPages - 1 && totalPages > 5 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 md:px-4 py-2 rounded-md border text-sm font-medium ${
                      currentPage === totalPages
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </>
            )}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 md:px-4 py-2 rounded-md border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Default portfolio data function
function getDefaultPortfolioData() {
  // You can import your actual PortfolioData here or define a subset
  return [
    {
      id: 1,
      image: "/portfolio/p1.jpg",
      category1: "Perfect Binding",
      category2: "Gloss",
      category3: "Hi Plus",
    },
    {
      id: 2,
      image: "/portfolio/p2.jpg",
      category1: "Saddle Binding",
      category2: "Matte",
      category3: "Uncoated",
    },
    {
      id: 3,
      image: "/portfolio/p3.jpg",
      category1: "Hardcover Binding",
      category2: "Hi Plus",
      category3: "Gloss",
    },
    {
      id: 4,
      image: "/portfolio/p4.jpg",
      category1: "Wire Binding",
      category2: "Matte",
      category3: "Hi Qmatte",
    },
    {
      id: 5,
      image: "/portfolio/p5.jpg",
      category1: "Perfect Binding",
      category2: "Hi Qmatte",
      category3: "Uncoated",
    },
    {
      id: 6,
      image: "/portfolio/p6.jpg",
      category1: "Saddle Binding",
      category2: "Gloss",
      category3: "Matte",
    },
    {
      id: 7,
      image: "/portfolio/p7.jpg",
      category1: "Wire Binding",
      category2: "Hi Plus",
      category3: "Gloss",
    },
    {
      id: 8,
      image: "/portfolio/p8.jpg",
      category1: "Hardcover Binding",
      category2: "Uncoated",
      category3: "Matte",
    },
    {
      id: 9,
      image: "/portfolio/p9.jpg",
      category1: "Perfect Binding",
      category2: "Gloss",
      category3: "Hi Qmatte",
    },
  ];
}