// components/PageBuilder/PageRenderer.js
import TextRenderer from './renderers/TextRenderer';
import HeadingRenderer from './renderers/HeadingRenderer';
import HeroRenderer from './renderers/HeroRenderer';
import ImageRenderer from './renderers/ImageRenderer';
import AboutHeroRenderer from './renderers/AboutHeroRenderer';
import AboutUsRenderer from './renderers/AboutUsRenderer';
import FreeSampleRenderer from './renderers/FreeSampleRenderer';
import HeroBannerRenderer from './renderers/HeroBannerRenderer';
import ImageBannerRenderer from './renderers/ImageBannerRenderer';
import ImageBannerTwoRenderer from './renderers/ImageBannerTwoRenderer';
import MethodRenderer from './renderers/MethodRenderer';
import NoticeRenderer from './renderers/NoticeRenderer';
import OrderProcessRenderer from './renderers/OrderProcessRenderer';
import PortfolioRenderer from './renderers/PortfolioRenderer';
import PricingRenderer from './renderers/PricingRenderer';
import QuickGuidesRenderer from './renderers/QuickGuidesRenderer';
import VideoBannerRenderer from './renderers/VideoBannerRenderer';
import VideoWithTextRenderer from './renderers/VideoWithTextRenderer';
import MultiColumnRenderer from './renderers/MultiColumnRenderer';
import WeightConverterRenderer from './renderers/WeightConverterRenderer';
import MultiTableRenderer from './renderers/MultiTableRenderer';
import FormRenderer from './renderers/FormRenderer';
import TabsFaqRenderer from './renderers/TabsFaqRenderer';
import TabsGalleryRenderer from './renderers/TabsGalleryRenderer';
import ServiceBoxRenderer from './renderers/ServiceBoxRenderer';
import TextBoxRenderer from './renderers/TextBoxRenderer';
import ContactUsRenderer from './renderers/ContactUsRenderer';
import PortfolioShowcaseRenderer from './renderers/PortfolioShowcaseRenderer';

const PageRenderer = ({ components }) => {
  if (!components || !Array.isArray(components)) {
    return (
      <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-lg">No components to display</p>
        <p className="text-sm mt-2">Add components using the page builder</p>
      </div>
    );
  }

  const renderComponent = (component) => {
    const styleClasses = getStyleClasses(component.styles);

    switch (component.type) {
      case 'text':
        return <TextRenderer key={component.id} component={component} />;
      case 'heading':
        return <HeadingRenderer key={component.id} component={component} />;
      case 'hero':
        return <HeroRenderer key={component.id} component={component} />;
      case 'image':
        return <ImageRenderer key={component.id} component={component} />;
      case 'aboutHero':
        return <AboutHeroRenderer key={component.id} component={component} />;
      case 'aboutUs':
        return <AboutUsRenderer key={component.id} component={component} />;
      case 'multiColumn':
        return <MultiColumnRenderer key={component.id} component={component} />;
      case 'weightConverter':
        return <WeightConverterRenderer key={component.id} component={component} />;
      case 'multiTable':
        return <MultiTableRenderer key={component.id} component={component} />;
      case 'freeSample':
        return <FreeSampleRenderer key={component.id} component={component} />;
      case 'heroBanner':
        return <HeroBannerRenderer key={component.id} component={component} />;
      case 'videoWithText':
        return <VideoWithTextRenderer key={component.id} component={component} />;
      case 'imageBanner':
        return <ImageBannerRenderer key={component.id} component={component} />;
      case 'imageBannerTwo':
        return <ImageBannerTwoRenderer key={component.id} component={component} />;
      case 'method':
        return <MethodRenderer key={component.id} component={component} />;
      case 'notice':
        return <NoticeRenderer key={component.id} component={component} />;
      case 'orderProcess':
        return <OrderProcessRenderer key={component.id} component={component} />;
      case 'portfolio':
        return <PortfolioRenderer key={component.id} component={component} />;
      case 'pricing':
        return <PricingRenderer key={component.id} component={component} />;
      case 'quickGuides':
        return <QuickGuidesRenderer key={component.id} component={component} />;
      case 'videoBanner':
        return <VideoBannerRenderer key={component.id} component={component} />;
      case 'form':
        return <FormRenderer key={component.id} component={component} />;
        case 'tabsFaq': return <TabsFaqRenderer key={component.id} component={component} />;
        case 'tabsGallery': return <TabsGalleryRenderer key={component.id} component={component} />;
        case 'serviceBox': return <ServiceBoxRenderer key={component.id} component={component} />;
        case 'textBox': return <TextBoxRenderer key={component.id} component={component} />;
        case 'contactUs': return <ContactUsRenderer key={component.id} component={component} />;
        case 'portfolioShowcase': return <PortfolioShowcaseRenderer key={component.id} component={component} />;
      default:
        return (
          <div key={component.id} className={`p-4 border border-yellow-300 bg-yellow-50 ${styleClasses}`}>
            <p className="text-yellow-800">
              Component type &quot;{component.type}&quot; is not supported in the renderer.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {components.map(renderComponent)}
    </div>
  );
};

// Helper function to convert style object to Tailwind classes
const getStyleClasses = (styles) => {
  if (!styles) return '';
  
  const classMap = {
    backgroundColor: `bg-[${styles.backgroundColor}]`,
    textColor: `text-[${styles.textColor}]`,
    fontSize: {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    }[styles.fontSize] || 'text-base',
    textAlign: {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right',
      'justify': 'text-justify',
    }[styles.textAlign] || 'text-left',
    padding: {
      'none': 'p-0',
      'small': 'p-2',
      'medium': 'p-4',
      'large': 'p-6',
      'xlarge': 'p-8',
    }[styles.padding] || 'p-4',
    borderRadius: {
      'none': 'rounded-none',
      'sm': 'rounded-sm',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      'full': 'rounded-full',
    }[styles.borderRadius] || 'rounded-none',
    borderWidth: {
      '0': 'border-0',
      '1': 'border',
      '2': 'border-2',
      '4': 'border-4',
      '8': 'border-8',
    }[styles.borderWidth] || 'border-0',
    shadow: {
      'none': 'shadow-none',
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'lg': 'shadow-lg',
      'xl': 'shadow-xl',
    }[styles.shadow] || 'shadow-none',
  };

  return Object.entries(classMap)
    .filter(([key, value]) => styles[key])
    .map(([key, value]) => value)
    .concat(styles.customClasses?.split(' ') || [])
    .join(' ');
};

export default PageRenderer;