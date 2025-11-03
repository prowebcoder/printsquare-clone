//components/pages/quote/saddle-stitching/Heading.js
"use client";
import React from "react";

const Heading = ({ title = "Saddle Stitching", subtitle }) => {
  return (
    <div className="w-full text-center pt-32 pb-12 bg-gradient-to-r from-[#f8f8f8] via-[#ffffff] to-[#f8f8f8]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;
