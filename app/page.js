// app/page.js
import dbConnect from '@/lib/mongodb';
import Page from '@/models/Page';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import * as Renderers from './[...slug]/components/renderers';

// Serialize Mongoose documents safely for RSC
function serializeForRSC(data) {
  if (!data || typeof data !== 'object') return data;

  if (Array.isArray(data)) return data.map(item => serializeForRSC(item));

  const result = {};
  for (const key in data) {
    if (['_id', '__v'].includes(key) || key.startsWith('$')) continue;
    const value = data[key];
    if (value && typeof value === 'object') {
      result[key] = value.toObject ? serializeForRSC(value.toObject()) : serializeForRSC(value);
    } else {
      result[key] = value;
    }
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
};

function renderComponent(component, index) {
  const Renderer = componentMap[component.type];
  if (!Renderer) return <div key={index}>Unsupported Component: {component.type}</div>;
  return <Renderer key={component.id || index} component={serializeForRSC(component)} index={index} />;
}

export default async function Home() {
  await dbConnect();

  const homepage = await Page.findOne({ $or: [{ slug: '' }, { isHomepage: true }], published: true }).lean();

  if (!homepage) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Welcome to Printing Services</h1>
          <p className="mt-4 text-gray-600">No homepage has been set yet. Please set a page as homepage from the admin dashboard.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const components = homepage.components || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {components.length > 0 ? (
          components.map((comp, i) => renderComponent(comp, i))
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">{homepage.title}</h2>
            <p className="mt-4 text-gray-600">This homepage is currently being built.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
