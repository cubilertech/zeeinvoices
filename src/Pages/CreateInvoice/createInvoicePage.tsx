"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import { InvoiceHeader } from "@/components/InvoiceHeader";
import { InvoiceSection } from "@/components/InvoiceSection";
import { InvoiceSettings } from "@/components/InvoiceSettings";
import {
  getColor,
  getCurrency,
  getDetails,
  getDueDate,
  getTax,
} from "@/redux/features/invoiceSetting";
import {
  getAddtionalNotes,
  getInvoiceDate,
  getInvoiceItem,
  getInvoiceLogo,
  getInvoiceType,
  getRecipientDetail,
  getSenderDetail,
  getDueDate as date,
} from "@/redux/features/invoiceSlice";
import { Box, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CreateInvoice = () => {
  const allInvoiceItems = useSelector(getInvoiceItem);
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  const [total, setTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  useEffect(() => {
    const totalAmount = calculateAmount(allInvoiceItems);
    const totalTax = calculateTax(allInvoiceItems);
    setTotal(totalAmount);
    setTaxAmount(totalTax);
  }, [allInvoiceItems]);
  const summaryDetail = {
    total: total,
    taxAmount: taxAmount,
  };
  return (
    <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
      <Box sx={{ py: 4 }}>
        <InvoiceHeader
          invoiceName="001"
          InvSetting={invoiceSetting}
          InvDetails={invoiceDetail}
          summaryDetail={summaryDetail}
        />
      </Box>
      <Stack direction={"row"} gap={3}>
        <InvoiceSection />
        <InvoiceSettings />
      </Stack>
    </Container>
  );
};
export default CreateInvoice;
