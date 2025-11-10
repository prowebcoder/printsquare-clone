// components/pages/home/HeroBanner.js
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroBanner({ sectionData }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If sectionData is provided from parent, use it directly
    if (sectionData) {
      setContent(sectionData);
      setLoading(false);
    } else {
      // Otherwise, fetch it from our new API
      fetchContent();
    }
  }, [sectionData]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content?page=home');
      if (response.ok) {
        const data = await response.json();
        const heroSection = data.sections?.find(s => s.sectionId === 'hero');
        setContent(heroSection);
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
      <section className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        <div className="relative z-10 text-center px-4">
          <div className="h-8 bg-gray-400 rounded w-80 mb-4 mx-auto animate-pulse"></div>
          <div className="h-12 bg-gray-400 rounded w-96 mx-auto animate-pulse"></div>
        </div>
      </section>
    );
  }

  // Fallback to static content if dynamic content is not available
  if (!content) {
    return (
      <section className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
        <Image
          src="/homepage/main-bg.jpg"
          alt="Printsquare background"
          fill
          priority
          className="object-cover brightness-95"
        />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-white text-2xl md:text-3xl font-light mb-2 drop-shadow-md">
            Quality prints. Fair prices. Print Seoul
          </h2>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
            Your printing partner that cares.
          </h1>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
      <Image
        src="/homepage/main-bg.jpg"
        alt="Printsquare background"
        fill
        priority
        className="object-cover brightness-95"
      />
      <div className="relative z-10 text-center px-4">
        <h2 className="text-white text-2xl md:text-3xl font-light mb-2 drop-shadow-md">
          {content.content?.subtitle || "Quality prints. Fair prices. Print Seoul"}
        </h2>
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
          {content.content?.title || "Your printing partner that cares."}
        </h1>
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
}