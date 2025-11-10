// components/PageBuilder.js
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Type, Image, Layout, Columns, Text, FileText, Trash2, ArrowUp, ArrowDown, Star, Zap, Users, DollarSign, BookOpen, Megaphone } from 'lucide-react';

export default function PageBuilder({ onComponentsChange, initialComponents = [] }) {
  const [components, setComponents] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize components properly
  useEffect(() => {
    if (!isInitialized && initialComponents) {
      console.log('🔄 Initializing PageBuilder with:', initialComponents);
      
      const processedComponents = Array.isArray(initialComponents) 
        ? initialComponents.map((comp, index) => ({
            ...comp,
            id: comp.id || `comp-${Date.now()}-${index}`,
            order: comp.order || index
          }))
        : [];
      
      setComponents(processedComponents);
      setIsInitialized(true);
    }
  }, [initialComponents, isInitialized]);

  // Notify parent of changes
  useEffect(() => {
    if (isInitialized) {
      console.log('📤 Sending components to parent:', components);
      onComponentsChange(components);
    }
  }, [components, onComponentsChange, isInitialized]);

  const addComponent = useCallback((type) => {
    const newComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      content: getDefaultContent(type),
      order: components.length
    };
    
    setComponents(prev => [...prev, newComponent]);
  }, [components.length]);

  const getDefaultContent = (type) => {
    const defaults = {
      // Basic components
      text: { content: 'Enter your text here...' },
      heading: { text: 'Heading Text', level: 'h2' },
      hero: { 
        title: 'Hero Title', 
        subtitle: 'Hero Subtitle',
        backgroundImage: '',
        buttonText: 'Learn More',
        buttonLink: '#'
      },
      image: { src: '', alt: 'Image description', caption: '' },
      
      // Pre-designed components
      aboutHero: {
        title: 'About',
        highlightedTitle: 'Us',
        subtitle: 'Precision. Passion. Printing Excellence from South Korea.',
        backgroundImage: '/about/about-banner.jpg'
      },
      
      aboutUs: {
        title: 'About Print Seoul',
        description1: 'Print Seoul is a leading publication printer based in South Korea, specializing in premium-quality printing for books, magazines, catalogs, and corporate publications.',
        description2: 'With a perfect blend of traditional craftsmanship and modern printing technology, we bring creativity to life through precision and quality. Our Seoul-based facilities handle everything from design and prepress to high-resolution offset printing, binding, and finishing.',
        description3: 'Whether you need small-batch art books or large-scale commercial runs, Print Seoul ensures consistent quality, timely delivery, and eco-conscious production — using sustainable materials and environmentally friendly inks.',
        description4: 'Our mission is to make South Korean printing excellence accessible worldwide, providing creative professionals, publishers, and brands with a trusted partner for all publication needs.',
        buttonText: 'Get a Quote',
        buttonLink: '/quote',
        image: '/about/About.jpg',
        quote: 'Precision in every print — from Seoul to the world.'
      },
      
      freeSample: {
        title: 'Free Sample Service',
        description1: 'Curious about the paper texture or print quality before ordering? Experience it yourself with our free sample service.',
        description2: `Just share your preferred book type, paper, and contact details — and we&apos;ll send you a sample book to help you make the best choice.`,
        description3: 'Build your trust with Print Seoul — where quality meets precision.',
        buttonText: 'Request a Free Sample',
        buttonLink: 'mailto:support@printsquare.net',
        email: 'support@printseoul.net',
        image: '/homepage/main-sec07-1.jpg'
      },
      
      heroBanner: {
        title: 'Your printing partner that cares.',
        subtitle: 'Quality prints. Fair prices. Print Seoul',
        backgroundImage: '/homepage/main-bg.jpg'
      },
      
      imageBanner: {
        title: 'Find Your Perfect Paper Match!',
        paragraphs: [
          'Print Seoul gives you 19 high-quality paper choices, each designed to make your book stand out with style and substance.',
          'Bring your imagination to life and design a book that truly reflects your style.',
          'Explore Our Premium Paper Collection'
        ],
        buttonText: 'Click Me!',
        image: '/homepage/paper.png'
      },
      
      imageBannerTwo: {
        title: 'Special Order Available',
        paragraphs: [
          'Would you like to make a special book other than the quote we provide? Dont worry — weve got you covered.',
          'Describe the book you want using the Custom Quote. Our printing experts at Print Seoul will bring your idea to life.',
          'Want to create your own special edition book?'
        ],
        buttonText: 'Go to Custom Quote',
        image: '/homepage/main-sec06-1.png'
      },
      
      method: {
        title: 'Selectable Proof Method',
        description: 'Choose from two professional proofing methods that ensure accuracy and efficiency for every project.',
        method1: {
          title: 'E-Proof',
          description: 'Proceed with proofing through a digital proof file. Its free, fast, and perfect for quick approvals.'
        },
        method2: {
          title: 'Digital-Proof',
          description: 'Get a printed version of your uploaded file for review. You will see the actual proof quality — though it requires extra time and cost.'
        },
        image: '/homepage/main-sec05-1.jpg'
      },
      
      notice: {
        title: 'Latest Notices',
        notices: [
          {
            title: '[Update] Notice on Delivery and Tariffs',
            desc: 'At Print Seoul, all shipments are handled on a door-to-door basis unless customers specifically request a different delivery option. This ensures that your order will arrive directly at the ...',
            date: '09.24.2025'
          },
          {
            title: `[Update] Print Seoul&apos;s Homepage has been RE-DESIGNED!`,
            desc: 'Dear Client, Print Seoul has re-formed the homepage to make it more convenient for clients to place an order and easier to understand the advantages of PrintSquare. We pr...',
            date: '08.23.2023'
          }
        ],
        buttonText: 'View All Notices',
        buttonLink: '#'
      },
      
      orderProcess: {
        title: 'Order Process',
        description: 'Follow our simple 8-step process to get your printing done efficiently and hassle-free.',
        steps: [
          { id: "01", title: "Quote Check", desc: "Get an accurate quote for your book printing.", image: "/homepage/main-process1.jpg", alt: "Quote check process" },
          { id: "02", title: "Order", desc: "Place your order easily online.", image: "/homepage/main-process2.jpg", alt: "Order process" },
          { id: "03", title: "File Upload", desc: "Upload your files securely.", image: "/homepage/main-process3.jpg", alt: "File upload process" },
          { id: "04", title: "Proof Check", desc: "Check proofs to ensure perfection.", image: "/homepage/main-process4.jpg", alt: "Proof check process" },
          { id: "05", title: "Payment", desc: "Make a secure payment.", image: "/homepage/main-process5.jpg", alt: "Payment process" },
          { id: "06", title: "Print", desc: "High-quality printing begins.", image: "/homepage/main-process6.jpg", alt: "Printing process" },
          { id: "07", title: "Shipping", desc: "Fast and safe delivery.", image: "/homepage/main-process7.jpg", alt: "Shipping process" },
          { id: "08", title: "Customer Service", desc: "Continuous support throughout.", image: "/homepage/main-process8.jpg", alt: "Customer service process" }
        ]
      },
      
      portfolio: {
        title: 'Our Portfolio Showcase',
        buttonText: 'Learn More',
        buttonLink: '/portfolio',
        images: [
          { key: 'portfolio-1', url: '/homepage/p1.jpg', alt: 'Portfolio 1' },
          { key: 'portfolio-2', url: '/homepage/p2.jpg', alt: 'Portfolio 2' },
          { key: 'portfolio-3', url: '/homepage/p3.jpg', alt: 'Portfolio 3' },
          { key: 'portfolio-4', url: '/homepage/p4.jpg', alt: 'Portfolio 4' },
          { key: 'portfolio-5', url: '/homepage/p5.jpg', alt: 'Portfolio 5' },
          { key: 'portfolio-6', url: '/homepage/p6.jpg', alt: 'Portfolio 6' },
          { key: 'portfolio-7', url: '/homepage/p7.jpg', alt: 'Portfolio 7' },
          { key: 'portfolio-8', url: '/homepage/p8.jpg', alt: 'Portfolio 8' },
          { key: 'portfolio-9', url: '/homepage/p9.jpg', alt: 'Portfolio 9' },
          { key: 'portfolio-10', url: '/homepage/p10.jpg', alt: 'Portfolio 10' }
        ]
      },
      
      pricing: {
        title: 'Affordable Printing Prices',
        description1: 'At Print Seoul, we bring your ideas to life with top-quality book printing powered by cutting-edge technology and fair pricing.',
        description2: 'Experience premium materials, sharp detail, and a flawless finish perfect for professionals, authors, and brands.',
        sampleTitle: 'Sample Specification',
        specifications: [
          { label: "Size", value: "8.5″ × 11″" },
          { label: "Binding", value: "Perfect Binding" },
          { label: "Cover", value: "250gsm Gloss, Full Color" },
          { label: "Inside Pages", value: "110gsm Gloss, Full Color" },
          { label: "Page Count", value: "100" }
        ],
        currencyNote: 'Standard currency:',
        footerNote: '* For bulk orders, we recommend Ocean shipping / Split delivery to enjoy lower delivery costs.'
      },
      
      quickGuides: {
        title: 'Quick Guides',
        description: 'Learn essential printing tips, layout guidelines, and professional insights to help you prepare your perfect print-ready files efficiently and accurately.',
        guides: [
          { title: "Tips For Page Layout", href: "#" },
          { title: "Bleed & Trimming Line", href: "#" },
          { title: "Paper Selection", href: "#" },
          { title: "Download Print-Ready Sample File", href: "#" }
        ]
      }
    };
    return defaults[type] || {};
  };

  const updateComponent = useCallback((id, updates) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, content: { ...comp.content, ...updates } } : comp
    ));
  }, []);

  const removeComponent = useCallback((id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  }, []);

  const moveComponent = useCallback((index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === components.length - 1)) return;
    
    const newIndex = direction === 'up' ? index - 1 : direction === 'down' ? index + 1 : index;
    const newComponents = [...components];
    [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
    setComponents(newComponents);
  }, [components]);

  const updateArrayField = useCallback((id, field, index, value) => {
    setComponents(prev => prev.map(comp => {
      if (comp.id === id) {
        const newArray = [...comp.content[field]];
        newArray[index] = value;
        return { ...comp, content: { ...comp.content, [field]: newArray } };
      }
      return comp;
    }));
  }, []);

  const addArrayItem = useCallback((id, field, defaultValue) => {
    setComponents(prev => prev.map(comp => {
      if (comp.id === id) {
        const currentArray = comp.content[field] || [];
        return { 
          ...comp, 
          content: { 
            ...comp.content, 
            [field]: [...currentArray, defaultValue] 
          } 
        };
      }
      return comp;
    }));
  }, []);

  const removeArrayItem = useCallback((id, field, index) => {
    setComponents(prev => prev.map(comp => {
      if (comp.id === id) {
        const currentArray = comp.content[field] || [];
        const newArray = currentArray.filter((_, i) => i !== index);
        return { 
          ...comp, 
          content: { 
            ...comp.content, 
            [field]: newArray 
          } 
        };
      }
      return comp;
    }));
  }, []);

  const renderComponentEditor = (component) => {
    switch (component.type) {
      case 'text':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={component.content?.content || ''}
              onChange={(e) => updateComponent(component.id, { content: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter your text..."
            />
          </div>
        );

      case 'heading':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heading Text</label>
              <input
                type="text"
                value={component.content?.text || ''}
                onChange={(e) => updateComponent(component.id, { text: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Heading text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heading Level</label>
              <select
                value={component.content?.level || 'h2'}
                onChange={(e) => updateComponent(component.id, { level: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
              </select>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={component.content?.title || ''}
                onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Hero title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={component.content?.subtitle || ''}
                onChange={(e) => updateComponent(component.id, { subtitle: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Hero subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
              <input
                type="text"
                value={component.content?.backgroundImage || ''}
                onChange={(e) => updateComponent(component.id, { backgroundImage: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Background image URL"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={component.content?.buttonText || ''}
                  onChange={(e) => updateComponent(component.id, { buttonText: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={component.content?.buttonLink || ''}
                  onChange={(e) => updateComponent(component.id, { buttonLink: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Button link"
                />
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={component.content?.src || ''}
                onChange={(e) => updateComponent(component.id, { src: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input
                type="text"
                value={component.content?.alt || ''}
                onChange={(e) => updateComponent(component.id, { alt: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Alt text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
              <input
                type="text"
                value={component.content?.caption || ''}
                onChange={(e) => updateComponent(component.id, { caption: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Caption (optional)"
              />
            </div>
          </div>
        );

      case 'aboutHero':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={component.content?.title || ''}
                onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Title</label>
              <input
                type="text"
                value={component.content?.highlightedTitle || ''}
                onChange={(e) => updateComponent(component.id, { highlightedTitle: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Highlighted title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={component.content?.subtitle || ''}
                onChange={(e) => updateComponent(component.id, { subtitle: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
              <input
                type="text"
                value={component.content?.backgroundImage || ''}
                onChange={(e) => updateComponent(component.id, { backgroundImage: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Background image URL"
              />
            </div>
          </div>
        );

      case 'aboutUs':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={component.content?.title || ''}
                onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Title"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={component.content?.buttonText || ''}
                  onChange={(e) => updateComponent(component.id, { buttonText: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={component.content?.buttonLink || ''}
                  onChange={(e) => updateComponent(component.id, { buttonLink: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Button link"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={component.content?.image || ''}
                onChange={(e) => updateComponent(component.id, { image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
              <input
                type="text"
                value={component.content?.quote || ''}
                onChange={(e) => updateComponent(component.id, { quote: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Quote text"
              />
            </div>
            {[1, 2, 3, 4].map((num) => (
              <div key={num}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description {num}</label>
                <textarea
                  value={component.content?.[`description${num}`] || ''}
                  onChange={(e) => updateComponent(component.id, { [`description${num}`]: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder={`Description ${num}`}
                />
              </div>
            ))}
          </div>
        );

      case 'freeSample':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={component.content?.title || ''}
                onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Title"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={component.content?.buttonText || ''}
                  onChange={(e) => updateComponent(component.id, { buttonText: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={component.content?.buttonLink || ''}
                  onChange={(e) => updateComponent(component.id, { buttonLink: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Button link"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="text"
                value={component.content?.email || ''}
                onChange={(e) => updateComponent(component.id, { email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={component.content?.image || ''}
                onChange={(e) => updateComponent(component.id, { image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Image URL"
              />
            </div>
            {[1, 2, 3].map((num) => (
              <div key={num}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description {num}</label>
                <textarea
                  value={component.content?.[`description${num}`] || ''}
                  onChange={(e) => updateComponent(component.id, { [`description${num}`]: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder={`Description ${num}`}
                />
              </div>
            ))}
          </div>
        );

      // Add similar editor forms for other component types...
      // For brevity, I'll show the pattern and you can extend similarly

      default:
        return (
          <div className="text-gray-500 text-sm">
            This component type doesn&apos;t have a custom editor yet. The content will be saved as configured.
          </div>
        );
    }
  };

  const getComponentIcon = (type) => {
    const icons = {
      text: <Type size={16} />,
      heading: <Text size={16} />,
      hero: <Star size={16} />,
      image: <Image size={16} />,
      aboutHero: <Users size={16} />,
      aboutUs: <BookOpen size={16} />,
      freeSample: <Zap size={16} />,
      heroBanner: <Layout size={16} />,
      imageBanner: <Image size={16} />,
      imageBannerTwo: <Image size={16} />,
      method: <FileText size={16} />,
      notice: <Megaphone size={16} />,
      orderProcess: <Layout size={16} />,
      portfolio: <Image size={16} />,
      pricing: <DollarSign size={16} />,
      quickGuides: <BookOpen size={16} />,
    };
    return icons[type] || <FileText size={16} />;
  };

  const getComponentCategory = (type) => {
    if (['aboutHero', 'aboutUs', 'freeSample', 'heroBanner', 'imageBanner', 'imageBannerTwo', 'method', 'notice', 'orderProcess', 'portfolio', 'pricing', 'quickGuides'].includes(type)) {
      return 'premium';
    }
    return 'basic';
  };

  const premiumComponents = [
    { type: 'aboutHero', name: 'About Hero', category: 'About' },
    { type: 'aboutUs', name: 'About Us', category: 'About' },
    { type: 'freeSample', name: 'Free Sample', category: 'Services' },
    { type: 'heroBanner', name: 'Hero Banner', category: 'Home' },
    { type: 'imageBanner', name: 'Image Banner', category: 'Home' },
    { type: 'imageBannerTwo', name: 'Image Banner 2', category: 'Home' },
    { type: 'method', name: 'Proof Method', category: 'Services' },
    { type: 'notice', name: 'Notices', category: 'Content' },
    { type: 'orderProcess', name: 'Order Process', category: 'Services' },
    { type: 'portfolio', name: 'Portfolio', category: 'Showcase' },
    { type: 'pricing', name: 'Pricing', category: 'Services' },
    { type: 'quickGuides', name: 'Quick Guides', category: 'Resources' },
  ];

  const basicComponents = [
    { type: 'text', name: 'Text', category: 'Basic' },
    { type: 'heading', name: 'Heading', category: 'Basic' },
    { type: 'hero', name: 'Hero', category: 'Basic' },
    { type: 'image', name: 'Image', category: 'Basic' },
  ];

  // Group premium components by category
  const premiumByCategory = premiumComponents.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = [];
    acc[comp.category].push(comp);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Add Components Toolbar */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Components</h3>
        
        {/* Premium Components by Category */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 mb-2">Premium Components</h4>
          {Object.entries(premiumByCategory).map(([category, comps]) => (
            <div key={category} className="mb-3">
              <h5 className="text-sm font-medium text-gray-600 mb-1">{category}</h5>
              <div className="flex flex-wrap gap-2">
                {comps.map((comp) => (
                  <button 
                    key={comp.type}
                    onClick={() => addComponent(comp.type)} 
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-colors text-sm"
                  >
                    {getComponentIcon(comp.type)}
                    {comp.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Basic Components */}
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">Basic Components</h4>
          <div className="flex flex-wrap gap-2">
            {basicComponents.map((comp) => (
              <button 
                key={comp.type}
                onClick={() => addComponent(comp.type)} 
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                {getComponentIcon(comp.type)}
                {comp.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Components List */}
      <div className="space-y-4">
        {components.map((component, index) => (
          <div key={component.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${
                  getComponentCategory(component.type) === 'premium' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {getComponentIcon(component.type)}
                </div>
                <div>
                  <span className="font-medium capitalize text-gray-700">{component.type}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">
                    Order: {index + 1}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => moveComponent(index, 'up')} 
                  disabled={index === 0}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  onClick={() => moveComponent(index, 'down')} 
                  disabled={index === components.length - 1}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDown size={16} />
                </button>
                <button 
                  onClick={() => removeComponent(component.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            {renderComponentEditor(component)}
          </div>
        ))}
        
        {components.length === 0 && (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <Layout size={48} className="mx-auto mb-4 text-gray-400" alt="" />
            <p>No components added yet</p>
            <p className="text-sm">Use the toolbar above to add components to your page</p>
          </div>
        )}
      </div>
    </div>
  );
}