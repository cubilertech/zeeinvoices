// "use client";
// import { Box, IconButton, Stack, Typography } from "@mui/material";
// import { FC, useRef, useState } from "react";
// import { Icon } from "../Icon";
// import { palette } from "@/theme/palette";
// import { useDispatch, useSelector } from "react-redux";
// import { getInvoiceLogo, setInvoiceLogo } from "@/redux/features/invoiceSlice";
// import CancelIcon from "@mui/icons-material/Cancel";
// import Image from "next/image";
// import { googleImage, imageConvertion } from "@/utils/common";

// interface UploadLogoProps {
//   logoDesc: string;
// }

// const UploadLogo: FC<UploadLogoProps> = ({ logoDesc }) => {
//   const dispatch = useDispatch();
//   const invoiceLogo = useSelector(getInvoiceLogo);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const handleClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };
//   const handleCancelLogoClick = () => {
//     dispatch(setInvoiceLogo(null));
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result;
//         dispatch(setInvoiceLogo(base64Image as string));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       {invoiceLogo ? (
//         <Box
//           sx={{ position: "relative", alignItems: "center", display: "flex" }}
//         >
//           <Image
//             src={googleImage(invoiceLogo as string)}
//             alt="Selected Logo"
//             width={70}
//             height={70}
//             style={{ objectFit: "contain" }}
//           />
//           <IconButton
//             sx={{
//               position: "absolute",
//               top: "-5px",
//               right: "55px",
//               backgroundColor: palette.base.transparent,
//               width: "5px !important",
//               height: "5px !important",
//               borderRadius: 3,
//             }}
//             onClick={handleCancelLogoClick}
//           >
//             <CancelIcon
//               sx={{
//                 width: "20px",
//                 height: "20px",
//                 color: palette.color.gray[300],
//                 ":hover": {
//                   color: palette.base.blueButtonColor,
//                 },
//               }}
//             />
//           </IconButton>
//         </Box>
//       ) : (
//         <Box
//           borderRadius={1}
//           sx={{
//             border: "1px dashed",
//             padding: 1,
//             width: 200,
//             height: 56,
//             cursor: "pointer",
//             borderColor: palette.base.dashedBorderColor,
//           }}
//           onClick={handleClick}
//         >
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
//           />
//           <Stack direction={"row"} spacing={1}>
//             <Icon icon="uploadLogo" height={31} width={34} />
//             <Stack direction={"column"} spacing={1}>
//               <Typography variant="text-xs-regular" color={"gray"}>
//                 {logoDesc}
//               </Typography>
//               <Typography
//                 variant="text-xs-regular"
//                 color={"black"}
//                 sx={{ textDecoration: "underline" }}
//               >
//                 Select a file
//               </Typography>
//             </Stack>
//           </Stack>
//         </Box>
//       )}
//     </>
//   );
// };

// export default UploadLogo;

// "use client";
// import { Box, IconButton, Stack, Typography } from "@mui/material";
// import { FC, useRef, useState, useEffect } from "react";
// import { Icon } from "../Icon";
// import { palette } from "@/theme/palette";
// import { useDispatch, useSelector } from "react-redux";
// import { getInvoiceLogo, setInvoiceLogo } from "@/redux/features/invoiceSlice";
// import CancelIcon from "@mui/icons-material/Cancel";
// import Image from "next/image";
// import ColorThief from "colorthief"; // Import ColorThief
// import { googleImage } from "@/utils/common";

// interface UploadLogoProps {
//   logoDesc: string;
// }

// const UploadLogo: FC<UploadLogoProps> = ({ logoDesc }) => {
//   const dispatch = useDispatch();
//   const invoiceLogo = useSelector(getInvoiceLogo);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [colors, setColors] = useState<string[]>([]);

//   const handleClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleCancelLogoClick = () => {
//     dispatch(setInvoiceLogo(null));
//     setColors([]);
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result as string;
//         dispatch(setInvoiceLogo(base64Image));
//         extractColors(base64Image);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Function to extract colors using ColorThief
//   const extractColors = (imageSrc: string) => {
//     const img = new window.Image(); // Explicitly reference the global Image constructor
//     img.src = imageSrc;
//     img.crossOrigin = "Anonymous"; // Needed to avoid CORS issues

