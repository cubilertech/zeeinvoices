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
import { useSelectedColor } from "@/utils/common";
import {
  getAddtionalNotes,
  setAddtionalNotes,
  setRecipientDetail,
  setResetInvoice,
  setSenderDetail,
} from "@/redux/features/invoiceSlice";
import {
  getDueDate,
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
} from "@/redux/features/validationSlice";

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

  const isInvoiceTypeError = useSelector(getInvoiceTypeError);
  const isSenderError = useSelector(getSenderDetailsError);
  const isRecipientError = useSelector(getRecipientDetailsError);

  const handleChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setAddtionalNotes(value));
  };
  const showPreview =
    InvDetails.from?.name !== "" && InvDetails.to?.name !== "" ? false : true;
  const senderShow = InvDetails.from?.name !== "" ? true : false;
  const reciptShow = InvDetails.to?.name !== "" ? true : false;

  const handleSubmitFrom = (values: any) => {
    dispatch(setSenderDetail(values));
  };
  const handleSubmitTo = (values: any) => {
    dispatch(setRecipientDetail(values));
  };
  const senderSelected = useSelector(getIsSenderSelected);
  const recipientSelected = useSelector(getIsRecipientSelected);

  return (
    <Box
      sx={{
        boxShadow: palette.boxShadows[200],
        backgroundColor: palette.base.white,
        width: "100%",
        padding: { sm: 4, xs: 2 },
        marginBottom: 3,
        borderTop: "5px solid",
        borderColor: selectedColor,
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
          {/* <SelectInput
            width={240}
            type="Invoice type"
            menuData={["Bill", "Sales Invoice", "Expense Invoice"]}
          /> */}
        </Stack>
        <Box sx={{ mt: { sm: 0, xs: 1 }, position: "relative" }}>
          <SelectInput
            width={isModile ? "100%" : 240}
            borderRadius={"4px"}
            type="Invoice type"
            menuData={["Bill", "Sales Invoice", "Expense Invoice", "Other"]}
          />
          {/* {isInvoiceTypeError && (
            <Typography
              variant="text-xxs-medium"
              sx={{ color: "red", position: "absolute" }}
            >
              Invoice type is required
            </Typography>
          )} */}
        </Box>
        {/* <Box sx={{ width: 92, height: 40 }}>
          <Stack direction={"row"} spacing={2}>
            
            <IconButton
              disabled={showPreview}
              sx={{ padding: 1, opacity: showPreview ? 0.4 : 1 }}
              onClick={() => router.push("/preview")}
            >
              <Icon icon="sendSqaureIcon" width={20} height={20} />
            </IconButton>
            <Box>
              <Box style={{ display: "none" }}>
                <Box ref={componentRef}>
                  <InvoiceDetailsSection
                    singleInvoice={{ ...InvDetails }}
                    invoiceSetting={{ ...InvSetting }}
                  />
                </Box>
              </Box>
              <ReactToPrint
                trigger={() => (
                  <IconButton
                    sx={{ padding: 1, opacity: showPreview ? 0.4 : 1 }}
                    disabled={showPreview}
                    onClick={() => window.print()}
                  >
                    <Icon icon="printIconIcon" width={20} height={20} />
                  </IconButton>
                )}
                content={() =>
                  componentRef.current ? componentRef.current : null
                }
              />
            </Box>
          </Stack>
        </Box> */}
      </Stack>
      {/* Second section Detail selecters */}
      <Stack
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent={"space-between"}
        gap={2.5}
        sx={{ marginTop: 2 }}
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
          marginTop: { sm: "2%", xs: 2 },
          flexDirection: { sm: "row", xs: "column" },
          gap: { sm: 22, xs: 2 },
        }}
      >
        <InvoiceDatePicker title="Invoice Date" />

        {isDueDate ? <InvoiceDatePicker title="Due Date" /> : ""}
      </Stack>
      {/* Fourth section, add items table */}

      <InvoiceItemsTable />

      {/* Fifth section, Invoice summery */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <InvoiceSummary />
      </Box>
      <hr
        style={{
          margin: "25px 0px 5px 0px",
          height: "0.5px",
          backgroundColor: "rgba(156, 163, 175, 1)",
          color: "rgba(156, 163, 175, 1)",
        }}
      ></hr>
      {/* Sixth section, additional notes */}
      <Box
        sx={{
          height: "33px",
          width: "100%",
          marginTop: "10px",
          border: `1px dashed ${palette.base.borderColor}`,
          borderRadius: 1,
          backgroundColor: "#F9F9F9",
          marginBottom: "10px",
        }}
      >
        <TextField
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              height: "31px !important",
              border: `0px dashed ${"#F9F9F9"}`,
              "&::placeholder": {
                color: "#767676",
              },
            },
            "& .MuiOutlinedInput-root": {
              border: "none !important",
              borderRadius: 0.5,
              "& fieldset": {
                borderColor: palette.base.white,
              },
            },
          }}
          onChange={handleChangeNotes}
          value={additionalNotes}
          id="outlined-basic"
          placeholder="Additional Note"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default InvoiceSection;
