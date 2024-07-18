"use client";
import { getTax } from "@/redux/features/invoiceSetting";
import { palette } from "@/theme/palette";
import { selectedColor } from "@/utils/common";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

const InvoiceSummary: FC = () => {
  const selectedTax = useSelector(getTax);
  return (
    <Stack
      direction={"column"}
      sx={{
        borderRadius: 1,
        width: "240px",
        // height: "176px",
        border: `1px solid ${palette.base.borderColor}`,
      }}
    >
      {/* summary head */}
      <Box
        sx={{
          width: "239px",
          height: "30px",
          borderRadius: "3px 3px 0px 0px",
          backgroundColor: selectedColor,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography sx={{ color: palette.base.white }}>
          Invoice Summary
        </Typography>
      </Box>

      {/* summary content */}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "20px 10px 0px 10px" }}
      >
        <Typography sx={{ color: palette.base.textGreyColor }}>Subtotal</Typography>
        <Typography sx={{ color: palette.base.black }}>USD 100.00</Typography>
      </Stack>
      <hr style={{ margin: "10px" }}></hr>
     
     {selectedTax ? (<>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "5px 10px 0px 10px" }}
      >
        <Typography sx={{ color: palette.base.textGreyColor }}>Tax</Typography>
        <Typography sx={{ color: palette.base.black }}>--</Typography>
      </Stack>
      <hr style={{ margin: "10px" }}></hr>
     </>) : ''}
   
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "5px 10px 15px 10px" }}
      >
        <Typography sx={{ color: palette.base.textGreyColor }}>Total</Typography>
        <Typography sx={{ color: palette.base.black }}>USD 350.00</Typography>
      </Stack>
    </Stack>
  );
};

export default InvoiceSummary;
