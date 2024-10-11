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
import { palette } from "@/theme/palette";

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
        minHeight: "44px !important",
        px: "0px",
        pl: "0px !important",
        pr: "0px !important",
        flexDirection: { sm: "row", xs: "column" },
        // justifyContent: {sm: ""}
        alignItems: { sm: "center", xs: "flex-start" },
        justifyContent: "space-between",
        gap: { sm: 0, xs: 2 },
        py: { sm: 0, xs: 0 },
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
          sx={{
            // flex: "1 1 100%",
            color: palette.color.gray[900],
            fontSize: { md: "24px !important", xs: "24px !important" },
            lineHeight: {
              md: "29px !important",
              xs: "29px !important",
            },
            fontWeight: 600,
          }}
          variant="text-lg-semibold"
          id="tableTitle"
          component="div"
        >
          Invoices
        </Typography>
      )}

      <Stack
        direction={{ sm: "row", xs: "column" }}
        gap={{ sm: 0, xs: 1.5 }}
        sx={{ width: { sm: "auto", xs: "100%" } }}
      >
        {props.type === 2 ? (
          ""
        ) : (
          <Stack
            direction={"row"}
            sx={{
              height: "44px",
              backgroundColor: palette.base.white,
              borderRadius: "4px",
              width: { sm: "451px", xs: "100%" },
              px: "14px",
              py: "10px",
              flexDirection: { sm: "row", xs: "column" },
              alignItems: { sm: "center", xs: "flex-start" },
              justifyContent: { sm: "start", xs: "center" },
              border: "1px solid #0000001A",
              boxShadow: palette.boxShadows.shadowxs,
            }}
          >
            <TextField
              variant="standard"
              placeholder="Search"
              // type="number"
              value={search}
              onChange={(e) => handleChangeSearch(e)}
              sx={{
                width: "100%",
                border: "none",
                textUnderlinePosition: "unset",
                "& .MuiInputBase-input": {
                  border: "none",
                  height: "30px",
                  pl: "0px",
                  pr: "0px",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: palette.color.gray[510],
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
            marginLeft: { sm: "12px", xs: "0px" },
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
                startIcon={<Icon icon="plusIcon" width={15} />}
                sx={{
                  height: `44px`,
                  px: "18px !important",
                  py: "12px !important",
                  borderRadius: "4px",
                  width: { sm: "157px", xs: "100%" },
                  fontSize: "16px !important",
                  lineHeight: "24px !important",
                  fontWeight: "600 !important",
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                }}
              >
                Create New
              </Button>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
