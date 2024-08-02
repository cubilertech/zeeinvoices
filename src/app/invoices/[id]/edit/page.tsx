"use client";
import CreateInvoice from "@/appPages/CreateInvoice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const InvoiceEdit = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <CreateInvoice type="edit" />
    </>
  );
};

export default InvoiceEdit;
