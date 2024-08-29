"use client";
import {
  getColor,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "./constants";
import { signIn, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { setResetInvoice } from "@/redux/features/invoiceSlice";

// Custom hook to get the selected color
export const useSelectedColor = () => {
  const color = useSelector(getColor);
  return color;
};
// Image convertion
export const imageConvertion = (image: any) => {
  if (
    image?.includes("lh3.googleusercontent.com") ||
    image?.includes("blob:")
  ) {
    return image;
  } else {
    return `${backendURL}/${image}`;
  }
};
export const googleImage = (image: string) => {
  console.log(image, "imageee");
  if (image?.includes("base64,")) {
    return image;
  } else {
    return `${backendURL}/${image}`;
  }
};
//Logout function
export const handleLogout = () => {
  signOut({
    callbackUrl:
      `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}` ||
      "https://main.d33zziho5sqnl9.amplifyapp.com",
  });
};
// Login function
export const handleLogin = () => {
  signIn("google", {
    callbackUrl:
      `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}` ||
      "https://main.d33zziho5sqnl9.amplifyapp.com",
  });
};
//Image Base 64 Convertion
export const base64ToFile = (base64String: any, filename: any) => {
  const arr = base64String?.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
// Debounce
export const debounce = (func: any, delay: any) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
// Image blob function
//  async function fetchBlobData(blobUrl: string) {
//     try {
//       console.log("Fetching blob data from:", blobUrl);
//       const response = await fetch(blobUrl);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch blob. Status: ${response.status}`);
//       }
//       const blob = await response.blob();
//       return blob;
//     } catch (error) {
//       console.error("Failed to fetch blob data:", error);
//       throw error;
//     }
//   }
