import { ChooseZeeInvoiceSection } from "@/appPages/About/ChooseZeeInvoiceSection";
import { GetInTouchSection } from "@/appPages/About/GetInTouchSection";
import { HeroSection } from "@/appPages/About/HeroSection";
import { JoinUsSection } from "@/appPages/About/JoinUsSection";
import { OurMissionSection } from "@/appPages/About/OurMissionSection";
import { WeOfferSection } from "@/appPages/About/WeOfferSection";
import { Box } from "@mui/material";

const AboutPage = () => {
  return (
    <>
      <Box sx={{ mt: 8 }}>
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
