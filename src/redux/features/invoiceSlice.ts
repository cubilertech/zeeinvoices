import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ContactDetail {
  name: string;
  companyName: string;
  email: string;
  phoneNumber: string | null;
  city: string;
  state: string;
  address: string;
}

export interface SignatureDetail {
  image: string | ArrayBuffer | null;
  designation: string;
}

export interface InvoiceItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
  discount: number;
  subTotalWithoutDiscount: number;
  subTotal: number;
  taxAmountWithoutDiscount: number;
  taxAmount: number;
  discountAmount: number;
}
export interface InvoiceState {
  id: number | string;
  logo: string | ArrayBuffer | null;
  invoiceType: string;
  from: ContactDetail;
  to: ContactDetail;
  invoiceDate: string | null;
  dueDate: string | null;
  invoiceItem: InvoiceItem[];
  signature: SignatureDetail;
  addtionalNotes: string;
}
type UpdatableKeys =
  | "name"
  | "quantity"
  | "rate"
  | "tax"
  | "discount"
  | "subTotal";
interface ActionPayload {
  id: number;
  type: UpdatableKeys;
  value: any;
}
const initialValue: InvoiceState = {
  id: "001",
  logo: "",
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
      description: "",
      quantity: 0,
      rate: 0,
      tax: 0,
      discount: 0,
      subTotalWithoutDiscount: 0,
      subTotal: 0,
      taxAmountWithoutDiscount: 0,
      taxAmount: 0,
      discountAmount: 0,
    },
  ],
  signature: { image: "", designation: "" },
  addtionalNotes: "",
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialValue,
  reducers: {
    setInvoiceId: (state, action: PayloadAction<number | string>) => {
      state.id = action.payload;
    },
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
    setInvoiceSignature: (state, action: PayloadAction<string | null>) => {
      state.signature = { ...state.signature, image: action.payload };
    },
    setInvoiceSignatureDesignation: (state, action: PayloadAction<string>) => {
      state.signature = { ...state.signature, designation: action.payload };
    },
    removeInvoiceItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const filterData = state.invoiceItem.filter((item) => item.id !== id);
      state.invoiceItem = filterData;
    },
    setInvoiceItem: (state, action: PayloadAction<any>) => {
      const { id, type, value } = action.payload as ActionPayload;
      const index = state.invoiceItem.findIndex((item) => item.id === id);
      state.invoiceItem[index][type] = value as never;
      if (
        type === "quantity" ||
        type === "rate" ||
        type === "tax" ||
        type === "discount"
      ) {
        // Step 1: Calculate subtotal (without tax or discount)
        const subtotalWithoutDiscount =
          state.invoiceItem[index].quantity * state.invoiceItem[index].rate;
        state.invoiceItem[index].subTotalWithoutDiscount =
          subtotalWithoutDiscount;
        const subtotal =
          state.invoiceItem[index].quantity * state.invoiceItem[index].rate;
        // Step 2: Calculate discount and adjust subtotal
        const discountValue = state.invoiceItem[index].discount;
        const discountAmount = subtotal * (discountValue / 100);
        state.invoiceItem[index].discountAmount = discountAmount;
        const discountedSubtotal = subtotal - discountAmount;
        // Step 3: Calculate tax on the subtotal and discounted subtotal
        const taxValue = state.invoiceItem[index].tax;
        const taxAmountWithoutDiscount =
          subtotalWithoutDiscount * (taxValue / 100);
        state.invoiceItem[index].taxAmountWithoutDiscount =
          taxAmountWithoutDiscount;

        const taxAmount = discountedSubtotal * (taxValue / 100);
        state.invoiceItem[index].taxAmount = taxAmount;
        // Step 4: Set the final subtotal, including the discounted subtotal and tax
        state.invoiceItem[index].subTotal = discountedSubtotal + taxAmount;
      }
    },
    setAddtionalNotes: (state, action: PayloadAction<string>) => {
      state.addtionalNotes = action.payload;
    },
    setFullInvoice: (state, action: PayloadAction<any>) => {
      state.id = action.payload.id;
      state.logo = action.payload.logo;
      state.invoiceType = action.payload.invoiceType;
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.invoiceDate = action.payload.invoiceDate;
      state.dueDate = action.payload.dueDate;
      state.addtionalNotes = action.payload.addtionalNotes;
      state.invoiceItem = action.payload.invoiceItem;
      state.signature = action.payload.signature;
    },
    setResetFromDetails: (state) => {
      state.from = initialValue.from;
    },

    setResetToDetails: (state) => {
      state.to = initialValue.to;
    },

    setResetInvoice: (state) => {
      return initialValue;
    },
    setResetInvoiceId: (state) => {
      state.id = initialValue.id;
    },
  },
});

export const getInvoiceId = (state: RootState) => state.invoice.id;
export const getInvoiceLogo = (state: RootState) => state.invoice.logo;
export const getInvoiceType = (state: RootState) => state.invoice.invoiceType;
export const getSenderDetail = (state: RootState) => state.invoice.from;
export const getRecipientDetail = (state: RootState) => state.invoice.to;
export const getInvoiceDate = (state: RootState) => state.invoice.invoiceDate;
export const getDueDate = (state: RootState) => state.invoice.dueDate;
export const getInvoiceItem = (state: RootState) => state.invoice.invoiceItem;
export const getInvoiceSignature = (state: RootState) =>
  state.invoice.signature?.image;
export const getInvoiceSignatureDesignation = (state: RootState) =>
  state.invoice.signature?.designation;

export const getAddtionalNotes = (state: RootState) =>
  state.invoice.addtionalNotes;

export const {
  setInvoiceId,
  setInvoiceLogo,
  setInvoiceType,
  setSenderDetail,
  setRecipientDetail,
  setInvoiceDate,
  setDueDate,
  addInvoiceItem,
  removeInvoiceItem,
  setInvoiceSignature,
  setInvoiceSignatureDesignation,
  setInvoiceItem,
  setAddtionalNotes,
  setFullInvoice,
  setResetFromDetails,
  setResetToDetails,
  setResetInvoice,
  setResetInvoiceId,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
