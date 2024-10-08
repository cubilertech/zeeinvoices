"use client";
import ClientSingleDetail from "@/components/AllClients/ClientSingleDetail";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const ClientSingleView = () => {
  const { id } = useParams();
  return (
    <Container sx={{ minHeight: { xl: "90vh", lg: "84vh" }, px: { md: "0.1%", lg: "0.1%", xs: "0%" } }}>
      <ClientSingleDetail id={id} />
    </Container>
  );
};

export default ClientSingleView;
