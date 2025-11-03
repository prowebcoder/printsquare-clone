//components/pages/printing-service/printing/TextAndVideo.js
"use client";
import React from "react";

export default function TextAndVideo() {
  return (
    <section className="w-full bg-gradient-to-br from-[#F8F9FB] via-[#F2F2F2] to-[#EAEAEA] py-16 sm:py-24 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            PrintSeoul <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E21B36] to-[#FF4B2B]">Specializes</span> in
            Magazine and Catalog Printing
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            With years of experience, any client who trusts their printing needs with <strong className="text-gray-900 font-semibold">PrintSeoul</strong> will be impressed by the premium quality and outstanding service.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We pride ourselves on maintaining the highest standards of printing. PrintSeoul ensures precision, reliability, and a finish that meets international expectations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <span className="inline-block bg-[#FFE8E8] text-[#E21B36] border border-[#F5C2C2] px-5 py-2 rounded-full text-sm font-medium">
              High Quality Prints
            </span>
            <span className="inline-block bg-[#FFE8E8] text-[#FF4B2B] border border-[#F5C2C2] px-5 py-2 rounded-full text-sm font-medium">
              Excellent Service
            </span>
          </div>
        </div>

        {/* Right: Video */}
        <div className="relative w-full h-[280px] sm:h-[400px] md:h-[480px] rounded-2xl overflow-hidden shadow-lg">
          <video
            src="/homepage/video/printing.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}
