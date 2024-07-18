import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface InvoiceSettingState {
  color: string;
  currency: string;
  dueDate: boolean;
  tax: boolean;
  detail: boolean;
}

const initialState: InvoiceSettingState = {
  color: "#2A2A2A",
  currency: "$ USD",
  dueDate: true,
  tax: true,
  detail: true,
};

const invoiceSetting = createSlice({
  name: "invoiceSetting",
  initialState,
  reducers: {
    setInvoiceColor: (state, action) => {
      state.color = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setDueDate: (state) => {
      state.dueDate = !state.dueDate;
    },
    setTax: (state) => {
      state.tax = !state.tax;
    },
    setDetails: (state) => {
      state.detail = !state.detail;
    },
  },
});

export const getColor = (state: RootState) => state.invoiceSetting.color;
export const getCurrency = (state: RootState) => state.invoiceSetting.currency;
export const getDueDate = (state: RootState) => state.invoiceSetting.dueDate;
export const getTax = (state: RootState) => state.invoiceSetting.tax;
export const getDetails = (state: RootState) => state.invoiceSetting.detail;

export const { setInvoiceColor, setCurrency, setDueDate, setTax, setDetails } =
  invoiceSetting.actions;

export default invoiceSetting.reducer;
