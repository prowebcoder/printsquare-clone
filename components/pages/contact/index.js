//components/pages/contact/index.js
"use client";
import Head from "next/head";
import Header from "../../layout/header/header";
import ContactUs from "./ContactUs";
import Footer from "../../layout/footer/footer";

export default function ContactPage() {
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
      <ContactUs />
      <Footer />
    </>
  );
}
