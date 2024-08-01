"use client";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { FC, useRef, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceLogo, setInvoiceLogo } from "@/redux/features/invoiceSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "next/image";
import { googleImage, imageConvertion } from "@/utils/common";

interface UploadLogoProps {
  logoDesc: string;
}

const UploadLogo: FC<UploadLogoProps> = ({ logoDesc }) => {
  const dispatch = useDispatch();
  const invoiceLogo = useSelector(getInvoiceLogo);
  // const [image, setImage] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleCancelLogoClick = () => {
    dispatch(setInvoiceLogo(null));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setSelectedFile(file);
      // dispatch(setInvoiceLogo(URL.createObjectURL(file)));
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        // setImage(base64Image);
        // localStorage.setItem("uploadedImage", base64Image);
        dispatch(setInvoiceLogo(base64Image as string));
        console.log("Image stored in localStorage");
      // localStorage.setItem('logo',(URL.createObjectURL(file)));
    }
    reader.readAsDataURL(file);
  };
}

  // const handleFileUpload = (file: File) => {
  //   console.log("File uploaded:", file);
  // };
  return (
    <>
      {invoiceLogo ? (
        <Box
          sx={{ position: "relative", alignItems: "center", display: "flex" }}
        >
          <Image
            src={googleImage(invoiceLogo as string)}
            alt="Selected Logo"
            width={70}
            height={70}
            style={{ objectFit: "contain" }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "-5px",
              right: "55px",
              backgroundColor: palette.base.transparent,
              width: "5px !important",
              height: "5px !important",
              borderRadius: 3,
            }}
            onClick={handleCancelLogoClick}
          >
            <CancelIcon
              sx={{
                width: "20px",
                height: "20px",
                color: palette.color.gray[300],
                ":hover": {
                  color: palette.base.blueButtonColor,
                },
              }}
            />
          </IconButton>
        </Box>
      ) : (
        <Box
          borderRadius={1}
          sx={{
            border: "1px dashed",
            padding: 1,
            width: 200,
            height: 56,
            cursor: "pointer",
            borderColor: palette.base.dashedBorderColor,
          }}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Stack direction={"row"} spacing={1}>
            <Icon icon="uploadLogo" height={31} width={34} />
            <Stack direction={"column"} spacing={1}>
              <Typography variant="text-xs-regular" color={"gray"}>
                {logoDesc}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={"black"}
                sx={{ textDecoration: "underline" }}
              >
                Select a file
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default UploadLogo;
