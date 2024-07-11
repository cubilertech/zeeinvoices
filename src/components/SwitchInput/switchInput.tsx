"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  FormControlLabel,
  Stack,
  styled,
  Switch,
  SwitchProps,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface SwitchInput {
  lable?: string;
}

// const IOSSwitch = styled((props: SwitchProps) => (
//   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
//   width: 40,
//   height: 18,
//   padding: 0,
//   "& .MuiSwitch-switchBase": {
//     padding: 0,
//     margin: 0.4,
//     transitionDuration: "300ms",
//     "&.Mui-checked": {
//       transform: "translateX(16px)",
//       color: "#fff",
//       "& + .MuiSwitch-track": {
//         backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
//         opacity: 1,
//         border: 0,
//       },
//       "&.Mui-disabled + .MuiSwitch-track": {
//         opacity: 0.5,
//       },
//     },
//     "&.Mui-focusVisible .MuiSwitch-thumb": {
//       color: "#33cf4d",
//       border: "6px solid #fff",
//     },
//     "&.Mui-disabled .MuiSwitch-thumb": {
//       color:
//         theme.palette.mode === "light"
//           ? theme.palette.grey[100]
//           : theme.palette.grey[600],
//     },
//     "&.Mui-disabled + .MuiSwitch-track": {
//       opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     boxSizing: "border-box",
//     width: 17,
//     height: 17,
//   },
//   "& .MuiSwitch-track": {
//     borderRadius: 26 / 2,
//     width: 35,
//     backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
//     opacity: 1,
//     transition: theme.transitions.create(["background-color"], {
//       duration: 500,
//     }),
//   },
// }));

const SwitchInput: FC<SwitchInput> = ({ lable }) => {
  return (
    <Box
      borderRadius={1}
      sx={{
        width: "100%",
        height: "32px",
        my: "5px",
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="body1"
        sx={{marginTop:1}}
        >{lable}</Typography>
        <FormControlLabel
        sx={{marginRight:-1}}
          control={<Switch sx={{ m: 1 }} defaultChecked />}
          label=""
        />
      </Stack>
    </Box>
  );
};

export default SwitchInput;
