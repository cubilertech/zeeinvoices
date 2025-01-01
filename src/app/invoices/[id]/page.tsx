"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { palette } from "@/theme/palette";
import { Icon } from "@/components/Icon";
import InvoiceDetailsSection from "@/components/InvoiceDetailsSection/invoiceDetailsSection";
import {
  useDeleteDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setFullInvoice, setResetInvoice } from "@/redux/features/invoiceSlice";
import {
  setInvoiceSettings,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import { calculateAmount, calculateTax } from "@/common/common";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShareModal from "@/components/Modals/ShareModal/shareModal";
import "@/Styles/sectionStyle.css";
import { pdf } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";
import { useSession } from "next-auth/react";
import { saveAs } from "file-saver";
import DeleteModal from "@/components/Modals/DeleteModal/deleteModal";
import dynamic from "next/dynamic";

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

const InvoiceDetail = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const route = useRouter();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const typeParam = params.get("type");

  const componentRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
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
  const { data: singleInvoice, refetch: refetchSingleInvoice } =
    useFetchSingleDocument(`${backendURL}/invoices/${id}`);

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
    signature: {
      image: singleInvoice?.signature?.image,
      designation: singleInvoice?.signature?.designation,
    },
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
          signature: {
            image: singleInvoice?.signature?.image,
            designation: singleInvoice?.signature?.designation,
          },
        })
      );
      dispatch(
        setInvoiceSettings({
          color: singleInvoice?.settings?.color,
          currency: singleInvoice?.settings?.currency,
          watermarkText: singleInvoice?.settings?.watermarkText,
          dueDate: singleInvoice?.settings?.dueDate,
          discount: singleInvoice?.settings?.discount,
          signature: singleInvoice?.settings?.signature,
          tax: singleInvoice?.settings?.tax,
          terms: singleInvoice?.settings?.terms,
          watermark: singleInvoice?.settings?.watermark,
          detail: singleInvoice?.settings?.detail,
        })
      );
    }
  }, [refetchSingleInvoice, singleInvoice?.id, singleInvoice, dispatch]);
  // Edit Invoice
  const handleEditInvoice = (record: any) => {
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
        signature: {
          image: singleInvoice?.signature?.image,
          designation: singleInvoice?.signature?.designation,
        },
      })
    );
    dispatch(
      setInvoiceSettings({
        colors: singleInvoice?.settings?.colors,
        color: singleInvoice?.settings?.color,
        currency: singleInvoice?.settings?.currency,
        watermarkText: singleInvoice?.settings?.watermarkText,
        dueDate: singleInvoice?.settings?.dueDate,
        signature: singleInvoice?.settings?.signature,
        discount: singleInvoice?.settings?.discount,
        tax: singleInvoice?.settings?.tax,
        terms: singleInvoice?.settings?.terms,
        watermark: singleInvoice?.settings?.watermark,
        detail: singleInvoice?.settings?.detail,
      })
    );
    router.push(`/invoices/${singleInvoice?._id}/edit`);
  };

  const { mutateAsync: deleteInvoice } = useDeleteDocument();

  // Back Handle
  const handleBack = () => {
    if (typeParam === "edit") {
      router.push(`/invoices/${singleInvoice?._id}/edit`);
    } else {
      router.push(`/invoices`);
      setTimeout(() => {
        dispatch(setResetInvoiceSetting());
        dispatch(setResetInvoice());
      }, 500);
    }
  };

  const handleOpenDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };

  const invoiceDelete = async () => {
    // @ts-ignore
      await deleteInvoice({
      apiRoute: `${backendURL}/invoices/${invoiceDetail.id}`,
    }).then((res) => {
      route.push("/invoices");
    });
  };

  const generatePDFDocument = async () => {
    const itemDetail = invoiceDetail?.invoiceItem;
    const doc = (
      <PdfView
        invSetting={{ ...invoiceSettings }}
        invDetails={{ ...invoiceDetail }}
        Summary={summaryDetail}
        user={session?.user}
        itemDetail={itemDetail}
      />
    );
    const blobPdf = await pdf(doc);
    blobPdf.updateContainer(doc);
    const result = await blobPdf.toBlob();
    saveAs(result, "ZeeInvoice");
  };

  return (
    <Container
      className="mainContainer"
      sx={{
        overflowY: "auto",
        height: "100%",
        px: { md: "0.1%", lg: "0.1%", xs: "0%" },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ pt: { sm: 5, xs: 2 }, pb: { sm: 3, xs: 2 }, marginTop: "65px" }}
      >
        <Stack
          direction={"row"}
          gap={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <IconButton
            sx={{ padding: 0, marginRight: { sm: "10px", xs: "0px" } }}
            onClick={handleBack}
          >
            <ArrowBackIosNewIcon sx={{ width: "16px", height: "16px" }} />
          </IconButton>
          <Typography
            variant="display-xs-medium"
            sx={{
              color: palette.color.gray[610],
              fontSize: {
                md: "24px !important",
                xs: "20px !important",
              },
              lineHeight: {
                md: "29px !important",
                xs: "24px !important",
              },
              fontWeight: { sm: "600 !important", xs: "500 !important" },
            }}
          >
            Sr. No:
          </Typography>
          <Typography
            variant="display-xs-medium"
            sx={{
              color: palette.color.gray[610],
              fontSize: {
                md: "24px !important",
                xs: "20px !important",
              },
              lineHeight: {
                md: "29px !important",
                xs: "24px !important",
              },
              fontWeight: { sm: "400 !important", xs: "400 !important" },
            }}
          >
            {invoiceDetail?.id}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          gap={{ sm: 2, xs: 0 }}
          sx={{ alignItems: "center" }}
        >
          {isMobile ? (
            <>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleOpenDeleteModal()}
              >
                <Icon icon="trashIcon" width={20} height={20} />
              </IconButton>
              <IconButton sx={{ padding: 0 }} onClick={handleEditInvoice}>
                <Icon icon="editIcon1" width={20} height={20} />
              </IconButton>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => generatePDFDocument()}
              >
                <Icon icon="downloadIcon" width={20} height={20} />
              </IconButton>
            </>
          ) : (
            <>
              <Tooltip title="Delete invoice">
                <Button
                  onClick={() => handleOpenDeleteModal()}
                  variant="outlined"
                  sx={{
                    borderRadius: "4px",
                    color: "#EF4444",
                    borderColor: "#EF4444",
                    px: "16px !important",
                    py: "10px !important",
                    fontSize: {
                      md: "16px !important",
                      xs: "16px !important",
                    },
                    lineHeight: {
                      md: "24px !important",
                      xs: "24px !important",
                    },
                    fontWeight: "700 !important",
                    "&:hover": {
                      color: "#EF4444",
                      borderColor: "#EF4444",
                    },
                  }}
                >
                  Delete
                </Button>
              </Tooltip>
              <Button
                onClick={handleEditInvoice}
                variant="outlined"
                sx={{
                  borderRadius: "4px",
                  color: palette.primary.main,
                  borderColor: "#CDD5DF",
                  px: "16px !important",
                  py: "10px !important",
                  fontSize: {
                    md: "16px !important",
                    xs: "16px !important",
                  },
                  lineHeight: {
                    md: "24px !important",
                    xs: "24px !important",
                  },
                  fontWeight: "700 !important",
                  "&:hover": {},
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                sx={{
                  px: "16px !important",
                  py: "10px !important",
                  fontSize: {
                    md: "16px !important",
                    xs: "16px !important",
                  },
                  lineHeight: {
                    md: "24px !important",
                    xs: "24px !important",
                  },
                  fontWeight: "700 !important",
                  borderRadius: "4px",
                  backgroundColor: palette.primary.main,
                }}
                onClick={() => generatePDFDocument()}
              >
                Download PDF
              </Button>
            </>
          )}
          <Box>
            <Box style={{ display: "none" }}>
              <Box ref={componentRef}>
                <InvoiceDetailsSection
                  singleInvoice={{ ...invoiceDetail }}
                  invoiceSetting={{ ...invoiceSettings }}
                />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={3} sx={{ mb: 5 }}>
        {!isMobile ? (
          invoiceDetailsPDF.id &&
          invoiceSettingsPDF.color &&
          singleInvoice &&
          singleInvoice.lenght !== 0 ? (
            <PDFViewer
              style={{
                width: "100%",
                height: "90vh",
                borderRadius: "4px",
                backgroundColor: "#EAECF0",
              }}
              showToolbar={false}
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
          )
        ) : (
          <>
            <Box
              sx={{
                height: "50vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                backgroundColor: palette.color.gray[5],
              }}
            >
              <Button
                variant="contained"
                onClick={() => generatePDFDocument()}
                sx={{
                  px: "16px !important",
                  py: "10px !important",
                  fontSize: {
                    md: "16px !important",
                    xs: "16px !important",
                  },
                  lineHeight: {
                    md: "24px !important",
                    xs: "24px !important",
                  },
                  fontWeight: "700 !important",
                  borderRadius: "4px",
                  backgroundColor: palette.primary.main,
                }}
              >
                Download PDF
              </Button>
            </Box>
          </>
        )}
      </Stack>

      <ShareModal
        open={shareModal}
        onShare={() => setShareModal(false)}
        onClose={() => setShareModal(false)}
        shareUrlId={invoiceDetail?.id}
      />
      <DeleteModal
        open={isModalOpen}
        onDelete={handleDelete}
        onClose={handleDeleteModalClose}
        invoiceDelete={invoiceDelete}
        title="invoice"
      />
    </Container>
  );
};

export default InvoiceDetail;
