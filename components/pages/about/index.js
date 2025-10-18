"use client";
import Head from "next/head";
import Header from "../../layout/header/header";
import AboutUs from "./AboutUs";
import AboutHero from "./AboutHero";
import BottomBanner from "../about/BottomBanner";
import Footer from "../../layout/footer/footer";

export default function AboutPage() {
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
      <AboutHero />
      <AboutUs />
      <BottomBanner />
      <Footer />
    </>
  );
}
