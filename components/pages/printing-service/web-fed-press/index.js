//components/pages/printing-service/web-fed-press/index.js
"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import PrintingServicesHero from "../PrintingServicesHero";
import WebFedPressText from "./WebFedPressText";
import ImagesWithText from "./ImagesWithText";
import Footer from "../../../layout/footer/footer";

export default function WebFedPressPage() {
  return (
    <>
      <Head>
        <title>Web-Fed Pres | Professional Printing Services</title>
        <meta
          name="description"
          content="Explore premium printing and binding services at Print Seoul."
        />
      </Head> 

      <Header />
      <PrintingServicesHero />
      <WebFedPressText />
      <ImagesWithText  />
      <Footer />
    </>
  );
}
