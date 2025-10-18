"use client";
import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="relative bg-gray-50 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="text-[#ec8f34]">Contact</span>{" "}
          <span className="text-[#fdce2b]">Us</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Whether it’s an inquiry, feedback, or partnership opportunity, our team is ready to assist.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 mb-16">
        {/* Address */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="w-14 h-14 flex items-center justify-center bg-[#fdce2b]/20 text-[#ec8f34] rounded-full mb-4">
            <MapPin size={26} />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-2">
            Our Office
          </h3>
          <p className="text-gray-600">
            Print Seoul Headquarters<br />
            105, Seoul Printing Avenue,<br />
            Mapo-gu, Seoul, South Korea
          </p>
        </div>

        {/* Phone */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="w-14 h-14 flex items-center justify-center bg-[#ec8f34]/20 text-[#ec8f34] rounded-full mb-4">
            <Phone size={26} />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-2">
            Call Us
          </h3>
          <p className="text-gray-600">
            +82 10-3456-7890<br />
            Mon–Fri, 9:00 AM–6:00 PM
          </p>
        </div>

        {/* Email */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl transition">
          <div className="w-14 h-14 flex items-center justify-center bg-[#ec8f34]/20 text-[#ec8f34] rounded-full mb-4">
            <Mail size={26} />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-2">
            Email Us
          </h3>
          <p className="text-gray-600">
            support@printseoul.com<br />
            info@printseoul.com
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10 px-6 md:px-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Send Us a Message
        </h2>
        <form className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ec8f34] focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ec8f34] focus:outline-none transition"
            />
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              placeholder="Project Inquiry / Support / Feedback"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ec8f34] focus:outline-none transition"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ec8f34] focus:outline-none transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#ec8f34] to-[#fdce2b] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Optional Map */}
      <div className="max-w-6xl mx-auto mt-16 px-6">
        <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.278273548117!2d126.97796931531146!3d37.5665359797989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2f7e52b0b69%3A0x1234abcd5678!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2sin!4v1696811000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
