"use client";
import Head from "next/head";
import Header from "../../../layout/header/header";
import Heading from "./Heading";
import PerfectBindingForm from "./PerfectBindingForm";
import Tabs from "./Tabs";
import Footer from "../../../layout/footer/footer";

export default function PerfectBindingFormPage() {
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
<PerfectBindingForm />
      <Tabs />
      <Footer />
    </>
  );
}
