"use client";
import Image from "next/image";
import React from "react";

export default function PrintingServicesHero() {
  return (
    <section className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/main-sec05-1.jpg"
          alt="About Print Seoul Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight">
          <span className="text-[#ec8f34]">Printing </span>
          <span className="text-[#fdce2b]"> Services</span>
        </h1>
      </div>

      {/* Decorative Gradient Blurs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#ec8f34]/20 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#fdce2b]/20 rounded-full blur-3xl -z-0"></div>
    </section>
  );
}
