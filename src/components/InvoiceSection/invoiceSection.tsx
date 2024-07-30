"use client";
import { Box, Grid, IconButton, Stack, TextField } from "@mui/material";
import { FC, ChangeEvent, useRef } from "react";
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
  setSenderDetail,
} from "@/redux/features/invoiceSlice";
import { getDueDate } from "@/redux/features/invoiceSetting";
import { useRouter } from "next/navigation";
import DetailSelecter from "../detailSelecter/detailSelecter";
import ReactToPrint from "react-to-print";
import InvoiceDetailsSection from "../InvoiceDetailsSection/invoiceDetailsSection";

interface InvoiceSectionProps {
  InvDetails: any;
  type: any;
  InvSetting:any;
}

const InvoiceSection: FC<InvoiceSectionProps> = ({ InvDetails, type,InvSetting }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const selectedColor = useSelectedColor();
  const additionalNotes = useSelector(getAddtionalNotes);
  const isDueDate = useSelector(getDueDate);
  const handleChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setAddtionalNotes(value));
  };
  const showPreview =
    InvDetails.from?.name !== "" && InvDetails.to?.name !== "" ? false : true;
  const senderShow = InvDetails.from?.name !== "" ? true : false;
  const reciptShow = InvDetails.to?.name !== "" ? true : false;

  const handleSubmitFrom = (values: any) => {
    console.log("submitted", values);
    dispatch(setSenderDetail(values));
  };
  const handleSubmitTo = (values: any) => {
    console.log("submitted", values);
    dispatch(setRecipientDetail(values));
  };

  return (
    <Box
      sx={{
        boxShadow: palette.boxShadows[200],
        backgroundColor: palette.base.white,
        width: "100%",
        padding: 4,
        marginBottom: 3,
        borderTop: "5px solid",
        borderColor: selectedColor,
      }}
    >
      {/* First section, add logo, invoice type, print */}

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={3}>
          <UploadLogo logoDesc="Add your bussiness logo" />
          <SelectInput
            width={240}
            type="Invoice type"
            menuData={["Bill", "Sales Invoice", "Expense Invoice"]}
          />
        </Stack>
        <Box sx={{ width: 92, height: 40 }}>
          <Stack direction={"row"} spacing={2}>
            <IconButton
              disabled={showPreview}
              sx={{ padding: 1, opacity: showPreview ? 0.4 : 1 }}
              onClick={() => router.push("/preview")}
            >
              <Icon icon="sendSqaureIcon" width={20} height={20} />
            </IconButton>
            <Box>
              <Box style={{display:'none'}}>
              <Box ref={componentRef}>
                <InvoiceDetailsSection singleInvoice={{...InvDetails}} invoiceSetting={{...InvSetting}} />
              </Box>
              </Box>              
              <ReactToPrint
                trigger={() => (
                  <IconButton
                    sx={{ padding: 1,opacity: showPreview ? 0.4 : 1 }}
                    disabled={showPreview}
                    onClick={() => window.print()}
                  >
                    <Icon icon="printIconIcon" width={20} height={20} />
                  </IconButton>
                )}
                content={() => componentRef.current ? componentRef.current : null}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>

      {/* Second section Detail selecters */}
      <Stack
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent={"space-between"}
        gap={5}
        sx={{ marginTop: 2 }}
      >
        <DetailSelecter
          title="From"
          detailsOf="Sender"
          showData={senderShow}
          InvDetails={InvDetails.from}
          handleSubmitForm={handleSubmitFrom}
          type={type}
        />
        <DetailSelecter
          title="To"
          detailsOf="Recipient"
          showData={reciptShow}
          InvDetails={InvDetails.to}
          handleSubmitForm={handleSubmitTo}
          type={type}
        />
      </Stack>
      {/* Third section, Date pickers */}
      <Stack direction={"row"} spacing={1} sx={{ marginTop: "45px" }}>
        <Grid container spacing={0}>
          <Grid
            sx={{
              padding: "8px",
              paddingTop: "8px !important",
              paddingLeft: "0px !important",
            }}
            item
            xs={6.5}
          >
            <InvoiceDatePicker title="Invoice Date" />
          </Grid>
          <Grid
            sx={{ padding: "8px", paddingTop: "8px !important" }}
            item
            xs={5.5}
          >
            {isDueDate ? <InvoiceDatePicker title="Due Date" /> : ""}
          </Grid>
        </Grid>
      </Stack>
      {/* Fourth section, add items table */}
      <InvoiceItemsTable />
      {/* Fifth section, Invoice summery */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <InvoiceSummary />
      </Box>
      <hr
        style={{
          margin: "20px 10px 10px 10px",
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
          marginTop: "20px",
          border: `1px dashed ${palette.base.borderColor}`,
          borderRadius: 1,
          // cursor: "pointer",
          backgroundColor: "#F9F9F9",
          marginBottom: "10px",
        }}
      >
        <TextField
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              height: "32px !important",
              // backgroundColor: palette.base.transparent,
              border: `0px dashed ${"#F9F9F9"}`,
              "&::placeholder": {
                color: "#767676", // Change this to your desired placeholder color
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
