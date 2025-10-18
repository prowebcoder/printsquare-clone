"use client";
import Head from "next/head";
import Header from "../../layout/header/header";
import Faq from "./Faq";
import Footer from "../../layout/footer/footer";

export default function FaqPage() {
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
      <Faq />
      <Footer />
    </>
  );
}
