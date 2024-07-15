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
  color: "",
  currency: "",
  dueDate: false,
  tax: false,
  detail: false,
};

const invoiceSetting = createSlice({
  name: "invoiceSetting",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    setTax: (state, action) => {
      state.tax = action.payload;
    },
    setDetails: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const getColor = (state: RootState) => state.invoiceSetting.color;
export const getCurrency = (state: RootState) => state.invoiceSetting.currency;
export const getDueDate = (state: RootState) => state.invoiceSetting.dueDate;
export const getTax = (state: RootState) => state.invoiceSetting.tax;
export const getDetails = (state: RootState) => state.invoiceSetting.detail;

export const { setColor, setCurrency, setDueDate, setTax, setDetails } =
  invoiceSetting.actions;

export default invoiceSetting.reducer;
