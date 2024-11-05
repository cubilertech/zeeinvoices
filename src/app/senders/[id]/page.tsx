"use client";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";
import "@/Styles/sectionStyle.css";
import SenderSingleDetail from "@/components/AllSenders/SenderSingleDetail";

const SenderSingleView = () => {
  const { id } = useParams();
  return (
    <Container
      className="mainContainer"
      sx={{
        minHeight: { xl: "90vh", lg: "84vh" },
        px: { md: "0.1%", lg: "0.1%", xs: "0%" },
      }}
    >
      <SenderSingleDetail id={id} />
    </Container>
  );
};

export default SenderSingleView;
