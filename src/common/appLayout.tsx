"use client";
import { FooterSection } from "@/appPages/SecondLandingPage/FooterSection";
import { Header } from "@/components/Header";
import { Box, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isModile = useMediaQuery("(max-width: 500px)");
  return (
    <>
      {pathname.startsWith("/preview") ? <></> : <Header />}

      <Box sx={{ backgroundColor: "white", minHeight: "200px" }}>
        {children}
      </Box>
      {pathname == "/" ||
      pathname == "/contact-us" ||
      pathname.startsWith("/preview") ? (
        <></>
      ) : isModile ? (
        <FooterSection />
      ) : (
        <FooterSection />
      )}
    </>
  );
};

export default AppLayout;
