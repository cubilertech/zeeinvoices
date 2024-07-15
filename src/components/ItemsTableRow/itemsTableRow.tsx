"use client";
import { palette } from "@/theme/palette";
import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ItemsTableRowProps {
  id: number;
  onRemove: (id: number) => void;
  showRemoveButton: boolean;
}

const ItemsTableRow: FC<ItemsTableRowProps> = ({
  id,
  onRemove,
  showRemoveButton,
}) => {
  return (
    <Stack direction={"column"}>
      {/* Input fields */}
      <Grid
        container
        sx={{
          backgroundColor: palette.base.white,
          borderRadius: 1,
          marginTop: 2,
        }}
        spacing={2}
      >
        <Grid sx={{ padding: "4px", paddingTop: "4px !important" }} item xs={4}>
          <TextField
            // size="small"
            sx={{
              // border: `1px solid ${palette.base.borderColor}`,
              // borderRadius: 7,
              color: palette.color.gray[700],
              width: "100%",
              height: "32px",
            }}
            id="outlined-basic"
            placeholder="Name of your product or service"
            variant="outlined"
          />
        </Grid>
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          <TextField
            // size="small"
            sx={{
              // border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
            }}
            id="outlined-basic"
            type="number"
            placeholder="1"
            variant="outlined"
          />
        </Grid>
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          <TextField
            sx={{
              // border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
            }}
            id="outlined-basic"
            type="number"
            placeholder="$ 0.0"
            variant="outlined"
          />
        </Grid>
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          <TextField
            sx={{
              // border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
            }}
            id="outlined-basic"
            type="number"
            placeholder="% 0.0"
            variant="outlined"
          />
        </Grid>
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={1.8}
        >
          <Typography
            sx={{
              color: palette.base.black,
              display: "flex",
              justifyContent: "flex-end",
              margin: "7px 7px 7px 7px",
            }}
          >
            $ 0.00
          </Typography>
        </Grid>
        {showRemoveButton && (
          <Grid
            sx={{ padding: "4px", paddingTop: "4px !important" }}
            item
            xs={0.8}
          >
            <IconButton
              onClick={() => onRemove(id)}
              aria-label="delete"
              sx={{
                alignItems:"center",
                width: "5px !important",
                height: "5px !important",
                borderRadius: 3,
              }}
            >
              <CloseIcon
                sx={{
                  width: "15px",
                  height: "15px",
                  color: palette.color.gray[300],
                  ":hover": {
                    color: "#009E74",
                  },
                }}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export default ItemsTableRow;
