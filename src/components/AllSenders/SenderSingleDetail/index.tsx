import DeleteModal from "@/components/DeleteModal/deleteModal";
import { palette } from "@/theme/palette";
import {
  useDeleteDocument,
  useEditDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import SenderDetailModel from "../SenderDetailModel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSession } from "next-auth/react";
import "@/Styles/sectionStyle.css";
import SendersInvoices from "./SendersInvoises";

interface SenderSingleProps {
  id: any;
}

const SenderSingleDetail: FC<SenderSingleProps> = ({ id }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [senderModel, setSenderModel] = React.useState(false);
  const { data: session } = useSession();
  //Edit Sender
  const { data: singleSender, refetch: singleFetch } = useFetchSingleDocument(
    `${backendURL}/senders/${id}`
  );

  useEffect(() => {
    if (session?.accessToken) singleFetch();
  }, [singleFetch, session?.accessToken]);

  // Update Sender
  const { mutateAsync: updateSender } = useEditDocument(false);
  const { mutateAsync: deleteSender, isLoading: deleteSenderLoading } =
    useDeleteDocument();
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

    try {
      updateSender({
        data: data,
        apiRoute: `${backendURL}/senders/${id}`,
      }).then((res) => {
        console.log("Updated");
        singleFetch();
      });
    } catch (error) {
      throw new Error("Not Updated!");
    }
  };

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };
  const senderDelete = async () => {
    await deleteSender({ apiRoute: `${backendURL}/senders/${id}` }).then(
      (res) => {
        router.push("/senders");
      }
    );
  };

  const handleBack = () => {
    router.push("/senders");
  };

  return (
    <Box
      sx={{
        width: "100%",
        pt: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Stack
        direction={"row"}
        gap={"8px"}
        sx={{ pl: 0, py: 3, alignItems: "center" }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            p: "0px !important",
            height: "30px !important",
            width: "30px !important",
          }}
        >
          <ArrowBackIosNewIcon sx={{ width: "17px" }} />
        </IconButton>

        <Typography
          sx={{ flex: "1 1 100%", color: palette.color.gray[900] }}
          variant="display-xs-bold"
        >
          Sender Detail
        </Typography>
      </Stack>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          px: 2,
          mb: 2,
          pb: 1,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "12px",
          border: "1px solid #EAECF0",
          boxShadow: `0px 1px 2px 0px #1018280D`,
        }}
      >
        <Stack direction={"column"} gap={3} sx={{ width: "100%" }}>
          <Stack
            direction={{ sm: "row", xs: "column" }}
            gap={{ sm: 0, xs: 3 }}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Stack direction={"row"} gap={3}>
              <Avatar
                sx={{
                  bgcolor: palette.primary.main,
                  width: "62px",
                  height: "62px",
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              >
                {singleSender?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Stack direction={"column"} gap={1}>
                <Typography
                  variant="display-xs-semibold"
                  sx={{
                    maxWidth: { sm: "100%", xs: "220px" },
                    overflow: "hidden",
                    lineHeight: "32px !important",
                    color: palette.color.gray[900],
                    wordBreak: "break-word",
                  }}
                >
                  {singleSender?.name}
                </Typography>
                <Stack
                  sx={{ flexDirection: { sm: "row", xs: "column" } }}
                  gap={2}
                >
                  <Typography
                    variant="text-xs-regular-color"
                    sx={{ color: palette.color.gray[900], fontWeight: 700 }}
                  >
                    Email:{" "}
                    <Box
                      sx={{
                        color: palette.color.gray[900],
                        fontWeight: 500,
                      }}
                    >
                      {singleSender?.email}
                    </Box>
                  </Typography>
                  {singleSender?.phone_number && (
                    <Typography
                      variant="text-xs-regular-color"
                      sx={{ color: palette.color.gray[900], fontWeight: 700 }}
                    >
                      Phone:{" "}
                      <Box
                        sx={{
                          color: palette.color.gray[900],
                          fontWeight: 500,
                        }}
                      >
                        {singleSender?.phone_number}
                      </Box>
                    </Typography>
                  )}
                  {singleSender?.state && (
                    <Typography
                      variant="text-xs-regular-color"
                      sx={{ color: palette.color.gray[900], fontWeight: 700 }}
                    >
                      Country:{" "}
                      <Box
                        sx={{
                          color: palette.color.gray[900],
                          fontWeight: 500,
                        }}
                      >
                        {singleSender?.state}
                      </Box>
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
            <Stack direction={"row"} gap={1} sx={{ alignSelf: "center" }}>
              <Button
                variant="outlined"
                onClick={() => setIsModalOpen(true)}
                sx={{
                  height: `40px`,
                  width: "114px",
                  borderRadius: "4px",
                  borderColor: palette.border.invoicesBorderColor,
                  color: palette.base.black,
                }}
              >
                Delete
              </Button>

              <Button
                onClick={() => setSenderModel(true)}
                variant="contained"
                sx={{ height: `40px`, width: "114px", borderRadius: "4px" }}
              >
                Edit
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      {/* <SendersInvoices /> */}
      <SenderDetailModel
        handleSubmitForm={handleSubmitForm}
        type="edit"
        senderModel={senderModel}
        setSenderModel={setSenderModel}
        editId={singleSender}
      />
      <DeleteModal
        open={isModalOpen}
        onClose={handleDeleteModalClose}
        deleteLoading={deleteSenderLoading}
        invoiceDelete={senderDelete}
        title="recipient"
      />
    </Box>
  );
};

export default SenderSingleDetail;
