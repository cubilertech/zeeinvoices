"use client"
import {
  Box,
  Button,
  grid2Classes,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { grey } from "@mui/material/colors";
import { palette } from "@/theme/palette";
import { icons } from "@/utils/constants";
import {
  ArrowDownward,
  ArrowDownwardOutlined,
  ArrowDownwardRounded,
  ArrowDropDown,
  ArrowDropDownCircleRounded,
  ArrowDropDownOutlined,
  ArrowDropDownRounded,
  LogoDev,
} from "@mui/icons-material";

interface InvoiceType {
  type: string;
}
const InvoiceType: FC<InvoiceType> = ({ type }) => {
  return (
    <Box borderRadius={1} sx={{ width: 240, height: 60 }}>
      <Stack direction={"column"} spacing={0.5}>
        <Typography variant="body1">{type}</Typography>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          IconComponent={() => <Icon icon="arrowDown" />}
          labelId="demo-simple-select-label"
          id="type-select"
          value="Select"
          label="Age"
          sx={{
            width: 240,
            height: 36,
            // backgroundColor:"black",
            borderColor: `${palette.borderColor.borderColor}  !important`,
            border:1,
            borderRadius: 2,
            paddingRight:2,
            marginTop: 0,
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {/* <Box
          borderRadius={2}
          sx={{
            border: "1px solid",
            padding: 0.7,
            width: 240,
            height: 36,
            cursor: "pointer",
            paddingRight: 2,
            paddingLeft: 2,
            borderColor: palette.borderColor.borderColor,
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              variant="text-md-regular"
              sx={{ width: 184, 
                height: 24,
                alignItems: "center",
                color:palette.textGreyColor.textGreyColor
               }}
            >
              Select
            </Typography>
            <Icon icon="arrowDown" height={16} width={16} />
          </Stack>
        </Box> */}
      </Stack>
    </Box>
  );
};

export default InvoiceType;
