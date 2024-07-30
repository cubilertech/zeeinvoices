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
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
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
import CustomPopOver from "./ClientPopOver";
import { useDispatch } from "react-redux";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { debounce } from "@/utils/common";
import ClientDetailModel from "./ClientDetailModel";

interface Data {
  name: string;
  email: string;
  company: string;
  phone: string;
  city: string;
  state: string;
  address: string;
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
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "company",
    numeric: true,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "city",
    numeric: true,
    disablePadding: false,
    label: "City",
  },
  {
    id: "state",
    numeric: true,
    disablePadding: false,
    label: "State",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
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
  search: any;
  handleChangeSearch: any;
  clientModel?: any;
  handleClientModel?: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    search,
    handleChangeSearch,
    clientModel,
    handleClientModel,
  } = props;
  const dispatch = useDispatch();
  // const handleCreate = () => {
  //   dispatch(setResetInvoiceSetting());
  //   dispatch(setResetInvoice());
  //   route.push("/");
  // };
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
          All Clients
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
        <Tooltip title="Create a new invoice">
          <Button
            variant="contained"
            onClick={handleClientModel}
            endIcon={<Icon icon="plusIcon" width={15} />}
            sx={{ height: `36px`, width: "140px" }}
          >
            Create New
          </Button>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
}
export default function AllClients() {
  const route = useRouter();
  const dispatch = useDispatch();
  const apiRoute = `${backendURL}/invoices`;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [clientModel, setClientModel] = React.useState({
    openModel: false,
    openBd: false,
  });
  const handleClientModel = () => {
    console.log("handleClientModel");
    setClientModel({
      openModel: true,
      openBd: true,
    });
  };

  const {
    mutate: deleteInvoice,
    isLoading: deleteInvoiceLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
  const {
    data: invoiceList,
    refetch: refetchInvoiceList,
    isFetching: fetchingInvoiceList,
  } = useFetchAllDocument(apiRoute, page, rowsPerPage, search);
  React.useEffect(() => {
    refetchInvoiceList();
    if (deleteSuccess) {
      setIsModalOpen(false);
    }
  }, [refetchInvoiceList, deleteSuccess, page]);
  const debouncedRefetch = React.useCallback(
    debounce(() => {
      if (page === 1) {
        refetchInvoiceList();
      } else {
        setPage(1);
      }
    }, 500),
    [search]
  );
  const handleChangeSearch = (e: any) => {
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
  // Delete modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<null | number>(null);
  const handleDelete = () => {
    setIsModalOpen(false);
  };
 const handleSubmitForm =(values:any)=>{
  console.log(values,'valuessss')
 }
  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const handleViewInvoice = (id: number) => {
    route.push(`/invoices/${id}`);
  };
  //Edit Invoice
  const handleEditInvoice = (record: any) => {
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
        <EnhancedTableToolbar
          clientModel={clientModel}
          handleClientModel={handleClientModel}
          numSelected={selected.length}
          search={search}
          handleChangeSearch={handleChangeSearch}
        />
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
              rowCount={invoiceList?.invoices?.length}
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
                      <TableCell align="left" sx={{ paddingLeft: "17px" }}>
                        <Typography variant="text-sm-regular">
                          {tableFormatDate(row.invoiceDate)}
                        </Typography>
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
                        />
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
      <ClientDetailModel
      handleSubmitForm={handleSubmitForm}
        type="Add"
        clientModel={clientModel}
        setClientModel={setClientModel}
      />
    </Box>
  );
}
