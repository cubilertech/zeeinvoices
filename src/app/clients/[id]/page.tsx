"use client";
import ClientSingleDetail from "@/components/AllClients/ClientSingleDetail";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";
import "@/Styles/sectionStyle.css";

const ClientSingleView = () => {
  const { id } = useParams();
  return (
    <Container
      className="mainContainer"
      sx={{
        minHeight: { xl: "90vh", lg: "84vh" },
        px: { md: "0.1%", lg: "0.1%", xs: "0%" },
      }}
    >
      <ClientSingleDetail id={id} />
    </Container>
  );
};

export default ClientSingleView;
