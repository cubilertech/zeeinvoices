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
        px: "0px",
        pl: "0px !important",
        pr: "0px !important",
        alignItems: { sm: "center", xs: "flex-start" },
        flexDirection: { sm: "row", xs: "column" },
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
          All Recipients
        </Typography>
      )}
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "#FAFAFA",
          borderRadius: "4px",
          width: { sm: "272px", xs: "100%" },
          paddingLeft: "15px",
          flexDirection: { sm: "row", xs: "column" },
          alignItems: { sm: "center", xs: "flex-start" },
          justifyContent: { sm: "center", xs: "start" },
          border: "1px solid #0000001A",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Search"
          value={search}
          onChange={(e) => handleChangeSearch(e)}
          sx={{
            border: "none",
            textUnderlinePosition: "unset",
            "& .MuiInputBase-input": { border: "none" },
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
      <Stack
        direction={"row"}
        gap={1}
        sx={{
          marginLeft: { sm: "10px", xs: "0px" },
          width: { sm: "auto", xs: "100%" },
        }}
      >
        <Tooltip title="Create a new client">
          <Button
            variant="contained"
            onClick={handleClientAddModel}
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
      </Stack>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
