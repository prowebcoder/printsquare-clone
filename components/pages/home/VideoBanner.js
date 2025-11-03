//components/pages/home/VideoBanner.js
"use client";
import React from "react";

export default function VideoBanner() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/homepage/video/printing.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          <span className="text-[#FF4B2B]">High-Quality</span>{" "}
          <span className="text-[#D6D9E0]">Printing at Affordable Prices</span>
        </h1>
        <p className="text-base md:text-lg text-gray-200">
          Print Seoul delivers premium book printing with advanced technology, 
          flawless finishing, and exceptional value perfect for businesses and creators.
        </p>
      </div>
    </section>
  );
}
