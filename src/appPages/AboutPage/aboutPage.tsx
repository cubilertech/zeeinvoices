import { ChooseZeeInvoiceSection } from "@/components/About/ChooseZeeInvoiceSection";
import { GetInTouchSection } from "@/components/About/GetInTouchSection";
import { HeroSection } from "@/components/About/HeroSection";
import { JoinUsSection } from "@/components/About/JoinUsSection";
import { OurMissionSection } from "@/components/About/OurMissionSection";
import { WeOfferSection } from "@/components/About/WeOfferSection";
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
