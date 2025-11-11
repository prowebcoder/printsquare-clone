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
import FormRenderer from './renderers/FormRenderer';

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
    const inlineStyle = getInlineStyle(component.styles);

    const renderMap = {
      text: TextRenderer,
      heading: HeadingRenderer,
      hero: HeroRenderer,
      image: ImageRenderer,
      aboutHero: AboutHeroRenderer,
      aboutUs: AboutUsRenderer,
      freeSample: FreeSampleRenderer,
      heroBanner: HeroBannerRenderer,
      imageBanner: ImageBannerRenderer,
      imageBannerTwo: ImageBannerTwoRenderer,
      method: MethodRenderer,
      notice: NoticeRenderer,
      orderProcess: OrderProcessRenderer,
      portfolio: PortfolioRenderer,
      pricing: PricingRenderer,
      quickGuides: QuickGuidesRenderer,
      videoBanner: VideoBannerRenderer,
      form: FormRenderer,
    };

    const Renderer = renderMap[component.type];

    return Renderer ? (
      <div key={component.id} className={styleClasses} style={inlineStyle}>
        <Renderer component={component} />
      </div>
    ) : (
      <div key={component.id} className={`p-4 border border-yellow-300 bg-yellow-50 ${styleClasses}`}>
        <p className="text-yellow-800">
          Component type "{component.type}" is not supported in the renderer.
        </p>
      </div>
    );
  };

  return <div className="space-y-8">{components.map(renderComponent)}</div>;
};

// ✅ Tailwind-safe styles
const getStyleClasses = (styles = {}) => {
  const map = {
    fontSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    padding: {
      none: 'p-0',
      small: 'p-2',
      medium: 'p-4',
      large: 'p-6',
      xlarge: 'p-8',
    },
    borderRadius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    borderWidth: {
      0: 'border-0',
      1: 'border',
      2: 'border-2',
      4: 'border-4',
      8: 'border-8',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
  };

  const classNames = [
    map.fontSize[styles.fontSize] || 'text-base',
    map.textAlign[styles.textAlign] || 'text-left',
    map.padding[styles.padding] || 'p-4',
    map.borderRadius[styles.borderRadius] || '',
    map.borderWidth[styles.borderWidth] || '',
    map.shadow[styles.shadow] || '',
  ];

  if (styles.customClasses) classNames.push(styles.customClasses);
  return classNames.join(' ');
};

// ✅ Inline color support
const getInlineStyle = (styles = {}) => {
  const inline = {};
  if (styles.backgroundColor) inline.backgroundColor = styles.backgroundColor;
  if (styles.textColor) inline.color = styles.textColor;
  if (styles.borderColor) inline.borderColor = styles.borderColor;
  return inline;
};

export default PageRenderer;
