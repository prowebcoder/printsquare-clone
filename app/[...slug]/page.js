// app/[...slug]/page.js
import dbConnect from '@/lib/mongodb';
import Page from '@/models/Page';
import { notFound, redirect } from 'next/navigation';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import * as Renderers from './components/renderers';

function serializeForRSC(data) {
  if (!data || typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(item => serializeForRSC(item));
  const result = {};
  for (const key in data) {
    if (['_id', '__v'].includes(key) || key.startsWith('$')) continue;
    const value = data[key];
    result[key] = value && value.toObject ? serializeForRSC(value.toObject()) : serializeForRSC(value);
  }
  return result;
}

const componentMap = {
  text: Renderers.TextRenderer,
  heading: Renderers.HeadingRenderer,
  hero: Renderers.HeroRenderer,
  image: Renderers.ImageRenderer,
  form: Renderers.FormRenderer,
  aboutHero: Renderers.AboutHeroRenderer,
  aboutUs: Renderers.AboutUsRenderer,
  freeSample: Renderers.FreeSampleRenderer,
  heroBanner: Renderers.HeroBannerRenderer,
  imageBanner: Renderers.ImageBannerRenderer,
  multiColumn: Renderers.MultiColumnRenderer,
  weightConverter: Renderers.WeightConverterRenderer,
  multiTable: Renderers.MultiTableRenderer,
  imageBannerTwo: Renderers.ImageBannerTwoRenderer,
  method: Renderers.MethodRenderer,
  notice: Renderers.NoticeRenderer,
  orderProcess: Renderers.OrderProcessRenderer,
  portfolio: Renderers.PortfolioRenderer,
  pricing: Renderers.PricingRenderer,
  quickGuides: Renderers.QuickGuidesRenderer,
  videoWithText: Renderers.VideoWithTextRenderer,
  videoBanner: Renderers.VideoBannerRenderer,
  tabsFaq: Renderers.TabsFaqRenderer,
  tabsGallery: Renderers.TabsGalleryRenderer,
  serviceBox: Renderers.ServiceBoxRenderer,
  textBox: Renderers.TextBoxRenderer,
  contactUs: Renderers.ContactUsRenderer,
  portfolioShowcase: Renderers.PortfolioShowcaseRenderer,
};

function renderComponent(component, index) {
  const Renderer = componentMap[component.type];
  if (!Renderer) return <div key={index}>Unsupported Component: {component.type}</div>;
  return <Renderer key={component.id || index} component={serializeForRSC(component)} index={index} />;
}

async function getPage(slug) {
  await dbConnect();
  const pageSlug = Array.isArray(slug) ? slug.join('/') : slug;
  if (!pageSlug || pageSlug === 'home') return null;
  const page = await Page.findOne({ slug: pageSlug, published: true }).lean();
  return page;
}

export default async function DynamicPage({ params }) {
  const { slug } = params;

  if (!slug || slug.length === 0) redirect('/');
  if (slug === 'home' || (Array.isArray(slug) && slug[0] === 'home')) redirect('/');

  const page = await getPage(slug);
  if (!page) notFound();

  const components = page.components || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {components.length > 0 ? (
          components.map((comp, i) => renderComponent(comp, i))
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">{page.title}</h2>
            <p className="mt-4 text-gray-600">This page is currently being built.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  await dbConnect();
  const pages = await Page.find({ published: true, slug: { $ne: '' } }).select('slug').lean();
  return pages.map(p => ({ slug: p.slug.split('/') }));
}
