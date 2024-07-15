import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Dayjs } from "dayjs";

export interface ContactDetail {
  name: string;
  companyName: string;
  email: string;
  phoneNumber: string | null;
  city: string;
  state: string;
  address: string;
}
export interface InvoiceItem {
  name: string;
  qty: number;
  rate: number;
  tax: number;
  description: string;
  subTotal: number;
}

export interface InvoiceState {
  logo: File | null;
  invoiceType: string;
  from: ContactDetail;
  to: ContactDetail;
  invoiceDate: Dayjs | null;
  dueDate: Dayjs | null;
  invoiceItem: InvoiceItem[];
}

const initialValue: InvoiceState = {
  logo: null,
  invoiceType: "",
  from: {
    name: "",
    companyName: "",
    email: "",
    phoneNumber: null,
    city: "",
    state: "",
    address: "",
  },
  to: {
    name: "",
    companyName: "",
    email: "",
    phoneNumber: null,
    city: "",
    state: "",
    address: "",
  },
  invoiceDate: null,
  dueDate: null,
  invoiceItem: [
    {
      name: "",
      qty: 0,
      rate: 0,
      tax: 0,
      description: "",
      subTotal: 0,
    },
  ],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialValue,
  reducers: {
    setInvoiceLogo: (state, action: PayloadAction<File | null>) => {
      state.logo = action.payload;
    },
    setInvoiceType: (state, action: PayloadAction<string>) => {
      state.invoiceType = action.payload;
    },
    setSenderDetail: (state, action: PayloadAction<ContactDetail>) => {
      state.from = action.payload;
    },
    setRecipientDetail: (state, action: PayloadAction<ContactDetail>) => {
      state.to = action.payload;
    },
    setInvoiceDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.invoiceDate = action.payload;
    },
    setDueDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.dueDate = action.payload;
    },
    setInvoiceItem: (state, action: PayloadAction<InvoiceItem[]>) => {
      state.invoiceItem = action.payload;
    },
  },
});

export const getInvoiceLogo = (state: RootState) => state.invoice.logo;
export const getInvoiceType = (state: RootState) => state.invoice.invoiceType;
export const getSenderDetail = (state: RootState) => state.invoice.from;
export const getRecipientDetail = (state: RootState) => state.invoice.to;
export const getInvoiceDate = (state: RootState) => state.invoice.invoiceDate;
export const getDueDate = (state: RootState) => state.invoice.dueDate;
export const getInvoiceItem = (state: RootState) => state.invoice.invoiceItem;

export const {
  setInvoiceLogo,
  setInvoiceType,
  setSenderDetail,
  setRecipientDetail,
  setInvoiceDate,
  setDueDate,
  setInvoiceItem,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
