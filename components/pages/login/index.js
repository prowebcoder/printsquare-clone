"use client";
import Head from "next/head";
import Header from "../../layout/header/header";
import Login from "./Login";
import Footer from "../../layout/footer/footer";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>PrintSquare | Professional Printing Services</title>
        <meta
          name="description"
          content="Explore premium printing and binding services at PrintSquare."
        />
      </Head>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Login />

       {/* Header */}
      <Footer />
    </>
  );
}
