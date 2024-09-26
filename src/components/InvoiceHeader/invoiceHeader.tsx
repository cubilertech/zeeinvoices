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
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SaveModal from "../SaveModal/saveModal";
import { base64ToFile, handleLogin } from "@/utils/common";
import DownloadModal from "../DownloadModal/downloadModal";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { palette } from "@/theme/palette";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";
import { DoneOutlined, EditOutlined } from "@mui/icons-material";
import { TextField } from "../TextField";
import { setResetSelectedList } from "@/redux/features/listSelected";

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
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  const validateButton =
    InvDetails.from?.name !== "" &&
    InvDetails.to?.name !== "" &&
    InvDetails?.invoiceType !== "";
  const [loginModel, setLoginModel] = useState(false);
  const [downloadModel, setDownloadModel] = useState(false);
  let InvoiceRendomId = Math.floor(Math.random() * 100) + 1;
  const [InvoiceId, UpdateInvoiceId] = useState(
    InvDetails.id
      ? InvDetails.id
      : (("ZT-" + InvoiceRendomId.toString()) as string)
  );
  const [isEditInvoiceId, setIsEditInvoiceId] = useState(false);

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
      id: InvoiceId,
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
  }, [InvDetails, InvSetting, InvoiceId]);
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
      apiRoute: `${backendURL}/invoices/${id}`,
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
    dispatch(setResetSelectedList());

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
      console.log(invoiceData, "invoiceData");
      console.log(formData, "formData");

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
  useEffect(() => {
    if (type === "add") {
      if (InvoiceRendomId) {
        dispatch(setInvoiceId(("ZT-" + InvoiceRendomId.toString()) as string));
      }
    }
  }, [InvoiceRendomId, dispatch, type]);

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
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              position: "relative",
            }}
          >
            <Typography variant="display-xs-medium">Invoice#</Typography>{" "}
            {isEditInvoiceId ? (
              <>
                <TextField
                  autoFocus
                  sx={{
                    backgroundColor: "white",
                    width: "76px",
                    fontSize: "24px",
                    "& .MuiOutlinedInput-root": {
                      "& input": {
                        padding: 0,
                        fontSize: "22px",
                      },
                      "& fieldset": {
                        border: "none",
                        borderRadius: 0,
                      },
                      "&:hover fieldset": {
                        borderBottom: "1px solid black",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none", // focused effect
                        borderBottom: "1px solid black",
                      },
                    },
                  }}
                  value={InvoiceId}
                  onChange={(e) => UpdateInvoiceId(e.target.value)}
                />
                {InvoiceId.length > 6 ? (
                  <Typography
                    sx={{
                      position: "absolute",
                      color: "red",
                      fontSize: "10px",
                      bottom: -13,
                      width: "220px",
                    }}
                  >
                    {" "}
                    Invoice Id can not be greater then 6 letters
                  </Typography>
                ) : InvoiceId.length <= 0 ? (
                  <Typography
                    sx={{
                      position: "absolute",
                      color: "red",
                      fontSize: "10px",
                      bottom: -13,
                      width: "220px",
                    }}
                  >
                    {" "}
                    Invoice Id is Required
                  </Typography>
                ) : (
                  ""
                )}
              </>
            ) : (
              <Typography
                variant="display-xs-medium"
                sx={{ height: "37px", lineHeight: "40px" }}
              >
                {InvoiceId}
              </Typography>
            )}
          </Box>

          <IconButton
            disabled={InvoiceId.length > 6 || InvoiceId.length <= 0}
            onClick={() => setIsEditInvoiceId(!isEditInvoiceId)}
            sx={{
              borderRadius: "100%",
              width: "28px !important",
              height: "28px !important",
              p: 0.5,
            }}
          >
            {isEditInvoiceId ? (
              <DoneOutlined sx={{ width: "18px", height: "18px" }} />
            ) : (
              <EditOutlined sx={{ width: "18px", height: "18px" }} />
            )}
          </IconButton>
        </Box>
      </Stack>
      <Stack
        justifyContent={"space-between"}
        // spacing={2}
        sx={{
          flexDirection: { sm: "row", xs: "column-reverse" },
          gap: 2,
          width: { sm: "auto", xs: "100%" },

          mt: { xs: 3, sm: 0 },
        }}
      >
        <Button
          sx={{
            height: "36px",
            width: { sm: "73px", xs: "100%" },
            borderRadius: "4px",
            p: "0px !important",
            border: `1px solid ${palette.border.outlinedBtnBorderColor}`,
            // mt: 2
          }}
          variant="outlined"
          disabled={!validateButton || isEditInvoiceId}
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
            <Box sx={{ width: { sm: "auto", xs: "100%" }, m: 0 }}>
              <Button
                variant="contained"
                sx={{
                  height: "36px !important",
                  borderRadius: "4px",
                  py: "0px !important",
                  width: "100%",
                  fontFamily: "Product Sans, sans-serif !important",
                  fontSize: "14px !important",
                  fontWeight: "400 !important",
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
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
