"use client";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { palette } from "@/theme/palette";

interface SelectInput {
  width?: string | number;
  type?: string;
  menuData?: string[];
}
const SelectInput: FC<SelectInput> = ({ type, menuData, width = 200 }) => {
  const [selected, setSelected] = useState<null | string>(null);
  return (
    <Box borderRadius={1} sx={{ height: 60 }}>
      <Stack direction={"column"} spacing={0.5}>
        <Typography variant="body1">{type}</Typography>
        <Select
          IconComponent={() => <Icon icon="arrowDownIcon" />}
          labelId="demo-simple-select-label"
          id="type-select"
          value={selected}
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
            return <span style={{ color: "black" }}>{selected}</span>;
          }}
          sx={{
            width: { width },
            height: 36,
            // backgroundColor:"black",
            borderColor: `${palette.base.borderColor}  !important`,
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
                onClick={() => setSelected(item)}
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
        </Select>
      </Stack>
    </Box>
  );
};

export default SelectInput;
