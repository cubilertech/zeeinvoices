"use client";
import {
  setResetInvoice,
  setResetInvoiceId,
} from "@/redux/features/invoiceSlice";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetSelectedList } from "@/redux/features/listSelected";
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const SessionCheck = () => {
  const route = useRouter();
  const { data: session } = useSession();
  const previousSession = useRef(session);
  const dispatch = useDispatch();
  useEffect(() => {
    if (previousSession.current && !session) {
      // for token expiration
      dispatch(setResetInvoice());
      dispatch(setResetInvoiceSetting());
      dispatch(setResetSelectedList());
      dispatch(setResetInvoiceId());
      route.push(`/`);
    }
    previousSession.current = session;
  }, [session, dispatch, route]);
  return null;
};

export default SessionCheck;
