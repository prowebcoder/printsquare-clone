// components/pages/home/ImageBanner.js
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ImageBanner({ sectionData }) {
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
        const imageBannerSection = data.sections?.find(s => s.sectionId === 'image-banner-1');
        setContent(imageBannerSection);
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
      <section className="bg-[#0B1633] pt-16 pb-0 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left text-white">
            <div className="animate-pulse bg-gray-600 h-10 w-80 mb-4 rounded"></div>
            <div className="animate-pulse bg-gray-600 h-4 w-full mb-3 rounded"></div>
            <div className="animate-pulse bg-gray-600 h-4 w-3/4 mb-3 rounded"></div>
            <div className="animate-pulse bg-gray-600 h-4 w-2/3 mb-6 rounded"></div>
            <div className="animate-pulse bg-gray-500 h-10 w-32 rounded"></div>
          </div>
          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="animate-pulse bg-gray-600 w-96 h-64 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to static content if dynamic content is not available
  if (!content) {
    return (
      <section className="bg-[#0B1633] pt-16 pb-0 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect Paper Match!
            </h2>
            <p className="text-base mb-4 leading-relaxed text-[#D6D9E0]">
              Print Seoul gives you 19 high-quality paper choices,
              each designed to make your book stand out with style and substance.
            </p>
            <p className="text-base mb-4 leading-relaxed text-[#D6D9E0]">
              Bring your imagination to life and design a book that truly reflects your style.
            </p>
            <p className="text-base mb-6 leading-relaxed text-[#D6D9E0]">
              Explore Our Premium Paper Collection
            </p>

            <button className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold py-2 px-6 rounded-sm hover:opacity-90 transition-all duration-300">
              Click Me!
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/homepage/paper.png"
              alt="High-quality paper"
              width={650}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  const bannerImage = content.images?.find(img => img.key === 'paper-image');
  const paragraphs = content.content?.paragraphs || [
    "Print Seoul gives you 19 high-quality paper choices, each designed to make your book stand out with style and substance.",
    "Bring your imagination to life and design a book that truly reflects your style.",
    "Explore Our Premium Paper Collection"
  ];

  return (
    <section className="bg-[#0B1633] pt-16 pb-0 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.content?.title || "Find Your Perfect Paper Match!"}
          </h2>
          
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base mb-4 leading-relaxed text-[#D6D9E0]">
              {paragraph}
            </p>
          ))}

          <button className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold py-2 px-6 rounded-sm hover:opacity-90 transition-all duration-300">
            {content.content?.buttonText || "Click Me!"}
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          {bannerImage ? (
            <Image
              src={bannerImage.url}
              alt={bannerImage.alt}
              width={650}
              height={400}
              className="object-contain"
            />
          ) : (
            <Image
              src="/homepage/paper.png"
              alt="High-quality paper"
              width={650}
              height={400}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </section>
  );
}