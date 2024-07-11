"use client";
import { Box, Stack, Typography } from "@mui/material";
import { FC, useRef } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

interface UploadLogoProps {
  logoDesc: string;
}

const UploadLogo: FC<UploadLogoProps> = ({ logoDesc }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file); // Call the upload handler with the selected file
    }
  };
  
  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file);
    // Add your file upload logic here (e.g., uploading to a server)
  };

  return (
    <Box
      borderRadius={1}
      sx={{
        border: "1px dashed",
        padding: 1,
        width: 200,
        height: 56,
        cursor: "pointer",
        borderColor: palette.dashedBorderColor.borderColor,
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
          <Typography variant="caption" color={"gray"}>
            {logoDesc}
          </Typography>
          <Typography
            variant="caption"
            color={"black"}
            sx={{ textDecoration: "underline" }}
          >
            Select a file
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UploadLogo;
