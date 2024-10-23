"use client";
import React, { lazy, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Herosection } from "./HeroSection";
import { HelpSection } from "./HelpSection";
import { WorkflowSection } from "./WorkflowSection";
import { MadeSimpleSection } from "./MadeSimpleSection";
import { EveryBusinessSection } from "./EveryBusinessSection";
import { UsersSection } from "./UsersSection";
import { FAQsSection } from "./FAQsSection";
import { FooterSection } from "./FooterSection";
import Head from "next/head";

const SecondLandingPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <Head>
        <title>ZeeInvoices: Free AI-powered and custom invoice generator</title>
        <meta
          name="description"
          content="Create professional, personalized invoices effortlessly with ZeeInvoices, Free AI-powered Custom invoice generator. Perfect for businesses of all sizes, fast and easy."
        />
      </Head>
      <Box>
        <Herosection />
        <HelpSection />
        <WorkflowSection />
        <MadeSimpleSection />
        <EveryBusinessSection />
        <UsersSection />
        <FAQsSection />
        <FooterSection />
      </Box>
    </>
  );
};
export default SecondLandingPage;
