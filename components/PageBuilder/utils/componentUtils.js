// components/PageBuilder/utils/componentUtils.js
import { 
  Type, Image as ImageIcon, Layout, Text, FileText, Star, Zap, Users, 
  DollarSign, BookOpen, Megaphone, Calculator, Video, ShoppingCart, 
  Grid,  FileText as FormIcon, Table, HelpCircle 
} from 'lucide-react';

export const getComponentIcon = (type) => {
  const icons = {
    text: <Type size={16} />,
    heading: <Text size={16} />,
    hero: <Star size={16} />,
    image: <ImageIcon size={16} />,
    aboutHero: <Users size={16} />,
    multiColumn: <Grid size={16} />,
    weightConverter: <Calculator size={16} />,
    multiTable: <Table size={16} />, 
    aboutUs: <BookOpen size={16} />,
    freeSample: <Zap size={16} />,
    heroBanner: <Layout size={16} />,
    imageBanner: <ImageIcon size={16} />,
    imageBannerTwo: <ImageIcon size={16} />,
    method: <FileText size={16} />,
    notice: <Megaphone size={16} />,
    orderProcess: <ShoppingCart size={16} />,
    portfolio: <Grid size={16} />,
    pricing: <DollarSign size={16} />,
    quickGuides: <BookOpen size={16} />,
    videoBanner: <Video size={16} />,
    videoWithText: <Video size={16} />,
    form: <FormIcon size={16} />,
    tabsFaq: <HelpCircle size={16} />,
  };
  return icons[type] || <FileText size={16} />;
};

export const getComponentCategory = (type) => {
  if (['aboutHero', 'aboutUs', 'freeSample'].includes(type)) {
    return 'about';
  }
  if (['heroBanner', 'multiColumn', 'multiTable',  'videoWithText', 'weightConverter', 'imageBanner', 'imageBannerTwo', 'method', 'notice', 'orderProcess', 'portfolio', 'pricing', 'quickGuides', 'videoBanner', 'tabsFaq'].includes(type)) {
    return 'home';
  }
  if (['form'].includes(type)) {
    return 'forms';
  }
  return 'basic';
};

export const getComponentDisplayName = (type) => {
  const nameMap = {
    'text': 'Text',
    'heading': 'Heading',
    'hero': 'Hero',
    'image': 'Image',
    'aboutHero': 'About Hero',
    'aboutUs': 'About Us',
    'videoWithText': 'Video with Text',
    'freeSample': 'Image with Text',
    'heroBanner': 'Hero Banner',
    'imageBanner': 'Image Banner',
    'imageBannerTwo': 'Image Banner 2',
    'method': 'Proof Method',
    'notice': 'Notices',
    'orderProcess': 'Order Process',
    'portfolio': 'Portfolio',
    'pricing': 'Pricing',
    'quickGuides': 'Quick Guides',
    'videoBanner': 'Video Banner',
    'form': 'Basic Form',
    'multiColumn': 'Multi Column',
    'weightConverter': 'Weight Converter',
    'multiTable': 'Tables',
    'tabsFaq': 'FAQ Tabs',
  };
  
  return nameMap[type] || type;
};