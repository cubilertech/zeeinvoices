"use client";
import { palette } from "@/theme/palette";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import { Icon } from "../Icon";

const InvoiceDetails = () => {
  return (
    <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
       <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ py: 3, marginTop: "50px" }}
      >
        <Stack direction={"row"} sx={{justifyContent:"center", alignItems:"center"}}>
          <Typography variant="display-xs-medium">Invoices/</Typography>
          <Typography
            variant="display-xs-medium"
            sx={{ color: palette.color.gray[770] }}
          >
            {" "}
            0016
          </Typography>
        </Stack>

        <Stack direction={"row"}>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="editIcon" width={20} height={20} />
          </IconButton>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="sendSqaureIcon" width={20} height={20} />
          </IconButton>
          <IconButton sx={{ padding: 1 }}>
            <Icon icon="printIconIcon" width={20} height={20} />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
};
export default InvoiceDetails;
