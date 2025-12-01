// components/PageBuilder/utils/componentDefaults.js
export const getDefaultContent = (type) => {
  const defaults = {
      // Basic components
      text: { 
  content: 'Enter your text here...',
  textSize: 'text-base',
  textColor: '#374151',
  alignment: 'text-left',
  fontWeight: 'font-normal',
  lineHeight: 'leading-normal',
  width: 'max-w-none',
  padding: 'p-6',
  margin: 'my-4',
  backgroundColor: ''
},
heading: { 
  text: 'Heading Text', 
  level: 'h2',
  fontSize: 'text-4xl',
  textColor: '#1F2937',
  alignment: 'text-center',
  fontWeight: 'font-bold',
  lineHeight: 'leading-normal',
  margin: 'my-6',
  padding: 'p-6',
  backgroundColor: ''
},
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
  backgroundImage: '/about/about-banner.jpg',
  titleTag: 'h1',
  titleSize: 'text-3xl md:text-5xl',
  titleColor: '#FFFFFF',
  highlightedColor: '#E21B36',
  subtitleColor: '#D6D9E0',
  subtitleSize: 'text-sm md:text-base',
  overlayColor: '#0B1633',
  overlayOpacity: '70'
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
  quote: 'Precision in every print — from Seoul to the world.',
  titleColor: '#0B1633',
  buttonBgColor: '#E21B36',
  buttonTextColor: '#FFFFFF',
  imagePosition: 'left',
  quoteBgColor: '#FFFFFF',
  quoteTextColor: '#121A2C'
},
      tabsFaq: {
      title: 'Frequently Asked Questions',
      tabs: [
        {
          name: 'ORDER',
          faqs: [
            {
              question: 'Terms of Portfolio usage agreement',
              answer: 'All designs and content submitted for printing remain the intellectual property of the client. Print Seoul only uses them for printing and delivery purposes.'
            }
          ]
        }
      ],
      backgroundType: 'gradient',
      gradientFrom: '#f5f3ef',
      gradientTo: '#e8e3dd',
      titleColor: '#0B1633',
      highlightedColor: '#FF4B2B',
      activeTabBg: '#e21b36',
      activeTabText: '#ffffff',
      inactiveTabBg: '#ffffff',
      inactiveTabText: '#666666',
      questionColor: '#1f2937',
      answerColor: '#6b7280'
    },
      freeSample: {
  title: 'Free Sample Service',
  description1: 'Curious about the paper texture or print quality before ordering? Experience it yourself with our free sample service.',
  description2: 'Just share your preferred book type, paper, and contact details — and we\'ll send you a sample book to help you make the best choice.',
  description3: 'Build your trust with Print Seoul — where quality meets precision.',
  buttonText: 'Request a Free Sample',
  buttonLink: 'mailto:support@printsquare.net',
  email: 'support@printseoul.net',
  image: '/homepage/main-sec07-1.jpg',
  imagePosition: 'left',
  titleColor: '#1F2937',
  buttonBgColor: '#e21b36',
  buttonTextColor: '#FFFFFF',
  backgroundType: 'solid',
  backgroundColor: '#FFFFFF'
},

    
videoWithText: {
  title: 'PrintSeoul Specializes in Magazine and Catalog Printing',
  description: 'With years of experience, any client who trusts their printing needs with **PrintSeoul** will be impressed by the premium quality and outstanding service.\n\nWe pride ourselves on maintaining the highest standards of printing.\nPrintSeoul ensures precision, reliability, and a finish that meets international expectations.',
  features: [
    'High Quality Profile',
    'Excellent Service'
  ],
  videoFile: '',
  videoThumbnail: '',
  videoThumbnailAlt: 'Video thumbnail',
  videoPosition: 'left',
  contentAlignment: 'left',
  titleSize: 'text-5xl',
  fontWeight: 'font-extrabold',
  titleColor: '#1F2937',
  textSize: 'text-lg',
  textColor: '#4B5563',
  featureBgColor: '#2563EB',
  featureTextColor: '#FFFFFF',
  backgroundColor: '#FFFFFF',
  autoplay: false
},
      heroBanner: {
  title: 'Your printing partner that cares.',
  subtitle: 'Quality prints. Fair prices. Print Seoul',
  backgroundImage: '/homepage/main-bg.jpg',
  backgroundType: 'image',
  overlayColor: '#000000',
  overlayOpacity: '40',
  titleColor: '#FFFFFF',
  titleSize: 'text-4xl md:text-6xl',
  subtitleColor: '#FFFFFF',
  subtitleSize: 'text-2xl md:text-3xl'
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
  imageAlt: 'High-quality paper',
  backgroundType: 'solid',
  backgroundColor: '#0B1633',
  titleColor: '#FFFFFF',
  titleSize: 'text-3xl md:text-4xl',
  buttonBgColor: '#E21B36',
  buttonTextColor: '#FFFFFF',
  paragraphColor: '#D6D9E0'
},
      
      imageBannerTwo: {
  title: 'Special Order',
  highlightedTitle: 'Available',
  paragraphs: [
    'Would you like to make a special book other than the quote we provide? Don\'t worry — we\'ve got you covered.',
    'Describe the book you want using the Custom Quote. Our printing experts at Print Seoul will bring your idea to life.',
    'Want to create your own special edition book?'
  ],
  buttonText: 'Go to Custom Quote',
  image: '/homepage/main-sec06-1.png',
  imageAlt: 'Special order book',
  backgroundType: 'solid',
  backgroundColor: '#F8F9FB',
  imagePosition: 'right',
  titleColor: '#0B1633',
  titleSize: 'text-3xl md:text-4xl',
  highlightedColor: '#E21B36',
  buttonBgColor: '#E21B36',
  buttonTextColor: '#FFFFFF',
  paragraphColor: '#2E3850'
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
  imageAlt: 'Selectable Proof Method',
  backgroundType: 'solid',
  backgroundColor: '#F8F9FB',
  titleColor: '#0B1633',
  titleSize: 'text-4xl md:text-5xl',
  highlightedColor: '#E21B36',
  descriptionColor: '#2E3850',
  descriptionSize: 'text-lg',
  badgeGradientFrom: '#E21B36',
  badgeGradientTo: '#FF4B2B',
  badgeTextColor: '#FFFFFF'
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
  buttonLink: '#',
  backgroundType: 'solid',
  backgroundColor: '#FAFAFA',
  titleColor: '#0B1633',
  buttonBgColor: '#E21B36',
  buttonTextColor: '#FFFFFF',
  noticeBoxBgColor: '#FFFFFF',
  noticeBoxHoverBgColor: '#FFE3E5',
  noticeTitleColor: '#0B1633',
  noticeDescColor: '#6B7280',
  noticeDateColor: '#9CA3AF'
},

      weightConverter: {
  conversionType: 'lbsToGsm',
  weight: '',
  results: {}
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
  ],
  backgroundType: 'solid',
  backgroundColor: '#F8F9FB',
  titleColor: '#0B1633',
  titleSize: 'text-4xl md:text-5xl',
  highlightedColor: '#E21B36',
  descriptionColor: '#2E3850',
  descriptionSize: 'text-lg md:text-base',
  stepGradientFrom: '#E21B36',
  stepGradientTo: '#FF4B2B',
  stepNumberColor: '#FFFFFF'
},

      multiColumn: {
        columnsPerRowDesktop: 3,
        columnsPerRowMobile: 1,
        columns: [
          {
            image: '',
            heading: 'Feature One',
            text: 'Description for feature one.',
            buttonText: 'Learn More', 
            buttonLink: '/default',
            buttonIcon: '',
            buttonStyle: 'primary',
            buttonColor: '#3b82f6',
            buttonTextColor: '#ffffff'
          },
          {
            image: '',
            heading: 'Feature Two',
            text: 'Description for feature two.',
            buttonText: 'Learn More', 
            buttonLink: '/default',
            buttonIcon: '',
            buttonStyle: 'primary',
            buttonColor: '#3b82f6',
            buttonTextColor: '#ffffff'
          },
          {
            image: '',
            heading: 'Feature Three',
            text: 'Description for feature three.',
            buttonText: 'Learn More', 
            buttonLink: '/default',
            buttonIcon: '',
            buttonStyle: 'primary',
            buttonColor: '#3b82f6',
            buttonTextColor: '#ffffff'
          }
        ]
      },

      
      multiTable: {
        tablesPerRowDesktop: 2,
        tablesPerRowMobile: 1,
        tables: [
          {
            title: 'International Metric Paper Sizes - ISO Standard',
            headers: ['ISO size', 'W × L (mm)', 'W × L (inch)'],
            rows: [
              ['A0', '841 × 1189', '33 × 46'],
              ['A1', '594 × 841', '23.38 × 33'],
              ['A2', '420 × 594', '16.5 × 23.38'],
              ['A3', '297 × 420', '11.75 × 16.5'],
              ['A4', '210 × 297', '8.25 × 11.75'],
              ['A5', '148 × 210', '5.88 × 8.25'],
              ['A6', '105 × 148', '4.13 × 6.88']
            ]
          },
          {
            title: 'Size commonly used in USA and Canada',
            headers: ['American Size', 'W × L (mm)', 'W × L (inch)'],
            rows: [
              ['Letter', '216 × 279', '8.5 × 11'],
              ['Legal', '216 × 356', '8.5 × 14'],
              ['Executive', '190 × 254', '7.5 × 10'],
              ['Ledger / Tabloid', '279 × 432', '11 × 17']
            ]
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
  ],
  backgroundType: 'solid',
  backgroundColor: '#F8F9FB',
  titleColor: '#0B1633',
  titleSize: 'text-3xl md:text-5xl',
  highlightedColor: '#E21B36',
  subtitleColor: '#0B1633',
  buttonBgColor: '#E21B36',
  buttonTextColor: '#FFFFFF'
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
  currencyNote: 'Standard currency: USD',
  footerNote: '*For bulk orders, we recommend Ocean shipping / Split delivery to enjoy lower delivery costs.',
  backgroundType: 'gradient',
  gradientFrom: '#111827',
  gradientTo: '#000000',
  titleColor: '#FFFFFF',
  titleSize: 'text-4xl md:text-5xl',
  highlightedColor: '#E21B36',
  stepGradientFrom: '#E21B36',
  stepGradientTo: '#FF4B2B',
  tables: [
    {
      id: 'company-a',
      title: 'COMPANY "A"',
      headers: ['Quantity', 'Price', 'Price/Copy'],
      rows: [
        ['1,000 copies', '$8,201', '$8.2'],
        ['5,000 copies', '$39,645', '$7.93'],
        ['10,000 copies', '$75,000', '$7.5'],
        ['50,000 copies', '$360,000', '$7.2'],
        ['100,000 copies', '$710,000', '$7.1']
      ],
      headerBgColor: '#E21B36',
      headerTextColor: '#FFFFFF',
      bodyTextColor: '#0B1633'
    },
    {
      id: 'print-seoul',
      title: 'PRINT SEOUL',
      headers: ['Quantity', 'Price', 'Price/Copy'],
      rows: [
        ['1,000 copies', '$3,860', '$3.05'],
        ['5,000 copies', '$7,220', '$1.44'],
        ['10,000 copies', '$12,460', '$1.25'],
        ['50,000 copies', '$58,730', '$1.17'],
        ['100,000 copies', '$115,010', '$1.16']
      ],
      headerBgColor: '#E21B36',
      headerTextColor: '#FFFFFF',
      bodyTextColor: '#0B1633'
    },
    {
      id: 'company-d',
      title: 'COMPANY "D"',
      headers: ['Quantity', 'Price', 'Price/Copy'],
      rows: [
        ['1,000 copies', '$6,051', '$6.06'],
        ['5,000 copies', '$30,303', '$6.06'],
        ['10,000 copies', '$57,000', '$5.7'],
        ['50,000 copies', '$285,000', '$5.7'],
        ['100,000 copies', '$570,000', '$5.7']
      ],
      headerBgColor: '#E21B36',
      headerTextColor: '#FFFFFF',
      bodyTextColor: '#0B1633'
    }
  ]
},

serviceBox: {
  // Header content
  title: "Our Equipment & Technology",
  titleColor: "#FFFFFF",
  titleSize: "text-4xl sm:text-5xl",
  description: "We're powered by precision — from prepress to finishing — equipped with cutting-edge machines that ensure top-tier quality and consistency.",
  descriptionColor: "#D6D9E0",
  descriptionSize: "text-base sm:text-lg",
  descriptionMaxWidth: "42rem",
  
  // Layout settings
  boxesPerRow: 4,
  showDecorativeElements: true,
  itemHoverEffect: true,
  
  // Background settings
  backgroundType: "solid",
  backgroundColor: "#0B1633",
  gradientFrom: "#0B1633",
  gradientTo: "#1a2239",
  
  // Default styling
  boxBorderRadius: "1rem",
  iconBorderRadius: "0.5rem",
  iconSize: "w-6 h-6",
  iconColor1: "#E21B36",
  iconColor2: "#FF4B2B",
  itemBorderColor: "#2E3850",
  itemHoverBorderColor: "#E21B36",
  itemHoverTextColor: "#FF4B2B",
  itemTextColor: "#D6D9E0",
  itemFontSize: "0.875rem",
  
  // Boxes data
  boxes: [
    {
      title: "Prepress",
      icon: "wrench",
      items: [
        "ElecRoc (PDF Workflow)",
        "CTF Tanto 6120",
        "CTP PlateRite 8800Z",
        "Canon iPF8000"
      ],
      boxBgType: "solid",
      boxSolidColor: "#121A2C",
      boxGradientFrom: "#121A2C",
      boxGradientTo: "#1a2239",
      borderColor: "#2E3850",
      borderWidth: "1px",
      titleColor: "#FFFFFF",
      iconColor: "#E21B36",
      iconBgColor: "rgba(226, 27, 54, 0.1)"
    },
    {
      title: "Sheet-Fed Press",
      icon: "printer",
      items: [
        "Komori LS440SP",
        "Komori LS540",
        "Komori LS440",
        "Komori LS240SP"
      ],
      boxBgType: "solid",
      boxSolidColor: "#121A2C",
      boxGradientFrom: "#121A2C",
      boxGradientTo: "#1a2239",
      borderColor: "#2E3850",
      borderWidth: "1px",
      titleColor: "#FFFFFF",
      iconColor: "#FF4B2B",
      iconBgColor: "rgba(255, 75, 43, 0.1)"
    },
    {
      title: "Web-Fed Press",
      icon: "layers",
      items: [
        "Komori System 38S (50,000 IPH) – 2 Set",
        "Komori System 35S (48,000 IPH) – 2 Set"
      ],
      boxBgType: "solid",
      boxSolidColor: "#121A2C",
      boxGradientFrom: "#121A2C",
      boxGradientTo: "#1a2239",
      borderColor: "#2E3850",
      borderWidth: "1px",
      titleColor: "#FFFFFF",
      iconColor: "#E21B36",
      iconBgColor: "rgba(226, 27, 54, 0.1)"
    },
    {
      title: "Finishing",
      icon: "settings",
      items: [
        "Stacker Bundler – 6 Set",
        "Muller Martini Bolero Perfect Binding Line – 2 Set",
        "Tener Saddle Stitcher – 2 Set",
        "Heidelberg Stahl Folder KH66 – 3 Set",
        "Polar 115 Paper Cutter – 2 Set",
        "Fuji-Ace Robot Palletizer – 3 Set"
      ],
      boxBgType: "solid",
      boxSolidColor: "#121A2C",
      boxGradientFrom: "#121A2C",
      boxGradientTo: "#1a2239",
      borderColor: "#2E3850",
      borderWidth: "1px",
      titleColor: "#FFFFFF",
      iconColor: "#FF4B2B",
      iconBgColor: "rgba(255, 75, 43, 0.1)"
    }
  ]
},

contactUs: {
  // General settings
  showContactCards: true,
  showForm: true,
  showMap: true,
  showDecorativeElements: true,
  cardsPerRow: 3,
  
  // Background settings
  backgroundType: 'solid',
  backgroundColor: '#F9FAFB',
  gradientFrom: '#F9FAFB',
  gradientTo: '#FFFFFF',
  
  // Header settings
  title: 'Contact Us',
  description: "We'd love to hear from you! Whether it's an inquiry, feedback, or partnership opportunity, our team is ready to assist.",
  descriptionColor: '#6B7280',
  descriptionSize: 'text-base',
  descriptionMaxWidth: '42rem',
  
  heroTitleGradient: true,
  heroGradientFrom: '#0B1633',
  heroGradientTo: '#FF4B2B',
  heroTitleColor: '#1F2937',
  heroTitleSize: 'text-4xl md:text-5xl',
  
  // Contact cards
  contactCards: [
    {
      title: 'Our Office',
      icon: 'mapPin',
      content: "Print Seoul Headquarters<br />105, Seoul Printing Avenue,<br />Mapo-gu, Seoul, South Korea",
      bgColor: '#FFFFFF',
      borderColor: 'transparent',
      iconBgColor: 'rgba(255, 75, 43, 0.2)',
      iconColor: '#FF4B2B',
      titleColor: '#1F2937',
      textColor: '#6B7280'
    },
    {
      title: 'Call Us',
      icon: 'phone',
      content: "+82 10-3456-7890<br />Mon–Fri, 9:00 AM–6:00 PM",
      bgColor: '#FFFFFF',
      borderColor: 'transparent',
      iconBgColor: 'rgba(255, 75, 43, 0.2)',
      iconColor: '#FF4B2B',
      titleColor: '#1F2937',
      textColor: '#6B7280'
    },
    {
      title: 'Email Us',
      icon: 'mail',
      content: "support@printseoul.com<br />info@printseoul.com",
      bgColor: '#FFFFFF',
      borderColor: 'transparent',
      iconBgColor: 'rgba(255, 75, 43, 0.2)',
      iconColor: '#FF4B2B',
      titleColor: '#1F2937',
      textColor: '#6B7280'
    }
  ],
  
  // Card styling
  cardHoverEffect: true,
  cardBorderRadius: '1rem',
  cardBgColor: '#FFFFFF',
  cardTitleColor: '#1F2937',
  cardTextColor: '#6B7280',
  cardShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  
  // Icon styling
  iconBorderRadius: '9999px',
  iconColor: '#FF4B2B',
  iconBgColor: 'rgba(255, 75, 43, 0.2)',
  
  // Form settings
  formTitle: 'Send Us a Message',
  formTitleColor: '#1F2937',
  formAction: '',
  
  // Default form fields (if no custom fields specified)
  formFields: [],
  
  // Form styling
  formBgColor: '#FFFFFF',
  formBorderRadius: '1rem',
  formShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  
  // Form messages
  successMessage: 'Thank you! Your message has been sent successfully.',
  errorMessage: 'Sorry, there was an error sending your message. Please try again.',
  
  // Button styling
  buttonText: 'Send Message',
  buttonIcon: 'send',
  buttonGradient: true,
  buttonGradientFrom: '#E21B36',
  buttonGradientTo: '#FF4B2B',
  buttonSolidColor: '#E21B36',
  buttonTextColor: '#FFFFFF',
  
  // Map settings
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.278273548117!2d126.97796931531146!3d37.5665359797989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2f7e52b0b69%3A0x1234abcd5678!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2sin!4v1696811000000!5m2!1sen!2sin',
  mapHeight: '288px',
  mapBorderRadius: '1rem',
  mapCaption: 'Our location in Seoul, South Korea',
  mapCaptionColor: '#6B7280'
},

textBox: {
  // General settings
  showIcon: true,
  showDecorativeElements: true,
  containerMaxWidth: 'max-w-5xl',
  paddingY: 'py-20',
  paddingX: 'px-6 sm:px-10',
  
  // Background settings
  backgroundType: 'solid',
  backgroundColor: '#F8F9FB',
  gradientFrom: '#F8F9FB',
  gradientTo: '#FFFFFF',
  
  // Decorative elements
  decorativeType: 'gradient',
  decorativeGradientFrom: '#E21B36',
  decorativeGradientTo: '#FF4B2B',
  decorativeColor: '#E21B36',
  decorativeOpacity: 0.2,
  
  // Container settings
  containerBgColor: '#FFFFFF',
  containerBorderColor: '#EAEAEA',
  containerBorderRadius: '1.5rem',
  containerBorderWidth: '1px',
  containerShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  containerPadding: 'p-10 sm:p-14',
  
  // Icon settings
  icon: 'printer',
  iconSize: '2rem',
  iconBgType: 'gradient',
  iconGradientFrom: '#E21B36',
  iconGradientTo: '#FF4B2B',
  iconSolidColor: '#E21B36',
  iconBorderRadius: '9999px',
  
  // Text settings
  title: 'Professional Printing Excellence',
  titleGradient: true,
  titleGradientFrom: '#E21B36',
  titleGradientTo: '#FF4B2B',
  titleColor: '#1F2937',
  titleSize: 'text-4xl sm:text-5xl',
  
  description: "Over the years, Print Seoul has earned the trust of magazine publishers, designers, and printing brokers by consistently delivering outstanding quality and reliable service. Our clients return time and again — confident their printing needs are in expert hands.",
  descriptionColor: '#4B5563',
  descriptionSize: 'text-base sm:text-lg',
  descriptionMaxWidth: '42rem',
  
  brandHighlightColor: '#1F2937',
  brandHighlightWeight: 600,
  
  // Highlights settings
  showHighlightIcons: true,
  highlightIcon: 'star',
  highlightsLayout: 'horizontal',
  highlightTextSize: 'text-sm',
  highlightBgColor: '#FFE8E8',
  highlightTextColor: '#E21B36',
  highlightBorderColor: '#F5C2C2',
  highlightBorderRadius: '9999px',
  
  // Highlights data
  highlights: [
    {
      text: "Trusted Quality",
      bgColor: '#FFE8E8',
      textColor: '#E21B36',
      borderColor: '#F5C2C2',
      iconColor: '#E21B36',
      bgType: 'solid'
    },
    {
      text: "Repeat Clients",
      bgColor: '#FFE8E8',
      textColor: '#FF4B2B',
      borderColor: '#F5C2C2',
      iconColor: '#FF4B2B',
      bgType: 'solid'
    },
    {
      text: "Premium Finish",
      bgColor: '#FFE8E8',
      textColor: '#E21B36',
      borderColor: '#F5C2C2',
      iconColor: '#E21B36',
      bgType: 'solid'
    }
  ]
},

tabsGallery: {
  title: "Our Advanced Printing Facilities",
  titleColor: "#1F2937",
  titleSize: "text-4xl sm:text-5xl",
  description: "From small runs to large-scale printing, Printseoul delivers precision and quality at every stage.",
  descriptionColor: "#4B5563",
  descriptionSize: "text-base sm:text-lg",
  highlightColor: "#E21B36",
  
  // Tabs configuration
  tabs: [
    { id: "sheetfed", label: "Sheet-Fed Press" },
    { id: "webfed", label: "Web-Fed Press" },
    { id: "binding", label: "Binding Machines" },
    { id: "smallprint", label: "From Small Print Run To Bulk Printing" }
  ],
  
  // Active tab styling
  activeTabBgType: "gradient",
  activeTabGradientFrom: "#E21B36",
  activeTabGradientTo: "#FF4B2B",
  activeTabSolidColor: "#E21B36",
  activeTabTextColor: "#FFFFFF",
  
  // Inactive tab styling
  inactiveTabBgColor: "#FFFFFF",
  inactiveTabTextColor: "#000000",
  inactiveTabBorderColor: "#E5E7EB",
  
  // Gallery images
  galleries: {
    sheetfed: [
      { url: "/printing-service/sfp1.png", alt: "Sheet-Fed Press 1" },
      { url: "/printing-service/sfp2.png", alt: "Sheet-Fed Press 2" },
      { url: "/printing-service/sfp3.png", alt: "Sheet-Fed Press 3" },
      { url: "/printing-service/sfp4.png", alt: "Sheet-Fed Press 4" },
      { url: "/printing-service/sfp5.png", alt: "Sheet-Fed Press 5" },
      { url: "/printing-service/sfp6.png", alt: "Sheet-Fed Press 6" }
    ],
    webfed: [
      { url: "/printing-service/wfp1.png", alt: "Web-Fed Press 1" },
      { url: "/printing-service/wfp2.png", alt: "Web-Fed Press 2" }
    ],
    binding: [
      { url: "/printing-service/bm1.png", alt: "Binding Machine 1" },
      { url: "/printing-service/bm2.png", alt: "Binding Machine 2" },
      { url: "/printing-service/bm3.png", alt: "Binding Machine 3" },
      { url: "/printing-service/bm4.png", alt: "Binding Machine 4" }
    ],
    smallprint: [
      { url: "/printing-service/spr1.png", alt: "Small Print Run 1" },
      { url: "/printing-service/spr2.png", alt: "Small Print Run 2" }
    ]
  },
  
  // Background styling
  backgroundType: "solid",
  backgroundColor: "#FFFFFF",
  gradientFrom: "#FFFFFF",
  gradientTo: "#F8F9FB",
  showDecorativeElements: true,
  imageBorderRadius: "1rem"
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
  imageAlt: 'Quick Guide',
  imagePosition: 'left',
  titleColor: '#FFFFFF',
  highlightedTitleColor: '#E21B36',
  numberColor: '#E21B36',
  buttonBgColor: '#121A2C',
  buttonTextColor: '#D6D9E0',
  backgroundType: 'gradient',
  gradientFrom: '#0B1633',
  gradientTo: '#1C2333'
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
  videoAlt: 'Printing process video',
  highlightedColor: '#E21B36',
  normalTextColor: '#FFFFFF',
  descriptionColor: '#D1D5DB',
  buttonBgColor: '#E21B36',
  buttonTextColor: '#FFFFFF'
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
    },

    multiTable: {
      backgroundColor: '#ffffff',
      textColor: '#1e293b',
      padding: 'medium',
      borderRadius: 'none'
    }
  };

  return { ...baseStyles, ...(typeSpecificStyles[type] || {}) };
};