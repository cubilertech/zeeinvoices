"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { palette } from "@/theme/palette";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname, "current route");
  return (
    <>
      {/* // <Box sx={{ background: palette.color.lightWhite, height: "100%" }}> */}
      <Header />
      <Box sx={{backgroundColor:palette.color.lightWhite}}>{children}</Box>
      {pathname == "/" ||
      pathname == "/termsAndCondition" ||
      pathname == "/contact-us" ? (
        <></>
      ) : (
        <Footer />
      )}
      {/* </Box> */}
    </>
  );
};

export default AppLayout;
