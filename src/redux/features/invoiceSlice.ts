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
  quantity: number;
  rate: number;
  tax: number;
  // description: string;
  subTotal: number;
  taxAmount:number;
}

export interface InvoiceState {
  logo: string | null;
  invoiceType: string;
  from: ContactDetail;
  to: ContactDetail;
  invoiceDate: string | null;
  dueDate: string | null;
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
  logo: '',
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
  invoiceDate: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  invoiceItem: [
    {
      id: 1,
      name: "",
      quantity: 0,
      rate: 0,
      tax: 0,
      // description: "",
      subTotal: 0,
      taxAmount:0
    },
  ],
  addtionalNotes: "",
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialValue,
  reducers: {
    setInvoiceLogo: (state, action: PayloadAction<string | null>) => {
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
    setInvoiceDate: (state, action: PayloadAction<string | null>) => {
      state.invoiceDate = action.payload;
    },
    setDueDate: (state, action: PayloadAction<string | null>) => {
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
      state.invoiceItem[index][type] = value as never;
      if(type === 'quantity' || type === 'rate'){
        const subtitle = (state.invoiceItem[index].quantity) * (state.invoiceItem[index].rate);
        state.invoiceItem[index].subTotal = subtitle;
      }
      if(type === 'tax'){
        const total = (state.invoiceItem[index].quantity) * (state.invoiceItem[index].rate);
        const taxValue =state.invoiceItem[index].tax;
        const tax = (total)*(taxValue/100);
        state.invoiceItem[index].taxAmount = tax;
        state.invoiceItem[index].subTotal= total+tax;
      }
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