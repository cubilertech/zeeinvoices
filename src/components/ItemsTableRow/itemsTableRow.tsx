"use client";
import { palette } from "@/theme/palette";
import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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
              // border: `1px solid ${palette.borderColor.borderColor}`,
              borderRadius: 1,
              color: palette.color.gray[700],
              width: "100%",
              height: "32px",
            }}
            id="outlined-basic"
            placeholder="Name of your product or service"
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ padding: "4px", paddingTop: "4px !important" }} item xs={2}>
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
        <Grid sx={{ padding: "4px", paddingTop: "4px !important" }} item xs={2}>
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
        <Grid sx={{ padding: "4px", paddingTop: "4px !important" }} item xs={2}>
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
        <Grid sx={{ padding: "4px", paddingTop: "4px !important" }} item xs={2}>
          <Typography
            sx={{
              color: palette.base.black,
              display: "flex",
              justifyContent: "flex-end",
              margin: "7px 7px 7px 7px",
            }}
          >
            $ 0.00 ({id})
          </Typography>
        </Grid>

        {/* // description section */}
        <Grid
          sx={{ padding: "4px", paddingTop: "4px !important" }}
          item
          xs={10}
        >
          <TextField
            size="medium"
            sx={{
              width: "100%",
            }}
            id="outlined-basic"
            placeholder="Description"
            variant="outlined"
          />
        </Grid>
        {/* Remove button */}
        {showRemoveButton && (
          <Grid
            sx={{
              padding: "4px",
              paddingTop: "4px !important",
              display: "flex",
              justifyContent: "flex-end",
            }}
            item
            xs={2}
          >
            <IconButton
              onClick={() => onRemove(id)}
              aria-label="delete"
              sx={{ width: "0px" }}
            >
              <DeleteIcon
                sx={{
                  color: palette.color.gray[100],
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "20px",
                }}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

// const TableRow: FC = () => {
//   return(

//   );
// };

export default ItemsTableRow;
