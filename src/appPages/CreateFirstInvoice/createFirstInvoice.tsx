import { FirstInvoice } from "@/components/FirstInvoice";
import { Container} from "@mui/material";

const CreateFirstInvoice = () => {
  return (
    <Container maxWidth="lg" sx={{ overflowY: "auto", height: "100%" }}>
      <FirstInvoice />
    </Container>
  );
};
export default CreateFirstInvoice;
