"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { SelectInput } from "../SelectInput";
import { SwitchInput } from "../SwitchInput";

interface InvoiceSettings {
  currencyMenuData?: string[];
}

const InvoiceSettings: FC<InvoiceSettings> = (currencyMenuData) => {
  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  return (
    <Box
      borderRadius={3}
      sx={{
        width: 357,
        height: 776,
        backgroundColor: palette.base.white,
        padding: 2,
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
      <Stack direction={"column"}>
        <Typography variant="h6" sx={{ paddingBottom: 2, paddingTop: 1 }}>
          Invoice Settings
        </Typography>
        {/* Color palette for color selection */}
        <Box
          sx={{
            width: "317px",
            height: "154px",
            backgroundColor: palette.color.eggWhite,
          }}
        ></Box>
        {/* Currency selection */}
        <Typography variant="body1" sx={{ paddingBottom: 2, paddingTop: 2 }}>
          Currency
        </Typography>
        <hr></hr>
        <Box sx={{ width: "100%", marginTop: 1 }}>
          <SelectInput width={"100%"} menuData={["$ USD", "RS", "ADE"]}></SelectInput>
        </Box>
        <Typography variant="body1" sx={{ paddingBottom: 2, paddingTop: 0 }}>
          Invoice Detail
        </Typography>
        <hr></hr>
        <Box sx={{ px: 2 }}>
          <SwitchInput lable="Due date"></SwitchInput>
          <SwitchInput lable="Tax"></SwitchInput>
          <SwitchInput lable="Shipping details"></SwitchInput>
        </Box>
      </Stack>
    </Box>
  );
};

export default InvoiceSettings;
