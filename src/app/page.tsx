import { CreateInvoice } from "@/Pages/CreateInvoice";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div style={{height:"62vh"}}>
        <CreateInvoice />
      </div>
    </>
  );
}
