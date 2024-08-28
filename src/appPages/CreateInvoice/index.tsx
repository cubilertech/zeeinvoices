"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import { InvoiceHeader } from "@/components/InvoiceHeader";
import { InvoiceSection } from "@/components/InvoiceSection";
import { InvoiceSettings } from "@/components/InvoiceSettings";
import {
  getInvoiceItem,
  getDueDate as date,
} from "@/redux/features/invoiceSlice";
import { Box, Container, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface CreateInvoiceProps {
  type: string;
}
const CreateInvoice: FC<CreateInvoiceProps> = ({ type }) => {
  const allInvoiceItems = useSelector(getInvoiceItem);
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  // Get Total Amount And Tax
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
      <Box sx={{ pt: 3, pb: 2 }}>
        <InvoiceHeader
          InvSetting={{ ...invoiceSetting }}
          InvDetails={{ ...invoiceDetail }}
          summaryDetail={summaryDetail}
          type={type}
        />
      </Box>
      <Stack direction={"row"} gap={3}>
        <InvoiceSection
          InvDetails={invoiceDetail}
          type={type}
          InvSetting={{ ...invoiceSetting }}
        />
        <InvoiceSettings InvSetting={{ ...invoiceSetting }} />
      </Stack>
    </Container>
  );
};
export default CreateInvoice;
