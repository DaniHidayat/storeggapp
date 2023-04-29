import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import AOS from "aos";
import Navbar from "../components/organisms/Navbar";
import MainBanner from "../components/organisms/MainBanner";
import TransactionStep from "../components/organisms/TransactionsStep";
import FeaturedGame from "../components/organisms/FeaturedGame";
import ReacHed from "../components/organisms/Reached";
import Story from "../components/organisms/Story";
import Footer from "../components/organisms/Footer";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Head>
        <title>Topup & Get a New Experience in Gaming</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu
                        players menjadi pemenang sejati"
        />
        <meta
          property="og:title"
          content="store gg Topup & Get a New
                    Experience in Gaming"
        />
        <meta
          property="og:description"
          content="Kami menyediakan jutaan cara untuk membantu
                        players menjadi pemenang sejati"
        />
         <meta
          property="og:image"
          content="https://"
        />
         <meta
          property="og:url"
          content="https://"
        />
      </Head>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <ReacHed />
      <Story />
      <Footer />
    </>
  );
}
