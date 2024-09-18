import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialValue = {
  isSenderSelected: false,
  isRecipientSelected: false,
};

export const listSelectedSlice = createSlice({
  name: "listSelected",
  initialState: initialValue,
  reducers: {
    setSenderSelected: (state, action: PayloadAction<boolean>) => {
      state.isSenderSelected = action.payload;
    },

    setRecipientSelected: (state, action: PayloadAction<boolean>) => {
      state.isRecipientSelected = action.payload;
    },

    setResetSelectedList: (state) => {
      return initialValue;
    },
  },
});

export const getIsSenderSelected = (state: RootState) =>
  state.listSelected.isSenderSelected;
export const getIsRecipientSelected = (state: RootState) =>
  state.listSelected.isRecipientSelected;

export const { setResetSelectedList, setSenderSelected, setRecipientSelected } =
  listSelectedSlice.actions;
export default listSelectedSlice.reducer;
