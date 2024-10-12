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
import InvoiceDetailsActions from "@/components/InvoiceDetailsActions/invoiceDetailsActions";
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
import ReactToPrint from "react-to-print";
import ShareModal from "@/components/ShareModal/shareModal";
import "@/Styles/sectionStyle.css";
import { pdf } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";
import { useSession } from "next-auth/react";
import { saveAs } from "file-saver";
import DeleteModal from "@/components/DeleteModal/deleteModal";
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
  const {
    data: singleInvoice,
    refetch: refetchSingleInvoice,
    isFetching: refetchingSingleInvoice,
  } = useFetchSingleDocument(`${backendURL}/invoices/${id}`);

  useEffect(() => {
    refetchSingleInvoice();
    if (singleInvoice) {
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
          detail: singleInvoice?.settings?.detail,
        })
      );
    }
  }, [refetchSingleInvoice, singleInvoice, dispatch]);
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
    router.push(`/invoices/${singleInvoice?._id}/edit`);
  };

  const {
    mutateAsync: deleteInvoice,
    isLoading: deleteInvoiceLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();

  // Back Handle
  console.log(singleInvoice, "singleInvoice");
  const handleBack = () => {
    // router.back();
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
            sx={{ padding: 0, marginRight: "10px" }}
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
            Sr.No:
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
                    // width: "100%",
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
                    "&:hover": {},
                  }}
                >
                  Delete
                </Button>
              </Tooltip>
              <Button
                onClick={handleEditInvoice}
                variant="outlined"
                sx={{
                  // width: "100%",
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
                  // width: "100%",
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
                  // background:
                  //   "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  backgroundColor: palette.primary.main,
                }}
                onClick={() => generatePDFDocument()}
              >
                Download PDF
              </Button>
            </>
          )}

          {/* <IconButton sx={{ padding: 1 }} onClick={() => setShareModal(true)}>
            <Icon icon="sendSqaureIcon" width={20} height={20} />
          </IconButton> */}
          <Box>
            <Box style={{ display: "none" }}>
              <Box ref={componentRef}>
                <InvoiceDetailsSection
                  singleInvoice={{ ...invoiceDetail }}
                  invoiceSetting={{ ...invoiceSettings }}
                />
              </Box>
            </Box>
            {/* <ReactToPrint
              trigger={() => (
                <IconButton sx={{ padding: 1 }} onClick={() => window.print()}>
                  <Icon icon="printIconIcon" width={20} height={20} />
                </IconButton>
              )}
              content={() =>
                componentRef.current ? componentRef.current : null
              }
            /> */}
          </Box>
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={3} sx={{ mb: 5 }}>
        {/* <InvoiceDetailsSection
          singleInvoice={{ ...invoiceDetail }}
          invoiceSetting={{ ...invoiceSettings }}
        /> */}
        {singleInvoice && singleInvoice.lenght !== 0 ? (
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
              invSetting={{ ...invoiceSettings }}
              Summary={summaryDetail}
              user={session?.user}
            />
          </PDFViewer>
        ) : (
          <CircularProgress
            sx={{
              width: "100%",
              height: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}

        {/* <InvoiceDetailsActions
          InvSetting={{ ...invoiceSettings }}
          InvDetails={{ ...invoiceDetail }}
          summaryDetail={summaryDetail}
        /> */}
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
