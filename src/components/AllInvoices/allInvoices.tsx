"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { palette } from "@/theme/palette";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Icon } from "../Icon";
import { Pagination } from "../Pagination";

interface Data {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
  total: number;
  action: any;
}

function createData(
  id: number,
  name: string,
  email: string,
  date: string,
  status: string,
  total: number,
  action: any
): Data {
  return {
    id,
    name,
    email,
    date,
    status,
    total,
    action,
  };
}

const rows = 
[
  createData(1, "Penny Lane Badgely", "Pennylane@gmail.com", "13 May 2024", "complete", 4.3, ''),
  createData(2, "John Doe", "johndoe@example.com", "01 June 2024", "pending", 3.8, ''),
  createData(3, "Jane Smith", "janesmith@example.com", "15 April 2024", "complete", 4.7, ''),
  createData(4, "Michael Brown", "michaelbrown@example.com", "22 March 2024", "in-progress", 4.0, ''),
  createData(5, "Emily Davis", "emilydavis@example.com", "30 May 2024", "complete", 4.5, ''),
  createData(6, "Chris Wilson", "chriswilson@example.com", "18 February 2024", "pending", 3.9, ''),
  createData(7, "Patricia Taylor", "patriciataylor@example.com", "12 April 2024", "complete", 4.6, ''),
  createData(8, "Robert Johnson", "robertjohnson@example.com", "05 July 2024", "in-progress", 4.2, ''),
  createData(9, "Linda Martinez", "lindamartinez@example.com", "27 May 2024", "complete", 4.4, ''),
  createData(10, "James Anderson", "jamesanderson@example.com", "10 June 2024", "pending", 4.1, ''),
  createData(11, "Barbara Moore", "barbaramoore@example.com", "14 June 2024", "complete", 4.8, ''),
  createData(12, "Steven Lee", "stevenlee@example.com", "20 March 2024", "in-progress", 4.3, ''),
  createData(13, "Jessica Walker", "jessicawalker@example.com", "25 May 2024", "complete", 4.9, ''),
  createData(14, "Daniel Harris", "danielharris@example.com", "30 April 2024", "pending", 4.0, ''),
  createData(15, "Sarah Young", "sarahyoung@example.com", "05 June 2024", "complete", 4.7, ''),
  createData(16, "Thomas Hall", "thomashall@example.com", "10 May 2024", "in-progress", 4.1, ''),
  createData(17, "Nancy King", "nancyking@example.com", "15 July 2024", "complete", 4.5, ''),
  createData(18, "Kevin Wright", "kevinwright@example.com", "20 June 2024", "pending", 3.9, ''),
  createData(19, "Laura Green", "lauragreen@example.com", "25 April 2024", "complete", 4.6, ''),
  createData(20, "Andrew Adams", "andrewadams@example.com", "01 July 2024", "in-progress", 4.2, '')
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Created",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
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
    label: " ",
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

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
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
            sx={{ height: `40 !important`, py: "0px" }}
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
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
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

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
        <Button
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
        </Button>
        <Button
          variant="contained"
          endIcon={<Icon icon="plusIcon" width={15} />}
          sx={{ height: `36px`, width: "140px" }}
        >
          Create New
        </Button>
      </Stack>
    </Toolbar>
  );
}
export default function AllInvoices() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(1);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  
  // Avoid a layout jump when reaching the last page with empty rows.
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );
  

  return (
    <Box
      sx={{
        width: "100%",
        px: "20px",
        marginTop: "65px",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{ width: "100%", px: "20px", mb: 2, pb: 1, border: "none" }}
      >
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer
          sx={{
            border: `1px solid ${palette.border.invoicesBorderColor}`,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ paddingLeft: "20px" }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction={"row"} gap={1}>
                        <Avatar
                          sx={{
                            bgcolor: palette.primary.main,
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          P
                        </Avatar>
                        <Stack direction={"column"}>
                          <Typography variant="text-sm-medium">
                            {row.name}
                          </Typography>
                          <Typography variant="text-xs-regular">
                            {row.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" sx={{ paddingLeft: "17px" }}>
                      <Typography variant="text-sm-regular">
                        {row.date}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Badge
                        color="primary"
                        badgeContent={row.status}
                        sx={{
                          paddingLeft: "37px",
                          "& .MuiBadge-colorPrimary": {
                            background: "skyblue",
                          },
                        }}
                      ></Badge>
                    </TableCell>
                    <TableCell align="left">{row.total}</TableCell>
                    <TableCell align="left">
                      <IconButton>
                        <Icon icon="threeDotsIcon" width={5} height={5} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
             </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          totalRecords={rows?.length ? rows?.length : 0}
          itemsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
        />
      </Paper>
    </Box>
  );
}
