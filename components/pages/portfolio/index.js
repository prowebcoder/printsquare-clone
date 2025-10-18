"use client";
import Head from "next/head";
import Header from "../../layout/header/header";
import PortfolioShowcase from "./PortfolioShowcase";
import Footer from "../../layout/footer/footer";

export default function PortfolioPage() {
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
      <PortfolioShowcase />
      <Footer />
    </>
  );
}
