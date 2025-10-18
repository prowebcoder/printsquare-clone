"use client";
import React from "react";
import { Printer, Star } from "lucide-react";

export default function Intro() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#f9f9f8] via-[#f2f1ef] to-[#eae7e4] py-20 px-6 sm:px-10 overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto text-center bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-10 sm:p-14">
        {/* Icon + Heading */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-md">
            <Printer className="text-white w-8 h-8" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-orange-500">
            Professional Printing Excellence
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
          Over the years, <strong className="text-gray-800 font-semibold">Print Seoul</strong> has earned the trust of 
          magazine publishers, designers, and printing brokers by consistently delivering outstanding 
          quality and reliable service. Our clients return time and again — confident their printing needs 
          are in expert hands.
        </p>

        {/* Highlights */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200 shadow-sm">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted Quality</span>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-2 rounded-full border border-orange-200 shadow-sm">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Repeat Clients</span>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-cyan-50 text-cyan-700 px-4 py-2 rounded-full border border-cyan-200 shadow-sm">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Finish</span>
          </div>
        </div>
      </div>
    </section>
  );
}
