
"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import PrintingServicesHero from "../PrintingServicesHero";
import BindingFinishingText from "./BindingFinishingText";
import ImagesWithText from "./ImagesWithText";
import Footer from "../../../layout/footer/footer";

export default function BindingAndFinishingPage() {
  return (
    <>
      <Head>
        <title>Binding And Finishing | Professional Printing Services</title>
        <meta
          name="description"
          content="Explore premium printing and binding services at Print Seoul."
        />
      </Head> 

      <Header />
      <PrintingServicesHero />
      <BindingFinishingText />
      <ImagesWithText  />
      <Footer />
    </>
  );
}
