import { Box, IconButton, Stack } from "@mui/material";
import { FC } from "react";
import { UploadLogo } from "../UploadLogo";
import { InvoiceType } from "../InvoiceType";
import { Rowdies } from "next/font/google";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import { DetailSelecter } from "../detailSelecter";
import { InvoiceDatePicker } from "../InvoiceDatePicker";
import { InvoiceItemsTable } from "../InvoiceItemsTable";

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
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={3}>
          <UploadLogo logoDesc="Add your bussiness logo" />
          <InvoiceType type="Invoice type" />
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
      <Stack direction={"row"} spacing={32} sx={{marginTop:5}}>
        <InvoiceDatePicker title="Invoice Date" />
        <InvoiceDatePicker title="Due Date" />
      </Stack>
      <InvoiceItemsTable />
    </Box>
  );
};

export default InvoiceSection;
