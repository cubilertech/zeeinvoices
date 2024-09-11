"use client";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { backendURL } from "@/utils/constants";
import {
  useCreateDocument,
  useEditDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { useDispatch } from "react-redux";
import { setInvoiceId, setResetInvoice } from "@/redux/features/invoiceSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SaveModal from "../SaveModal/saveModal";
import { base64ToFile, handleLogin } from "@/utils/common";
import DownloadModal from "../DownloadModal/downloadModal";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { palette } from "@/theme/palette";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";

interface InvoiceHeaderProps {
  InvSetting: any;
  InvDetails: any;
  summaryDetail: any;
  type: string;
}
const InvoiceHeader: FC<InvoiceHeaderProps> = ({
  InvSetting,
  InvDetails,
  summaryDetail,
  type,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const validateButton =
    InvDetails.from?.name !== "" &&
    InvDetails.to?.name !== "" &&
    InvDetails?.invoiceType !== "";
  const [loginModel, setLoginModel] = useState(false);
  const [downloadModel, setDownloadModel] = useState(false);
  const {
    data: record,
    refetch: refetchRecord,
    isFetching: getFetching,
  } = useFetchSingleDocument(`${backendURL}/invoices/last-record`);
  useEffect(() => {
    if (type === "add") {
      refetchRecord();
      if (record) {
        dispatch(setInvoiceId(record));
      }
    }
  }, [record, refetchRecord, dispatch, type]);

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
      id: InvDetails.id,
      logo: InvDetails.logo,
      type: InvDetails.invoiceType,
      from: InvDetails.from,
      to: InvDetails.to,
      invoiceDate: InvDetails.invoiceDate,
      dueDate: InvDetails.dueDate,
      items: InvDetails.invoiceItem,
      settings: InvSetting,
      notes: InvDetails.addtionalNotes,
    };
  }, [InvDetails, InvSetting]);
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
    formData.append("type", invoiceData.type);
    formData.append("invoiceDate", invoiceData.invoiceDate);
    formData.append("dueDate", invoiceData.dueDate);
    formData.append("notes", invoiceData.notes);
    formData.append("from", JSON.stringify(invoiceData.from));
    formData.append("to", JSON.stringify(invoiceData.to));
    formData.append("settings", JSON.stringify(invoiceData.settings));
    formData.append("items", JSON.stringify(invoiceData.items));
    updateInvoice({
      data: formData,
      apiRoute: `${backendURL}/invoices/${invoiceData.id}`,
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
  // Create Invoice
  const handleCreateInvoice = async () => {
    if (!session) {
      setLoginModel(true);
    } else {
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
      // Convert objects to JSON strings and append
      // formData.append("from", "");
      // formData.append("to", "");
      // formData.append("newFrom", JSON.stringify(invoiceData.from));
      // formData.append("newTo", JSON.stringify(invoiceData.to));
      formData.append("from", JSON.stringify(invoiceData.from));
      formData.append("to", JSON.stringify(invoiceData.to));
      formData.append("settings", JSON.stringify(invoiceData.settings));
      formData.append("items", JSON.stringify(invoiceData.items));
      createInvoice({ data: formData, apiRoute: `${backendURL}/invoices/save` })
        .then((res) => {
          router.push("/invoices");
          dispatch(setResetInvoice());
          dispatch(setResetInvoiceSetting());
        })
        .catch((err) => {
          console.log(err, "err1");
          throw new Error("An error occurred");
        });
    }
  };
  // Login Model
  const handleLoginModel = () => {
    setLoginModel(false);
    handleLogin("/create-new-invoice");
  };
  // Edit Back Button
  const handleBack = () => {
    router.push("/invoices");
    setTimeout(() => {
      dispatch(setResetInvoiceSetting());
      dispatch(setResetInvoice());
    }, 500);
  };

  const generatePDFDocument = async () => {
    const itemDetail = InvDetails?.invoiceItem;
    const doc = (
      <PdfView
        invSetting={{ ...InvSetting }}
        invDetails={{ ...InvDetails }}
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

  console.log(InvSetting, InvDetails, summaryDetail, "data");

  return (
    <Stack
      // direction={"row"}
      justifyContent={"space-between"}
      sx={{
        marginTop: "5%",
        flexDirection: { sm: "row", xs: "column" },
        alignItems: "start",
      }}
    >
      <Stack
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {type === "add" ? (
          ""
        ) : (
          <IconButton
            sx={{ padding: 1, marginRight: "10px" }}
            onClick={handleBack}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <Typography variant="display-xs-medium">
          Invoice: {InvDetails.id > 0 ? InvDetails.id : ""}
        </Typography>
      </Stack>
      <Stack
        justifyContent={"space-between"}
        spacing={2}
        sx={{
          flexDirection: { sm: "row", xs: "column-reverse" },
          gap: { sm: 0, xs: 2 },
          width: { sm: "auto", xs: "100%" },
        }}
      >
        <Button
          sx={{
            height: "36px",
            width: { sm: "73px", xs: "100%" },
            borderRadius: "4px",
            p: "0px !important",
            border: `1px solid ${palette.border.outlinedBtnBorderColor}`,
          }}
          variant="outlined"
          disabled={!validateButton}
          onClick={type === "add" ? handleCreateInvoice : handleUpdateInvoice}
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
            // <PdfDownloadLink
            //   InvSetting={InvSetting}
            //   InvDetails={InvDetails}
            //   summaryDetail={summaryDetail}
            // >
            //   <Tooltip title="Download PDF" placement="bottom">
            //     <Button
            //       variant="contained"
            //       sx={{
            //         height: "36px !important",
            //         borderRadius: "4px",
            //         py: "0px !important",
            //       }}
            //     >
            //       Download PDF
            //     </Button>
            //   </Tooltip>
            // </PdfDownloadLink>
            <Box sx={{ width: { sm: "73px", xs: "100%" } }}>
              <Button
                variant="contained"
                sx={{
                  height: "36px !important",
                  borderRadius: "4px",
                  py: "0px !important",
                }}
                onClick={() => generatePDFDocument()}
              >
                Download
              </Button>
            </Box>
          ) : (
            <Tooltip title="Download PDF" placement="bottom">
              <Button
                onClick={() => setDownloadModel(true)}
                variant="contained"
                sx={{
                  height: "36px !important",
                  borderRadius: "4px",
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
              width: { sm: "138px", xs: "100%" },
              borderRadius: "4px",
              py: "0px !important",
              height: "36px !important",  
            }}
          >
            Download PDF
          </Button>
        )}
      </Stack>
      <SaveModal
        open={loginModel}
        onSave={handleLoginModel}
        onClose={() => setLoginModel(false)}
      />
      <DownloadModal
        onLogin={handleLoginModel}
        onClose={() => setDownloadModel(false)}
        open={downloadModel}
        InvSetting={InvSetting}
        InvDetails={InvDetails}
        summaryDetail={summaryDetail}
      />
    </Stack>
  );
};

export default InvoiceHeader;
