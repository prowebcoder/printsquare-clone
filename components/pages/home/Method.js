"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Method = ({ sectionData }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If sectionData is provided from parent, use it directly
    if (sectionData) {
      setContent(sectionData);
      setLoading(false);
    } else {
      // Otherwise, fetch it directly
      fetchContent();
    }
  }, [sectionData]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content/home');
      if (response.ok) {
        const data = await response.json();
        const methodSection = data.sections?.find(s => s.sectionId === 'method');
        setContent(methodSection);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="relative py-24 bg-[#F8F9FB] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-gray-300 h-12 w-96 mx-auto mb-4 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-80 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-300 h-48 rounded-2xl"></div>
            ))}
          </div>
          <div className="animate-pulse bg-gray-300 h-72 md:h-96 rounded-2xl"></div>
        </div>
      </section>
    );
  }

  // Fallback to static content if dynamic content is not available
  if (!content) {
    return (
      <section className="relative py-24 bg-[#F8F9FB] overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1633]">
              Selectable{" "}
              <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
                Proof Method
              </span>
            </h2>
            <p className="text-[#2E3850] max-w-2xl mx-auto text-lg">
              Choose from two professional proofing methods that ensure accuracy
              and efficiency for every project.
            </p>
          </div>

          {/* Proof Methods */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* E-Proof */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#E21B36] transition-all duration-300 border border-[#D6D9E0]">
              <div className="flex items-center mb-5">
                <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                  01
                </span>
                <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#E21B36] transition-colors">
                  E-Proof
                </h3>
              </div>
              <p className="text-[#2E3850] leading-relaxed text-base">
                Proceed with proofing through a digital proof file. Its
                <span className="font-medium text-[#E21B36]">free</span>, fast,
                and perfect for quick approvals.
              </p>
            </div>

            {/* Digital-Proof */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#FF4B2B] transition-all duration-300 border border-[#D6D9E0]">
              <div className="flex items-center mb-5">
                <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                  02
                </span>
                <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#FF4B2B] transition-colors">
                  Digital-Proof
                </h3>
              </div>
              <p className="text-[#2E3850] leading-relaxed text-base">
                Get a printed version of your uploaded file for review. You will  see
                the actual proof quality — though it requires extra
                <span className="font-medium text-[#FF4B2B]">time and cost</span>.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/homepage/main-sec05-1.jpg"
              alt="Selectable Proof Method"
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1633]/40 to-transparent rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  const methodImage = content.images?.find(img => img.key === 'method-image');
const method1 = content.content?.method1 || {
  title: "E-Proof",
  description: "Proceed with proofing through a digital proof file. Its free, fast, and perfect for quick approvals."
};
const method2 = content.content?.method2 || {
  title: "Digital-Proof",
  description: "Get a printed version of your uploaded file for review. You will see the actual proof quality — though it requires extra time and cost."
};


  return (
    <section className="relative py-24 bg-[#F8F9FB] overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1633]">
            {content.content?.title || "Selectable"}{" "}
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              {content.content?.highlightedTitle || "Proof Method"}
            </span>
          </h2>
          <p className="text-[#2E3850] max-w-2xl mx-auto text-lg">
            {content.content?.description || "Choose from two professional proofing methods that ensure accuracy and efficiency for every project."}
          </p>
        </div>

        {/* Proof Methods */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* E-Proof */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#E21B36] transition-all duration-300 border border-[#D6D9E0]">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                01
              </span>
              <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#E21B36] transition-colors">
                {method1.title}
              </h3>
            </div>
            <p className="text-[#2E3850] leading-relaxed text-base">
              {method1.description}
            </p>
          </div>

          {/* Digital-Proof */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#FF4B2B] transition-all duration-300 border border-[#D6D9E0]">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                02
              </span>
              <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#FF4B2B] transition-colors">
                {method2.title}
              </h3>
            </div>
            <p className="text-[#2E3850] leading-relaxed text-base">
              {method2.description}
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg">
          {methodImage ? (
            <Image
              src={methodImage.url}
              alt={methodImage.alt}
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <Image
              src="/homepage/main-sec05-1.jpg"
              alt="Selectable Proof Method"
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1633]/40 to-transparent rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Method;