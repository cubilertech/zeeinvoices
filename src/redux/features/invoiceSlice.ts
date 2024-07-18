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
  id: number;
  name: string;
  quantity: number | null;
  rate: number | null;
  tax: number | null;
  // description: string;
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
  addtionalNotes: string;
}
type UpdatableKeys = 'name' | 'quantity' | 'rate' | 'tax' | 'subTotal';
interface ActionPayload {
  id: number;
  type: UpdatableKeys;
  value: any;
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
      id: 1,
      name: "",
      quantity: null,
      rate: null,
      tax: null,
      // description: "",
      subTotal: 0,
    },
  ],
  addtionalNotes: "",
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

    addInvoiceItem: (state, action: PayloadAction<InvoiceItem>) => {
      const item = action.payload;
      state.invoiceItem = [...state.invoiceItem, item];
    },
    removeInvoiceItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const filterData = state.invoiceItem.filter((item) => item.id !== id);
      state.invoiceItem = filterData;
    },
    setInvoiceItem: (state, action: PayloadAction<any>) => {
      const {id,type,value} = action.payload as ActionPayload;
      const index = state.invoiceItem.findIndex((item)=> item.id === id );
      state.invoiceItem[index][type]= value as never;
      console.log(id,index);
    },
    setAddtionalNotes: (state, action: PayloadAction<string>) => {
      state.addtionalNotes = action.payload;
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
export const getAddtionalNotes = (state: RootState) =>
  state.invoice.addtionalNotes;

export const {
  setInvoiceLogo,
  setInvoiceType,
  setSenderDetail,
  setRecipientDetail,
  setInvoiceDate,
  setDueDate,
  addInvoiceItem,
  removeInvoiceItem,
  setInvoiceItem,
  setAddtionalNotes,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
