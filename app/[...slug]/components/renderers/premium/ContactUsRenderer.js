// components/PageBuilder/renderers/premium/ContactUsRenderer.js
"use client";

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  User,
  MessageSquare,
  Building,
  Globe,
  Clock,
  MessageCircle
} from "lucide-react";

// Icon mapping
const iconComponents = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  send: Send,
  user: User,
  messageSquare: MessageSquare,
  building: Building,
  globe: Globe,
  clock: Clock,
  messageCircle: MessageCircle
};

export default function ContactUsRenderer({ component, index }) {
  const content = component.content || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Check if there's any content to show
  const hasContent = content.title || 
                    content.description || 
                    content.contactCards?.length > 0 ||
                    content.showForm ||
                    content.showMap;

  if (!hasContent) {
    return null;
  }

  // Get background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#F9FAFB' };
      case 'gradient':
        return { 
          background: `linear-gradient(to right, ${content.gradientFrom || '#F9FAFB'}, ${content.gradientTo || '#FFFFFF'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Get hero title style
  const getHeroTitleStyle = () => {
    if (content.heroTitleGradient) {
      return {
        background: `linear-gradient(to right, ${content.heroGradientFrom || '#0B1633'}, ${content.heroGradientTo || '#FF4B2B'})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      };
    }
    return {
      color: content.heroTitleColor || '#1F2937'
    };
  };

  // Get card style
  const getCardStyle = (card) => {
    const baseStyle = {
      backgroundColor: card.bgColor || content.cardBgColor || '#FFFFFF',
      borderColor: card.borderColor || content.cardBorderColor || 'transparent',
      borderRadius: content.cardBorderRadius || '1rem',
      boxShadow: card.shadow || content.cardShadow || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    };

    // Apply hover effect
    if (content.cardHoverEffect) {
      baseStyle.transition = 'all 0.3s ease';
      baseStyle.transform = 'translateY(0)';
      baseStyle.cursor = 'pointer';
    }

    return baseStyle;
  };

  // Get icon container style
  const getIconContainerStyle = (card) => {
    const baseStyle = {
      backgroundColor: card.iconBgColor || content.iconBgColor || 'rgba(255, 75, 43, 0.2)',
      color: card.iconColor || content.iconColor || '#FF4B2B',
      borderRadius: content.iconBorderRadius || '9999px'
    };

    if (card.iconBgGradient) {
      baseStyle.background = `linear-gradient(to right, ${card.iconGradientFrom || '#FF4B2B'}, ${card.iconGradientTo || '#FF6B45'})`;
      baseStyle.color = '#FFFFFF';
    }

    return baseStyle;
  };

  // Get form style
  const getFormStyle = () => {
    return {
      backgroundColor: content.formBgColor || '#FFFFFF',
      borderColor: content.formBorderColor || 'transparent',
      borderRadius: content.formBorderRadius || '1rem',
      boxShadow: content.formShadow || '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    };
  };

  // Get button style
  const getButtonStyle = () => {
    if (content.buttonGradient) {
      return {
        background: `linear-gradient(to right, ${content.buttonGradientFrom || '#E21B36'}, ${content.buttonGradientTo || '#FF4B2B'})`,
        color: content.buttonTextColor || '#FFFFFF'
      };
    }
    return {
      backgroundColor: content.buttonSolidColor || '#E21B36',
      color: content.buttonTextColor || '#FFFFFF'
    };
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.formAction) {
      console.log('Form submission simulated:', formData);
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus(null);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(content.formAction, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Get icon component
  const getIconComponent = (iconName) => {
    const Icon = iconComponents[iconName] || Mail;
    return <Icon />;
  };

  return (
    <section
      key={component.id || index}
      className="relative py-16 px-6 md:px-10 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Decorative background elements */}
      {content.showDecorativeElements && (
        <>
          <div 
            className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            style={{
              background: content.decorativeGradient || 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.1), rgba(168, 85, 247, 0.1))'
            }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"
            style={{
              background: content.decorativeGradient2 || 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1))'
            }}
          ></div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Hero Section */}
        {(content.title || content.description) && (
          <div className="text-center mb-12">
            {content.title && (
              <h1 
                className={`font-extrabold mb-4 ${content.heroTitleSize || 'text-4xl md:text-5xl'}`}
                style={getHeroTitleStyle()}
              >
                {content.title}
              </h1>
            )}
            {content.description && (
              <p 
                className={`mx-auto ${content.descriptionSize || 'text-gray-600'}`}
                style={{ 
                  color: content.descriptionColor || '#6B7280',
                  maxWidth: content.descriptionMaxWidth || '42rem'
                }}
              >
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Contact Info Cards */}
        {content.contactCards && content.contactCards.length > 0 && (
          <div className={`max-w-6xl mx-auto grid ${content.cardsPerRow === 2 ? 'md:grid-cols-2' : content.cardsPerRow === 4 ? 'sm:grid-cols-2 md:grid-cols-4' : 'md:grid-cols-3'} gap-8 px-6 mb-16`}>
            {content.contactCards.map((card, index) => {
              const CardIcon = iconComponents[card.icon] || Mail;
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-8 hover:shadow-xl transition-all duration-300"
                  style={getCardStyle(card)}
                  onMouseEnter={(e) => {
                    if (content.cardHoverEffect) {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (content.cardHoverEffect) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = card.shadow || content.cardShadow || '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  <div 
                    className="w-14 h-14 flex items-center justify-center rounded-full mb-4"
                    style={getIconContainerStyle(card)}
                  >
                    <CardIcon 
                      size={26}
                      style={{ color: card.iconColor || content.iconColor || '#FF4B2B' }}
                    />
                  </div>
                  <h3 
                    className="font-semibold text-lg mb-2"
                    style={{ color: card.titleColor || content.cardTitleColor || '#1F2937' }}
                  >
                    {card.title}
                  </h3>
                  <div 
                    className="text-gray-600"
                    style={{ color: card.textColor || content.cardTextColor || '#6B7280' }}
                    dangerouslySetInnerHTML={{ __html: card.content.replace(/\n/g, '<br />') }}
                  />
                  
                  {/* Optional CTA */}
                  {card.ctaText && (
                    <button
                      className="mt-4 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: card.ctaBgColor || 'transparent',
                        color: card.ctaTextColor || '#FF4B2B',
                        border: card.ctaBorder ? `1px solid ${card.ctaBorderColor || '#FF4B2B'}` : 'none'
                      }}
                      onClick={() => card.ctaLink && window.open(card.ctaLink, '_blank')}
                    >
                      {card.ctaText}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Form */}
        {content.showForm && (
          <div 
            className="max-w-5xl mx-auto p-10 px-6 md:px-12 mb-16"
            style={getFormStyle()}
          >
            {content.formTitle && (
              <h2 
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: content.formTitleColor || '#1F2937' }}
              >
                {content.formTitle}
              </h2>
            )}
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Form Fields */}
              {content.formFields?.map((field) => (
                <div 
                  key={field.id} 
                  className={field.fullWidth ? 'md:col-span-2' : ''}
                >
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: field.labelColor || content.formLabelColor || '#374151' }}
                  >
                    {field.label}
                    {field.required && <span style={{ color: '#EF4444' }}>*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={field.rows || 5}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition"
                      style={{
                        borderColor: field.borderColor || content.formFieldBorderColor || '#D1D5DB',
                        backgroundColor: field.bgColor || content.formFieldBgColor || '#FFFFFF',
                        color: field.textColor || content.formFieldTextColor || '#1F2937',
                        focusRingColor: field.focusRingColor || content.formFocusRingColor || '#FF4B2B'
                      }}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition"
                      style={{
                        borderColor: field.borderColor || content.formFieldBorderColor || '#D1D5DB',
                        backgroundColor: field.bgColor || content.formFieldBgColor || '#FFFFFF',
                        color: field.textColor || content.formFieldTextColor || '#1F2937',
                        focusRingColor: field.focusRingColor || content.formFocusRingColor || '#FF4B2B'
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Default form fields if not specified */}
              {(!content.formFields || content.formFields.length === 0) && (
                <>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Project Inquiry / Support / Feedback"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    ></textarea>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={getButtonStyle()}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {content.submittingText || 'Sending...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {getIconComponent(content.buttonIcon || 'send')}
                      {content.buttonText || 'Send Message'}
                    </span>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {content.successMessage || 'Thank you! Your message has been sent successfully.'}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {content.errorMessage || 'Sorry, there was an error sending your message. Please try again.'}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Map Section */}
        {content.showMap && content.mapEmbedUrl && (
          <div className="max-w-6xl mx-auto mt-16 px-6">
            <div 
              className="w-full rounded-2xl overflow-hidden shadow-lg"
              style={{ height: content.mapHeight || '288px' }}
            >
              <iframe
                src={content.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
            
            {/* Map Caption */}
            {content.mapCaption && (
              <p 
                className="mt-4 text-center text-sm"
                style={{ color: content.mapCaptionColor || '#6B7280' }}
              >
                {content.mapCaption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}