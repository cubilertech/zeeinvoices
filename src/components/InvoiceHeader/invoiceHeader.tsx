"use client";
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { backendURL, senderEmailTemplate } from "@/utils/constants";
import {
  useCreateDocument,
  useEditDocument,
  useFetchAllDocument,
} from "@/utils/ApiHooks/common";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceId,
  setResetInvoice,
  setResetInvoiceId,
} from "@/redux/features/invoiceSlice";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { base64ToFile, handleLogin } from "@/utils/common";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { palette } from "@/theme/palette";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PdfView from "@/appPages/PdfView/pdfView";
import {
  DoneOutlined,
  SaveAlt,
  SettingsOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { TextField } from "../TextField";
import { setResetSelectedList } from "@/redux/features/listSelected";
import { toast } from "react-toastify";
import {
  getInvoiceTypeError,
  getRecipientDetailsError,
  getSenderDetailsError,
  setInvoiceRowItemValidation,
  setInvoiceTypeError,
  setInvoiceWatermark,
  setRecipientDetailsError,
  setSenderDetailsError,
} from "@/redux/features/validationSlice";
import { Icon } from "../Icon";
import SaveModal from "../Modals/SaveModal/saveModal";
import DownloadModal from "../Modals/DownloadModal/downloadModal";
import { title } from "process";
import { PdfToast } from "../PdfToast";

interface InvoiceHeaderProps {
  InvSetting: any;
  InvDetails: any;
  summaryDetail: any;
  type: string;
  handleColorPickerClick: (event: any) => void;
}
const InvoiceHeader: FC<InvoiceHeaderProps> = ({
  InvSetting,
  InvDetails,
  summaryDetail,
  type,
  handleColorPickerClick,
}) => {
  const { id } = useParams<{ id: string }>();
  const [invIdNoSession, setInvIdNoSession] = useState("001");
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPdfToastOpen, setIsPdfToastOpen] = useState(false);
  const isInvoiceTypeError = useSelector(getInvoiceTypeError);
  const isSenderError = useSelector(getSenderDetailsError);
  const isRecipientError = useSelector(getRecipientDetailsError);
  const apiPathInvoiceId = `${backendURL}/invoices/last-record`;
  const pdfFileName = InvDetails.to?.companyName
    ? InvDetails.to?.companyName + "-" + InvDetails.id
    : InvDetails.to?.name + "-" + InvDetails.id;
  const {
    data: generatedInvoiceId,
    refetch: refetchInvoiceId,
    isFetching: isFetchingInvoiceId,
    isFetched: isIdFetched,
  } = useFetchAllDocument(apiPathInvoiceId);
  const { data: session } = useSession();
  const validateButton =
    InvDetails.from?.name !== "" &&
    InvDetails.to?.name !== "" &&
    InvDetails?.invoiceType !== "" &&
    !InvDetails?.invoiceItem.some(
      (item: any) =>
        !item.name ||
        item.rate == 0 ||
        item.rate === "" ||
        item.quantity == 0 ||
        item.quantity === ""
    );
  const {mutateAsync : sendReceipentEmail,isSuccess} = useCreateDocument(false,false)
  const [loginModel, setLoginModel] = useState(false);
  const [downloadModel, setDownloadModel] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [InvoiceId, UpdateInvoiceId] = useState(InvDetails.id);
  const [isValidInvoice, setIsValidInvoice] = useState(true);
  const [isEditInvoiceId, setIsEditInvoiceId] = useState(false);

  const {
    mutateAsync: createInvoice,
    isLoading: createInvoiceLoading,
    isSuccess: createInvoiceSuccess,
  } = useCreateDocument();

  const {
    mutateAsync: sendPromotionalEmail,
    isLoading: sendPromotionalEmailLoading,
    isSuccess: sendPromotionalEmailSuccess,
  } = useCreateDocument();

  const {
    mutateAsync: updateInvoice,
    isLoading: updateLoading,
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
      signatureImage: InvDetails.signature?.image,
      signatureDesignation: InvDetails.signature?.designation,
      settings: InvSetting,
      notes: InvDetails.addtionalNotes,
    };
  }, [InvDetails, InvSetting, InvoiceId]);
  //Update Invoice
  const handleUpdateInvoice = async () => {
    if (isEditInvoiceId === true) {
      setErrorMessage(true);
    } else if (
      InvDetails?.invoiceType === "" ||
      InvDetails.from?.name === "" ||
      InvDetails.to?.name === "" ||
      InvDetails.invoiceItem.some(
        (item: any) =>
          !item.name ||
          item.name.length > 40 ||
          item.name.length < 3 ||
          item.rate == 0 ||
          item.rate === "" ||
          item.quantity == 0 ||
          item.quantity === ""
      ) ||
      (InvSetting.watermarkText.length < 3 && InvSetting.watermark) ||
      InvSetting.watermarkText.length > 20
    ) {
      // Dispatch relevant error actions for invoiceType, sender, and recipient

      if (InvDetails?.invoiceType === "") {
        await dispatch(setInvoiceTypeError(true));
      }
      if (InvDetails.from?.name === "") {
        await dispatch(setSenderDetailsError(true));
      }
      if (InvDetails.to?.name === "") {
        await dispatch(setRecipientDetailsError(true));
      }
      if (
        InvSetting?.watermarkText === "" ||
        InvSetting?.watermarkText.length < 3 ||
        InvSetting?.watermarkText.length > 20
      ) {
        await dispatch(setInvoiceWatermark(true));
      }

      // Invoice item validation
      if (InvDetails.invoiceItem) {
        let itemsValidation: any[] | null = [];

        InvDetails.invoiceItem.forEach((item: any) => {
          let validationObj: any = {
            id: item.id.toString(),
            name: {},
            quantity: {},
            rate: {},
          };

          if (!item.name) {
            validationObj.name = { isError: true, message: "Name is required" };
          } else if (item.name.length < 3 || item.name.length > 40) {
            validationObj.name = {
              isError: true,
              message: "Item name must be 3 to 40 characters",
            };
          } else {
            validationObj.name = { isError: false, message: "" };
          }

          if (item.quantity == 0 || item.quantity === "") {
            validationObj.quantity = {
              isError: true,
              message: "Required",
            };
          } else {
            validationObj.quantity = { isError: false, message: "" };
          }

          if (item.rate == 0 || item.rate === "") {
            validationObj.rate = { isError: true, message: "Required" };
          } else {
            validationObj.rate = { isError: false, message: "" };
          }

          // Only push validationObj if any error exists
          if (
            validationObj.name.isError ||
            validationObj.quantity.isError ||
            validationObj.rate.isError
          ) {
            itemsValidation?.push(validationObj);
          }
        });

        // If no errors, set validation to null
        if (itemsValidation.length === 0) {
          itemsValidation = null;
        }

        await dispatch(setInvoiceRowItemValidation(itemsValidation));
      }
    } else {
      const formData = new FormData();
      if (invoiceData.logo) {
        try {
          const imageFile = base64ToFile(
            invoiceData.logo,
            "uploaded_image.png"
          );
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

      // formData.append("from", invoiceData.from._id);
      // formData.append("to", invoiceData.to._id);
      formData.append("from", JSON.stringify(fromMapped));
      formData.append("to", JSON.stringify(toMapped));

      formData.append("settings", JSON.stringify(invoiceData.settings));
      formData.append("items", JSON.stringify(invoiceData.items));

      if (invoiceData.signatureImage) {
        try {
          const imageFile = base64ToFile(
            invoiceData.signatureImage,
            "uploaded_image.png"
          );
          formData.append("signatureImage", imageFile);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      } else {
        formData.append("signatureImage", "no-image");
      }

      const signature = {
        image: invoiceData.signatureImage,
        designation: invoiceData.signatureDesignation,
      };
      formData.append("signature", JSON.stringify(signature));

      updateInvoice({
        data: formData,
        apiRoute: `${backendURL}/invoices/${id}`,
        title: "Invoice Updated",
      })
        .then((res) => {
          // response here
        })
        .catch((err) => {
          throw new Error(`${err.response?.data?.message}`);
        });
    }
  };
  // Create Invoice
  const handleCreateInvoice = async () => {
    if (isEditInvoiceId === true) {
      setErrorMessage(true);
    } else if (
      InvDetails?.invoiceType === "" ||
      InvDetails.from?.name === "" ||
      InvDetails.to?.name === "" ||
      InvDetails.invoiceItem.some(
        (item: any) =>
          !item.name ||
          item.name.length > 40 ||
          item.name.length < 3 ||
          item.rate == 0 ||
          item.rate === "" ||
          item.quantity == 0 ||
          item.quantity === ""
      ) ||
      (InvSetting.watermarkText.length < 3 && InvSetting.watermark) ||
      InvSetting.watermarkText.length > 20
    ) {
      // Dispatch relevant error actions for invoiceType, sender, and recipient
      if (InvDetails?.invoiceType === "") {
        await dispatch(setInvoiceTypeError(true));
      }
      if (InvDetails.from?.name === "") {
        await dispatch(setSenderDetailsError(true));
      }
      if (InvDetails.to?.name === "") {
        await dispatch(setRecipientDetailsError(true));
      }
      if (
        InvSetting?.watermarkText === "" ||
        InvSetting?.watermarkText.length < 3 ||
        InvSetting?.watermarkText.length > 20
      ) {
        await dispatch(setInvoiceWatermark(true));
      }

      // Invoice item validation
      if (InvDetails.invoiceItem) {
        let itemsValidation: any[] | null = [];

        InvDetails.invoiceItem.forEach((item: any) => {
          let validationObj: any = {
            id: item.id.toString(),
            name: {},
            quantity: {},
            rate: {},
          };

          if (!item.name) {
            validationObj.name = { isError: true, message: "Name is required" };
          } else if (item.name.length < 3 || item.name.length > 40) {
            validationObj.name = {
              isError: true,
              message: "Item name must be 3 to 40 characters",
            };
          } else {
            validationObj.name = { isError: false, message: "" };
          }

          if (item.quantity == 0 || item.quantity === "") {
            validationObj.quantity = {
              isError: true,
              message: "Required",
            };
          } else {
            validationObj.quantity = { isError: false, message: "" };
          }

          if (item.rate == 0 || item.rate === "") {
            validationObj.rate = { isError: true, message: "Required" };
          } else {
            validationObj.rate = { isError: false, message: "" };
          }

          // Only push validationObj if any error exists
          if (
            validationObj.name.isError ||
            validationObj.quantity.isError ||
            validationObj.rate.isError
          ) {
            itemsValidation?.push(validationObj);
          }
        });

        // If no errors, set validation to null
        if (itemsValidation.length === 0) {
          itemsValidation = null;
        }

        await dispatch(setInvoiceRowItemValidation(itemsValidation));
      }
    } else if (!session) {
      setLoginModel(true);
    } else if (!isInvoiceTypeError && !isSenderError && !isRecipientError) {
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

      formData.append("from", JSON.stringify(fromMapped));
      formData.append("to", JSON.stringify(toMapped));

      formData.append("settings", JSON.stringify(invoiceData.settings));
      formData.append("items", JSON.stringify(invoiceData.items));

      if (invoiceData.signatureImage) {
        const imageFile = base64ToFile(
          invoiceData.signatureImage,
          "uploaded_image.png"
        );
        formData.append("signatureImage", imageFile);
      }

      formData.append("designation", invoiceData.signatureDesignation);

      createInvoice({
        data: formData,
        apiRoute: `${backendURL}/invoices/save`,
        title: "Invoice Created",
      })
        .then((res) => {
          router.push("/invoices");
          dispatch(setResetInvoice());
          dispatch(setResetInvoiceSetting());
          dispatch(setResetSelectedList());
          dispatch(setResetInvoiceId());
        })
        .catch((err) => {
          if (err) {
            toast.error(err.message);
          }
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
    router.back();
  };

  const handleInvIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (session?.accessToken) {
      UpdateInvoiceId(e.target.value);
    } else {
      setInvIdNoSession(e.target.value);
      UpdateInvoiceId(e.target.value);
    }
    dispatch(setInvoiceId(e.target.value));
  };

  const generatePDFDocument = async () => {
    if (await validateInvoice()) {
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
      const apiUrl = `${backendURL}/clients/send-promotional-email`

      // Convert PDF Blob to Base64
      const reader = new FileReader();
      reader.readAsDataURL(result);
      reader.onloadend = async () => {
        if (reader.result && typeof reader.result === "string") {
          const pdfBase64 = reader.result.split(",")[1]; // Get Base64 part

          // Extract MIME type from the Blob
          const mimeType = result.type; // `result` is the PDF Blob
          const extension = mimeType.split("/")[1] || "pdf"; // Fallback to 'pdf' if not found

          fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: "Your Invoice Has Been Created",
              toEmail: InvDetails?.from?.email, // Replace with the sender's email
              html: senderEmailTemplate,
              fileAttachment: [
                {
                  filename: `${pdfFileName}.${extension}`, // Use dynamically extracted extension
                  content: pdfBase64,
                  encoding: "base64",
                },
              ],
            }),
          })
            .then((response) => {
              if (response.status === 200) {
                console.log('Email sent successfully!')
                // toast.success("Email sent successfully!");
              } else {
                console.log('Failed to send email!')
                // alert("Failed to send email.");
              }
            })
            .catch(() => {
              alert("An error occurred while sending the email.");
            });
          // Send Email to Recipent
           const data = {
            name:InvDetails?.to?.name,
            email:InvDetails?.to?.email
           }
           await sendReceipentEmail({data,apiRoute:apiUrl})
        } else {
          console.error("Error: FileReader result is null or not a string");
        }
      };

      saveAs(result, pdfFileName);

      setIsPdfToastOpen(true);
      setTimeout(() => {
        setIsPdfToastOpen(false);
      }, 3000);
    }
  };
console.log(InvDetails,'asasasaa')
  const PDFPreview = async () => {
    if (await validateInvoice()) {
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

      // Generate the PDF as a blob
      const blobPdf = await pdf(doc);
      blobPdf.updateContainer(doc);
      const result = await blobPdf.toBlob();

      // Create a blob URL from the generated PDF blob
      const blobUrl = URL.createObjectURL(result);

      // Open the blob URL in a new tab
      window.open(blobUrl, "_blank");
    }
  };

  useEffect(() => {
    if (session?.accessToken && type == "add") {
      refetchInvoiceId();
    }
  }, [session?.accessToken, refetchInvoiceId, type]);

  useEffect(() => {
    if (session?.accessToken && generatedInvoiceId?.length) {
      if (type !== "edit") {
        UpdateInvoiceId(generatedInvoiceId);
        dispatch(setInvoiceId(generatedInvoiceId));
      }
    }
  }, [generatedInvoiceId, session?.accessToken, dispatch, type]);

  useEffect(() => {
    if (!isEditInvoiceId) {
      setErrorMessage(false);
    }
  }, [isEditInvoiceId]);

  const isLowerCase = [...InvoiceId].some(
    (char) => char !== char.toUpperCase()
  );

  const validateInvoice = async () => {
    if (
      InvDetails?.invoiceType === "" ||
      InvDetails.from?.name === "" ||
      InvDetails.to?.name === "" ||
      InvDetails.invoiceItem.some(
        (item: any) =>
          !item.name ||
          item.name.length > 40 ||
          item.name.length < 3 ||
          item.rate == 0 ||
          item.rate === "" ||
          item.quantity == 0 ||
          item.quantity === ""
      ) ||
      (InvSetting.watermarkText.length < 3 && InvSetting.watermark) ||
      InvSetting.watermarkText.length > 20
    ) {
      setIsValidInvoice(false);
      // Dispatch relevant error actions for invoiceType, sender, and recipient
      if (InvDetails?.invoiceType === "") {
        await dispatch(setInvoiceTypeError(true));
      }
      if (InvDetails.from?.name === "") {
        await dispatch(setSenderDetailsError(true));
      }
      if (InvDetails.to?.name === "") {
        await dispatch(setRecipientDetailsError(true));
      }
      if (
        InvSetting?.watermarkText === "" ||
        InvSetting?.watermarkText.length < 3 ||
        InvSetting?.watermarkText.length > 20
      ) {
        await dispatch(setInvoiceWatermark(true));
      }

      // Invoice item validation
      if (InvDetails.invoiceItem) {
        let itemsValidation: any[] | null = [];

        InvDetails.invoiceItem.forEach((item: any) => {
          let validationObj: any = {
            id: item.id.toString(),
            name: {},
            quantity: {},
            rate: {},
          };

          if (!item.name) {
            validationObj.name = { isError: true, message: "Name is required" };
          } else if (item.name.length < 3 || item.name.length > 40) {
            validationObj.name = {
              isError: true,
              message: "Item name must be 3 to 40 characters",
            };
          } else {
            validationObj.name = { isError: false, message: "" };
          }

          if (item.quantity == 0 || item.quantity === "") {
            validationObj.quantity = {
              isError: true,
              message: "Required",
            };
          } else {
            validationObj.quantity = { isError: false, message: "" };
          }

          if (item.rate == 0 || item.rate === "") {
            validationObj.rate = { isError: true, message: "Required" };
          } else {
            validationObj.rate = { isError: false, message: "" };
          }

          // Only push validationObj if any error exists
          if (
            validationObj.name.isError ||
            validationObj.quantity.isError ||
            validationObj.rate.isError
          ) {
            itemsValidation?.push(validationObj);
          }
        });

        // If no errors, set validation to null
        if (itemsValidation.length === 0) {
          itemsValidation = null;
        }

        await dispatch(setInvoiceRowItemValidation(itemsValidation));
      }
      return false;
    } else {
      setIsValidInvoice(true);
      return true;
    }
  };

  const handlePdfToastClose = () => {
    setIsPdfToastOpen(false);
  };

  return (
    <Stack
      justifyContent={"space-between"}
      sx={{
        marginTop: "5%",
        flexDirection: { sm: "row", xs: "column" },
        alignItems: "start",
        p: { sm: "", xs: 0 },
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          justifyContent: { sm: "center", xs: "space-between" },
          alignItems: "center",
          width: { sm: "auto", xs: "100%" },
        }}
      >
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          {type === "add" ? (
            ""
          ) : (
            <IconButton
              sx={{
                p: "0px !important",
                marginRight: { sm: "10px", xs: "0px" },
                height: "32px !important",
                width: "32px !important",
              }}
              onClick={handleBack}
            >
              <ArrowBackIosNewIcon sx={{ width: "16px", height: "16px" }} />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              gap: { sm: 2, xs: 1 },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 0.6,
                alignItems: "center",
                position: "relative",
                mt: "3px",
                color: palette.color.gray[610],
              }}
            >
              <Typography
                variant="display-xs-semibold"
                sx={{
                  fontSize: { sm: "24px !important", xs: "20px !important" },
                  lineHeight: { sm: "30px !important", xs: "24px !important" },
                  fontWeight: { sm: 600, xs: 500 },
                }}
              >
                Sr. No:
              </Typography>{" "}
              {isFetchingInvoiceId ? (
                <Skeleton sx={{ width: "36px", height: "32px", m: 0 }} />
              ) : isEditInvoiceId ? (
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
                          fontSize: { sm: "24px", xs: "20px" },
                          color: palette.color.gray[610],
                          fontWeight: 400,
                        },
                        "& fieldset": {
                          border: "none",
                          borderRadius: 0,
                          padding: 0,
                        },
                        "&:hover fieldset": {
                          borderBottom: `1px solid ${palette.primary.main}`,
                        },
                        "&.Mui-focused fieldset": {
                          border: "none", // focused effect
                          borderBottom: `1px solid ${palette.primary.main}`,
                        },
                      },
                    }}
                    value={session?.accessToken ? InvoiceId : invIdNoSession}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      // Regular expression to allow only numbers and alphabets
                      const alphanumericRegex = /^[a-zA-Z0-9]*$/;

                      // Validate input and update state only if valid
                      if (alphanumericRegex.test(value)) {
                        handleInvIdChange(e); // or UpdateInvoiceId based on session state
                      }
                    }}
                    onKeyDown={(e: { key: string }) => {
                      if (e.key === "Enter") {
                        setIsEditInvoiceId(false);
                      }
                    }}
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
                      Sr. No can not be greater then 6 letters
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
                      Sr. No is Required
                    </Typography>
                  ) : // Check if any character in the string is lowercase
                  isLowerCase ? (
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
                      Sr. No can not contains lowercase letters
                    </Typography>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <Typography
                  variant="display-xs-semibold"
                  sx={{
                    fontSize: { sm: "24px !important", xs: "20px !important" },
                    lineHeight: {
                      sm: "30px !important",
                      xs: "24px !important",
                    },
                    fontWeight: { sm: 400, xs: 400 },
                  }}
                >
                  {session?.accessToken || !isIdFetched
                    ? InvoiceId
                    : invIdNoSession}
                </Typography>
              )}
            </Box>
            <Tooltip
              security="warning"
              title={"Please Submit"}
              placement="top"
              arrow
              open={errorMessage}
            >
              <IconButton
                disabled={InvoiceId.length > 6 || InvoiceId.length <= 0}
                onClick={() => {
                  if (!isLowerCase) setIsEditInvoiceId(!isEditInvoiceId);
                }}
                sx={{
                  borderRadius: "100%",
                  width: "30px !important",
                  height: "30px !important",
                  p: 0.5,
                  mt: "0px",
                }}
              >
                {isEditInvoiceId ? (
                  <DoneOutlined sx={{ width: "23px", height: "23px" }} />
                ) : (
                  <Icon icon="editInvoiceNumberIcon" width={23} height={23} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
        <Box
          sx={{
            width: "100px",
            display: { sm: "none", xs: "flex" },
            gap: 1,
            alignItems: "center",
          }}
        >
          <ButtonBase
            disabled={!validateButton}
            sx={{
              opacity: !validateButton ? 0.5 : 1,
            }}
            onClick={() => (type === "add" ? PDFPreview() : PDFPreview())}
          >
            <VisibilityOutlined sx={{ width: 19, height: 19 }} />
          </ButtonBase>

          <ButtonBase
            // disabled={!validateButton}
            // sx={{
            //   opacity: !validateButton ? 0.5 : 1,
            // }}
            disabled={createInvoiceLoading || updateLoading}
            onClick={type === "add" ? handleCreateInvoice : handleUpdateInvoice}
          >
            <Icon icon="pdfPriviewIcon" width={19} height={19} />
          </ButtonBase>
          {validateButton ? (
            session ? (
              <ButtonBase
                sx={{ p: "0px !important" }}
                onClick={() => generatePDFDocument()}
              >
                <SaveAlt sx={{ width: 19, height: 19 }} />
              </ButtonBase>
            ) : (
              <Tooltip title="Download PDF" placement="bottom">
                <ButtonBase
                  sx={{ p: "0px !important" }}
                  onClick={() => setDownloadModel(true)}
                >
                  <SaveAlt sx={{ width: 19, height: 19 }} />
                </ButtonBase>
              </Tooltip>
            )
          ) : (
            <ButtonBase disabled={true} sx={{ opacity: 0.5 }}>
              <SaveAlt sx={{ width: 19, height: 19 }} />
            </ButtonBase>
          )}

          <ButtonBase onClick={handleColorPickerClick}>
            <SettingsOutlined sx={{ width: 19, height: 19 }} />
          </ButtonBase>
        </Box>
      </Stack>
      <Stack
        justifyContent={"space-between"}
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
          disabled={createInvoiceLoading || updateLoading}
          onClick={type === "add" ? handleCreateInvoice : handleUpdateInvoice}
        >
          {createInvoiceLoading || updateLoading ? (
            <CircularProgress size={24} sx={{ color: "#8477DA" }} />
          ) : type === "add" ? (
            "Save"
          ) : (
            "Update"
          )}
        </Button>
        <Box>
          <Button
            disabled={!validateButton}
            variant="contained"
            sx={{
              color: palette.primary.main,
              background: "rgba(79, 53, 223, 0.2)",
              height: "44px",
              borderRadius: "4px",
              fontWeight: "bold !important",
              fontSize: "16px",
              ":hover": {
                color: palette.primary.main,
                backgroundColor: "rgba(79, 53, 223, 0.2)",
              },
            }}
            onClick={() => {
              PDFPreview();
            }}
          >
            Preview
          </Button>
        </Box>
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
                onClick={async () => {
                  if (await validateInvoice()) {
                    setDownloadModel(true);
                  }
                }}
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
      <PdfToast
        isOpen={isPdfToastOpen}
        progress={100}
        lable={pdfFileName}
        type="single"
        handleClose={handlePdfToastClose}
      />
    </Stack>
  );
};

export default InvoiceHeader;
