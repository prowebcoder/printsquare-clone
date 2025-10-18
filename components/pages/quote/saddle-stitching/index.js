"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import Heading from "./Heading";
import SaddleStitchingForm from "./SaddleStitchingForm";
import Footer from "../../../layout/footer/footer";

export default function SaddleStitchingFormPage() {
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
      <Heading />
<SaddleStitchingForm />
      <Footer />
    </>
  );
}
