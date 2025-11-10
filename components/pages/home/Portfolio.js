// components/pages/home/Portfolio.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Portfolio({ sectionData }) {
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
        const portfolioSection = data.sections?.find(s => s.sectionId === 'portfolio');
        setContent(portfolioSection);
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
      <section className="relative bg-[#F8F9FB] py-20 px-6 md:px-12 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          {/* Heading */}
          <div className="animate-pulse bg-gray-300 h-12 w-96 mx-auto mb-12 rounded"></div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-300 aspect-square rounded-xl"></div>
            ))}
          </div>

          {/* Button */}
          <div className="animate-pulse bg-gray-300 h-12 w-40 mx-auto rounded-full"></div>
        </div>
      </section>
    );
  }

  // Fallback to static content if dynamic content is not available
  if (!content) {
    const staticImages = [
      "p1.jpg",
      "p2.jpg",
      "p3.jpg",
      "p4.jpg",
      "p5.jpg",
      "p6.jpg",
      "p7.jpg",
      "p8.jpg",
      "p9.jpg",
      "p10.jpg",
    ];

    return (
      <section className="relative bg-[#F8F9FB] py-20 px-6 md:px-12 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-[#0B1633]">
            Our{" "}
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              Portfolio
            </span>{" "}
            Showcase
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
            {staticImages.map((img, index) => (
              <Link
                key={index}
                href="/portfolio"
                className="group relative overflow-hidden rounded-xl shadow-lg border border-[#2E3850] bg-white hover:shadow-2xl transition-shadow duration-500"
              >
                <Image
                  src={`/homepage/${img}`}
                  alt={`Portfolio image ${index + 1}`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#E21B36]/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
              </Link>
            ))}
          </div>

          {/* Button */}
          <Link
            href="/portfolio"
            className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>
    );
  }

  // Get portfolio images from content or use defaults
  const portfolioImages = content.images?.filter(img => img.key.startsWith('portfolio-')) || [
    { key: 'portfolio-1', url: '/homepage/p1.jpg', alt: 'Portfolio image 1' },
    { key: 'portfolio-2', url: '/homepage/p2.jpg', alt: 'Portfolio image 2' },
    { key: 'portfolio-3', url: '/homepage/p3.jpg', alt: 'Portfolio image 3' },
    { key: 'portfolio-4', url: '/homepage/p4.jpg', alt: 'Portfolio image 4' },
    { key: 'portfolio-5', url: '/homepage/p5.jpg', alt: 'Portfolio image 5' },
    { key: 'portfolio-6', url: '/homepage/p6.jpg', alt: 'Portfolio image 6' },
    { key: 'portfolio-7', url: '/homepage/p7.jpg', alt: 'Portfolio image 7' },
    { key: 'portfolio-8', url: '/homepage/p8.jpg', alt: 'Portfolio image 8' },
    { key: 'portfolio-9', url: '/homepage/p9.jpg', alt: 'Portfolio image 9' },
    { key: 'portfolio-10', url: '/homepage/p10.jpg', alt: 'Portfolio image 10' },
  ];

  return (
    <section className="relative bg-[#F8F9FB] py-20 px-6 md:px-12 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-[#0B1633]">
          {content.content?.title || "Our"}{" "}
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.content?.highlightedTitle || "Portfolio"}
          </span>{" "}
          {content.content?.subtitle || "Showcase"}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {portfolioImages.slice(0, 10).map((image, index) => (
            <Link
              key={image.key}
              href={content.content?.link || "/portfolio"}
              className="group relative overflow-hidden rounded-xl shadow-lg border border-[#2E3850] bg-white hover:shadow-2xl transition-shadow duration-500"
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#E21B36]/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl"></div>
            </Link>
          ))}
        </div>

        {/* Button */}
        <Link
          href={content.content?.buttonLink || "/portfolio"}
          className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {content.content?.buttonText || "Learn More"}
        </Link>
      </div>
    </section>
  );
}