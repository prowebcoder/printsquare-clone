// components/pages/about/AboutUs.js
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function AboutUs() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content/about');
      const data = await response.json();
      setContent(data.content?.['about-content']); // Updated section ID
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative bg-[#F8F9FB] py-20 px-6 md:px-16 lg:px-28">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  const aboutContent = content?.content || {};
  const defaultContent = {
    title: "About Print Seoul",
    image: "/about/About.jpg",
    quote: "“Precision in every print — from Seoul to the world.”",
    paragraphs: [
      "Print Seoul is a leading publication printer based in South Korea, specializing in premium-quality printing for books, magazines, catalogs, and corporate publications.",
      "With a perfect blend of traditional craftsmanship and modern printing technology, we bring creativity to life through precision and quality.",
      "Whether you need small-batch art books or large-scale commercial runs, Print Seoul ensures consistent quality, timely delivery, and eco-conscious production.",
      "Our mission is to make South Korean printing excellence accessible worldwide."
    ],
    buttonText: "Get a Quote"
  };

  const {
    title = defaultContent.title,
    image = defaultContent.image,
    quote = defaultContent.quote,
    paragraphs = defaultContent.paragraphs,
    buttonText = defaultContent.buttonText
  } = aboutContent;

  return (
    <section className="relative bg-[#F8F9FB] py-20 px-6 md:px-16 lg:px-28 text-[#0B1633]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Image */}
        <div className="relative">
          <div className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={image}
              alt="Print Seoul Printing Facility"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white shadow-md p-4 rounded-2xl border border-[#2E3850] max-w-[240px]">
            <p className="text-sm text-[#121A2C] italic">
              {quote}
            </p>
          </div>
        </div>

        {/* Right Section - Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            {title}
          </h2>

          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[#121A2C] text-lg leading-relaxed mb-5">
              {paragraph}
            </p>
          ))}

          <div className="mt-8">
            <a
              href="/quote"
              className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:opacity-90 transition-all"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#E21B36]/20 to-[#FF4B2B]/20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}