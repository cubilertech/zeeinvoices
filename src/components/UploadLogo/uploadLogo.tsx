"use client";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { FC,  useRef } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceLogo, setInvoiceLogo } from "@/redux/features/invoiceSlice";
import { setColors } from "@/redux/features/invoiceSetting";
import Image from "next/image";
import ColorThief from "colorthief";
import { googleImage } from "@/utils/common";
import { Close } from "@mui/icons-material";
import { initialColors } from "@/utils/data";
import { toast } from "react-toastify";

interface UploadLogoProps {
  logoDesc: string;
}

const UploadLogo: FC<UploadLogoProps> = ({ logoDesc }) => {
  const dispatch = useDispatch();
  const invoiceLogo = useSelector(getInvoiceLogo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 1 * 1024 * 1024; 
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelLogoClick = () => {
    dispatch(setInvoiceLogo(null));
    dispatch(setColors(initialColors)); 
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Please select a file less than 1 MB.");
        return; 
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        dispatch(setInvoiceLogo(base64Image));
        extractColors(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = (imageSrc: string) => {
    const img = new window.Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const colorThief = new ColorThief();
      let dominantColors = colorThief.getPalette(img, 32) || [];

      // Convert RGB to hex and remove duplicates
      let hexColors = Array.from(
        new Set(
          dominantColors.map(
            (rgb) =>
              `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`
          )
        )
      );

      // Add random colors if fewer than 16
      while (hexColors.length < 16) {
        const randomColor = `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`;
        hexColors.push(randomColor);
      }

      // Trim down to 16 colors and dispatch to Redux
      dispatch(setColors(hexColors.slice(0, 16)));
    };
  };

  return (
    <>
      {invoiceLogo ? (
        <Box
          borderRadius={1}
          sx={{
            border: "1px dashed",
            px: "10px",
            py: "10px",
            width: { sm: "auto", xs: "100%" },
            cursor: "pointer",
            borderRadius: "4px",
            borderColor: palette.color.gray[310],
            position: "relative",
          }}
          onClick={handleClick}
        >
          <ButtonBase
            onClick={handleCancelLogoClick}
            sx={{
              border: "1px solid #E3E8EF",
              borderRadius: "100%",
              width: "16px",
              height: "16px",
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "white",
            }}
          >
            <Close sx={{ color: "#4B5565", width: "10px", height: "10px" }} />
          </ButtonBase>

          <Box
            sx={{
              width: "120px", 
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center", 
              overflow: "hidden", 
            }}
          >
            <Image
              src={googleImage(invoiceLogo as string)}
              alt="Selected Logo"
              width={120}
              height={70}
              style={{
                objectFit: "contain", 
                maxWidth: "100%",
                maxHeight: "100%", 
              }}
              unoptimized
            />
          </Box>
        </Box>
      ) : (
        <Box
          borderRadius={1}
          sx={{
            border: "1px dashed",
            px: 3,
            py: "14px",
            width: { sm: "auto", xs: "100%" },
            cursor: "pointer",
            borderRadius: "4px",
            borderColor: palette.color.gray[310],
          }}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
          />
          <Stack direction={"row"} gap={1.5}>
            <Icon icon="uploadLogo" height={40} width={40} />
            <Stack direction={"column"} gap={0.5}>
              <Typography
                variant="text-xs-regular-color"
                sx={{
                  fontSize: { sm: "12px", xs: "12px" },
                  lineHeight: { sm: "18px", xs: "18px" },
                  fontWeight: { xs: 400 },
                  color: palette.color.gray[610],
                }}
              >
                {logoDesc}
              </Typography>
              <Typography
                variant="text-xs-regular"
                color={"black"}
                sx={{
                  fontSize: { sm: "14px", xs: "14px" },
                  lineHeight: { sm: "20px", xs: "20px" },
                  fontWeight: { xs: 600 },
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Click to upload
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default UploadLogo;