//     img.onload = () => {
//       const colorThief = new ColorThief(); // Instantiate ColorThief
//       const dominantColors = colorThief.getPalette(img, 18); // Extract 18 colors

//       const hexColors = dominantColors.map(
//         (rgb) => `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`
//       );
//       setColors(hexColors); // Set colors state
//     };
//   };

//   return (
//     <>
//       {invoiceLogo ? (
//         <Box
//           sx={{ position: "relative", alignItems: "center", display: "flex" }}
//         >
//           <Image
//             src={googleImage(invoiceLogo as string)}
//             alt="Selected Logo"
//             width={70}
//             height={70}
//             style={{ objectFit: "contain" }}
//           />
//           <IconButton
//             sx={{
//               position: "absolute",
//               top: "-5px",
//               right: "55px",
//               backgroundColor: palette.base.transparent,
//               width: "5px !important",
//               height: "5px !important",
//               borderRadius: 3,
//             }}
//             onClick={handleCancelLogoClick}
//           >
//             <CancelIcon
//               sx={{
//                 width: "20px",
//                 height: "20px",
//                 color: palette.color.gray[300],
//                 ":hover": {
//                   color: palette.base.blueButtonColor,
//                 },
//               }}
//             />
//           </IconButton>
//         </Box>
//       ) : (
//         <Box
//           borderRadius={1}
//           sx={{
//             border: "1px dashed",
//             padding: 1,
//             width: 200,
//             height: 56,
//             cursor: "pointer",
//             borderColor: palette.base.dashedBorderColor,
//           }}
//           onClick={handleClick}
//         >
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
//           />
//           <Stack direction={"row"} spacing={1}>
//             <Icon icon="uploadLogo" height={31} width={34} />
//             <Stack direction={"column"} spacing={1}>
//               <Typography variant="text-xs-regular" color={"gray"}>
//                 {logoDesc}
//               </Typography>
//               <Typography
//                 variant="text-xs-regular"
//                 color={"black"}
//                 sx={{ textDecoration: "underline" }}
//               >
//                 Select a file
//               </Typography>
//             </Stack>
//           </Stack>
//         </Box>
//       )}

//       {/* Display extracted colors */}
//       {colors.length > 0 && (
//         <Box sx={{ mt: 2 }}>
//           {/* <Typography variant="h6">Extracted Colors:</Typography> */}
//           <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
//             {colors.map((color, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   width: 15,
//                   height: 15,
//                   m: "5px",
//                   backgroundColor: color,
//                   borderRadius: "10%",
//                 }}
//               />
//             ))}
//           </Stack>
//         </Box>
//       )}
//     </>
//   );
// };

// export default UploadLogo;

"use client";
import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import { FC, useRef } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceLogo, setInvoiceLogo } from "@/redux/features/invoiceSlice";
import { setColors } from "@/redux/features/invoiceSetting";
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "next/image";
import ColorThief from "colorthief";
import { googleImage } from "@/utils/common";
import { Close } from "@mui/icons-material";

interface UploadLogoProps {
  logoDesc: string;
}

const UploadLogo: FC<UploadLogoProps> = ({ logoDesc }) => {
  const initialColors = [
    "#2A2A2A",
    "#444444",
    "#1A1A21",
    "#6183E4",
    "#0286FF",
    "#366AEF",
    "#9747FF",
    "#C69ED4",
    "#70756A",
    "#446043",
    "#56607C",
    "#AB5FB1",
    "#5F319A",
    "#E461C7",
    "#FFCC02",
    "#B2E461",
  ];
  const dispatch = useDispatch();
  const invoiceLogo = useSelector(getInvoiceLogo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelLogoClick = () => {
    dispatch(setInvoiceLogo(null));
    dispatch(setColors(initialColors)); // Clear colors when logo is canceled
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
      const dominantColors = colorThief.getPalette(img, 16);

      const hexColors = dominantColors.map(
        (rgb) => `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`
      );

      dispatch(setColors(hexColors)); // Store colors in Redux
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
            sx={{ maxWidth: "120px", maxHeight: "70px", overflow: "hidden" }}
          >
            <Image
              src={googleImage(invoiceLogo as string)}
              alt="Selected Logo"
              width={120}
              height={34}
              style={{ objectFit: "contain" }}
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
