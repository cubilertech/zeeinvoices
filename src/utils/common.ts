"use client";
import { getColor } from "@/redux/features/invoiceSetting";
import { useSelector } from "react-redux";

// Custom hook to get the selected color
export const useSelectedColor = () => {
  const color = useSelector(getColor);
  return color;
};