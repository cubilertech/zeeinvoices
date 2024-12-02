"use client";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, ChangeEvent, useRef, useEffect } from "react";
import { UploadLogo } from "../UploadLogo";
import { SelectInput } from "../SelectInput";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import { InvoiceDatePicker } from "../InvoiceDatePicker";
import { InvoiceItemsTable } from "../InvoiceItemsTable";
import { InvoiceSummary } from "../InvoiceSummary";
import { useDispatch, useSelector } from "react-redux";
import { isNearWhite, useSelectedColor } from "@/utils/common";
import {
  getAddtionalNotes,
  getInvoiceSignature,
  setAddtionalNotes,
  setRecipientDetail,
  setResetInvoice,
  setSenderDetail,
} from "@/redux/features/invoiceSlice";
import {
  getDueDate,
  getTerms,
  getWatermark,
  getWatermarkText,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import { useRouter } from "next/navigation";
import DetailSelecter from "../detailSelecter/detailSelecter";
import ReactToPrint from "react-to-print";
import InvoiceDetailsSection from "../InvoiceDetailsSection/invoiceDetailsSection";
import {
  getIsRecipientSelected,
  getIsSenderSelected,
} from "@/redux/features/listSelected";
import {
  getInvoiceTypeError,
  getRecipientDetailsError,
  getSenderDetailsError,
  setResetValidation,
} from "@/redux/features/validationSlice";
import { DisplaySignature } from "../DisplaySignature";

// for handle refresh button

const useHandleRefresh = (type: string) => {
  const dispatch = useDispatch();
  const handleRefresh = () => {
    localStorage.setItem("intentionalRefresh", "true");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleRefresh);

    const isIntentionalRefresh = localStorage.getItem("intentionalRefresh");
    const navigationEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    // const resetInvoice = localStorage.getItem("resetInvoice");

    if (navigationEntries.length > 0) {
      const navigationEntry = navigationEntries[0];
      const isPageReload = navigationEntry.type === "reload";
      if (
        // resetInvoice &&
        type === "add" &&
        isIntentionalRefresh &&
        isPageReload
      ) {
        dispatch(setResetInvoiceSetting());
        dispatch(setResetInvoice());
      }
    }

    localStorage.removeItem("intentionalRefresh");
    localStorage.removeItem("resetInvoice");

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, [dispatch, type]);
};

