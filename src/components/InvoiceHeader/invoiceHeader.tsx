"use client";
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { backendURL } from "@/utils/constants";
import {
  useCreateDocument,
  useEditDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { useDispatch, useSelector } from "react-redux";
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
import {
  DoneOutlined,
  EditOutlined,
  KeyboardArrowDown,
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
  setRecipientDetailsError,
  setSenderDetailsError,
} from "@/redux/features/validationSlice";
import ReactToPrint from "react-to-print";
import InvoiceDetailsSection from "../InvoiceDetailsSection/invoiceDetailsSection";
import { Icon } from "../Icon";

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

  const dispatch = useDispatch();
  const router = useRouter();
  const componentRef = useRef();
  const showPreview =
    InvDetails.from?.name !== "" && InvDetails.to?.name !== "" ? false : true;

  const isInvoiceTypeError = useSelector(getInvoiceTypeError);
  const isSenderError = useSelector(getSenderDetailsError);
  const isRecipientError = useSelector(getRecipientDetailsError);

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

  const [loginModel, setLoginModel] = useState(false);
  const [downloadModel, setDownloadModel] = useState(false);
  const InvoiceRendomId = useMemo(
    () => Math.floor(Math.random() * 100) + 1,
    []
  );
  const [InvoiceId, UpdateInvoiceId] = useState(
    InvDetails.id ? InvDetails.id : `00${InvoiceRendomId}`
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
    if (
      InvDetails?.invoiceType === "" ||
      InvDetails.from?.name === "" ||
      InvDetails.to?.name === "" ||
      InvDetails.invoiceItem.some(
        (item: any) =>
          !item.name ||
          item.rate == 0 ||
          item.rate === "" ||
          item.quantity == 0 ||
          item.quantity === ""
      )
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
    }
  };
  // Create Invoice
  const handleCreateInvoice = async () => {
    if (
      InvDetails?.invoiceType === "" ||
      InvDetails.from?.name === "" ||
      InvDetails.to?.name === "" ||
      InvDetails.invoiceItem.some(
        (item: any) =>
          !item.name ||
          item.rate == 0 ||
          item.rate === "" ||
          item.quantity == 0 ||
          item.quantity === ""
      )
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
      console.log(InvDetails.from?.name, "insave", InvDetails.to?.name);

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
  // Login Model
  const handleLoginModel = () => {
    setLoginModel(false);
    handleLogin("/create-new-invoice");
  };
  // Edit Back Button
  const handleBack = () => {
    // router.back();
    router.push("/invoices");
    // setTimeout(() => {
    //   dispatch(setResetInvoiceSetting());
    //   dispatch(setResetInvoice());
    // }, 500);
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
      dispatch(setInvoiceId(InvoiceId));
    }
  }, [InvoiceId, dispatch, type]);

  return (
    <Stack
      // direction={"row"}
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
        <Box
          sx={{ display: "flex", gap: { sm: 2, xs: 1 }, alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 0.6,
              alignItems: "center",
              position: "relative",
              mt: "7px",
              color: palette.color.gray[610],
            }}
          >
            <Typography variant="display-xs-semibold">Sr.No:</Typography>{" "}
            {isEditInvoiceId ? (
              <>
                <TextField
                  autoFocus
                  sx={{
                    backgroundColor: "white",
                    width: "76px",
                    fontSize: "24px",
                    height: "32px",
                    "& .MuiOutlinedInput-root": {
                      "& input": {
                        padding: 0,
                        fontSize: "22px",
                        color: palette.color.gray[610],
                        fontWeight: 600,
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
                  value={InvoiceId}
                  onChange={(e) => UpdateInvoiceId(e.target.value)}
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
                variant="display-xs-semibold"
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
              mt: "7px",
            }}
          >
            {isEditInvoiceId ? (
              <DoneOutlined sx={{ width: "18px", height: "18px" }} />
            ) : (
              <Icon icon="editInvoiceNumberIcon" width={18} height={18} />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: { sm: "none", xs: "flex" },
            gap: 1,
            alignItems: "center",
          }}
        >
          <ButtonBase
            disabled={showPreview}
            sx={{
              opacity: showPreview ? 0.5 : 1,
            }}
            onClick={() => type === "add"  ? router.push("/preview"): router.push(`/invoices/${invoiceData.id}?type=edit`)}
          >
            <VisibilityOutlined sx={{ width: 19, height: 19 }} />
          </ButtonBase>

          {validateButton ? (
            session ? (
              <Box sx={{ width: { sm: "auto", xs: "100%" }, m: 0 }}>
                <ButtonBase onClick={() => generatePDFDocument()}>
                  <Icon icon="pdfPriviewIcon" width={15} height={15} />
                </ButtonBase>
              </Box>
            ) : (
              <Tooltip title="Download PDF" placement="bottom">
                <Button onClick={() => setDownloadModel(true)}>
                  <Icon icon="pdfPriviewIcon" width={15} height={15} />
                </Button>
              </Tooltip>
            )
          ) : (
            <ButtonBase disabled={true}>
              <Icon icon="pdfPriviewIcon" width={15} height={15} />
            </ButtonBase>
          )}
          <ButtonBase
            onClick={type === "add" ? handleCreateInvoice : handleUpdateInvoice}
          >
            <SaveAlt sx={{ width: 19, height: 19 }} />
          </ButtonBase>

          <ButtonBase onClick={handleColorPickerClick}>
            <SettingsOutlined sx={{ width: 19, height: 19 }} />
          </ButtonBase>
        </Box>
      </Stack>
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
            onClick={() => type === "add"  ? router.push("/preview"): router.push(`/invoices/${invoiceData.id}?type=edit`)}
          >
            Preview
          </Button>
          <Box>
            <Box style={{ display: "none" }}>
              <Box ref={componentRef}>
                <InvoiceDetailsSection
                  singleInvoice={{ ...InvDetails }}
                  invoiceSetting={{ ...InvSetting }}
                />
              </Box>
            </Box>
          </Box>
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
