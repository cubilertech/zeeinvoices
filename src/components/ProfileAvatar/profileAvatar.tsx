"use client";
import { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceLogo, setInvoiceLogo } from "@/redux/features/invoiceSlice";
import { Box, IconButton } from "@mui/material";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import Image from "next/image";
import { imageConvertion } from "@/utils/common";

interface ProfileAvatar {
  // image?: any;
  // setImage?: any;
  // isImage?: any;
  // setIsImage?: any;
  uploadImage?: any,
  setUploadImage?: any,
  imageUrl?: any,
  setImageUrl?: any
}

const ProfileAvatar: FC<ProfileAvatar> = ({
  uploadImage,
  setUploadImage,
  imageUrl,
  setImageUrl
  // image,
  // setImage,
  // isImage,
  // setIsImage,
}) => {
  // const [isImage, setIsImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadImage(file);
      setImageUrl(URL.createObjectURL(file));
      // setIsImage(true);
      // setImage(file);
    }
  };
console.log(imageUrl,'ddddd',uploadImage);
  return (
    <>
      {/* circle avatar */}
      <Box
        sx={{
          height: "150px",
          width: "150px",
          background: palette.base.white,
          borderRadius: "75px",
          position: "absolute",
          top: 170,
          left: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "144px",
            width: "144px",
            border: `3px solid ${palette.primary.main}`,
            backgroundColor: "#D9DBF9",
            borderRadius: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!imageUrl || imageUrl === '' ? (
            <Icon icon="personIcon" width={87} height={103} />
          ) : (
            <Image
              src={
                imageConvertion(imageUrl)
              }
              alt="Selected Logo"
              width={100}
              height={100}
              style={{
                borderRadius: "70px",
                maxWidth: "100%",
                maxHeight: "100%",
                minWidth: "100%",
                minHeight: "100%",
                objectFit: "cover",
              }}
            />
          )}
          <IconButton
            sx={{
              height: "32px !important",
              width: "32px !important",
              backgroundColor: palette.primary.main,
              borderRadius: "50px",
              position: "absolute",
              top: 130,
              ":hover": {
                backgroundColor: palette.primary.light,
              },
            }}
            onClick={handleClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Icon icon="cameraIcon" width={18} height={16} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ProfileAvatar;