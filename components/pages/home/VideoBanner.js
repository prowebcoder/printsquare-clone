// components/pages/home/VideoBanner.js
"use client";
import React, { useState, useEffect } from "react";

export default function VideoBanner({ sectionData }) {
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
        const videoSection = data.sections?.find(s => s.sectionId === 'video-banner');
        setContent(videoSection);
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
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="h-12 bg-gray-400 rounded w-96 mb-4 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-400 rounded w-full mx-auto animate-pulse"></div>
        </div>
      </section>
    );
  }

  // Fallback to static content if dynamic content is not available
  if (!content) {
    return (
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/homepage/video/printing.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Overlay */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            <span className="text-[#FF4B2B]">High-Quality</span>{" "}
            <span className="text-[#D6D9E0]">Printing at Affordable Prices</span>
          </h1>
          <p className="text-base md:text-lg text-gray-200">
            Print Seoul delivers premium book printing with advanced technology, 
            flawless finishing, and exceptional value perfect for businesses and creators.
          </p>
        </div>
      </section>
    );
  }

  const videoFile = content.images?.find(img => img.key === 'background-video');
  const highlightedText = content.content?.highlightedText || "High-Quality";
  const normalText = content.content?.normalText || "Printing at Affordable Prices";
  const description = content.content?.description || "Print Seoul delivers premium book printing with advanced technology, flawless finishing, and exceptional value perfect for businesses and creators.";

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      {videoFile ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoFile.url}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/homepage/video/printing.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          <span className="text-[#FF4B2B]">{highlightedText}</span>{" "}
          <span className="text-[#D6D9E0]">{normalText}</span>
        </h1>
        <p className="text-base md:text-lg text-gray-200">
          {description}
        </p>
      </div>
    </section>
  );
}