"use client";
import {
  getDetails,
  getDueDate,
  getTax,
  getTerms,
  setDetails,
  setDueDate,
  setTax,
  setTerms,
} from "@/redux/features/invoiceSetting";
import { setAddtionalNotes } from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { FC, useState, ChangeEvent, useEffect } from "react";
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
  const terms = useSelector(getTerms);
  const details = useSelector(getDetails);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (type === "due") {
      dispatch(setDueDate());
    } else if (type === "tax") {
      dispatch(setTax());
    } else if (type === "terms") {
      dispatch(setTerms());
    } else {
      dispatch(setDetails());
    }
  };
  const checkedValue = () => {
    if (type === "due") {
      return dueDate;
    } else if (type === "tax") {
      return tax;
    } else if (type === "terms") {
      return terms;
    } else {
      return details;
    }
  };

  useEffect(() => {
    if (!terms) {
      dispatch(setAddtionalNotes(""));
    }
  }, [terms]);

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
        <Typography
          variant="text-md-regular"
          sx={{ marginTop: 1, color: palette.color.gray[610] }}
        >
          {lable}
        </Typography>
        <FormControlLabel
          sx={{ marginRight: -1 }}
          control={
            <Switch
              sx={{ m: 1 }}
              checked={checkedValue()}
              onChange={handleChange}
            />
          }
          label=""
        />
      </Stack>
    </Box>
  );
};

export default SwitchInput;
