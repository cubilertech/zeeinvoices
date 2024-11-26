"use client";
import { FooterSection } from "@/appPages/SecondLandingPage/FooterSection";
import { Header } from "@/components/Header";
import { Box, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isModile = useMediaQuery("(max-width: 500px)");
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const handleBeforeUnload = () => {  // redux initial state if browser close but it also clear the redux if save invoice without login
  //     dispatch(setResetInvoiceSetting());
  //     dispatch(setResetInvoice());
  //     dispatch(setResetSelectedList());
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <>
      {pathname.startsWith("/preview") ? <></> : <Header />}

      <Box
        sx={{
          backgroundColor: "white",
          minHeight: "200px",
          position: "relative",
        }}
      >
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
