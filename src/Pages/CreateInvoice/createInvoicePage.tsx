import { InvoiceHeader } from "@/components/InvoiceHeader";
import { Box, Container } from "@mui/material";

const CreateInvoice = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <InvoiceHeader invoiceName="001" />
      </Box>
    </Container>
  );
};
export default CreateInvoice;
