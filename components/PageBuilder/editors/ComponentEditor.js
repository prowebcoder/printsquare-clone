// components/PageBuilder/editors/ComponentEditor.js
import StyleEditor from './StyleEditor';
import TextEditor from './TextEditor';
import HeadingEditor from './HeadingEditor';
import HeroEditor from './HeroEditor';
import ImageEditor from './ImageEditor';
import AboutHeroEditor from './AboutHeroEditor';
import AboutUsEditor from './AboutUsEditor';
import MultiColumnEditor from './MultiColumnEditor';
import WeightConverterEditor from './WeightConverterEditor';
import MultiTableEditor from './MultiTableEditor';
import FreeSampleEditor from './FreeSampleEditor';
import HeroBannerEditor from './HeroBannerEditor';
import ImageBannerEditor from './ImageBannerEditor';
import ImageBannerTwoEditor from './ImageBannerTwoEditor';
import MethodEditor from './MethodEditor';
import NoticeEditor from './NoticeEditor';
import OrderProcessEditor from './OrderProcessEditor';
import PortfolioEditor from './PortfolioEditor';
import PricingEditor from './PricingEditor';
import QuickGuidesEditor from './QuickGuidesEditor';
import VideoBannerEditor from './VideoBannerEditor';
import FormEditor from './FormEditor';

const ComponentEditor = ({ component, onUpdateContent, onUpdateStyles }) => {
  const renderContentEditor = () => {
    switch (component.type) {
      case 'text': return <TextEditor component={component} onUpdate={onUpdateContent} />;
      case 'heading': return <HeadingEditor component={component} onUpdate={onUpdateContent} />;
      case 'hero': return <HeroEditor component={component} onUpdate={onUpdateContent} />;
      case 'image': return <ImageEditor component={component} onUpdate={onUpdateContent} />;
      case 'aboutHero': return <AboutHeroEditor component={component} onUpdate={onUpdateContent} />;
      case 'multiColumn': return <MultiColumnEditor component={component} onUpdate={onUpdateContent} />;
      case 'weightConverter':
  return <WeightConverterEditor component={component} onUpdate={onUpdateContent} />;
      case 'multiTable': return <MultiTableEditor component={component} onUpdate={onUpdateContent} />;
      case 'aboutUs': return <AboutUsEditor component={component} onUpdate={onUpdateContent} />;
      case 'freeSample': return <FreeSampleEditor component={component} onUpdate={onUpdateContent} />;
      case 'heroBanner': return <HeroBannerEditor component={component} onUpdate={onUpdateContent} />;
      case 'imageBanner': return <ImageBannerEditor component={component} onUpdate={onUpdateContent} />;
      case 'imageBannerTwo': return <ImageBannerTwoEditor component={component} onUpdate={onUpdateContent} />;
      case 'method': return <MethodEditor component={component} onUpdate={onUpdateContent} />;
      case 'notice': return <NoticeEditor component={component} onUpdate={onUpdateContent} />;
      case 'orderProcess': return <OrderProcessEditor component={component} onUpdate={onUpdateContent} />;
      case 'portfolio': return <PortfolioEditor component={component} onUpdate={onUpdateContent} />;
      case 'pricing': return <PricingEditor component={component} onUpdate={onUpdateContent} />;
      case 'quickGuides': return <QuickGuidesEditor component={component} onUpdate={onUpdateContent} />;
      case 'videoBanner': return <VideoBannerEditor component={component} onUpdate={onUpdateContent} />;
      case 'form': return <FormEditor component={component} onUpdate={onUpdateContent} />;
      default: return <DefaultEditor />;
    }
  };

  return (
    <div className="space-y-4">
      {renderContentEditor()}
      <StyleEditor 
        styles={component.styles} 
        onUpdate={(updates) => onUpdateStyles(component.id, updates)} 
      />
    </div>
  );
};

const DefaultEditor = () => (
  <div className="text-gray-500 text-sm p-4 bg-gray-50 rounded-lg border text-center">
   This component type doesn&apos;t have a custom editor yet. The content will be saved as configured.

  </div>
);

export default ComponentEditor;