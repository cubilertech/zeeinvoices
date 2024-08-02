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
  Container,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Icon } from "../Icon";
import { Pagination } from "../Pagination";
import { backendURL } from "@/utils/constants";
import {
  useCreateDocument,
  useDeleteDocument,
  useEditDocument,
  useFetchAllDocument,
} from "@/utils/ApiHooks/common";
import { calculateAmount, tableFormatDate } from "@/common/common";
import { useRouter } from "next/navigation";
import DeleteModal from "../DeleteModal/deleteModal";
import ClientPopOver from "./ClientPopOver";
import { useDispatch } from "react-redux";
import { setFullInvoice } from "@/redux/features/invoiceSlice";
import { setInvoiceSettings } from "@/redux/features/invoiceSetting";
import { debounce } from "@/utils/common";
import ClientDetailModel from "./ClientDetailModel";
import { useSession } from "next-auth/react";
import EnhancedTableToolbar from "./enhancedTableToolbar";
import EnhancedTableHead from "./enhancedTableHead";
import { toast } from "react-toastify";

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

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (
//     event: React.MouseEvent<unknown>,
//     property: keyof Data
//   ) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }
// function EnhancedTableHead(props: EnhancedTableProps) {
//   const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler =
//     (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };
//   return (
//     <TableHead
//       sx={{
//         backgroundColor: palette.border.invoicesBorderColor,
//         height: "40px !important",
//         borderTopRightRadius: 9,
//       }}
//     >
//       <TableRow sx={{ height: "40px !important", borderTopRightRadius: 9 }}>
//         {headCells.map((headCell) => (
//           <TableCell
//             sx={{ height: `40 !important`, py: "0px" }}
//             key={headCell.id}
//             align="left"
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// interface EnhancedTableToolbarProps {
//   numSelected: number;
//   search: any;
//   handleChangeSearch: any;
//   handleClientAddModel?: any;
// }

// function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
//   const { numSelected, search, handleChangeSearch, handleClientAddModel } =
//     props;
//   return (
//     <Toolbar
//       sx={{
//         px: "0px",
//         pl: "0px !important",
//         pr: "0px !important",
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           All Clients
//         </Typography>
//       )}
//       <Stack
//         direction={"row"}
//         sx={{
//           backgroundColor: "#FAFAFA",
//           borderRadius: "8px",
//           width: "292px",
//           paddingLeft: "15px",
//         }}
//       >
//         <TextField
//           variant="standard"
//           placeholder="Search"
//           value={search}
//           onChange={(e) => handleChangeSearch(e)}
//           sx={{
//             border: "none",
//             textUnderlinePosition: "unset",
//             "& .MuiInputBase-input": { border: "none" },
//             "& .MuiInputBase-input::placeholder": {
//               color: "#8F97A2",
//             },
//           }}
//           InputProps={{
//             disableUnderline: true,
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Icon icon="searchIcon" />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>
//       <Stack direction={"row"} gap={1} sx={{ marginLeft: "50px" }}>
//         <Tooltip title="Create a new client">
//           <Button
//             variant="contained"
//             onClick={handleClientAddModel}
//             endIcon={<Icon icon="plusIcon" width={15} />}
//             sx={{ height: `36px`, width: "140px" }}
//           >
//             Create New
//           </Button>
//         </Tooltip>
//       </Stack>
//     </Toolbar>
//   );
// }

export default function AllClients() {
  const route = useRouter();
  const dispatch = useDispatch();
  const apiRoute = `${backendURL}/clients`;
  const { data: session } = useSession();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [clientType, setClientType] = React.useState("add");
  const [clientModel, setClientModel] = React.useState(false);
  const [editId, setEditId] = React.useState<any | undefined>(undefined);

  const handleClientAddModel = () => {
    setClientType("add");
    setClientModel(true);
    setEditId(undefined);
  };
  //Client List
  const {
    data: clientList,
    refetch: refetchClientList,
    isFetching: fetchingClientList,
  } = useFetchAllDocument(apiRoute, page, rowsPerPage, search);
  //Delete Client
  const {
    mutate: deleteClient,
    isLoading: deleteClientLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
  //Create Client
  const {
    mutateAsync: createClient,
    isLoading: createClientLoading,
    isSuccess: createClientSuccess,
  } = useCreateDocument(false);
  // Update Client
  const {
    mutateAsync: updateClient,
    isLoading: updateClientLoading,
    isSuccess: updateClientSuccess,
  } = useEditDocument(false);

  React.useEffect(() => {
    if (session?.accessToken) refetchClientList();
    if (deleteSuccess) {
      setIsModalOpen(false);
    }
  }, [refetchClientList, deleteSuccess, page, session?.accessToken]);
  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
    setTimeout(() => {
      if (page === 1) {
        refetchClientList();
      } else {
        setPage(1);
      }
    }, 800);
  };
  const filteredData = React.useMemo(() => {
    if (clientList && clientList?.clients?.length) {
      return clientList?.clients;
    } else {
      return [];
    }
  }, [clientList]);
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
  const handleSubmitForm = (values: any) => {
    const data = {
      name: values.name,
      company_name: values.companyName,
      email: values.email,
      phone_number: values.phoneNumber,
      city: values.city,
      state: values.state,
      address: values.address,
    };
    if (clientType === "add") {
      createClient({ apiRoute: `${backendURL}/clients/save`, data: data })
        .then((res) => {
          console.log("Added");
          refetchClientList();
        })
        .catch((err) => {
          toast.error(err.message)
          // alert(`${err.message}`);
          // throw new Error("Error Occured!");
        });
    } else {
      try {
        updateClient({
          data: data,
          apiRoute: `${backendURL}/clients/${editId?._id}`,
        }).then((res) => {
          console.log("Updated");
          refetchClientList();
        });
      } catch (error) {
        throw new Error("Not Updated!");
      }
    }
  };
  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const handleViewClient = (id: number) => {
    route.push(`/clients/${id}`);
  };
  //Edit Invoice
  const handleEditClient = (record: any) => {
    setClientType("edit");
    setClientModel(true);
    setEditId(record);
  };
  const handleOpenDeleteModal = (id: number) => {
    setItemToDelete(id as number);
    setIsModalOpen(true);
  };
  const clientDelete = () => {
    console.log(itemToDelete, "id");
    deleteClient({ apiRoute: `${backendURL}/clients/${itemToDelete}` });
  };
  return (
    <>
      <hr />
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: { xl: "83vh", lg: "73vh" },
            width: "100%",
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
              handleClientAddModel={handleClientAddModel}
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
                  rowCount={clientList?.clients?.length}
                />
                {fetchingClientList ? (
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
                            {row?.name}
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="text-sm-regular">
                              {row?.email}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" sx={{ paddingLeft: "17px" }}>
                            <Typography variant="text-sm-regular">
                              {row?.company_name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" sx={{ paddingLeft: "17px" }}>
                            <Typography variant="text-sm-regular">
                              {row?.phone_number}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" sx={{ paddingLeft: "17px" }}>
                            <Typography variant="text-sm-regular">
                              {row?.city}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{row?.state}</TableCell>
                          <TableCell align="left">{row?.address}</TableCell>
                          <TableCell align="left">
                            <ClientPopOver
                              handleOpenDeleteModal={handleOpenDeleteModal}
                              record={row}
                              handleViewClient={handleViewClient}
                              handleEditClient={handleEditClient}
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
                clientList?.totalRecords ? clientList?.totalRecords : 0
              }
              itemsPerPage={rowsPerPage}
              page={page}
              setPage={setPage}
            />
          </Paper>
          <DeleteModal
            open={isModalOpen}
            onClose={handleDeleteModalClose}
            invoiceDelete={clientDelete}
            title="client"
          />
          <ClientDetailModel
            handleSubmitForm={handleSubmitForm}
            type={clientType}
            clientModel={clientModel}
            setClientModel={setClientModel}
            editId={editId}
          />
        </Box>
      </Container>
    </>
  );
}
