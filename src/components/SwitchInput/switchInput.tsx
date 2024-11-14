"use client";
import {
  getDetails,
  getDiscount,
  getDueDate,
  getSignature,
  getTax,
  getTerms,
  getWatermark,
  setDetails,
  setDiscount,
  setDueDate,
  setSignature,
  setTax,
  setTerms,
  setWatermark,
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
  const discount = useSelector(getDiscount);
  const signature = useSelector(getSignature);
  const terms = useSelector(getTerms);
  const watermark = useSelector(getWatermark);
  const details = useSelector(getDetails);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (type === "due") {
      dispatch(setDueDate());
    } else if (type === "tax") {
      dispatch(setTax());
    } else if (type === "discount") {
      dispatch(setDiscount());
    } else if (type === "signature") {
      dispatch(setSignature());
    } else if (type === "terms") {
      dispatch(setTerms());
    } else if (type === "watermark") {
      dispatch(setWatermark());
    } else {
      dispatch(setDetails());
    }
  };
  const checkedValue = () => {
    if (type === "due") {
      return dueDate;
    } else if (type === "tax") {
      return tax;
    } else if (type === "discount") {
      return discount;
    } else if (type === "signature") {
      return signature;
    } else if (type === "terms") {
      return terms;
    } else if (type === "watermark") {
      return watermark;
    } else {
      return details;
    }
  };

  useEffect(() => {
    if (!terms) {
      dispatch(setAddtionalNotes(""));
    }
  }, [terms, dispatch]);

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
