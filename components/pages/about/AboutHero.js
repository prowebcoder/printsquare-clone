//components/pages/about/AboutHero.js
"use client";
import Image from "next/image";
import React from "react";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-[#0B1633]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/about/about-banner.jpg"
          alt="About Print Seoul Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0B1633]/70" /> {/* Dark Overlay */}
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight text-white">
          <span className="text-[#E21B36]">About</span>
          <span className="text-[#FF4B2B]"> Us</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-[#D6D9E0]">
          Precision. Passion. Printing Excellence from South Korea.
        </p>
      </div>

      {/* Decorative Gradient Blurs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl -z-0"></div>
    </section>
  );
}
