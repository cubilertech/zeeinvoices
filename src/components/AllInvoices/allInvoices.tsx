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
  CircularProgress,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import { Icon } from "../Icon";
import { Pagination } from "../Pagination";
import { backendURL } from "@/utils/constants";
import {
  useDeleteDocument,
  useFetchAllDocument,
} from "@/utils/ApiHooks/common";
import { calculateAmount, tableFormatDate } from "@/common/common";
import { useRouter } from "next/navigation";
import DeleteModal from "../DeleteModal/deleteModal";
import CustomPopOver from "./CustomPopOver";
import { useDispatch, useSelector } from "react-redux";
import { setFullInvoice, setResetInvoice } from "@/redux/features/invoiceSlice";
import {
  setInvoiceSettings,
  setResetInvoiceSetting,
} from "@/redux/features/invoiceSetting";
import InvoiceDetailsSection from "../InvoiceDetailsSection/invoiceDetailsSection";
import { debounce } from "@/utils/common";

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

// const rows =
// [
//   createData(1, "Penny Lane Badgely", "abcdefghi@gmail.com", "13 May 2024", "complete", 4.3, ''),
// ];

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
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
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
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
  search:any;
  handleChangeSearch:any; 
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected ,search,handleChangeSearch } = props;
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
          value={search}
          onChange={(e)=>handleChangeSearch(e)}
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
          onClick={handleCreate}
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
  const route = useRouter();
  const dispatch = useDispatch();
  const invoiceDetail = useSelector((state: any) => state.invoice);
  const invoiceSetting = useSelector((state: any) => state.invoiceSetting);
  const componentRef = React.useRef();
  const apiRoute = `${backendURL}/invoices`;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {
    mutate: deleteInvoice,
    isLoading: deleteInvoiceLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
  const {
    data: invoiceList,
    refetch: refetchInvoiceList,
    isFetching: fetchingInvoiceList,
  } = useFetchAllDocument(apiRoute,page, rowsPerPage, search);
  React.useEffect(() => {
    refetchInvoiceList();
    if (deleteSuccess) {
      setIsModalOpen(false);
    }
  }, [refetchInvoiceList, deleteSuccess,page]);
  const debouncedRefetch = React.useCallback(
    debounce(() => {
      if(page === 1){
        refetchInvoiceList();
        }
        else{
          setPage(1);
        }
    }, 500),
    [search]
  );
  const handleChangeSearch = (e:any) => {
    setSearch(e.target.value);
    debouncedRefetch();
  };
  const filteredData = React.useMemo(() => {
    if (invoiceList && invoiceList?.invoices?.length) {
      return invoiceList?.invoices;
    } else {
      return [];
    }
  }, [invoiceList, search]);

  // console.log(invoiceList, fetchingInvoiceList, "setPage",setPage);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const visibleRows = React.useMemo(
    () =>
      stableSort(invoiceList?.invoices, getComparator(order, orderBy))?.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, invoiceList?.invoices]
  );

  // Delete modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<null | number>(null);

  const handleDelete = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const handleViewInvoice = (id: number) => {
    route.push(`/invoices/${id}`);
  };
  const handleEditInvoice = (record: any) => {
    // console.log(record, "recordss");
    dispatch(
      setFullInvoice({
        id: record?.id,
        logo: record?.image,
        invoiceType: record?.type,
        from: record?.from,
        to: record?.to,
        invoiceDate: record?.invoiceDate,
        dueDate: record?.dueDate,
        addtionalNotes: record?.notes,
        invoiceItem: record?.items,
      })
    );
    dispatch(
      setInvoiceSettings({
        color: record?.settings.color,
        currency: record?.settings.currency,
        dueDate: record?.settings.dueDate,
        tax: record?.settings.tax,
        detail: record?.settings.detail,
      })
    );
    route.push(`/invoices/${record.id}/edit`);
  };
  const handleShareInvoice = (record: any) => {
    route.push(`/preview/${record.id}`);
  };
  const handlePrintInvoice = (record: any):Promise<void> => {
    console.log(record, "recordss");
    dispatch(
      setFullInvoice({
        id: record?.id,
        logo: record?.image,
        invoiceType: record?.type,
        from: record?.from,
        to: record?.to,
        invoiceDate: record?.invoiceDate,
        dueDate: record?.dueDate,
        addtionalNotes: record?.notes,
        invoiceItem: record?.items,
      })
    );
    dispatch(
      setInvoiceSettings({
        color: record?.settings?.color,
        currency: record?.settings?.currency,
        dueDate: record?.settings?.dueDate,
        tax: record?.settings?.tax,
        detail: record?.settings?.detail,
      })
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 50); 
    });
  };
  const handleOpenDeleteModal = (id: number) => {
    setItemToDelete(id as number);
    setIsModalOpen(true);
  };
  const invoiceDelete = () => {
    console.log(itemToDelete, "id");
    deleteInvoice({ apiRoute: `${backendURL}/invoices/${itemToDelete}` });
  };

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
        <EnhancedTableToolbar numSelected={selected.length} search={search} handleChangeSearch={handleChangeSearch} />
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
            // size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={invoiceList.invoices?.length}
            />
            {fetchingInvoiceList ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                  alignItems: "center",
                  height: "56vh",
                }}
              >
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
              </Box>
            ) : (
              <TableBody>
                {filteredData?.map((row: any, index: number) => {
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
                            {row.to.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Stack direction={"column"}>
                            <Typography variant="text-sm-medium">
                              {row.to.name}
                            </Typography>
                            <Typography variant="text-xs-regular">
                              {row.to.email}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="left" sx={{ paddingLeft: "17px" }}>
                        <Typography variant="text-sm-regular">
                          {tableFormatDate(row.invoiceDate)}
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
                      <TableCell align="left">
                        {row.settings.currency}{" "}
                        {calculateAmount(row.items).toFixed(2)}
                      </TableCell>
                      <TableCell align="left">
                        <CustomPopOver
                          handleOpenDeleteModal={handleOpenDeleteModal}
                          record={row}
                          handleViewInvoice={handleViewInvoice}
                          handleEditInvoice={handleEditInvoice}
                          handleShareInvoice={handleShareInvoice}
                          handlePrintInvoice={handlePrintInvoice}
                          componentRef={componentRef}
                        />
                        <Box>
                          <Box style={{ display: "none" }}>
                            <Box ref={componentRef}>
                              <InvoiceDetailsSection
                                singleInvoice={{ ...invoiceDetail }}
                                invoiceSetting={{ ...invoiceSetting }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Pagination
          totalRecords={
            invoiceList?.totalRecords ? invoiceList?.totalRecords : 0
          }
          itemsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
        />
      </Paper>
      <DeleteModal
        open={isModalOpen}
        onDelete={handleDelete}
        onClose={handleDeleteModalClose}
        invoiceDelete={invoiceDelete}
      />
    </Box>
  );
}
