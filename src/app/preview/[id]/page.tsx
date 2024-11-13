"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import PdfView from "@/appPages/PdfView/pdfView";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useFetchSingleDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { Box, CircularProgress } from "@mui/material";

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

const PreviewPage = () => {
 
  const { data: session } = useSession();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const invoiceDetail = useSelector((state: any) => state.invoice);
  //Total And Tax
  const [total, setTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
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
  const {
    data: singleInvoice,
    refetch: refetchSingleInvoice,
  } = useFetchSingleDocument(`${backendURL}/invoices/${id}`);

  const invoiceDetailsPDF = {
    id: singleInvoice?.id,
    logo: singleInvoice?.image,
    invoiceType: singleInvoice?.type,
    from: {
      ...singleInvoice?.fromDetails,
      phoneNumber: singleInvoice?.fromDetails?.phone_number,
      companyName: singleInvoice?.fromDetails?.company_name,
    },
    to: {
      ...singleInvoice?.toDetails,
      phoneNumber: singleInvoice?.toDetails?.phone_number,
      companyName: singleInvoice?.toDetails?.company_name,
    },
    invoiceDate: singleInvoice?.invoiceDate,
    dueDate: singleInvoice?.dueDate,
    addtionalNotes: singleInvoice?.notes,
    invoiceItem: singleInvoice?.items,
  };

  const invoiceSettingsPDF = {
    color: singleInvoice?.settings?.color,
    currency: singleInvoice?.settings?.currency,
    dueDate: singleInvoice?.settings?.dueDate,
    tax: singleInvoice?.settings?.tax,
    detail: singleInvoice?.settings?.detail,
  };

  useEffect(() => {
    refetchSingleInvoice();
    if (singleInvoice?.id) {
      dispatch(
        setFullInvoice({
          id: singleInvoice?.id,
          logo: singleInvoice?.image,
          invoiceType: singleInvoice?.type,
          from: {
            ...singleInvoice?.fromDetails,
            phoneNumber: singleInvoice?.fromDetails?.phone_number,
            companyName: singleInvoice?.fromDetails?.company_name,
          },
          to: {
            ...singleInvoice?.toDetails,
            phoneNumber: singleInvoice?.toDetails?.phone_number,
            companyName: singleInvoice?.toDetails?.company_name,
          },
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
          watermarkText: singleInvoice?.settings?.watermarkText,
          dueDate: singleInvoice?.settings?.dueDate,
          discount: singleInvoice?.settings?.discount,
          tax: singleInvoice?.settings?.tax,
          terms: singleInvoice?.settings?.terms,
          watermark: singleInvoice?.settings?.watermark,
          detail: singleInvoice?.settings?.detail,
        })
      );
    }
  }, [refetchSingleInvoice, singleInvoice?.id, singleInvoice, dispatch]);

  return (
    <>
      {singleInvoice &&  
        (invoiceDetailsPDF.id &&
        invoiceSettingsPDF.color &&
        singleInvoice &&
        singleInvoice.lenght !== 0 ? (
          <PDFViewer
            style={{
              width: "100%",
              height: "100vh",
              borderRadius: "4px",
              backgroundColor: "#EAECF0",
            }}
          >
            <PdfView
              invDetails={{ ...invoiceDetailsPDF }}
              invSetting={{ ...invoiceSettingsPDF }}
              Summary={summaryDetail}
              user={session?.user}
            />
          </PDFViewer>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "90vh",
            }}
          >
            <CircularProgress />
          </Box>
        ))}
      {!singleInvoice && <p>Loading...</p>}
    </>
  );
};

export default PreviewPage;
