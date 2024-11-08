"use client";
import {
  Box,
  Button,
  ButtonBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useRef, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import SignatureCanvas from "react-signature-canvas";
import Image from "next/image";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";

interface DigitalSignatureProps {
  logoDesc?: string;
}

const DigitalSignature: FC<DigitalSignatureProps> = ({ logoDesc }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const signaturePadRef = useRef<SignatureCanvas>(null);
  const [signatureURL, setSignatureURL] = useState<string | null>(null);
  const [isPadOpen, setIsPadOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  const handleOpenPad = () => setIsPadOpen(true);

  const handleClear = () => {
    signaturePadRef.current?.clear();
    setIsPadOpen(false);
  };

  const handleSave = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      setSignatureURL(signaturePadRef.current.toDataURL("image/png"));
      setIsPadOpen(false);
      setError(null);
    } else {
      setError("Please draw your signature before saving.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      ![
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
      ].includes(file.type)
    ) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Please select a file less than 1 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setSignatureURL(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Box>
        {signatureURL && (
          <Box
            sx={{
              width: "100%",
              height: "200px",
              backgroundColor: "#FCFCFD",
              mb: "24px",
              borderRadius: "4px",
              border: `1px solid ${palette.color.gray[200]}`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ButtonBase
              onClick={() => setSignatureURL(null)}
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
            <Image
              src={signatureURL}
              alt="Signature"
              width={330}
              height={200}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              unoptimized
            />
          </Box>
        )}

        {isPadOpen && (
          <Box
            sx={{
              width: "100%",
              mb: "24px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <SignatureCanvas
              ref={signaturePadRef}
              penColor="darkblue"
              canvasProps={{
                width: 340,
                height: 200,
                className: "signature-canvas",
                style: { border: "1px solid #E3E8EF" },
              }}
            />
            <Stack
              sx={{ marginTop: "10px" }}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Button variant="text" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="text" onClick={handleSave}>
                Add
              </Button>
            </Stack>
            {error && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
          </Box>
        )}

        <Stack gap={1.5}>
          <ButtonBase
            onClick={handleUploadClick}
            sx={{
              //   mx: "auto",
              height: "40px",
              width: "100%",
              border: "1px dashed",
              borderRadius: 1,
              cursor: "pointer",
              backgroundColor: "#F8FAFC",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              borderColor: palette.primary.main,
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Box sx={{ padding: 1 }}>
                <CloudUploadOutlinedIcon
                  sx={{ width: "18px", color: palette.primary.main }}
                />
              </Box>
              <Typography
                variant="text-md-semibold"
                sx={{ color: palette.primary.main }}
              >
                Upload Signature
              </Typography>
            </Stack>
          </ButtonBase>

          <ButtonBase
            onClick={handleOpenPad}
            sx={{
              //   mx: "auto",
              height: "40px",
              width: "100%",
              border: "1px dashed",
              borderRadius: 1,
              cursor: "pointer",
              backgroundColor: "#F8FAFC",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              borderColor: palette.primary.main,
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Box sx={{ padding: 1 }}>
                <DriveFileRenameOutlineRoundedIcon
                  sx={{ width: "18px", color: palette.primary.main }}
                />
              </Box>
              <Typography
                variant="text-md-semibold"
                sx={{ color: palette.primary.main }}
              >
                Use signature pad
              </Typography>
            </Stack>
          </ButtonBase>
          <TextField
            variant="standard"
            placeholder="Enter your designation"
            sx={{
              width: "100%",
              py: "10px",
              px: "16px",
              border: `1px solid ${palette.color.gray[5]}`,
              borderRadius: "8px",
              "& .MuiInputBase-input": {
                border: "none",
                height: "20px",
                pl: "0px",
                pr: "0px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: palette.color.gray[610],
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Stack>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          // accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
          accept="image/*"
          capture={false}
        />
      </Box>
    </>
  );
};

export default DigitalSignature;
