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
import { palette } from "@/theme/palette";

interface EnhancedTableToolbarProps {
  numSelected: number;
  search: any;
  handleChangeSearch: any;
  handleClientAddModel?: any;
}

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = (
  props: EnhancedTableToolbarProps
) => {
  const { numSelected, search, handleChangeSearch, handleClientAddModel } =
    props;
  return (
    <Toolbar
      sx={{
        minHeight: "44px !important",
        px: "0px",
        pl: "0px !important",
        pr: "0px !important",
        alignItems: { sm: "center", xs: "flex-start" },
        justifyContent: "space-between",
        flexDirection: { sm: "row", xs: "column" },
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
            flex: "1 1 100%",
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
          Recipients
        </Typography>
      )}
      <Stack
        direction={{ sm: "row", xs: "column-reverse" }}
        gap={{ sm: 0, xs: 1.5 }}
        sx={{ width: { sm: "auto", xs: "100%" } }}
      >
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
            border: "1px solid #CDD5DF",
            boxShadow: palette.boxShadows.shadowxs,
          }}
        >
          <TextField
            variant="standard"
            placeholder="Search"
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
                  <Icon icon="searchIcon" width={20} height={20} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          gap={1}
          sx={{
            marginLeft: { sm: "12px", xs: "0px" },
            width: { sm: "auto", xs: "100%" },
          }}
        >
          <Tooltip title="Create a new client">
            <Button
              variant="contained"
              onClick={handleClientAddModel}
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
                backgroundColor: palette.primary.main,
              }}
            >
              Create New
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
