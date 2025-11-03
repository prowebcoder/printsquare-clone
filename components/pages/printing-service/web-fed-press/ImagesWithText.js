//components/pages/printing-service/web-fed-press/ImagesWithText.js
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ImagesWithText() {
  const sections = [
    {
      id: 1,
      image: "/printing-service/sub1-03-1.png",
      title: "Fast And Efficient",
      text: `Web-fed presses use large, continuous rolls of paper rather than individual sheets. 
      These rolls move through the press at high speed, making printing fast and highly efficient. 
      They can process up to 40,000 images per hour, compared to around 10,000 per hour for sheet-fed presses. 
      While sheet-fed presses require binding off-press, web presses trim and fold the paper directly on the press.`,
      reverse: false,
    },
    {
      id: 2,
      image: "/printing-service/sub1-03-2.png",
      title: "Folding Capability",
      text: `Automated folding capabilities on web presses offer significant time and cost savings. 
      Modern web presses also achieve print quality comparable to sheet-fed presses, making them ideal 
      for medium to large print runs.`,
      reverse: true,
    },
    {
      id: 3,
      image: "/printing-service/sub1-03-3.png",
      title: "Leave A Note",
      text: `Prices displayed on Instant Quote are based on sheet-fed presses. 
      For bulk orders using web-fed presses, please specify this in the Custom Quote form 
      under the Special Requests section. We will adjust your pricing accordingly 
      and use web-fed press for your order.`,
      reverse: false,
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-24">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
