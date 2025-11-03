//components/pages/home/index.js
"use client";
import Head from "next/head";
import Header from "../../layout/header/header";
import HeroBanner from "./HeroBanner";
import Pricing from "./Pricing";
import VideoBanner from "./VideoBanner";
import ImageBanner from "./ImageBanner";
import Method from "./Method";
import ImageBannerTwo from "./ImageBannerTwo";
import FreeSampleSection from "./FreeSampleSection";
import Portfolio from "./Portfolio";
import OrderProcess from "./OrderProcess";
import QuickGuides from "./QuickGuides";
import Notice from "./Notice";
import Footer from "../../layout/footer/footer";


export default function HomePage() {
  return (
    <>
      <Head>
        <title>Print Seoul | Professional Printing Services</title>
        <meta
          name="description"
          content="Explore premium printing and binding services at Print Seoul."
        />
      </Head> 

      <Header />
      <HeroBanner />
      <Pricing />
     <VideoBanner />
      <ImageBanner />
      <Method />
      <ImageBannerTwo />
<FreeSampleSection />
<Portfolio />
<OrderProcess />
<QuickGuides />
<Notice />
      <Footer />
    </>
  );
}
