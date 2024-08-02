"use client";
import {
  getDetails,
  getDueDate,
  getTax,
  setDetails,
  setDueDate,
  setTax,
} from "@/redux/features/invoiceSetting";
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,  
  Typography,
} from "@mui/material";
import { FC, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SwitchInput {
  lable?: string;
  type?: string;
}
const SwitchInput: FC<SwitchInput> = ({ lable, type }) => {
  const [checked, setChecked] = useState<boolean>(true);
  const dispatch = useDispatch();
  const dueDate = useSelector(getDueDate);
  const tax = useSelector(getTax);
  const details = useSelector(getDetails); 
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (type === "due") {
      dispatch(setDueDate());
    } else if (type === "tax") {
      dispatch(setTax());
    } else {
      dispatch(setDetails());
    }
    
  };
  const checkedValue =()=>{
    if (type === "due") {
     return dueDate;
    } else if (type === "tax") {
   return   tax;
    } else {
    return  details;
    }
  } 
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
        <Typography variant="text-xs-regular" sx={{ marginTop: 1 }}>
          {lable}
        </Typography>
        <FormControlLabel
          sx={{ marginRight: -1 }}
          control={
            <Switch sx={{ m: 1 }} checked={checkedValue()} onChange={handleChange} />
          }
          label=""
        />
      </Stack>
    </Box>
  );
};

export default SwitchInput;
