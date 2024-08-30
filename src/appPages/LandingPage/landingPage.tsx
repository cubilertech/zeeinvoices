"use client";
import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Herosection } from "./HeroSection";
import { HelpBusinessSection } from "./HelpBusinessSection";
import { FeaturesSection } from "./FeaturesSection";
import { BusinessesSection } from "./BusinessesSection";
import { TimePaymentSection } from "./TimePaymentSection";
import { FAQsSection } from "./FAQsSection";
import { ContectSection } from "./ContectSection";
import { FooterSection } from "./FooterSection";
import { CustomersSection } from "./CustomersSection";

const LandingPage = () => {
  return (
    <Box>
      <Herosection />
      <FeaturesSection />
      <HelpBusinessSection />
      <BusinessesSection />
      <TimePaymentSection />
      <FAQsSection />
      <CustomersSection />
      <ContectSection />
      <FooterSection />
    </Box>
  );
};
export default LandingPage;
