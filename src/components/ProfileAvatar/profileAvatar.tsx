"use client";
import { FC, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { palette } from "@/theme/palette";
import { Icon } from "../Icon";
import Image from "next/image";
import { imageConvertion } from "@/utils/common";

interface ProfileAvatar {
  uploadImage?: any;
  setUploadImage?: any;
  imageUrl?: any;
  setImageUrl?: any;
}

const ProfileAvatar: FC<ProfileAvatar> = ({
  uploadImage,
  setUploadImage,
  imageUrl,
  setImageUrl,
}) => {
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
    }
  };
  console.log(imageUrl, "ddddd", uploadImage);
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
          left: { xl: "22%", lg: "7%", md: "5%", sm: "5%", xs: "32%" },
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
          {!imageUrl || imageUrl === "" ? (
            <Icon icon="personIcon" width={87} height={103} />
          ) : (
            <Image
              src={imageConvertion(imageUrl)}
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
              unoptimized
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
              accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
            />
            <Icon icon="cameraIcon" width={18} height={16} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ProfileAvatar;
