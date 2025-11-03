//components/pages/portfolio/PortfolioShowcase.js
"use client";
import { useState } from "react";
import PortfolioData from "../../data/PortfolioData";
import Image from "next/image";

const bindingOptions = ["All", "Perfect Binding", "Saddle Binding", "Hardcover Binding", "Wire Binding"];
const coverOptions = ["All", "Gloss", "Matte", "Hi Plus", "Hi Qmatte", "Uncoated"];
const insideOptions = ["All", "Gloss", "Matte", "Hi Plus", "Hi Qmatte", "Uncoated"];

const ITEMS_PER_PAGE = 9;

export default function PortfolioShowcase() {
  const [bindingFilter, setBindingFilter] = useState("All");
  const [coverFilter, setCoverFilter] = useState("All");
  const [insideFilter, setInsideFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = PortfolioData.filter((item) => {
    return (
      (bindingFilter === "All" || item.category1 === bindingFilter) &&
      (coverFilter === "All" || item.category2 === coverFilter) &&
      (insideFilter === "All" || item.category3 === insideFilter)
    );
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <section className="bg-gradient-to-br from-[#f8f8f8] to-[#eaeaea] py-12 pt-32">
      <div className="container mx-auto px-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {/* Filter Title */}
          <h3 className="text-gray-800 text-lg font-semibold mr-2">Filter:</h3>

          {/* Binding Filter */}
          <select
            value={bindingFilter}
            onChange={(e) => setBindingFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-400 bg-white shadow-sm"
          >
            {bindingOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          {/* Cover Paper Filter */}
          <select
            value={coverFilter}
            onChange={(e) => setCoverFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-400 bg-white shadow-sm"
          >
            {coverOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          {/* Inside Paper Filter */}
          <select
            value={insideFilter}
            onChange={(e) => setInsideFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-400 bg-white shadow-sm"
          >
            {insideOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedData.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition bg-[#f3f3f3]"
            >
              {/* Background box ensures equal height */}
              <div className="relative w-full h-[350px] flex items-center justify-center bg-[#f3f3f3]">
                <Image
                  src={item.image}
                  alt="Portfolio Image"
                  fill
                  className="object-contain group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition">
                <p className="font-semibold">{item.category1}</p>
                <p className="text-gray-200 text-xs">
                  {item.category2} | {item.category3}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
