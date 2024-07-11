"use client";
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
import { platform } from "os";

interface SelectInput {
  width?: string | number;
  type?: string;
  menuData?: string[];
}
const SelectInput: FC<SelectInput> = ({ type, menuData, width = 200 }) => {
  return (
    <Box borderRadius={1} sx={{ height: 60 }}>
      <Stack direction={"column"} spacing={0.5}>
        <Typography variant="body1">{type}</Typography>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          IconComponent={() => <Icon icon="arrowDown" />}
          labelId="demo-simple-select-label"
          id="type-select"
          value="Select"
          // label="Age"
          displayEmpty
          placeholder="Select"
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: palette.base.white, // Change dropdown background color
              },
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: "grey" }}>Select</span>; // Placeholder text styling
            }
            return selected;
          }}
          sx={{
            width: { width },
            height: 36,
            // backgroundColor:"black",
            borderColor: `${palette.borderColor.borderColor}  !important`,
            border: 1,
            borderRadius: 2,
            paddingRight: 2,
            marginTop: 0,
            backgroundColor: palette.base.white,
          }}
        >
          {menuData &&
            menuData?.map((item) => (
              <MenuItem
                sx={{
                  color: palette.base.black,
                  backgroundColor: palette.base.white,
                  "&.Mui-selected": {
                    bgcolor: "lightgreen", // Change background color of selected item
                    color: "darkblue", // Change text color of selected item
                    "&:hover": {
                      bgcolor: "lightgreen", // Keep background color on hover for selected item
                    },
                  },
                  "&:hover": {
                    bgcolor: "lightgrey", // Change background color on hover
                  },
                }}
                value={10}
              >
                {item}
              </MenuItem>
            ))}
          {/* <MenuItem value={10}>type1</MenuItem> */}
          {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
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

export default SelectInput;
