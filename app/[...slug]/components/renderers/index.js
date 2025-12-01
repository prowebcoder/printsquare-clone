// app/[...slug]/components/renderers/index.js
// Basic components
"use client";

import dynamic from 'next/dynamic';

export { default as TextRenderer } from './basic/TextRenderer';
export { default as HeadingRenderer } from './basic/HeadingRenderer';
export { default as HeroRenderer } from './basic/HeroRenderer';
export { default as ImageRenderer } from './basic/ImageRenderer';
export { default as FormRenderer } from './basic/FormRenderer';

// Premium components
export { default as AboutHeroRenderer } from './premium/AboutHeroRenderer';
export { default as MultiColumnRenderer } from './premium/MultiColumnRenderer';
export { default as WeightConverterRenderer } from './premium/WeightConverterRenderer';
export { default as MultiTableRenderer } from './premium/MultiTableRenderer';
export { default as AboutUsRenderer } from './premium/AboutUsRenderer';
export { default as VideoWithTextRenderer } from './premium/VideoWithTextRenderer';
export { default as FreeSampleRenderer } from './premium/FreeSampleRenderer';
export { default as HeroBannerRenderer } from './premium/HeroBannerRenderer';
export { default as ImageBannerRenderer } from './premium/ImageBannerRenderer';
export { default as ImageBannerTwoRenderer } from './premium/ImageBannerTwoRenderer';
export { default as MethodRenderer } from './premium/MethodRenderer';
export { default as NoticeRenderer } from './premium/NoticeRenderer';
export { default as OrderProcessRenderer } from './premium/OrderProcessRenderer';
export { default as PortfolioRenderer } from './premium/PortfolioRenderer';
export { default as PricingRenderer } from './premium/PricingRenderer';
export { default as QuickGuidesRenderer } from './premium/QuickGuidesRenderer';
export { default as VideoBannerRenderer } from './premium/VideoBannerRenderer';
export { default as TabsGalleryRenderer } from './premium/TabsGalleryRenderer';
export { default as ServiceBoxRenderer } from './premium/ServiceBoxRenderer';
export { default as TextBoxRenderer } from './premium/TextBoxRenderer';
export { default as ContactUsRenderer } from './premium/ContactUsRenderer';

export const TabsFaqRenderer = dynamic(
  () => import('./premium/TabsFaqRenderer'),
  { 
    ssr: false,
    loading: () => <div className="p-8 text-center">Loading FAQs...</div>
  }
);