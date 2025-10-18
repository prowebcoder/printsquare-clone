"use client";
import Head from "next/head";
import Header from "../../layout/header/header";
import SignUp from "./SignUp ";
import Footer from "../../layout/footer/footer";

export default function SignupPage() {
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
      <SignUp />

       {/* Header */}
      <Footer />
    </>
  );
}
