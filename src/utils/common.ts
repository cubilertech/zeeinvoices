"use client";
import { getColor } from "@/redux/features/invoiceSetting";
import { useSelector } from "react-redux";
import { backendURL } from "./constants";
import { signIn, signOut } from "next-auth/react";

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
export const handleLogin = (pathname = "/") => {
  signIn("google", {
    callbackUrl:
      `${
        process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL
      }${"/create-new-invoice"}` ||
      "https://zeeinvoices.com/create-new-invoice",
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

export const hexToRgb = (hex: any) => {
  const bigint = parseInt(hex?.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

export const isNearWhite = (color: any) => {
  // Convert the color to RGB and check if it's near white
  const rgb = hexToRgb(color);
  return color === "#fffff"
    ? true
    : rgb && rgb.r > 200 && rgb.g > 200 && rgb.b > 200;
};
