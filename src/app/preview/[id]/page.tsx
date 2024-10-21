"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import PdfView from "@/appPages/PdfView/pdfView";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useFetchSingleDocument } from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

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
  // const [total, setTotal] = useState(0);
  // const [taxAmount, setTaxAmount] = useState(0);
  // const { id } = useParams<{ id: string }>();
  // const { data: session } = useSession();
  // const dispatch = useDispatch();

  // const {
  //   data: singleInvoice,
  //   refetch: refetchSingleInvoice,
  //   isFetching: refetchingSingleInvoice,
  // } = useFetchSingleDocument(`${backendURL}/invoices/${id}`);

  // const invoiceDetail = useSelector((state: any) => state.invoice);
  // const invoiceSetting = useSelector((state: any) => state.invoiceSetting);

  // useEffect(() => {
  //   const totalAmount = calculateAmount(invoiceDetail.invoiceItem);
  //   const totalTax = calculateTax(invoiceDetail.invoiceItem);
  //   setTotal(totalAmount);
  //   setTaxAmount(totalTax);
  // }, [invoiceDetail.invoiceItem]);

  // const summaryDetail = {
  //   total: total,
  //   taxAmount: taxAmount,
  // };

  // useEffect(() => {
  //   refetchSingleInvoice();
  //   if (singleInvoice?.id) {
  //     dispatch(
  //       setFullInvoice({
  //         id: singleInvoice?.id,
  //         logo: singleInvoice?.image,
  //         invoiceType: singleInvoice?.type,
  //         from: {
  //           ...singleInvoice?.fromDetails,
  //           phoneNumber: singleInvoice?.fromDetails?.phone_number,
  //           companyName: singleInvoice?.fromDetails?.company_name,
  //         },
  //         to: {
  //           ...singleInvoice?.toDetails,
  //           phoneNumber: singleInvoice?.toDetails?.phone_number,
  //           companyName: singleInvoice?.toDetails?.company_name,
  //         },
  //         invoiceDate: singleInvoice?.invoiceDate,
  //         dueDate: singleInvoice?.dueDate,
  //         addtionalNotes: singleInvoice?.notes,
  //         invoiceItem: singleInvoice?.items,
  //       })
  //     );
  //     dispatch(
  //       setInvoiceSettings({
  //         color: singleInvoice?.settings?.color,
  //         currency: singleInvoice?.settings?.currency,
  //         dueDate: singleInvoice?.settings?.dueDate,
  //         tax: singleInvoice?.settings?.tax,
  //         terms: singleInvoice?.settings?.terms,
  //         detail: singleInvoice?.settings?.detail,
  //       })
  //     );
  //   }
  // }, [refetchSingleInvoice, singleInvoice?.id, singleInvoice, dispatch]);

  // const invoiceDetailsPDF = {
  //   id: singleInvoice?.id,
  //   logo: singleInvoice?.image,
  //   invoiceType: singleInvoice?.type,
  //   from: {
  //     ...singleInvoice?.fromDetails,
  //     phoneNumber: singleInvoice?.fromDetails?.phone_number,
  //     companyName: singleInvoice?.fromDetails?.company_name,
  //   },
  //   to: {
  //     ...singleInvoice?.toDetails,
  //     phoneNumber: singleInvoice?.toDetails?.phone_number,
  //     companyName: singleInvoice?.toDetails?.company_name,
  //   },
  //   invoiceDate: singleInvoice?.invoiceDate,
  //   dueDate: singleInvoice?.dueDate,
  //   addtionalNotes: singleInvoice?.notes,
  //   invoiceItem: singleInvoice?.items,
  // };

  // const invoiceSettingsPDF = {
  //   color: singleInvoice?.settings?.color,
  //   currency: singleInvoice?.settings?.currency,
  //   dueDate: singleInvoice?.settings?.dueDate,
  //   tax: singleInvoice?.settings?.tax,
  //   detail: singleInvoice?.settings?.detail,
  // };

  const isMobile = useMediaQuery("(max-width: 600px)");
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const typeParam = params.get("type");

  const componentRef = useRef();
  const dispatch = useDispatch();
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSettings = useSelector((state: any) => state.invoiceSetting);
  const [shareModal, setShareModal] = useState(false);
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
    isFetching: refetchingSingleInvoice,
    isFetched,
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
          dueDate: singleInvoice?.settings?.dueDate,
          tax: singleInvoice?.settings?.tax,
          terms: singleInvoice?.settings?.terms,
          detail: singleInvoice?.settings?.detail,
        })
      );
    }
  }, [refetchSingleInvoice, singleInvoice?.id, singleInvoice, dispatch]);

  return (
    <>
      {singleInvoice &&
        // <PDFViewer
        //   style={{ width: "100%", height: "76vh", marginTop: "50px" }}
        //   showToolbar={false}
        // >
        //   <PdfView
        //     invDetails={{ ...invoiceDetail }}
        //     invSetting={{ ...invoiceSetting }}
        //     Summary={summaryDetail}
        //     user={session?.user}
        //   />
        // </PDFViewer>

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
