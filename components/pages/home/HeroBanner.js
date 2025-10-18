"use client";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/homepage/main-bg.jpg"
        alt="Printsquare background"
        fill
        priority
        className="object-cover brightness-95"
      />

      {/* Overlay Text */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-white text-2xl md:text-3xl font-light mb-2 drop-shadow-md">
          Quality prints. Fair prices. Print Seoul
        </h2>
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
          Your printing partner that cares.
        </h1>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
}
