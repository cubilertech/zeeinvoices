"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { persistor, store } from "@/redux/store";
// import store from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const ClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ClientProvider;
