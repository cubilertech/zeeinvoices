import { InvoiceHeader } from "@/components/InvoiceHeader";
import { InvoiceSection } from "@/components/InvoiceSection";
import { InvoiceSettings } from "@/components/InvoiceSettings";
import { Box, Container, Stack } from "@mui/material";

const CreateInvoice = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <InvoiceHeader invoiceName="001" />
      </Box>
      <Stack direction={"row"} gap={3}>
        <InvoiceSection />
        <InvoiceSettings />
      </Stack>
    </Container>
  );
};
export default CreateInvoice;
