"use client";
import { palette } from "@/theme/palette";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const route = useRouter();

  const handleCrtInvButton = (data: any) => {
    route.push("/create-new-invoice");
  };
  return (
    <Box
      sx={{
        width: "100%",
        py: 9,
        pt: 19,
      }}
    >
      <Stack
        direction={{ md: "row", xs: "column-reverse" }}
        justifyContent={"space-between"}
      >
        {/* left hero section */}
        <Stack
          direction={"column"}
          gap={3}
          sx={{ pl: { md: "6%", lg: "10%" } }}
        >
          <Typography variant="display-xxl-bold" sx={{ width: "443px" }}>
            Invoice that help Businesses get{" "}
            <span
              style={{
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: "64px",
                color: "#3F4DE1",
              }}
            >
              Paid Faster
            </span>
          </Typography>
          <Typography
            variant="text-lg-regular"
            sx={{ width: "419px", color: palette.color.gray[745] }}
          >
            Lorem ipsum is a placeholder text commonly used to demonstrate the
            visual form of a document or a typeface without relying on
            meaningful content.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "214px", height: "64px", py: "20px", px: "30px" }}
            onClick={handleCrtInvButton}
          >
            Create Invoice
          </Button>
          {/* Avatar and rating section */}
          <Stack direction={"row"}>
            <AvatarGroup max={3} spacing={20}>
              <Avatar
                sx={{ width: 61, height: 61 }}
                alt="Remy Sharp"
                src="/static/images/avatar/2.jpg"
              />
              <Avatar
                sx={{ width: 61, height: 61 }}
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
              />
              <Avatar
                sx={{ width: 61, height: 61 }}
                alt="Cindy Baker"
                src="/Images/user-image.png"
              />
            </AvatarGroup>
            <Stack direction={"column"} sx={{ ml: "20px" }}>
              <Typography variant="display-xs-semibold">2,291</Typography>
              <Typography
                variant="text-md-regular"
                sx={{ color: palette.color.gray[100] }}
              >
                Happy Customers
              </Typography>
            </Stack>
            <Stack direction={"column"} sx={{ ml: "30px" }}>
              <Typography variant="display-xs-semibold">4.8/5</Typography>
              <Stack direction={"row"} gap={1} sx={{ alignItems: "center" }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  size="small"
                  readOnly
                  sx={{ color: "#3F4DE1" }}
                />
                <Typography
                  variant="text-md-regular"
                  sx={{ color: palette.color.gray[100] }}
                >
                  Rating
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {/* right hero section */}
        <Stack direction={"row"} sx={{ position: "relative", mt: "50px" }}>
          <Box sx={{ position: "absolute", zIndex: 1, left: 30, top: "-5%" }}>
            <Image
              src="/Images/rectangle-laptop-bg.svg"
              width={500}
              height={500}
              alt="rectangle iaptop bg"
            />
          </Box>
          <Box sx={{ zIndex: 1 }}>
            <Image
              src="/Images/laptop-image.svg"
              width={500}
              height={500}
              alt="rectangle iaptop bg"
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
export default HeroSection;
