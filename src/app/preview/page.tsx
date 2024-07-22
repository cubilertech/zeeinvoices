"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import PdfView from "@/appPages/PdfView/pdfView";
import { getInvoiceItem } from "@/redux/features/invoiceSlice";
// import { PDFViewer, Text } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const Preview = () => {
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
    <PDFViewer
      style={{ width: "100%", height: "76vh", marginTop: "50px" }}
      showToolbar={false}
    >
      <PdfView
        invDetails={invoiceDetail}
        invSetting={invoiceSetting}
        Summary={summaryDetail}
      />
    </PDFViewer>
  );
};

export default Preview;
