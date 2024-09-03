"use client";
import PdfView from "@/appPages/PdfView/pdfView";
import { calculateAmount, calculateTax } from "@/common/common";
import { getInvoiceItem } from "@/redux/features/invoiceSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface PdfDownloadLinkProps {
  InvSetting: any;
  InvDetails: any;
  summaryDetail: any;
  children: any;
}

const PdfDownloadLink: FC<PdfDownloadLinkProps> = ({
  InvSetting,
  InvDetails,
  summaryDetail,
  children,
}) => {
  const allInvoiceItems = useSelector(getInvoiceItem);
  const invoiceDetail = useSelector((state: any) => state.invoice);
  console.log(invoiceDetail, ">>> Invoice Details <<<");
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
  const invSummaryDetail = {
    total: total,
    taxAmount: taxAmount,
  };
  const itemDetail = invoiceDetail?.invoiceItem;
  const { data: session } = useSession();
  return (
    <>
      <PDFDownloadLink
        document={
          <PdfView
            invSetting={{ ...invoiceSetting }}
            invDetails={{ ...invoiceDetail }}
            Summary={invSummaryDetail}
            user={session?.user}
            itemDetail={itemDetail}
          />
        }
        fileName="ZeeInvoices"
      >
        {({ loading }) => (loading ? <button>Loading ...</button> : children)}
      </PDFDownloadLink>
    </>
  );
};

export default PdfDownloadLink;
