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

export const imageConvertion=(image:any)=>{
if(image?.includes('lh3.googleusercontent.com') || image?.includes('blob:')){
  return image;
}else{
  return `${backendURL}/${image}`;
}
}
export const googleImage=(image:string)=>{
  console.log(image,'imageee')
if(image?.includes('base64,')){
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
    callbackUrl: `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}`,
  });
};

export const base64ToFile = (base64String : any, filename:any) => {
  const arr = base64String?.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const debounce = (func:any, delay:any) => {
  let timeout:any;
  return (...args:any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
