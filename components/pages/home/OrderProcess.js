// components/pages/home/OrderProcess.js
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const OrderProcess = ({ sectionData }) => {
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
        const orderProcessSection = data.sections?.find(s => s.sectionId === 'order-process');
        setContent(orderProcessSection);
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
      <section className="bg-[#F8F9FB] py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
          <div className="animate-pulse bg-gray-300 h-12 w-80 mx-auto mb-4 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-1 w-28 mx-auto mb-4 rounded-full"></div>
          <div className="animate-pulse bg-gray-300 h-6 w-96 mx-auto rounded"></div>
        </div>

        {/* Steps Loading */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 max-w-7xl mx-auto">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              <div className="animate-pulse bg-gray-300 w-16 h-16 rounded-full mb-4"></div>
              <div className="animate-pulse bg-gray-300 w-36 h-24 rounded-xl mb-3"></div>
              <div className="animate-pulse bg-gray-300 h-6 w-20 mb-1 rounded"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Fallback to static content if dynamic content is not available
  if (!content) {
    const staticSteps = [
      { id: "01", title: "Quote Check", desc: "Get an accurate quote for your book printing.", image: "/homepage/main-process1.jpg" },
      { id: "02", title: "Order", desc: "Place your order easily online.", image: "/homepage/main-process2.jpg" },
      { id: "03", title: "File Upload", desc: "Upload your files securely.", image: "/homepage/main-process3.jpg" },
      { id: "04", title: "Proof Check", desc: "Check proofs to ensure perfection.", image: "/homepage/main-process4.jpg" },
      { id: "05", title: "Payment", desc: "Make a secure payment.", image: "/homepage/main-process5.jpg" },
      { id: "06", title: "Print", desc: "High-quality printing begins.", image: "/homepage/main-process6.jpg" },
      { id: "07", title: "Shipping", desc: "Fast and safe delivery.", image: "/homepage/main-process7.jpg" },
      { id: "08", title: "Customer Service", desc: "Continuous support throughout.", image: "/homepage/main-process8.jpg" },
    ];

    return (
      <section className="bg-[#F8F9FB] py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1633] mb-3">
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              Order
            </span>{" "}
            Process
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto rounded-full mb-4"></div>
          <p className="mt-4 text-[#2E3850] max-w-2xl mx-auto text-lg md:text-base">
            Follow our simple 8-step process to get your printing done efficiently and hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 max-w-7xl mx-auto">
          {/* Gradient connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-2">
            <div className="w-full h-2 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] rounded-full"></div>
          </div>

          {staticSteps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center relative group transform transition duration-300 hover:scale-105 z-10"
            >
              {/* Step circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E21B36] to-[#FF4B2B] text-white font-bold text-xl flex items-center justify-center shadow-2xl mb-4 z-10">
                {step.id}
              </div>

              {/* Step image */}
              <div className="w-36 h-24 relative mb-3 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Step title */}
              <h3 className="font-semibold text-[#0B1633] text-base md:text-sm mb-1">{step.title}</h3>
              {/* Step description */}
              <p className="text-[#2E3850] text-xs md:text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Decorative blurred circles */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>
      </section>
    );
  }

  const steps = content.content?.steps || [
    { id: "01", title: "Quote Check", desc: "Get an accurate quote for your book printing.", image: "/homepage/main-process1.jpg" },
    { id: "02", title: "Order", desc: "Place your order easily online.", image: "/homepage/main-process2.jpg" },
    { id: "03", title: "File Upload", desc: "Upload your files securely.", image: "/homepage/main-process3.jpg" },
    { id: "04", title: "Proof Check", desc: "Check proofs to ensure perfection.", image: "/homepage/main-process4.jpg" },
    { id: "05", title: "Payment", desc: "Make a secure payment.", image: "/homepage/main-process5.jpg" },
    { id: "06", title: "Print", desc: "High-quality printing begins.", image: "/homepage/main-process6.jpg" },
    { id: "07", title: "Shipping", desc: "Fast and safe delivery.", image: "/homepage/main-process7.jpg" },
    { id: "08", title: "Customer Service", desc: "Continuous support throughout.", image: "/homepage/main-process8.jpg" },
  ];

  // Function to get step image URL
  const getStepImage = (stepId, defaultImage) => {
    const stepImage = content.images?.find(img => img.key === `step-${stepId}`);
    return stepImage ? stepImage.url : defaultImage;
  };

  return (
    <section className="bg-[#F8F9FB] py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1633] mb-3">
          <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
            {content.content?.highlightedTitle || "Order"}
          </span>{" "}
          {content.content?.title || "Process"}
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto rounded-full mb-4"></div>
        <p className="mt-4 text-[#2E3850] max-w-2xl mx-auto text-lg md:text-base">
          {content.content?.description || "Follow our simple 8-step process to get your printing done efficiently and hassle-free."}
        </p>
      </div>

      {/* Steps */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 max-w-7xl mx-auto">
        {/* Gradient connecting line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-2">
          <div className="w-full h-2 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] rounded-full"></div>
        </div>

        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center relative group transform transition duration-300 hover:scale-105 z-10"
          >
            {/* Step circle */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E21B36] to-[#FF4B2B] text-white font-bold text-xl flex items-center justify-center shadow-2xl mb-4 z-10">
              {step.id}
            </div>

            {/* Step image */}
            <div className="w-36 h-24 relative mb-3 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={getStepImage(step.id, step.image)}
                alt={step.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Step title */}
            <h3 className="font-semibold text-[#0B1633] text-base md:text-sm mb-1">{step.title}</h3>
            {/* Step description */}
            <p className="text-[#2E3850] text-xs md:text-sm">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default OrderProcess;