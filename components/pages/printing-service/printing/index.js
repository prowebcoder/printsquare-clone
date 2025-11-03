//components/pages/printing-service/printing/index.js
"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import PrintingServicesHero from "../PrintingServicesHero";
import Intro from "./Intro";
import TextAndVideo from "./TextAndVideo";
import ImageColumn from "./ImageCoulmn";
import EquipmentList from "./EquipmentList";
import TabsGallery from "./TabsGallery";
import Footer from "../../../layout/footer/footer";

export default function PrintingPage() {
  return (
    <>
      <Head>
        <title>Printing | Professional Printing Services</title>
        <meta
          name="description"
          content="Explore premium printing and binding services at Print Seoul."
        />
      </Head> 

      <Header />
      <PrintingServicesHero />
      <Intro />
      <TextAndVideo />
      <ImageColumn />
      <EquipmentList />
      <TabsGallery />
      <Footer />
    </>
  );
}
