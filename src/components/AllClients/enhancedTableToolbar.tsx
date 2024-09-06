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
          All Recipients
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
      <Stack direction={"row"} gap={1} sx={{ marginLeft: "50px" }}>
        <Tooltip title="Create a new client">
          <Button
            variant="contained"
            onClick={handleClientAddModel}
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
