import { Box, IconButton, Stack } from "@mui/material";
import { FC } from "react";
import { UploadLogo } from "../UploadLogo";
import { InvoiceType } from "../InvoiceType";
import { Rowdies } from "next/font/google";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";

const InvoiceSection: FC = () => {
  return (
    <Box
      borderTop={5}
      sx={{
        backgroundColor: palette.color.eggWhite,
        width: "100%",
        padding: 5,
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={3}>
          <UploadLogo logoDesc="Add your bussiness logo" />
          <InvoiceType type="Invoice type" />
        </Stack>
        <Box sx={{width:92, height:40}}>
        <Stack direction={"row"} spacing={2}>
            <IconButton sx={{padding:1}}>
                <Icon icon="sendSqaure" width={20} height={20}></Icon>
            </IconButton>
            <IconButton sx={{padding:1}}>
                <Icon icon="printIcon" width={20} height={20}></Icon>
            </IconButton>
        </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default InvoiceSection;
