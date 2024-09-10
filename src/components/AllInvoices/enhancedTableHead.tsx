"use client";

import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

import React, { FC } from "react";

import { palette } from "@/theme/palette";
import { visuallyHidden } from "@mui/utils";
import { Icon } from "../Icon";

interface Data {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
  total: number;
  action: any;
}
type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Invoice #",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Receipent",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Created",
  },
  // {
  //   id: "status",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Status",
  // },

  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead: FC<EnhancedTableProps> = (
  props: EnhancedTableProps
) => {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
      order === "asc";
    };

  return (
    <TableHead
      sx={{
        backgroundColor: palette.border.invoicesBorderColor,
        height: "40px !important",
        borderTopRightRadius: 9,
      }}
    >
      <TableRow sx={{ height: "40px !important", borderTopRightRadius: 9 }}>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ height: `40px !important`, py: "0px" }}
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={(props) => (
                <span
                  {...props}
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "7px",
                  }}
                >
                  <Icon icon="sortIcon" width={16} height={16} />
                </span>
              )}
              // IconComponent={orderBy === headCell.id && order === "desc" ? ArrowDownwardIcon : ArrowUpwardIcon}
            >
              <Typography
                variant="text-xs-medium"
                sx={{ color: palette.color.gray[840] }}
              >
                {headCell.label}
              </Typography>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
