"use client";
import CreateInvoice from "@/appPages/CreateInvoice";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function Home() {
  return <CreateInvoice type="add" />;
}
