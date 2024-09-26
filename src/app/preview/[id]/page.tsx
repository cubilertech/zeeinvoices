"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import PdfView from "@/appPages/PdfView/pdfView";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useFetchSingleDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const PreviewPage = () => {
  const [total, setTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const {
    data: singleInvoice,
    refetch: refetchSingleInvoice,
    isFetching: refetchingSingleInvoice,
  } = useFetchSingleDocument(`${backendURL}/invoices/${id}`);

  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);

  useEffect(() => {
    const totalAmount = calculateAmount(invoiceDetail.invoiceItem);
    const totalTax = calculateTax(invoiceDetail.invoiceItem);
    setTotal(totalAmount);
    setTaxAmount(totalTax);
  }, [invoiceDetail.invoiceItem]);

  const summaryDetail = {
    total: total,
    taxAmount: taxAmount,
  };

  useEffect(() => {
    refetchSingleInvoice();
    if (singleInvoice) {
      dispatch(
        setFullInvoice({
          id: singleInvoice?.id,
          logo: singleInvoice?.image,
          invoiceType: singleInvoice?.type,
          from: singleInvoice?.from,
          to: singleInvoice?.to,
          invoiceDate: singleInvoice?.invoiceDate,
          dueDate: singleInvoice?.dueDate,
          addtionalNotes: singleInvoice?.notes,
          invoiceItem: singleInvoice?.items,
        })
      );
      dispatch(
        setInvoiceSettings({
          color: singleInvoice?.settings?.color,
          currency: singleInvoice?.settings?.currency,
          dueDate: singleInvoice?.settings?.dueDate,
          tax: singleInvoice?.settings?.tax,
          detail: singleInvoice?.settings?.detail,
        })
      );
    }
  }, [refetchSingleInvoice,singleInvoice,dispatch]);

  console.log(invoiceDetail,'invoiceDetail',singleInvoice);

  return (
    <>
    {singleInvoice && (
      <PDFViewer
        style={{ width: "100%", height: "76vh", marginTop: "50px" }}
        showToolbar={false}
      >
        <PdfView
          invDetails={{ ...invoiceDetail }}
          invSetting={{ ...invoiceSetting }}
          Summary={summaryDetail}
          user={session?.user}
        />
      </PDFViewer>
    )}
    {!singleInvoice && <p>Loading...</p>}
  </>
  );
};

export default PreviewPage;
