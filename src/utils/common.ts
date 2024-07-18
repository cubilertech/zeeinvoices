"use client";
import { getColor } from "@/redux/features/invoiceSetting";
import { useSelector } from "react-redux";

export const selectedColor = () => {
  const color = useSelector(getColor);
  return color;
};
