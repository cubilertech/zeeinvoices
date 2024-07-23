"use client";
import { Box, Grid, IconButton, Stack, TextField } from "@mui/material";
import { FC, ChangeEvent } from "react";
import { UploadLogo } from "../UploadLogo";
import { SelectInput } from "../SelectInput";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import { InvoiceDatePicker } from "../InvoiceDatePicker";
import { InvoiceItemsTable } from "../InvoiceItemsTable";
import { InvoiceSummary } from "../InvoiceSummary";
import { DetailSelecter } from "../detailSelecter";
import { useDispatch, useSelector } from "react-redux";
import { useSelectedColor } from "@/utils/common";
import {
  getAddtionalNotes,
  setAddtionalNotes,
} from "@/redux/features/invoiceSlice";
import { getDueDate } from "@/redux/features/invoiceSetting";
import { useRouter } from "next/navigation";

interface InvoiceSectionProps {
  InvDetails: any;
}

const InvoiceSection: FC<InvoiceSectionProps> = ({ InvDetails }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedColor = useSelectedColor();
  const additionalNotes = useSelector(getAddtionalNotes);
  const isDueDate = useSelector(getDueDate);
  const handleChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setAddtionalNotes(value));
  };
  const showPreview =
    InvDetails.from.name !== "" && InvDetails.to.name !== "" ? false : true;
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
            menuData={["Type 1", "Type 2", "Type 3"]}
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
            <IconButton sx={{ padding: 1 }}>
              <Icon icon="printIconIcon" width={20} height={20} />
            </IconButton>
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
        <DetailSelecter title="From" detailsOf="Sender" />
        <DetailSelecter title="To" detailsOf="Recipient" />
      </Stack>
      {/* Third section, Date pickers */}
      <Stack direction={"row"} spacing={1} sx={{ marginTop: 5 }}>
        <Grid container spacing={0}>
          <Grid
            sx={{ padding: "8px", paddingTop: "8px !important" }}
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
      <hr style={{ margin: "20px 10px 10px 10px" }}></hr>
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
            },
            "& .MuiOutlinedInput-root" : {
              border: "none !important",
              borderRadius:0.5,
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
