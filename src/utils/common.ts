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

export const imageConvertion=(image:string)=>{
if(image.includes('blob:')){
  return image;
}else{
  return `${backendURL}/${image}`;
}
}

export  const handleLogout = () => {
  signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}` });
};

export  const handleLogin = () => {
  signIn("google", {
    callbackUrl: `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}/invoices`,
  });
};