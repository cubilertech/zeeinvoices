import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { UploadLogo } from "../UploadLogo";
import { InvoiceType } from "../InvoiceType";
import { Rowdies } from "next/font/google";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import { DetailSelecter } from "../DetailSelecter";
import { InvoiceDatePicker } from "../InvoiceDatePicker";
import { InvoiceItemsTable } from "../InvoiceItemsTable";
import { InvoiceSummary } from "../InvoiceSummary";

const InvoiceSection: FC = () => {
  return (
    <Box
      borderTop={5}
      sx={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: palette.base.white,
        width: "100%",
        padding: 4,
      }}
    >
      {/* First section, add logo, invoice type, print */}

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={3}>
          <UploadLogo logoDesc="Add your bussiness logo" />
          <InvoiceType
            type="Invoice type"
            menuData={["Type 1", "Type 2", "Type 3"]}
          />
        </Stack>
        <Box sx={{ width: 92, height: 40 }}>
          <Stack direction={"row"} spacing={2}>
            <IconButton sx={{ padding: 1 }}>
              <Icon icon="sendSqaure" width={20} height={20}></Icon>
            </IconButton>
            <IconButton sx={{ padding: 1 }}>
              <Icon icon="printIcon" width={20} height={20}></Icon>
            </IconButton>
          </Stack>
        </Box>
      </Stack>
      {/* Second section Detail selecters */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ marginTop: 2 }}
      >
        <DetailSelecter
          title="From"
          detailsOf="Sender details"
          addDetailsOf="Add sender details"
        />
        <DetailSelecter
          title="To"
          detailsOf="Recipient details"
          addDetailsOf="Add sender recipient"
        />
      </Stack>
      {/* Third section, Date pickers */}
      <Stack direction={"row"} spacing={32} sx={{ marginTop: 5 }}>
        <InvoiceDatePicker title="Invoice Date" />
        <InvoiceDatePicker title="Due Date" />
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
          border: `1px dashed ${palette.borderColor.borderColor}`,
          borderRadius: 1,
          cursor: "pointer",
          backgroundColor: palette.color.eggWhite,
          marginBottom: "10px",
        }}
      >
        <TextField
          sx={{
            border: `1px solid ${palette.color.eggWhite}`,
            borderRadius: 1,
            // color: palette.color.gray[700],
            width: "100%",
            // height: "27px !important",
            "& .MuiInputBase-input": {
              height: "30px !important",
              backgroundColor: palette.color.eggWhite,
            },
          }}
          id="outlined-basic"
          placeholder="Additional notes"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default InvoiceSection;
