"use client";
import { FooterSection } from "@/appPages/SecondLandingPage/FooterSection";
// import { FooterSection } from "@/appPages/LandingPage/FooterSection";
import { Footer as DesktopFooter } from "@/components/Footer";
import { Header } from "@/components/Header";
import { palette } from "@/theme/palette";
import { Box, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isModile = useMediaQuery("(max-width: 500px)");
  console.log(pathname, "current route");
  return (
    <>
      {/* <Box sx={{ background: palette.color.lightWhite, height: "100vh" }}> */}
      <Header />
      {children}
      {pathname == "/" ||
      pathname == "/termsAndCondition" ||
      pathname == "/contact-us" ? (
        <></>
      ) : isModile ? (
        <FooterSection />
      ) : (
        <DesktopFooter />
      )}
      {/* </Box> */}
    </>
  );
};

export default AppLayout;
