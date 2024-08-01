
import FeaturesCard from "@/components/FeaturesCard/FeaturesCard";
import { Box, Stack, Typography } from "@mui/material";

const BusinessesSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 9,
        justifyContent: "center",
        alignItems: "center",
        // display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "30px",
        }}
      >
        <Typography
          variant="display-lg-bold"
          sx={{ width: "659px", textAlign: "center" }}
        >
          Smart Invoices for business and freelancers
        </Typography>
      </Box>
      <Stack
        direction={"column"}
        gap={5}
        sx={{ display: "flex", mx: "30px", justifyContent: "center" }}
      >
        {/* first row */}
        <Stack direction={"row"} justifyContent={"space-between"}>
          {/* education system */}
          <FeaturesCard
            icon="educationIcon"
            title="Education System"
            desc="Many desktop publishing packages and web page editors now use
                for them."
          />

          {/* fitness */}
          <FeaturesCard
            icon="fitnessIcon"
            title="Sports & Fitness"
            desc="Many desktop publishing packages and web page editors now use
                for them."
          />

          {/* beauty and wellness */}
          <FeaturesCard
            icon="beautyIcon"
            title="Beauty and Wellness"
            desc="Many desktop publishing packages and web page editors now use
                for them."
          />
        </Stack>

        {/* second row */}
        <Stack direction={"row"} justifyContent={"space-between"}>
          {/* officials & financial */}
          <FeaturesCard
            icon="officialsIcon"
            title="Officials & Financial"
            desc="Many desktop publishing packages and web page editors now use
                for them."
          />

          {/* medical services */}
          <FeaturesCard
            icon="medicalIcon"
            title="Medical ervices"
            desc="Many desktop publishing packages and web page editors now use
                for them."
          />

          {/* events & entertainment */}
          <FeaturesCard
            icon="eventsIcon"
            title="Events & Entertainment"
            desc="Many desktop publishing packages and web page editors now use
                for them."
          />
        </Stack>
      </Stack>
    </Box>
  );
};
export default BusinessesSection;
