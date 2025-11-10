//components/pages/about/AboutUs.js
"use client";
import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <section className="relative bg-[#F8F9FB] py-20 px-6 md:px-16 lg:px-28 text-[#0B1633]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Image */}
        <div className="relative">
          <div className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/about/About.jpg"
              alt="Print Seoul Printing Facility"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white shadow-md p-4 rounded-2xl border border-[#2E3850] max-w-[240px]">
            <p className="text-sm text-[#121A2C] italic">
              “Precision in every print — from Seoul to the world.”
            </p>
          </div>
        </div>

        {/* Right Section - Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            About <span className="text-[#E21B36]">Print</span>
            <span className="text-[#FF4B2B]"> Seoul</span>
          </h2>

          <p className="text-[#121A2C] text-lg leading-relaxed mb-5">
            <strong>Print Seoul</strong> is a leading <strong>publication printer</strong> based in 
            <strong> South Korea</strong>, specializing in premium-quality printing for 
            books, magazines, catalogs, and corporate publications.
          </p>

          <p className="text-[#121A2C] text-lg leading-relaxed mb-5">
            With a perfect blend of traditional craftsmanship and modern printing 
            technology, we bring creativity to life through precision and quality. 
            Our Seoul-based facilities handle everything from design and prepress 
            to high-resolution offset printing, binding, and finishing.
          </p>

          <p className="text-[#121A2C] text-lg leading-relaxed mb-5">
            Whether you need small-batch art books or large-scale commercial runs, 
            <strong> Print Seoul</strong> ensures consistent quality, timely delivery, 
            and eco-conscious production — using sustainable materials and 
            environmentally friendly inks.
          </p>

          <p className="text-[#121A2C] text-lg leading-relaxed mb-5">
            Our mission is to make South Korean printing excellence accessible 
            worldwide, providing creative professionals, publishers, and brands 
            with a trusted partner for all publication needs.
          </p>

          <div className="mt-8">
            {/* <a
              href="/quote"
              className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:opacity-90 transition-all"
            >
              Get a Quote
            </a> */}
          </div>
        </div>
      </div>

      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
