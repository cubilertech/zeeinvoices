"use client";
import { palette } from "@/theme/palette";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Icon } from "../Icon";
import { ItemsTableRow } from "../ItemsTableRow";

const InvoiceItemsTable: FC = () => {
  const [items, setItems] = useState([{ id: 1 }]); // Initialize with one item
  const [itemsCount, setItemsCount]  = useState(2);
  const handleAddItem = () => {
    setItemsCount((pre) => pre + 1);
    setItems([...items, { id: itemsCount }]); // Add new item with unique id
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id)); // Remove item by id
  };

  return (
    <Stack direction={"column"}>
      {/* Table header */}
      <Grid
        container
        sx={{
          backgroundColor: palette.base.itemsHeadColor,
          borderRadius: 1,
          marginTop: 2,
        }}
        spacing={2}
      >
        <Grid sx={{ padding: "0px", paddingTop: "8px !important" }} item xs={4}>
          <Typography sx={{ color: palette.base.white }}>Items</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>QTY/HRS</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>Rate</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>Tax</Typography>
        </Grid>
        <Grid sx={{ padding: "8px", paddingTop: "8px !important" }} item xs={2}>
          <Typography sx={{ color: palette.base.white }}>Subtotal</Typography>
        </Grid>
      </Grid>

      {/* Input fields */}
      {/* <ItemsTableRow/> */}

      {/* Render ItemsTableRow components */}
      {items.map((item,index) => (
        <ItemsTableRow
          key={item.id}
          id={item.id}
          onRemove={handleRemoveItem}
          showRemoveButton={items[index].id === 1 ? false : true} // Show remove button only if there's more than one item
        />
      ))}

      {/* add items button */}

      <Box
        onClick={handleAddItem}
        sx={{
          height: "40px",
          width: "100%",
          marginTop: "10px",
          border: `2px dashed ${palette.base.borderColor}`,
          borderRadius: 1,
          cursor: "pointer",
          backgroundColor: palette.color.gray[10],
          marginBottom: "70px",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box sx={{ padding: 1 }}>
            <Icon icon="addCircleOutlinedIcon" width={20} height={20} />
          </Box>
          <Typography variant="caption" sx={{ color: palette.base.black }}>
            Add New Invoice Item
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

// const TableRow: FC = () => {
//   return(

//   );
// };

export default InvoiceItemsTable;
