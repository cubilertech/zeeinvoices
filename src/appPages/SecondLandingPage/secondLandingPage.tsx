"use client";
import React, { lazy, useRef } from "react";
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
