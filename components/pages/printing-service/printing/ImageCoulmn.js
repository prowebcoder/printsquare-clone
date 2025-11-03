//components/pages/printing-service/printing/ImageCoulmn.js
"use client";
import React from "react";
import Image from "next/image";

const data = [
  {
    id: 1,
    img: "/printing-service/ps1.png",
    title: "Modern Printing Facilities",
    text: "Our climate-controlled facilities are equipped with the latest printing technology, ensuring precision and consistency in every project.",
  },
  {
    id: 2,
    img: "/printing-service/ps2.png",
    title: "Skilled Professionals",
    text: "Our team members are highly trained, with over a decade of experience in professional printing and production management.",
  },
  {
    id: 3,
    img: "/printing-service/ps3.png",
    title: "Quality Control Standards",
    text: "We follow strict quality guidelines throughout every process to guarantee the best possible results and long-term client satisfaction.",
  },
  {
    id: 4,
    img: "/printing-service/ps4.png",
    title: "Premium Paper Selection",
    text: "Choose from a large assortment of high-quality paper stock to bring your magazine, catalog, or brochure to life with elegance.",
  },
];

export default function ImageColumn() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Our Printing Excellence
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            At <strong className="text-[#E21B36]">PrintSeoul</strong>, every print goes through the highest level of craftsmanship — powered by technology, guided by experience, and perfected by quality control.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {data.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center text-center space-y-5"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Optional subtle red overlay accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E21B36]/10 to-[#FF4B2B]/10 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-500"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
