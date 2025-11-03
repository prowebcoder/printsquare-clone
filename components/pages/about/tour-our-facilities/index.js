//components/pages/about/tour-our-facilities/index.js
"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import AboutHero from "../AboutHero";
import EquipmentList from "../../printing-service/printing/EquipmentList";
import TabsGallery from "../../printing-service/printing/TabsGallery";
import Footer from "../../../layout/footer/footer";

export default function TourOurFacilitiesPage() {
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
      <EquipmentList />
      <TabsGallery />
      <Footer />
    </>
  );
}
