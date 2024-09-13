"use client";
import { palette } from "@/theme/palette";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const FirstInvoice: FC = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const handleCreate = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    route.push("/create-new-invoice");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: {
          xl: "90vh",
          lg: "73vh",
          md: "63vh",
          sm: "53vh",
          xs: "43vh",
        },
      }}
    >
      <Container
        sx={{
          width: "460px",
          marginTop: "70px",
          marginBottom: "9px",
          py: { sm: "3%", xs: "7%" },
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderRadius: "12px",
          boxShadow: palette.boxShadows[100],
          backgroundColor: palette.base.white,
        }}
      >
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            backgroundColor: palette.base.white,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { sm: "200px", xs: "122px" },
              height: { sm: "200px", xs: "122px" },
            }}
          >
            <Icon icon="firstInvoiceIcon" width={200} height={200} />
          </Box>

          <Stack
            direction={"column"}
            gap={0.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              variant="display-xs-semibold"
              sx={{
                fontSize: { sm: "24px !important", xs: "18px !important" },
                lineHeight: { sm: "40px", xs: "24px" },
                fontWeight: { sm: 600 },
              }}
            >
              Create your first Invoice
            </Typography>
            <Typography
              variant="text-sm-regular"
              sx={{
                color: palette.color.gray[770],
                textAlign: "center",
                fontSize: { sm: "14px !important", xs: "12px !important" },
                lineHeight: { sm: "24px", xs: "15px" },
                fontWeight: { sm: 400 },
              }}
            >
              No invoice to show, Please add an invoice to view.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              width: "210px",
              height: "40px",
              py: { sm: "8px !important", xs: "5px !important" },
              px: { sm: "24px !important", xs: "15px !important" },
            }}
            onClick={handleCreate}
          >
            Create New Invoice
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default FirstInvoice;
