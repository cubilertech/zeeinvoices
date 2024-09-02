"use client";
import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Herosection } from "./HeroSection";
import { HelpSection } from "./HelpSection";
import { WorkflowSection } from "./WorkflowSection";
import { MadeSimpleSection } from "./MadeSimpleSection";
import { EveryBusinessSection } from "./EveryBusinessSection";
import { UsersSection } from "./UsersSection";
import { FAQsSection } from "./FAQsSection";
import { FooterSection } from "./FooterSection";

const SecondLandingPage = () => {
  return (
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
  );
};
export default SecondLandingPage;
