import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CountReducer from "./features/counterSlice";
import InvoiceReducer from "./features/invoiceSlice";
import InvoiceSettingReducer from "./features/invoiceSetting";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import listSelected from "./features/listSelected";
import validationSlice from "./features/validationSlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
};
// Root reducer
const rootReducer = combineReducers({
  counter: CountReducer,
  invoice: InvoiceReducer,
  invoiceSetting: InvoiceSettingReducer,
  listSelected: listSelected,
  validation: validationSlice,
});
// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Configure store
export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(thunk),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Create persistor
export const persistor = persistStore(store);
