import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ColorOption {
  id: number;
  color: string;
  isSelected: boolean;
}

export interface InvoiceSettingState {
  colors: ColorOption[];
  color: string;
  currency: string;
  watermarkText: string;
  dueDate: boolean;
  tax: boolean;
  discount: boolean;
  signature: boolean;
  terms: boolean;
  watermark: boolean;
  detail: boolean;
}

const initialColors: ColorOption[] = [
  { id: 1, color: "#4F35DF", isSelected: true },
  { id: 2, color: "#444444", isSelected: false },
  { id: 3, color: "#1A1A21", isSelected: false },
  { id: 4, color: "#6183E4", isSelected: false },
  { id: 5, color: "#0286FF", isSelected: false },
  { id: 6, color: "#366AEF", isSelected: false },
  { id: 7, color: "#9747FF", isSelected: false },
  { id: 8, color: "#C69ED4", isSelected: false },
  { id: 9, color: "#70756A", isSelected: false },
  { id: 10, color: "#446043", isSelected: false },
  { id: 11, color: "#56607C", isSelected: false },
  { id: 12, color: "#AB5FB1", isSelected: false },
  { id: 13, color: "#5F319A", isSelected: false },
  { id: 14, color: "#E461C7", isSelected: false },
  { id: 15, color: "#FFCC02", isSelected: false },
  { id: 16, color: "#B2E461", isSelected: false },
];

const initialState: InvoiceSettingState = {
  colors: initialColors,
  color: "#4F35DF",
  currency: "USD",
  watermarkText: "",
  dueDate: true,
  tax: true,
  discount: true,
  signature: true,
  terms: true,
  watermark: false,
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
    setWatermarkText: (state, action) => {
      state.watermarkText = action.payload;
    },
    setDueDate: (state) => {
      state.dueDate = !state.dueDate;
    },
    setTax: (state) => {
      state.tax = !state.tax;
    },
    setDiscount: (state) => {
      state.discount = !state.discount;
    },
    setSignature: (state) => {
      state.signature = !state.signature;
    },
    setTerms: (state) => {
      state.terms = !state.terms;
    },
    setWatermark: (state) => {
      state.watermark = !state.watermark;
    },
    setDetails: (state) => {
      state.detail = !state.detail;
    },
    setInvoiceSettings: (state, action) => {
      state.colors = action.payload.colors;
      state.color = action.payload.color;
      state.currency = action.payload.currency;
      state.watermarkText = action.payload.watermarkText;
      state.dueDate = action.payload.dueDate;
      state.discount = action.payload.discount;
      state.signature = action.payload.signature;
      state.tax = action.payload.tax;
      state.terms = action.payload.terms;
      state.watermark = action.payload.watermark;
      state.detail = action.payload.detail;
    },
    setResetInvoiceSetting: (state) => {
      return initialState;
    },
    setColors: (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload.map((color, index) => ({
        id: index + 1,
        color,
        isSelected: false,
      }));
    },
    setColorsArray: (state, action: PayloadAction<ColorOption[]>) => {
      state.colors = action.payload;
    },
    updateColorSelection: (state, action: PayloadAction<number>) => {
      state.colors = state.colors.map((color) =>
        color.id === action.payload
          ? { ...color, isSelected: true }
          : { ...color, isSelected: false }
      );
    },
  },
});

export const getColors = (state: RootState) => state.invoiceSetting.colors;
export const getColor = (state: RootState) => state.invoiceSetting.color;
export const getCurrency = (state: RootState) => state.invoiceSetting.currency;
export const getWatermarkText = (state: RootState) =>
  state.invoiceSetting.watermarkText;
export const getDueDate = (state: RootState) => state.invoiceSetting.dueDate;
export const getTax = (state: RootState) => state.invoiceSetting.tax;
export const getDiscount = (state: RootState) => state.invoiceSetting.discount;
export const getSignature = (state: RootState) =>
  state.invoiceSetting.signature;

export const getTerms = (state: RootState) => state.invoiceSetting.terms;
export const getWatermark = (state: RootState) =>
  state.invoiceSetting.watermark;
export const getDetails = (state: RootState) => state.invoiceSetting.detail;

export const {
  setInvoiceColor,
  setCurrency,
  setWatermarkText,
  setDueDate,
  setTax,
  setDiscount,
  setSignature,
  setTerms,
  setWatermark,
  setDetails,
  setInvoiceSettings,
  setResetInvoiceSetting,
  setColors,
  setColorsArray,
  updateColorSelection,
} = invoiceSetting.actions;

export default invoiceSetting.reducer;