interface InvoiceSectionProps {
  InvDetails: any;
  type: any;
  InvSetting: any;
}
const InvoiceSection: FC<InvoiceSectionProps> = ({
  InvDetails,
  type,
  InvSetting,
}) => {
  useHandleRefresh((type = type)); // reset data on refresh button click
  const router = useRouter();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const isModile = useMediaQuery("(max-width: 500px)");
  const selectedColor = useSelectedColor();
  const additionalNotes = useSelector(getAddtionalNotes);
  const isDueDate = useSelector(getDueDate);
  const watermarkText = useSelector(getWatermarkText);
  const watermark = useSelector(getWatermark);

  const isInvoiceTypeError = useSelector(getInvoiceTypeError);
  const isSenderError = useSelector(getSenderDetailsError);
  const isRecipientError = useSelector(getRecipientDetailsError);

  const handleChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setAddtionalNotes(value));
  };
  const senderShow = InvDetails.from?.name !== "" ? true : false;
  const reciptShow = InvDetails.to?.name !== "" ? true : false;
  const selectedTerms = useSelector(getTerms);

  const handleSubmitFrom = (values: any) => {
    dispatch(setSenderDetail(values));
  };
  const handleSubmitTo = (values: any) => {
    dispatch(setRecipientDetail(values));
  };
  const senderSelected = useSelector(getIsSenderSelected);
  const recipientSelected = useSelector(getIsRecipientSelected);

  useEffect(() => {
    dispatch(setResetValidation());
  }, [dispatch]);

  return (
    <>
      {watermark && (
        <Box
          sx={{
            width: { xs: "90%", sm: "55%", xl: "54%" },
            height: { xs: "100%", sm: "72%" },
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              ml:{xs:0,sm:'-10px'},
              pl:{xs:'10px',sm:0},
              maxWidth: "1000px",
              fontSize: { xs: "70px", sm: "125px" },
              lineHeight: { xs: "70px", sm: "130px" },
              fontWeight: 900,
              opacity: isNearWhite(selectedColor) ? 0.3 : 0.06,
              rotate: { xs: "-55deg", sm: "-45deg" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isNearWhite(selectedColor)
                ? palette.color.gray[200]
                : selectedColor,
              pointerEvents: "none",
              whiteSpace: "normal", // Enables text wrapping
              wordBreak: "break-word", // Breaks long words
            }}
          >
            {watermarkText}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          width: "843px",
          boxShadow: palette.boxShadows[200],
          borderRadius: { sm: "4px", xs: "12px" },
          overflow: "hidden",
          border: "1px solid",
          borderColor: palette.color.gray[200],
          mb: { sm: 0, xs: "16px" },
        }}
      >
        <Box
          sx={{ width: "100%", height: "10px", backgroundColor: selectedColor }}
        />
        <Box
          sx={{
            backgroundColor: palette.base.white,
            width: "100%",
            pt: { sm: "22px", xs: 2 },
            pb: { sm: 3, xs: 2 },
            px: { sm: 3, xs: 2 },
          }}
        >
          {/* First section, add logo, invoice type, print */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ flexDirection: { sm: "row", xs: "column" } }}
          >
            <Stack direction={"row"} spacing={3}>
              <UploadLogo logoDesc="Add your bussiness logo" />
            </Stack>
            <Box
              sx={{
                mt: { sm: 0, xs: "16px" },
                position: "relative",
                width: { sm: "48.6%", xs: "100%" },
              }}
            >
              <SelectInput
                width={isModile ? "100%" : "100%"}
                height={44}
                placeholder="Select type"
                borderRadius={"4px"}
                type="Type"
                menuData={["Bill", "Sales Invoice", "Quotation", "Other"]}
              />
              {isInvoiceTypeError && (
                <Typography
                  variant="text-xxs-medium"
                  sx={{ color: "red", position: "absolute" }}
                >
                  Invoice type is required
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Second section Detail selecters */}
          <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            justifyContent={"space-between"}
            gap={3}
            sx={{ marginTop: "24px" }}
          >
            <DetailSelecter
              title="From"
              detailsOf="Sender"
              showData={senderShow}
              InvDetails={InvDetails.from}
              handleSubmitForm={handleSubmitFrom}
              type={type}
              isListSelected={senderSelected}
            />

            <DetailSelecter
              title="To"
              detailsOf="Recipient"
              showData={reciptShow}
              InvDetails={InvDetails.to}
              handleSubmitForm={handleSubmitTo}
              type={type}
              isListSelected={recipientSelected}
            />
          </Stack>
          {/* Third section, Date pickers */}
          <Stack
            direction={"row"}
            // justifyContent={"space-between"}
            sx={{
              marginTop: "24px",
              flexDirection: { sm: "row", xs: "column" },
              gap: { sm: "24px", xs: 2 },
            }}
          >
            <InvoiceDatePicker title="Date" />

            {isDueDate ? <InvoiceDatePicker title="Due Date" /> : ""}
          </Stack>
          {/* Fourth section, add items table */}

          <InvoiceItemsTable />

          {/* Fifth section, Invoice summery */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: "space-between",
            }}
          >
            <DisplaySignature />
            <InvoiceSummary />
          </Box>
          {/* Sixth section, additional notes */}
          {selectedTerms ? (
            <TextField
              multiline
              rows={3}
              sx={{
                marginTop: "24px",
                width: "100%",
                "& .MuiInputBase-input": {
                  px: "0px !important",
                  height: "104px !important",
                  border: `0px dashed ${"#F9F9F9"}`,
                  "&::placeholder": {
                    color: "#767676",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: palette.color.gray[610],
                  opacity: 1,
                },
                "& .MuiOutlinedInput-root": {
                  py: "10px !important",
                  border: "none !important",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: palette.color.gray[200],
                  },
                },
              }}
              onChange={handleChangeNotes}
              value={additionalNotes}
              id="outlined-basic"
              placeholder="Terms & Conditions"
              variant="outlined"
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default InvoiceSection;
