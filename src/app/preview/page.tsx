"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import PdfView from "@/appPages/PdfView/pdfView";
import { getInvoiceItem } from "@/redux/features/invoiceSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Box, IconButton, Typography } from "@mui/material";
import { palette } from "@/theme/palette";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "90vh",
          fontSize: 20,
          borderRadius: "4px",
        }}
      >
        Loading...
      </Box>
    ),
  }
);

const Preview = () => {
  const { data: session } = useSession();
  const allInvoiceItems = useSelector(getInvoiceItem);
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  const [total, setTotal] = useState(0);
  const router = useRouter();
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
  const handleBack = () => {
    router.back();
  };
  return (
    <Box sx={{ marginTop: "66px", px: {sm:"80px",xs: "16px"}, py: {sm:"40px",xs: "16px"} }}>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          mb: "24px",
          color: palette.color.gray[610],
          alignItems: "center"
        }}
      >
        <IconButton
          sx={{ p: 0, borderRadius: "4px", width: "32px !important", height: "32px !important" }}
          onClick={handleBack}
        >
          <ArrowBackIosNew  sx={{width: "20px", height: "20px"}}/>
        </IconButton>
        <Typography variant="display-xs-semibold">Preview Invoice</Typography>
      </Box>

      <PDFViewer
        style={{
          width: "100%",
          height: "90vh",
          borderRadius: "4px",
          backgroundColor: "#EAECF0",
          // paddingTop: "56px",
          // paddingBottom: "56px"
        }}
        showToolbar={false}
      >
        <PdfView
          invDetails={{ ...invoiceDetail }}
          invSetting={{ ...invoiceSetting }}
          Summary={summaryDetail}
          user={session?.user}
        />
      </PDFViewer>
    </Box>
  );
};

export default Preview;
