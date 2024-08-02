'use client';
import PdfView from "@/appPages/PdfView/pdfView";
import { calculateAmount, calculateTax } from "@/common/common";
import { getInvoiceItem } from "@/redux/features/invoiceSlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdfPreview = () => {
  const { data: session } = useSession();
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
    <PdfView
      invDetails={{...invoiceDetail}}
      invSetting={{...invoiceSetting}}
      Summary={summaryDetail}
      user={session?.user}
    />
  );
};

export default PdfPreview;
