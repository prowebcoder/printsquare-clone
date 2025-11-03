"use client";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import { useState, useEffect } from "react";

const Notice = ({ sectionData }) => {
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
        const noticeSection = data.sections?.find(s => s.sectionId === 'notice');
        setContent(noticeSection);
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
      <section className="bg-[#FAFAFA] py-20 text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <div className="mb-14">
            <div className="animate-pulse bg-gray-300 h-10 w-64 mx-auto mb-4 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-1 w-24 mx-auto rounded-full"></div>
          </div>

          {/* Notice Cards */}
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="animate-pulse bg-gray-300 h-6 w-full mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-full mb-3 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-3 w-24 rounded"></div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-12">
            <div className="animate-pulse bg-gray-300 h-12 w-40 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to static content if dynamic content is not available
  if (!content) {
    const staticNotices = [
      {
        title: "[Update] Notice on Delivery and Tariffs",
        desc: "At Print Seoul, all shipments are handled on a door-to-door basis unless customers specifically request a different delivery option. This ensures that your order will arrive directly at the ...",
        date: "09.24.2025",
      },
      {
        title: "[Update] Print Seoul's Homepage has been RE-DESIGNED!",
        desc: "Dear Client, Print Seoul has re-formed the homepage to make it more convenient for clients to place an order and easier to understand the advantages of PrintSquare. We pr...",
        date: "08.23.2023",
      },
    ];

    return (
      <section className="bg-[#FAFAFA] py-20 text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <div className="mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide flex items-center justify-center gap-3">
              <Megaphone className="w-8 h-8 text-[#E21B36]" />
              Latest Notices
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Notice Cards */}
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {staticNotices.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-transparent hover:bg-gradient-to-r hover:from-[#FFE3E5] hover:to-[#FFF0E5] transition duration-300"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {item.desc}
                </p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-12">
            <Link
              href="#"
              className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition duration-300"
            >
              View All Notices
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const notices = content.content?.notices || [
    {
      title: "[Update] Notice on Delivery and Tariffs",
      desc: "At Print Seoul, all shipments are handled on a door-to-door basis unless customers specifically request a different delivery option. This ensures that your order will arrive directly at the ...",
      date: "09.24.2025",
    },
    {
      title: "[Update] Print Seoul's Homepage has been RE-DESIGNED!",
      desc: "Dear Client, Print Seoul has re-formed the homepage to make it more convenient for clients to place an order and easier to understand the advantages of PrintSquare. We pr...",
      date: "08.23.2023",
    },
  ];

  return (
    <section className="bg-[#FAFAFA] py-20 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide flex items-center justify-center gap-3">
            <Megaphone className="w-8 h-8 text-[#E21B36]" />
            {content.content?.title || "Latest Notices"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Notice Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {notices.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-transparent hover:bg-gradient-to-r hover:from-[#FFE3E5] hover:to-[#FFF0E5] transition duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {item.desc}
              </p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12">
          <Link
            href={content.content?.buttonLink || "#"}
            className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition duration-300"
          >
            {content.content?.buttonText || "View All Notices"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Notice;