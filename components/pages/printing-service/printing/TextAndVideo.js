"use client";
import React from "react";

export default function TextAndVideo() {
  return (
    <section className="w-full bg-gradient-to-br from-[#f8f8f8] via-[#f1f1f1] to-[#eaeaea] py-16 sm:py-24 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Print Square <span className="text-[#0fb9b8]">Specializes</span> in
            Magazine and Catalog Printing
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We feel that with all our experience and expertise, any client who
            trusts their printing needs with <span className="font-semibold text-[#1aa0f3]">Print Square</span> will be
            amazed by the high quality and excellent service.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We pride ourselves on maintaining an exceptionally high level of
            printing quality. Print Square ensures that we are never behind even
            the most advanced printers from the US.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <span className="inline-block bg-[#0fb9b8]/10 text-[#0fb9b8] border border-[#0fb9b8]/20 px-5 py-2 rounded-full text-sm font-medium">
              High Quality Prints
            </span>
            <span className="inline-block bg-[#1aa0f3]/10 text-[#1aa0f3] border border-[#1aa0f3]/20 px-5 py-2 rounded-full text-sm font-medium">
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
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
