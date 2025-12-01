// components/PageBuilder/editors/ContactUsEditor.js
"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Copy,
  Eye,
  EyeOff,
  Palette,
  Type,
  Map,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Settings
} from 'lucide-react';

// Icon options for selection
const iconOptions = [
  { value: 'mail', label: 'Mail' },
  { value: 'phone', label: 'Phone' },
  { value: 'mapPin', label: 'Map Pin' },
  { value: 'send', label: 'Send' },
  { value: 'user', label: 'User' },
  { value: 'messageSquare', label: 'Message Square' },
  { value: 'building', label: 'Building' },
  { value: 'globe', label: 'Globe' },
  { value: 'clock', label: 'Clock' },
  { value: 'messageCircle', label: 'Message Circle' }
];

// Form field types
const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select', label: 'Dropdown' }
];

const ContactUsEditor = ({ component, onUpdate }) => {
  const [expandedSection, setExpandedSection] = useState('general');
  const [editingCard, setEditingCard] = useState(null);
  const [editingField, setEditingField] = useState(null);

  // Initialize content
  const content = component.content || {};

  // Add new contact card
  const addContactCard = () => {
    const newCards = [...(content.contactCards || [])];
    newCards.push({
      title: `Contact ${newCards.length + 1}`,
      icon: 'mail',
      content: "Contact information...",
      bgColor: '#FFFFFF',
      borderColor: 'transparent',
      iconBgColor: 'rgba(255, 75, 43, 0.2)',
      iconColor: '#FF4B2B',
      titleColor: '#1F2937',
      textColor: '#6B7280'
    });
    onUpdate(component.id, { contactCards: newCards });
    setEditingCard(newCards.length - 1);
  };

  // Delete contact card
  const deleteContactCard = (index) => {
    const newCards = (content.contactCards || []).filter((_, i) => i !== index);
    onUpdate(component.id, { contactCards: newCards });
    if (editingCard === index) setEditingCard(null);
  };

  // Update contact card
  const updateContactCard = (index, field, value) => {
    const newCards = [...(content.contactCards || [])];
    newCards[index] = { ...newCards[index], [field]: value };
    onUpdate(component.id, { contactCards: newCards });
  };

  // Add form field
  const addFormField = () => {
    const newFields = [...(content.formFields || [])];
    newFields.push({
      id: `field-${Date.now()}`,
      label: `Field ${newFields.length + 1}`,
      name: `field${newFields.length + 1}`,
      type: 'text',
      placeholder: `Enter ${newFields.length + 1}...`,
      required: false,
      fullWidth: false
    });
    onUpdate(component.id, { formFields: newFields });
    setEditingField(newFields.length - 1);
  };

  // Delete form field
  const deleteFormField = (index) => {
    const newFields = (content.formFields || []).filter((_, i) => i !== index);
    onUpdate(component.id, { formFields: newFields });
    if (editingField === index) setEditingField(null);
  };

  // Update form field
  const updateFormField = (index, field, value) => {
    const newFields = [...(content.formFields || [])];
    newFields[index] = { ...newFields[index], [field]: value };
    onUpdate(component.id, { formFields: newFields });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      {/* Section Title */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Contact Us Settings</h3>
        <p className="text-sm text-gray-600 mt-1">Configure your contact section with cards, form, and map</p>
      </div>

      {/* Quick Navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setExpandedSection('general')}
          className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${expandedSection === 'general' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Settings size={12} />
          General
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('header')}
          className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${expandedSection === 'header' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Type size={12} />
          Header
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('cards')}
          className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${expandedSection === 'cards' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Mail size={12} />
          Contact Cards
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('form')}
          className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${expandedSection === 'form' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <MessageSquare size={12} />
          Form
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('map')}
          className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${expandedSection === 'map' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Map size={12} />
          Map
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('styling')}
          className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${expandedSection === 'styling' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Palette size={12} />
          Styling
        </button>
      </div>

      {/* General Settings */}
      {expandedSection === 'general' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Contact Cards</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showContactCards"
                  checked={content.showContactCards !== false}
                  onChange={(e) => onUpdate(component.id, { showContactCards: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="showContactCards" className="ml-2 text-sm text-gray-600">
                  Display contact information cards
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Form</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showForm"
                  checked={content.showForm !== false}
                  onChange={(e) => onUpdate(component.id, { showForm: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="showForm" className="ml-2 text-sm text-gray-600">
                  Display contact form
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Map</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showMap"
                  checked={content.showMap || true}
                  onChange={(e) => onUpdate(component.id, { showMap: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="showMap" className="ml-2 text-sm text-gray-600">
                  Display map section
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Decorative Elements</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showDecorativeElements"
                  checked={content.showDecorativeElements || true}
                  onChange={(e) => onUpdate(component.id, { showDecorativeElements: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="showDecorativeElements" className="ml-2 text-sm text-gray-600">
                  Show background decorative elements
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
              <select
                value={content.backgroundType || 'solid'}
                onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="none">None (Transparent)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cards Per Row</label>
              <select
                value={content.cardsPerRow || 3}
                onChange={(e) => onUpdate(component.id, { cardsPerRow: parseInt(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value={2}>2 Cards</option>
                <option value={3}>3 Cards</option>
                <option value={4}>4 Cards</option>
              </select>
            </div>
          </div>

          {content.backgroundType === 'solid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={content.backgroundColor || '#F9FAFB'}
                  onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.backgroundColor || '#F9FAFB'}
                  onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#F9FAFB"
                />
              </div>
            </div>
          )}

          {content.backgroundType === 'gradient' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.gradientFrom || '#F9FAFB'}
                    onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.gradientFrom || '#F9FAFB'}
                    onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#F9FAFB"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.gradientTo || '#FFFFFF'}
                    onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.gradientTo || '#FFFFFF'}
                    onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Header Settings */}
      {expandedSection === 'header' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => onUpdate(component.id, { title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Contact Us"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Title Style</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="heroTitleGradient"
                    checked={content.heroTitleGradient || true}
                    onChange={(e) => onUpdate(component.id, { heroTitleGradient: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="heroTitleGradient" className="text-sm text-gray-600">
                    Use gradient text
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Title Size</label>
                <select
                  value={content.heroTitleSize || 'text-4xl md:text-5xl'}
                  onChange={(e) => onUpdate(component.id, { heroTitleSize: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="text-3xl md:text-4xl">Medium</option>
                  <option value="text-4xl md:text-5xl">Large</option>
                  <option value="text-5xl md:text-6xl">Extra Large</option>
                </select>
              </div>
            </div>

            {content.heroTitleGradient ? (
              <div className="space-y-3 mt-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.heroGradientFrom || '#0B1633'}
                      onChange={(e) => onUpdate(component.id, { heroGradientFrom: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.heroGradientFrom || '#0B1633'}
                      onChange={(e) => onUpdate(component.id, { heroGradientFrom: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#0B1633"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.heroGradientTo || '#FF4B2B'}
                      onChange={(e) => onUpdate(component.id, { heroGradientTo: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.heroGradientTo || '#FF4B2B'}
                      onChange={(e) => onUpdate(component.id, { heroGradientTo: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#FF4B2B"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.heroTitleColor || '#1F2937'}
                    onChange={(e) => onUpdate(component.id, { heroTitleColor: e.target.value })}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.heroTitleColor || '#1F2937'}
                    onChange={(e) => onUpdate(component.id, { heroTitleColor: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#1F2937"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={content.description || ''}
              onChange={(e) => onUpdate(component.id, { description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              rows="3"
              placeholder="We'd love to hear from you! Whether it's an inquiry, feedback, or partnership opportunity, our team is ready to assist."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Description Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.descriptionColor || '#6B7280'}
                    onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.descriptionColor || '#6B7280'}
                    onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#6B7280"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Description Size</label>
                <select
                  value={content.descriptionSize || 'text-base'}
                  onChange={(e) => onUpdate(component.id, { descriptionSize: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="text-sm">Small</option>
                  <option value="text-base">Medium</option>
                  <option value="text-lg">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Cards Settings */}
      {expandedSection === 'cards' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Contact Cards</label>
            <button
              type="button"
              onClick={addContactCard}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Card
            </button>
          </div>

          <div className="space-y-4">
            {content.contactCards?.map((card, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ backgroundColor: card.iconBgColor || 'rgba(255, 75, 43, 0.2)' }}
                    >
                      {React.createElement(iconComponents[card.icon] || Mail, { size: 16 })}
                    </div>
                    <div>
                      <h4 className="font-medium">{card.title || `Card ${index + 1}`}</h4>
                      <p className="text-xs text-gray-500">
                        {card.icon || 'mail'} icon
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingCard(editingCard === index ? null : index)}
                      className="p-1 text-gray-500 hover:text-blue-600"
                    >
                      {editingCard === index ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteContactCard(index)}
                      className="p-1 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {editingCard === index && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Card Title</label>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => updateContactCard(index, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="Card Title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Icon</label>
                        <select
                          value={card.icon || 'mail'}
                          onChange={(e) => updateContactCard(index, 'icon', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          {iconOptions.map((icon) => (
                            <option key={icon.value} value={icon.value}>
                              {icon.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Content</label>
                      <textarea
                        value={card.content || ''}
                        onChange={(e) => updateContactCard(index, 'content', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        rows="3"
                        placeholder="Enter contact information... (use line breaks for formatting)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={card.titleColor || '#1F2937'}
                            onChange={(e) => updateContactCard(index, 'titleColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={card.textColor || '#6B7280'}
                            onChange={(e) => updateContactCard(index, 'textColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Icon Color</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={card.iconColor || '#FF4B2B'}
                            onChange={(e) => updateContactCard(index, 'iconColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={card.bgColor || '#FFFFFF'}
                            onChange={(e) => updateContactCard(index, 'bgColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={card.bgColor || '#FFFFFF'}
                            onChange={(e) => updateContactCard(index, 'bgColor', e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded text-sm"
                            placeholder="#FFFFFF"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Icon Background</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={card.iconBgColor || 'rgba(255, 75, 43, 0.2)'}
                            onChange={(e) => updateContactCard(index, 'iconBgColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Optional CTA */}
                    <div className="pt-4 border-t">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action (Optional)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">CTA Text</label>
                          <input
                            type="text"
                            value={card.ctaText || ''}
                            onChange={(e) => updateContactCard(index, 'ctaText', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="Learn More"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">CTA Link</label>
                          <input
                            type="text"
                            value={card.ctaLink || ''}
                            onChange={(e) => updateContactCard(index, 'ctaLink', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {(!content.contactCards || content.contactCards.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No contact cards added yet.</p>
                <button
                  type="button"
                  onClick={addContactCard}
                  className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Click here to add your first contact card
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Settings */}
      {expandedSection === 'form' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
              <input
                type="text"
                value={content.formTitle || ''}
                onChange={(e) => onUpdate(component.id, { formTitle: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded text-sm"
                placeholder="Send Us a Message"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Action URL</label>
              <input
                type="text"
                value={content.formAction || ''}
                onChange={(e) => onUpdate(component.id, { formAction: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded text-sm"
                placeholder="/api/contact (leave empty for demo)"
              />
            </div>
          </div>

          {/* Custom Form Fields */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Form Fields</label>
              <button
                type="button"
                onClick={addFormField}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Field
              </button>
            </div>

            <div className="space-y-4">
              {content.formFields?.map((field, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        {field.type === 'textarea' ? '📝' : '📋'}
                      </div>
                      <div>
                        <h4 className="font-medium">{field.label || `Field ${index + 1}`}</h4>
                        <p className="text-xs text-gray-500">
                          {field.name} • {field.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingField(editingField === index ? null : index)}
                        className="p-1 text-gray-500 hover:text-blue-600"
                      >
                        {editingField === index ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteFormField(index)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {editingField === index && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Field Label</label>
                          <input
                            type="text"
                            value={field.label || ''}
                            onChange={(e) => updateFormField(index, 'label', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="Field Label"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Field Name</label>
                          <input
                            type="text"
                            value={field.name || ''}
                            onChange={(e) => updateFormField(index, 'name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="field_name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Field Type</label>
                          <select
                            value={field.type || 'text'}
                            onChange={(e) => updateFormField(index, 'type', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          >
                            {fieldTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Placeholder</label>
                          <input
                            type="text"
                            value={field.placeholder || ''}
                            onChange={(e) => updateFormField(index, 'placeholder', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="Enter text..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`required-${index}`}
                            checked={field.required || false}
                            onChange={(e) => updateFormField(index, 'required', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={`required-${index}`} className="text-sm text-gray-600">
                            Required field
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`fullWidth-${index}`}
                            checked={field.fullWidth || false}
                            onChange={(e) => updateFormField(index, 'fullWidth', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={`fullWidth-${index}`} className="text-sm text-gray-600">
                            Full width
                          </label>
                        </div>

                        {field.type === 'textarea' && (
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Rows</label>
                            <input
                              type="number"
                              value={field.rows || 5}
                              onChange={(e) => updateFormField(index, 'rows', parseInt(e.target.value))}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              min="1"
                              max="10"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Messages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Success Message</label>
              <input
                type="text"
                value={content.successMessage || ''}
                onChange={(e) => onUpdate(component.id, { successMessage: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Thank you! Your message has been sent."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Error Message</label>
              <input
                type="text"
                value={content.errorMessage || ''}
                onChange={(e) => onUpdate(component.id, { errorMessage: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Sorry, there was an error. Please try again."
              />
            </div>
          </div>
        </div>
      )}

      {/* Map Settings */}
      {expandedSection === 'map' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Map Embed URL</label>
            <input
              type="text"
              value={content.mapEmbedUrl || ''}
              onChange={(e) => onUpdate(component.id, { mapEmbedUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded text-sm"
              placeholder="https://maps.google.com/embed?pb=..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste your Google Maps embed URL. You can get this by clicking "Share" → "Embed a map" on Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Map Height</label>
              <select
                value={content.mapHeight || '288px'}
                onChange={(e) => onUpdate(component.id, { mapHeight: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="200px">Small (200px)</option>
                <option value="288px">Medium (288px)</option>
                <option value="350px">Large (350px)</option>
                <option value="400px">Extra Large (400px)</option>
                <option value="500px">XXL (500px)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Map Border Radius</label>
              <select
                value={content.mapBorderRadius || '1rem'}
                onChange={(e) => onUpdate(component.id, { mapBorderRadius: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="0.5rem">Small (0.5rem)</option>
                <option value="1rem">Medium (1rem)</option>
                <option value="1.5rem">Large (1.5rem)</option>
                <option value="2rem">Extra Large (2rem)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Map Caption</label>
            <input
              type="text"
              value={content.mapCaption || ''}
              onChange={(e) => onUpdate(component.id, { mapCaption: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Our location in Seoul, South Korea"
            />
          </div>
        </div>
      )}

      {/* Styling Settings */}
      {expandedSection === 'styling' && (
        <div className="space-y-6">
          {/* Card Styling */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Card Styling</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Card Hover Effect</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cardHoverEffect"
                    checked={content.cardHoverEffect || true}
                    onChange={(e) => onUpdate(component.id, { cardHoverEffect: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="cardHoverEffect" className="ml-2 text-sm text-gray-600">
                    Enable hover effects
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Card Border Radius</label>
                <select
                  value={content.cardBorderRadius || '1rem'}
                  onChange={(e) => onUpdate(component.id, { cardBorderRadius: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="0.5rem">Small (0.5rem)</option>
                  <option value="1rem">Medium (1rem)</option>
                  <option value="1.5rem">Large (1.5rem)</option>
                  <option value="2rem">Extra Large (2rem)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Card BG Color</label>
                <input
                  type="color"
                  value={content.cardBgColor || '#FFFFFF'}
                  onChange={(e) => onUpdate(component.id, { cardBgColor: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">Card Title Color</label>
                <input
                  type="color"
                  value={content.cardTitleColor || '#1F2937'}
                  onChange={(e) => onUpdate(component.id, { cardTitleColor: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Card Text Color</label>
                <input
                  type="color"
                  value={content.cardTextColor || '#6B7280'}
                  onChange={(e) => onUpdate(component.id, { cardTextColor: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Icon Styling */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Icon Styling</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Icon Border Radius</label>
                <select
                  value={content.iconBorderRadius || '9999px'}
                  onChange={(e) => onUpdate(component.id, { iconBorderRadius: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="0.25rem">Small (0.25rem)</option>
                  <option value="0.5rem">Medium (0.5rem)</option>
                  <option value="0.75rem">Large (0.75rem)</option>
                  <option value="9999px">Full Rounded</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Default Icon Color</label>
                <input
                  type="color"
                  value={content.iconColor || '#FF4B2B'}
                  onChange={(e) => onUpdate(component.id, { iconColor: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs text-gray-600 mb-1">Default Icon Background</label>
              <input
                type="color"
                value={content.iconBgColor || 'rgba(255, 75, 43, 0.2)'}
                onChange={(e) => onUpdate(component.id, { iconBgColor: e.target.value })}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Form Styling */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Form Styling</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Form Background</label>
                <input
                  type="color"
                  value={content.formBgColor || '#FFFFFF'}
                  onChange={(e) => onUpdate(component.id, { formBgColor: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Form Border Radius</label>
                <select
                  value={content.formBorderRadius || '1rem'}
                  onChange={(e) => onUpdate(component.id, { formBorderRadius: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="0.5rem">Small (0.5rem)</option>
                  <option value="1rem">Medium (1rem)</option>
                  <option value="1.5rem">Large (1.5rem)</option>
                  <option value="2rem">Extra Large (2rem)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Button Styling */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Button Styling</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Button Text</label>
                <input
                  type="text"
                  value={content.buttonText || ''}
                  onChange={(e) => onUpdate(component.id, { buttonText: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Send Message"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Button Icon</label>
                <select
                  value={content.buttonIcon || 'send'}
                  onChange={(e) => onUpdate(component.id, { buttonIcon: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Button Style</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="buttonGradient"
                    checked={content.buttonGradient || true}
                    onChange={(e) => onUpdate(component.id, { buttonGradient: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="buttonGradient" className="text-sm text-gray-600">
                    Use gradient
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                <input
                  type="color"
                  value={content.buttonTextColor || '#FFFFFF'}
                  onChange={(e) => onUpdate(component.id, { buttonTextColor: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            </div>

            {content.buttonGradient ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
                  <input
                    type="color"
                    value={content.buttonGradientFrom || '#E21B36'}
                    onChange={(e) => onUpdate(component.id, { buttonGradientFrom: e.target.value })}
                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
                  <input
                    type="color"
                    value={content.buttonGradientTo || '#FF4B2B'}
                    onChange={(e) => onUpdate(component.id, { buttonGradientTo: e.target.value })}
                    className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <label className="block text-xs text-gray-600 mb-1">Solid Color</label>
                <input
                  type="color"
                  value={content.buttonSolidColor || '#E21B36'}
                  onChange={(e) => onUpdate(component.id, { buttonSolidColor: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsEditor;