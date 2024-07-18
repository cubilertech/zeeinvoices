import { CreateInvoice } from "@/Pages/CreateInvoice";
import { Typography } from "@mui/material";
import Image from "next/image";
import ClientProvider from "@/components/ClientProvider";

export default function Home() {
  return (
    <div>
      <ClientProvider>
        <CreateInvoice />
      </ClientProvider>
    </div>
  );
}
