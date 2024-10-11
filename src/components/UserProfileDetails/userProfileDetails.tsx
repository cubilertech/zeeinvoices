"use client";
import { palette } from "@/theme/palette";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ProfileDetailsCard } from "../ProfileDetailsCard";

interface UserProfileDetails {
  label?: string;
  profileData?: any;
}
const UserProfileDetails: FC<UserProfileDetails> = ({
  label,
  profileData,
  ...props
}) => {
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
        mt: "16px",
        mb: "40px",
        mx: { sm: "0px", xs: "0px" },
        px: { sm: "20px", xs: "16px" },
        py: { sm: "20px", xs: "24px" },
        border: `1px solid ${palette.color.gray[5]}`,
        boxShadow: palette.boxShadows.shadowxs,
        borderRadius: "12px",
      }}
    >
      <Stack
        justifyContent={"space-between"}
        sx={{
          flexDirection: { sm: "row", xs: "column" },
          gap: { sm: 0, xs: 3 },
        }}
      >
        <Typography
          variant="text-xl-semibold"
          sx={{
            color: palette.color.gray[900],
            fontSize: {
              md: "20px !important",
              xs: "16px !important",
            },
            lineHeight: {
              md: "30px !important",
              xs: "24px !important",
            },
            fontWeight: 600,
          }}
        >
          Profile Details
        </Typography>
      </Stack>

      {/* section for text fields */}
      <Stack
        direction={{
          md: "row",
          lg: "column",
        }}
        justifyContent={"space-evenly"}
      >
        {/* name, email , phone */}
        <Stack
          direction={{
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          }}
          gap={2}
          justifyContent={"space-between"}
          sx={{ mt: "24px" }}
        >
          <ProfileDetailsCard
            label="Name/Company Name"
            description={profileData.name}
          />
          <ProfileDetailsCard label="Email" description={profileData.email} />
          <ProfileDetailsCard
            label="Phone"
            description={profileData.phoneNumber}
          />
        </Stack>

        {/* city, state , address */}
        <Stack
          direction={{
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          }}
          gap={2}
          justifyContent={"space-between"}
          sx={{ mt: "16px" }}
        >
          <ProfileDetailsCard label="City" description={profileData.city} />
          <ProfileDetailsCard label="Country/State" description={profileData.state} />
          <ProfileDetailsCard
            label="Address"
            description={profileData.address}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserProfileDetails;
