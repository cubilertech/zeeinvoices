import { PrivacyPolicy } from "@/appPages/PrivacyPolicy";
import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "At Zeeinvoices, we are committed to provide AI powered invoice generator. We specialize in providing solutions and are passionate about delivering. Our team of dedicated professionals is here to provide industry standard solutions. Learn more about our journey, values, and what drives us forward",
};

export default function Privacy() {
  return (
    <Box sx={{ pt: { sm: 0, xs: 6 } }}>
      <PrivacyPolicy />
    </Box>
  );
}
