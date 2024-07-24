"use client";
import { getColor } from "@/redux/features/invoiceSetting";
import { useSelector } from "react-redux";
import { backendURL } from "./constants";

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