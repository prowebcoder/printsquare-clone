"use client";
import React from "react";
import { Printer, Star } from "lucide-react";

export default function Intro() {
  return (
    <section className="relative w-full bg-[#F8F9FB] py-20 px-6 sm:px-10 overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto text-center bg-white rounded-3xl shadow-2xl p-10 sm:p-14 border border-[#EAEAEA]">
        {/* Icon + Heading */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] rounded-full shadow-md">
            <Printer className="text-white w-8 h-8" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E21B36] to-[#FF4B2B]">
            Professional Printing Excellence
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
          Over the years, <strong className="text-gray-900 font-semibold">Print Seoul</strong> has earned the trust of 
          magazine publishers, designers, and printing brokers by consistently delivering outstanding 
          quality and reliable service. Our clients return time and again — confident their printing needs 
          are in expert hands.
        </p>

        {/* Highlights */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-[#FFE8E8] text-[#E21B36] px-4 py-2 rounded-full border border-[#F5C2C2] shadow-sm">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted Quality</span>
          </div>

          <div className="flex items-center gap-2 bg-[#FFE8E8] text-[#FF4B2B] px-4 py-2 rounded-full border border-[#F5C2C2] shadow-sm">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Repeat Clients</span>
          </div>

          <div className="flex items-center gap-2 bg-[#FFE8E8] text-[#E21B36] px-4 py-2 rounded-full border border-[#F5C2C2] shadow-sm">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Finish</span>
          </div>
        </div>
      </div>
    </section>
  );
}
