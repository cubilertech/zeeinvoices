"use client";

import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { alpha, Button, InputAdornment, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon";

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props;
    const route = useRouter();
    const dispatch = useDispatch();
    const handleCreate = () => {
      dispatch(setResetInvoiceSetting());
      dispatch(setResetInvoice());
      route.push("/");
    };
  
    return (
      <Toolbar
        sx={{
          px: "0px",
          pl: "0px !important",
          pr: "0px !important",
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
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            All Invoices
          </Typography>
        )}
        <Stack
          direction={"row"}
          sx={{
            backgroundColor: "#FAFAFA",
            borderRadius: "8px",
            width: "292px",
            paddingLeft: "15px",
          }}
        >
          <TextField
            variant="standard"
            placeholder="Search"
            sx={{
              border: "none",
              textUnderlinePosition: "unset",
              "& .MuiInputBase-input": { border: "none" },
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
        <Stack direction={"row"} gap={1} sx={{ marginLeft: "50px" }}>
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
          <Tooltip title="Create a new invoice">
            <Button
              variant="contained"
              onClick={handleCreate}
              endIcon={<Icon icon="plusIcon" width={15} />}
              sx={{ height: `36px`, width: "140px" }}
            >
              Create New
            </Button>
          </Tooltip>
        </Stack>
      </Toolbar>
    );
};

export default EnhancedTableToolbar;