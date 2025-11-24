//components/pages/quote/perfect-binding/index.js
"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import Heading from "./Heading";
import Tabs from "./Tabs";
import Footer from "../../../layout/footer/footer";
import WireQuoteForm from "./WireQuoteForm";

export default function WireBindingFormPage() {
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
      <WireQuoteForm />
      <Tabs />
      <Footer />
    </>
  );
}
