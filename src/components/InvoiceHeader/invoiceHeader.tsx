import { Button, Stack, Typography } from "@mui/material";
import { palette } from "@/theme/palette";
import { FC } from "react";

interface InvoiceHeaderProps {
  invoiceName: string;
}
const InvoiceHeader: FC<InvoiceHeaderProps> = ({ invoiceName }) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography variant="display-xs-medium">
        Invoice: {invoiceName}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
        <Button variant="outlined">Save</Button>
        <Button variant="contained">Download PDF</Button>
      </Stack>
    </Stack>
  );
};

export default InvoiceHeader;
