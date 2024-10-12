"use client";
import { calculateAmount, calculateTax } from "@/common/common";
import PdfView from "@/appPages/PdfView/pdfView";
import {
  getInvoiceItem,
  setInvoiceId,
  setResetInvoice,
} from "@/redux/features/invoiceSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { palette } from "@/theme/palette";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { base64ToFile, handleLogin } from "@/utils/common";
import { backendURL } from "@/utils/constants";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { useCreateDocument, useEditDocument } from "@/utils/ApiHooks/common";
import {
  getInvoiceTypeError,
  getRecipientDetailsError,
  getSenderDetailsError,
} from "@/redux/features/validationSlice";
import { saveAs } from "file-saver";
import { setResetSelectedList } from "@/redux/features/listSelected";
import { toast } from "react-toastify";
import { pdf } from "@react-pdf/renderer";
import DownloadModal from "@/components/DownloadModal/downloadModal";
import SaveModal from "@/components/SaveModal/saveModal";

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
  let type = "add";
  // const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const allInvoiceItems = useSelector(getInvoiceItem);
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  const isInvoiceTypeError = useSelector(getInvoiceTypeError);
  const isSenderError = useSelector(getSenderDetailsError);
  const isRecipientError = useSelector(getRecipientDetailsError);
  const validateButton =
    invoiceDetail.from?.name !== "" &&
    invoiceDetail.to?.name !== "" &&
    invoiceDetail?.invoiceType !== "";

  const [total, setTotal] = useState(0);
  const router = useRouter();
  const [taxAmount, setTaxAmount] = useState(0);
  const [loginModel, setLoginModel] = useState(false);
  const [downloadModel, setDownloadModel] = useState(false);

  const {
    mutateAsync: createInvoice,
    isLoading: createInvoiceLoading,
    isSuccess: createInvoiceSuccess,
  } = useCreateDocument();

  const {
    mutateAsync: updateInvoice,
    isLoading: updatLoading,
    isSuccess: updateSuccess,
  } = useEditDocument();

  const invoiceData = useMemo(() => {
    return {
      id: invoiceDetail.id,
      logo: invoiceDetail.logo,
      type: invoiceDetail.invoiceType,
      from: invoiceDetail.from,
      to: invoiceDetail.to,
      invoiceDate: invoiceDetail.invoiceDate,
      dueDate: invoiceDetail.dueDate,
      items: invoiceDetail.invoiceItem,
      settings: invoiceSetting,
      notes: invoiceDetail.addtionalNotes,
    };
  }, [invoiceDetail, invoiceSetting]);

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
  //Update Invoice
  const handleUpdateInvoice = async () => {
    const formData = new FormData();
    if (invoiceData.logo) {
      try {
        // const blob = await fetchBlobData(invoiceData.logo);
        // const file = new File([blob], "filename.jpg", { type: blob.type });
        const imageFile = base64ToFile(invoiceData.logo, "uploaded_image.png");
        formData.append("image", imageFile);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    } else {
      formData.append("image", "no-image");
    }
    formData.append("id", invoiceData.id);
    formData.append("type", invoiceData.type);
    formData.append("invoiceDate", invoiceData.invoiceDate);
    formData.append("dueDate", invoiceData.dueDate);
    formData.append("notes", invoiceData.notes);

    // Map the `from` object to the expected API format
    const fromMapped = {
      name: invoiceData.from.name,
      company_name: invoiceData.from.companyName,
      email: invoiceData.from.email,
      phone_number: invoiceData.from.phoneNumber || "", // Assuming null or undefined should be an empty string
      city: invoiceData.from.city,
      state: invoiceData.from.state,
      address: invoiceData.from.address,
      countryCode: invoiceData.from.countryCode || "", // Add if countryCode is used
    };

    // Map the `to` object to the expected API format similarly
    const toMapped = {
      name: invoiceData.to.name,
      company_name: invoiceData.to.companyName,
      email: invoiceData.to.email,
      phone_number: invoiceData.to.phoneNumber || "", // Assuming null or undefined should be an empty string
      city: invoiceData.to.city,
      state: invoiceData.to.state,
      address: invoiceData.to.address,
      countryCode: invoiceData.to.countryCode || "", // Add if countryCode is used
    };

    // formData.append("from", JSON.stringify(invoiceData.from));
    // formData.append("to", JSON.stringify(invoiceData.to));

    formData.append("newFrom", JSON.stringify(fromMapped));
    formData.append("newTo", JSON.stringify(toMapped));

    formData.append("settings", JSON.stringify(invoiceData.settings));
    formData.append("items", JSON.stringify(invoiceData.items));
    updateInvoice({
      data: formData,
      apiRoute: `${backendURL}/invoices/${invoiceDetail.id}`,
    })
      .then((res) => {
        router.push("/invoices");
        dispatch(setResetInvoice());
        dispatch(setResetInvoiceSetting());
      })
      .catch((err) => {
        throw new Error(`${err.response?.data?.message}`);
      });
  };
  const handleCreateInvoice = async () => {
    if (!session) {
      setLoginModel(true);
    } else if (!isInvoiceTypeError && !isSenderError && !isRecipientError) {
      dispatch(setResetSelectedList());

      const formData = new FormData();
      if (invoiceData.logo) {
        const imageFile = base64ToFile(invoiceData.logo, "uploaded_image.png");
        formData.append("image", imageFile);
      }
      formData.append("id", invoiceData.id);
      formData.append("type", invoiceData.type);
      formData.append("invoiceDate", invoiceData.invoiceDate);
      formData.append("dueDate", invoiceData.dueDate);
      formData.append("notes", invoiceData.notes);

      // Map the `from` object to the expected API format
      const fromMapped = {
        name: invoiceData.from.name,
        company_name: invoiceData.from.companyName,
        email: invoiceData.from.email,
        phone_number: invoiceData.from.phoneNumber || "", // Assuming null or undefined should be an empty string
        city: invoiceData.from.city,
        state: invoiceData.from.state,
        address: invoiceData.from.address,
        countryCode: invoiceData.from.countryCode || "", // Add if countryCode is used
      };

      // Map the `to` object to the expected API format similarly
      const toMapped = {
        name: invoiceData.to.name,
        company_name: invoiceData.to.companyName,
        email: invoiceData.to.email,
        phone_number: invoiceData.to.phoneNumber || "", // Assuming null or undefined should be an empty string
        city: invoiceData.to.city,
        state: invoiceData.to.state,
        address: invoiceData.to.address,
        countryCode: invoiceData.to.countryCode || "", // Add if countryCode is used
      };

      // Convert objects to JSON strings and append

      formData.append("newFrom", JSON.stringify(fromMapped));
      formData.append("newTo", JSON.stringify(toMapped));

      formData.append("settings", JSON.stringify(invoiceData.settings));
      formData.append("items", JSON.stringify(invoiceData.items));

      createInvoice({ data: formData, apiRoute: `${backendURL}/invoices/save` })
        .then((res) => {
          router.push("/invoices");
          dispatch(setResetInvoice());
          dispatch(setResetInvoiceSetting());
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const generatePDFDocument = async () => {
    const itemDetail = invoiceDetail?.invoiceItem;
    const doc = (
      <PdfView
        invSetting={{ ...invoiceSetting }}
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

  const handleLoginModel = () => {
    setLoginModel(false);
    handleLogin("/create-new-invoice");
  };

  const handleBack = () => {
    router.push("/create-new-invoice");
  };
  useEffect(() => {
    if (type === "add") {
      dispatch(setInvoiceId(invoiceDetail.id));
    }
  }, [invoiceDetail.id, dispatch, type]);
  return (
    <Box
      sx={{
        marginTop: "66px",
        px: { sm: "80px", xs: "16px" },
        py: { sm: "40px", xs: "16px" },
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            mb: "24px",
            color: palette.color.gray[610],
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              p: 0,
              borderRadius: "4px",
              width: "32px !important",
              height: "32px !important",
            }}
            onClick={handleBack}
          >
            <ArrowBackIosNew sx={{ width: "20px", height: "20px" }} />
          </IconButton>
          <Typography variant="display-xs-semibold">Preview Invoice</Typography>
        </Box>
        <Stack
          justifyContent={"space-between"}
          // spacing={2}
          sx={{
            display: { sm: "flex", xs: "none" },
            flexDirection: { sm: "row", xs: "column-reverse" },
            gap: 2,
            width: { sm: "auto", xs: "100%" },

            mt: { xs: 3, sm: 0 },
          }}
        >
          <Button
            sx={{
              height: "44px",
              borderRadius: "4px",
              fontSize: "16px",
              width: { sm: "73px", xs: "100%" },
              fontWeight: "bold !important",
              p: "0px !important",
              border: `1px solid ${palette.border.outlinedBtnBorderColor}`,
              // mt: 2
            }}
            variant="outlined"
            // disabled={!validateButton || isEditInvoiceId}
            onClick={
              // isEditInvoiceId
              //   ? handleShowAlert()
              //   :
              type === "add" ? handleCreateInvoice : handleUpdateInvoice
            }
          >
            {createInvoiceLoading || updatLoading ? (
              <CircularProgress size={24} sx={{ color: "#8477DA" }} />
            ) : type === "add" ? (
              "Save"
            ) : (
              "Update"
            )}
          </Button>

          {validateButton ? (
            session ? (
              <Box sx={{ width: { sm: "auto", xs: "100%" }, m: 0 }}>
                <Button
                  variant="contained"
                  sx={{
                    height: "44px",
                    borderRadius: "4px",
                    fontWeight: "bold !important",
                    fontSize: "16px",
                    py: "0px !important",
                    width: "100%",
                    fontFamily: "Product Sans, sans-serif !important",

                    // background:
                    //   "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                    backgroundColor: palette.primary.main,
                  }}
                  onClick={() => generatePDFDocument()}
                >
                  Download PDF
                </Button>
              </Box>
            ) : (
              <Tooltip title="Download PDF" placement="bottom">
                <Button
                  onClick={() => setDownloadModel(true)}
                  variant="contained"
                  sx={{
                    height: "44px",
                    borderRadius: "4px",
                    fontWeight: "bold !important",
                    fontSize: "16px",

                    py: "0px !important",
                  }}
                >
                  Download PDF
                </Button>
              </Tooltip>
            )
          ) : (
            <Button
              variant="contained"
              disabled={true}
              sx={{
                width: { xs: "100%" },
                height: "44px",
                borderRadius: "4px",
                fontWeight: "bold !important",
                fontSize: "16px",
                py: "0px !important",
              }}
            >
              Download PDF
            </Button>
          )}
        </Stack>
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
      <SaveModal
        open={loginModel}
        onSave={handleLoginModel}
        onClose={() => setLoginModel(false)}
      />
      <DownloadModal
        onLogin={handleLoginModel}
        onClose={() => setDownloadModel(false)}
        open={downloadModel}
        InvSetting={invoiceSetting}
        InvDetails={invoiceDetail}
        summaryDetail={summaryDetail}
      />
    </Box>
  );
};

export default Preview;
