// components/PageBuilder/utils/componentDefaults.js
export const getDefaultContent = (type) => {
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
        description2: 'Just share your preferred book type, paper, and contact details — and we\'ll send you a sample book to help you make the best choice.',
        description3: 'Build your trust with Print Seoul — where quality meets precision.',
        buttonText: 'Request a Free Sample',
        buttonLink: 'mailto:support@printsquare.net',
        email: 'support@printseoul.net',
        image: '/homepage/main-sec07-1.jpg'
      },

    

      // Homepage Components
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
        image: '/homepage/paper.png',
        imageAlt: 'High-quality paper'
      },
      
      imageBannerTwo: {
        title: 'Special Order Available',
        highlightedTitle: 'Available',
        paragraphs: [
          'Would you like to make a special book other than the quote we provide? Don\'t worry — we\'ve got you covered.',
          'Describe the book you want using the Custom Quote. Our printing experts at Print Seoul will bring your idea to life.',
          'Want to create your own special edition book?'
        ],
        buttonText: 'Go to Custom Quote',
        image: '/homepage/main-sec06-1.png',
        imageAlt: 'Special order book'
      },
      
      method: {
        title: 'Selectable',
        highlightedTitle: 'Proof Method',
        description: 'Choose from two professional proofing methods that ensure accuracy and efficiency for every project.',
        method1: {
          title: 'E-Proof',
          description: 'Proceed with proofing through a digital proof file. Its free, fast, and perfect for quick approvals.'
        },
        method2: {
          title: 'Digital-Proof',
          description: 'Get a printed version of your uploaded file for review. You will see the actual proof quality — though it requires extra time and cost.'
        },
        image: '/homepage/main-sec05-1.jpg',
        imageAlt: 'Selectable Proof Method'
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
            title: '[Update] Print Seoul\'s Homepage has been RE-DESIGNED!',
            desc: 'Dear Client, Print Seoul has re-formed the homepage to make it more convenient for clients to place an order and easier to understand the advantages of PrintSquare. We pr...',
            date: '08.23.2023'
          }
        ],
        buttonText: 'View All Notices',
        buttonLink: '#'
      },
      
      orderProcess: {
        title: 'Process',
        highlightedTitle: 'Order',
        description: 'Follow our simple 8-step process to get your printing done efficiently and hassle-free.',
        steps: [
          { id: "01", title: "Quote Check", desc: "Get an accurate quote for your book printing.", image: "/homepage/main-process1.jpg" },
          { id: "02", title: "Order", desc: "Place your order easily online.", image: "/homepage/main-process2.jpg" },
          { id: "03", title: "File Upload", desc: "Upload your files securely.", image: "/homepage/main-process3.jpg" },
          { id: "04", title: "Proof Check", desc: "Check proofs to ensure perfection.", image: "/homepage/main-process4.jpg" },
          { id: "05", title: "Payment", desc: "Make a secure payment.", image: "/homepage/main-process5.jpg" },
          { id: "06", title: "Print", desc: "High-quality printing begins.", image: "/homepage/main-process6.jpg" },
          { id: "07", title: "Shipping", desc: "Fast and safe delivery.", image: "/homepage/main-process7.jpg" },
          { id: "08", title: "Customer Service", desc: "Continuous support throughout.", image: "/homepage/main-process8.jpg" }
        ]
      },

      multiColumn: {
  columnsPerRowDesktop: 3,
  columnsPerRowMobile: 1,
  columns: [
    {
      image: '',
      heading: 'Feature One',
      text: 'Description for feature one.'
    },
    {
      image: '',
      heading: 'Feature Two',
      text: 'Description for feature two.'
    },
    {
      image: '',
      heading: 'Feature Three',
      text: 'Description for feature three.'
    }
  ]
},
      
      portfolio: {
        title: 'Our',
        highlightedTitle: 'Portfolio',
        subtitle: 'Showcase',
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
        title: 'Affordable Printing',
        highlightedTitle: 'Prices',
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
        footerNote: '* For bulk orders, we recommend Ocean shipping / Split delivery to enjoy lower delivery costs.',
        pricingTables: {
          companyA: [
            ["1,000 copies", "$8,201", "$8.2"],
            ["5,000 copies", "$39,645", "$7.93"],
            ["10,000 copies", "$75,000", "$7.5"],
            ["50,000 copies", "$360,000", "$7.2"],
            ["100,000 copies", "$710,000", "$7.1"]
          ],
          printSeoul: [
            ["1,000 copies", "$3,050", "$3.05"],
            ["5,000 copies", "$7,220", "$1.44"],
            ["10,000 copies", "$12,460", "$1.25"],
            ["50,000 copies", "$58,730", "$1.17"],
            ["100,000 copies", "$116,010", "$1.16"]
          ],
          companyD: [
            ["1,000 copies", "$6,061", "$6.06"],
            ["5,000 copies", "$30,303", "$6.06"],
            ["10,000 copies", "$57,000", "$5.7"],
            ["50,000 copies", "$285,000", "$5.7"],
            ["100,000 copies", "$570,000", "$5.7"]
          ]
        }
      },
      
      quickGuides: {
        title: 'Quick',
        highlightedTitle: 'Guides',
        description: 'Learn essential printing tips, layout guidelines, and professional insights to help you prepare your perfect print-ready files efficiently and accurately.',
        guides: [
          { title: "Tips For Page Layout", href: "#" },
          { title: "Bleed & Trimming Line", href: "#" },
          { title: "Paper Selection", href: "#" },
          { title: "Download Print-Ready Sample File", href: "#" }
        ],
        image: '/homepage/main-quick-1.jpg',
        imageAlt: 'Quick Guide'
      },

      form: {
        fields: [
          {
            id: 'name',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true
          },
          {
            id: 'message',
            type: 'textarea',
            label: 'Message',
            placeholder: 'Enter your message',
            required: false
          }
        ],
        formConfig: {
          title: 'Contact Form',
          submitText: 'Send Message',
          successMessage: 'Thank you for your message! We will get back to you soon.',
          errorMessage: 'There was an error submitting the form. Please try again.',
        }
      },
      
      videoBanner: {
        highlightedText: 'High-Quality',
        normalText: 'Printing at Affordable Prices',
        description: 'Print Seoul delivers premium book printing with advanced technology, flawless finishing, and exceptional value perfect for businesses and creators.',
        videoUrl: '/homepage/video/printing.mp4',
        videoAlt: 'Printing process video'
      }
    };
  
  return defaults[type] || {};
};

export const getDefaultStyles = (type) => {
  const baseStyles = {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: 'base',
    textAlign: 'left',
    padding: 'medium',
    borderRadius: 'none'
  };

  const typeSpecificStyles = {
    hero: {
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      fontSize: 'xl',
      textAlign: 'center'
    },
    heading: {
      backgroundColor: 'transparent',
      textColor: '#1e293b',
      fontSize: '2xl',
      textAlign: 'left'
    },
    
    form: {
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      padding: 'large',
      borderRadius: 'lg'
    }
  };

  return { ...baseStyles, ...(typeSpecificStyles[type] || {}) };
};