import { ChooseZeeInvoiceSection } from "@/appPages/About/ChooseZeeInvoiceSection";
import { GetInTouchSection } from "@/appPages/About/GetInTouchSection";
import { HeroSection } from "@/appPages/About/HeroSection";
import { JoinUsSection } from "@/appPages/About/JoinUsSection";
import { OurMissionSection } from "@/appPages/About/OurMissionSection";
import { WeOfferSection } from "@/appPages/About/WeOfferSection";
import { palette } from "@/theme/palette";
import { Box } from "@mui/material";
import Head from "next/head";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>ZeeInvoices; your AI-powered invoicing partner</title>
        <meta
          name="description"
          content="Discover how ZeeInvoices empowers businesses with AI-powered invoicing tool and customizable invoice builder."
        />
      </Head>
      <Box
        sx={{
          mt: 8,
          px: { sm: "0px", xs: "20px" },
          backgroundColor: palette.base.white,
        }}
      >
        <HeroSection />
        <OurMissionSection />
        <WeOfferSection />
        <ChooseZeeInvoiceSection />
        <JoinUsSection />
        <GetInTouchSection />
      </Box>
    </>
  );
};

export default AboutPage;
