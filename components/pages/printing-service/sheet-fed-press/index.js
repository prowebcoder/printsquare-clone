"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import PrintingServicesHero from "../PrintingServicesHero";
import CustomSheetFedText from "./CustomSheetFedText";
import ImagesWithText from "./ImagesWithText";
import Footer from "../../../layout/footer/footer";

export default function SheetFedPressPage() {
  return (
    <>
      <Head>
        <title>Sheet-Fed Pres | Professional Printing Services</title>
        <meta
          name="description"
          content="Explore premium printing and binding services at Print Seoul."
        />
      </Head> 

      <Header />
      <PrintingServicesHero />
      <CustomSheetFedText />
      <ImagesWithText  />
      <Footer />
    </>
  );
}
