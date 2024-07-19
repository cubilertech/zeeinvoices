"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import { PdfView } from "@/Pages/PdfView";
import { getInvoiceItem } from "@/redux/features/invoiceSlice";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdfPreview = () => {
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
    <PDFViewer style={{ width: "100%", height: "76vh", marginTop: "50px" }}>
      <PdfView
        invDetails={invoiceDetail}
        invSetting={invoiceSetting}
        Summary={summaryDetail}
      />
    </PDFViewer>
  );
};

export default PdfPreview;
