"use client";
import { Button } from "@mui/material";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { palette } from "@/theme/palette";

interface CustomButtonProps{
  title:string;
  url:string;
}

const CustomButton: FC<CustomButtonProps> = ({title,url}) => {
  const route = useRouter();
  return (
    <Button
      onClick={() => route.push(url)}
      variant="text"
      size="small"
      sx={{borderBottom:`2px solid ${palette.primary.main}`,borderRadius:'0px',px:1}}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
