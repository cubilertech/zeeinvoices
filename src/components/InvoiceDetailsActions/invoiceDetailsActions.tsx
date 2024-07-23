"use client";
import { palette } from "@/theme/palette";
import { Box, Button } from "@mui/material";
import React, { FC } from "react";

const InvoiceDetailsActions: FC = () => {
  return (
    <Box
      borderRadius={3}
      sx={{
        width: 372,
        height: 232,
        backgroundColor: palette.base.white,
        py: "40px",
        px: "24px",
        borderRadius: "4px",
        border: `1px solid #E7EAEE`,
      }}
    >
      <Button variant="contained" sx={{ width: "100%" }}>
        Download PDF
      </Button>
      <Button variant="outlined" sx={{ width: "100%", marginTop: "15px" }}>
        Save
      </Button>
      <Button
        variant="contained"
        sx={{ width: "100%", backgroundColor: "#DD3409", marginTop: "15px",
          "&:hover": {
                    backgroundColor: "#BB3409",
                  },
         }}
      >
        Delete
      </Button>
    </Box>
  );
};

export default InvoiceDetailsActions;
