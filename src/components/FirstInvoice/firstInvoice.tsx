"use client";
import { palette } from "@/theme/palette";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { setResetInvoiceSetting } from "@/redux/features/invoiceSetting";
import { setResetInvoice } from "@/redux/features/invoiceSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import "@/Styles/sectionStyle.css";

const FirstInvoice: FC = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const handleCreate = () => {
    dispatch(setResetInvoiceSetting());
    dispatch(setResetInvoice());
    route.push("/create-new-invoice");
  };
  return (
    <Box>
      <Box sx={{ height: "65px" }} />
      <Container
        className="mainContainer"
        sx={{
          height: { sm: "712px", xs: "auto" },
          width: "100%",
          my: "40px",
          py: { sm: "3%", xs: "0%" },
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderRadius: "12px",
          border: { sm: `1px solid ${palette.color.gray[200]}`, xs: `none` },
          boxShadow: {
            sm: palette.boxShadows.shadowxs,
            xs: "none",
          },
          backgroundColor: palette.base.white,
        }}
      >
        <Stack
          direction={"column"}
          gap={4}
          sx={{
            backgroundColor: palette.base.white,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { sm: "190px", xs: "140px" },
              height: { sm: "190px", xs: "140px" },
            }}
          >
            <Icon icon="firstInvoiceIcon" width={190} height={190} />
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
                textAlign: "center",
                fontSize: { sm: "36px !important", xs: "20px !important" },
                lineHeight: { sm: "43px", xs: "24px" },
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
                fontSize: { sm: "20px !important", xs: "14px !important" },
                lineHeight: { sm: "30px", xs: "18px" },
                fontWeight: { sm: 500 },
              }}
            >
              No invoice to show, Please add an invoice to view.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Icon icon="plusIcon" width={13} />}
            sx={{
              // width: "210px",
              height: "40px",
              borderRadius: "4px",
              fontSize: "16px !important",
              lineHeight: "24px !important",
              fontWeight: "600 !important",
              mt: { sm: "16px", xs: "0px" },
              py: { sm: "12px !important", xs: "12px !important" },
              px: { sm: "18px !important", xs: "18px !important" },
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
