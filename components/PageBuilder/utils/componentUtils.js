// components/PageBuilder/utils/componentUtils.js
import { 
  Type, Image as ImageIcon, Layout, Text, FileText, Star, Zap, Users, 
  DollarSign, BookOpen, Megaphone, Video, ShoppingCart, 
  Grid, Settings, FileText as FormIcon 
} from 'lucide-react';

export const getComponentIcon = (type) => {
  const icons = {
    text: <Type size={16} />,
    heading: <Text size={16} />,
    hero: <Star size={16} />,
    image: <ImageIcon size={16} />,
    aboutHero: <Users size={16} />,
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
    form: <FormIcon size={16} />,
  };
  return icons[type] || <FileText size={16} />;
};


export const getComponentCategory = (type) => {
  if (['aboutHero', 'aboutUs', 'freeSample'].includes(type)) {
    return 'about';
  }
  if (['heroBanner', 'imageBanner', 'imageBannerTwo', 'method', 'notice', 'orderProcess', 'portfolio', 'pricing', 'quickGuides', 'videoBanner'].includes(type)) {
    return 'home';
  }
  if (['form'].includes(type)) {
    return 'forms';
  }
  return 'basic';
};