"use client";
import Image from "next/image";
import React from "react";

const Method = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#fafafa] to-[#f3f3f3] overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#0b5fa4]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#b4a89a]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
            Selectable <span className="text-[#ef4146]">Proof Method</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from two professional proofing methods that ensure accuracy
            and efficiency for every project.
          </p>
        </div>

        {/* Proof Methods */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* E-Proof */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#08807d] to-[#37af8a] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                01
              </span>
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-[#0b5fa4] transition-colors">
                E-Proof
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-base">
              Proceed with proofing through a digital proof file. It’s{" "}
              <span className="font-medium text-[#0b5fa4]">free</span>, fast,
              and perfect for quick approvals.
            </p>
          </div>

          {/* Digital-Proof */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#f8a438] to-[#f28639] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                02
              </span>
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-[#b4a89a] transition-colors">
                Digital-Proof
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-base">
              Get a printed version of your uploaded file for review. You’ll see
              the actual proof quality — though it requires extra{" "}
              <span className="font-medium text-[#b4a89a]">time and cost</span>.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/homepage/main-sec05-1.jpg"
            alt="Selectable Proof Method"
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Method;