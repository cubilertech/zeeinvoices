"use client";
import { palette } from "@/theme/palette";
import { Button, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";

const FirstInvoice: FC = () => {
  
  return (
    <Container
      sx={{
        width: "460px",
        height: "422px",
        marginTop: "70px",
        marginBottom: "10px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        borderRadius: "12px",
        boxShadow: palette.boxShadows[100],
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
        <Icon icon="firstInvoiceIcon" width={121} height={116} />
        <Stack
          direction={"column"}
          gap={0.5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography variant="display-xs-semibold">
            Create your first Invoice
          </Typography>
          <Typography
            variant="text-sm-regular"
            sx={{
              color: palette.color.gray[770],
            }}
          >
            No invoice to show, Please add an invoice to view.
          </Typography>
        </Stack>

        <Button variant="contained"  >Create New Invoice</Button>
      </Stack>
    </Container>
  );
};

export default FirstInvoice;
