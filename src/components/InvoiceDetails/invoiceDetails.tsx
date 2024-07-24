"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import {
  getInvoiceItem,
  getDueDate as date,
} from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvoiceDetailsSection from "../InvoiceDetailsSection/invoiceDetailsSection";
import InvoiceDetailsActions from "../InvoiceDetailsActions/invoiceDetailsActions";
import { Icon } from "../Icon";

const InvoiceDetails = () => {
  //   const allInvoiceItems = useSelector(getInvoiceItem);
  //   const invoiceDetail = useSelector((state: any) => state.invoice);
  //   const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  //   const [total, setTotal] = useState(0);
  //   const [taxAmount, setTaxAmount] = useState(0);
  //   useEffect(() => {
  //     const totalAmount = calculateAmount(allInvoiceItems);
  //     const totalTax = calculateTax(allInvoiceItems);
  //     setTotal(totalAmount);
  //     setTaxAmount(totalTax);
  //   }, [allInvoiceItems]);
  //   const summaryDetail = {
  //     total: total,
  //     taxAmount: taxAmount,
  //   };
  return (
    <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ py: 3, marginTop: "50px" }}
      >
        <Stack direction={"row"} sx={{justifyContent:"center", alignItems:"center"}}>
          <Typography variant="display-xs-medium">Invoices/</Typography>
          <Typography
            variant="display-xs-medium"
            sx={{ color: palette.color.gray[770] }}
          >
            {" "}
            0016
          </Typography>
        </Stack>

        <Stack direction={"row"}>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="editIcon" width={20} height={20} />
          </IconButton>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="sendSqaureIcon" width={20} height={20} />
          </IconButton>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="printIconIcon" width={20} height={20} />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction={"row"} gap={3}>
        <InvoiceDetailsSection />
        <InvoiceDetailsActions />
      </Stack>
    </Container>
  );
};
export default InvoiceDetails;
