"use client";
import {
  alpha,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Icon } from "../Icon";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";

interface EnhancedTableToolbarProps {
  numSelected: number;
  search: any;
  handleChangeSearch: any;
  type?: number;
}

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = (
  props: EnhancedTableToolbarProps
) => {
  const { numSelected, search, handleChangeSearch } = props;
  const dispatch = useDispatch();
  const route = useRouter();
  const handleCreate = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    route.push("/create-new-invoice");
  };
  return (
    <Toolbar
      sx={{
        px: "0px",
        pl: "0px !important",
        pr: "0px !important",
        flexDirection: { sm: "row", xs: "column" },
        // justifyContent: {sm: ""}
        alignItems: { sm: "center", xs: "flex-start" },
        gap: { sm: 0, xs: 2 },
        py: { sm: 0, xs: 3 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%", color: "#1B2533" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", color: "#1B2533" }}
          variant="text-lg-semibold"
          id="tableTitle"
          component="div"
        >
          All Invoices
        </Typography>
      )}
      {props.type === 2 ? (
        ""
      ) : (
        <Stack
          direction={"row"}
          sx={{
            height: "36px",
            backgroundColor: "#FAFAFA",
            borderRadius: "4px",
            width: { sm: "272px", xs: "100%" },
            pl: "24px",
            flexDirection: { sm: "row", xs: "column" },
            alignItems: { sm: "center", xs: "flex-start" },
            justifyContent: { sm: "center", xs: "start" },
            border: "1px solid #0000001A",
          }}
        >
          <TextField
            variant="standard"
            placeholder="Search"
            // type="number"
            value={search}
            onChange={(e) => handleChangeSearch(e)}
            sx={{
              border: "none",
              textUnderlinePosition: "unset",
              "& .MuiInputBase-input": {
                border: "none",
                height: "30px",
                pl: "0px",
                pr: "10px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#8F97A2",
              },
            }}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="searchIcon" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
      <Stack
        direction={"row"}
        sx={{
          marginLeft: { sm: "10px", xs: "0px" },
          width: { sm: "auto", xs: "100%" },
        }}
      >
        {/* <Button
          variant="outlined"
          startIcon={<Icon icon="filterIcon" width={15} />}
          sx={{
            height: `36px`,
            width: "120px",
            borderColor: palette.border.invoicesBorderColor,
            color: palette.base.black,
          }}
        >
          Filter
        </Button> */}
        {props.type === 2 ? (
          ""
        ) : (
          <Tooltip title="Create a new invoice">
            <Button
              variant="contained"
              onClick={handleCreate}
              endIcon={<Icon icon="plusIcon" width={15} />}
              sx={{
                height: `36px`,
                borderRadius: "4px",
                width: { sm: "140px", xs: "100%" },
                fontFamily: "Product Sans, sans-serif !important",
                fontSize: "14px !important",
                fontWeight: "500 !important",
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
              }}
            >
              Create New
            </Button>
          </Tooltip>
        )}
      </Stack>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
