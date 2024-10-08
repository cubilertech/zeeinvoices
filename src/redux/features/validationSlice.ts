import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ValidationObject {
  isError: boolean;
  message: string;
}

interface itemsType {
  id: string;
  name: {
    isError: boolean;
    message: string;
  };
  quantity: {
    isError: boolean;
    message: string;
  };
  rate: {
    isError: boolean;
    message: string;
  };
}
interface ValidationState {
  invoiceType: {
    isError: boolean;
    message: string;
  };
  senderDetails: {
    isError: boolean;
    message: string;
  };
  recipientDetails: {
    isError: boolean;
    message: string;
  };
  invoiceRowItem: {
    items: itemsType[] | null;
  };
}

const initialValue: ValidationState = {
  invoiceType: {
    isError: false,
    message: "Invoice type is required.",
  },
  senderDetails: {
    isError: false,
    message: "Sender details are required.",
  },
  recipientDetails: {
    isError: false,
    message: "Recipient details are required.",
  },
  invoiceRowItem: {
    items: null,
  },
};

export const validationSlice = createSlice({
  name: "validationSlice",
  initialState: initialValue,
  reducers: {
    setInvoiceTypeError: (state, action: PayloadAction<boolean>) => {
      state.invoiceType.isError = action.payload;
    },
    setSenderDetailsError: (state, action: PayloadAction<boolean>) => {
      state.senderDetails.isError = action.payload;
    },
    setRecipientDetailsError: (state, action: PayloadAction<boolean>) => {
      state.recipientDetails.isError = action.payload;
    },
    setInvoiceRowItemValidation: (
      state,
      action: PayloadAction<itemsType[] | null>
    ) => {
      state.invoiceRowItem.items = action.payload;
    },
    setInvoiceTypeValidation: (
      state,
      action: PayloadAction<ValidationObject>
    ) => {
      state.invoiceType = action.payload;
    },
    setResetValidation: (state) => {
      return initialValue;
    },
  },
});

// Selectors
export const getInvoiceItemsValidation = (state: RootState) =>
  state.validation.invoiceRowItem?.items;
export const getInvoiceTypeError = (state: RootState) =>
  state.validation.invoiceType.isError;
export const getSenderDetailsError = (state: RootState) =>
  state.validation.senderDetails.isError;
export const getRecipientDetailsError = (state: RootState) =>
  state.validation.recipientDetails.isError;

export const getInvoiceTypeErrorMsg = (state: RootState) =>
  state.validation.invoiceType.message;
export const getSenderDetailsErrorMsg = (state: RootState) =>
  state.validation.senderDetails.message;
export const getRecipientDetailsErrorMsg = (state: RootState) =>
  state.validation.recipientDetails.message;

export const {
  setInvoiceTypeError,
  setSenderDetailsError,
  setRecipientDetailsError,
  setInvoiceTypeValidation,
  setResetValidation,
  setInvoiceRowItemValidation,
} = validationSlice.actions;
export default validationSlice.reducer;
