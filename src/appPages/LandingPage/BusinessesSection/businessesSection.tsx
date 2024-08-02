import { FeaturesCard } from "@/components/FeaturesCard";
import { Box, Grid, Stack, Typography } from "@mui/material";

const BusinessesSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 9,
        justifyContent: "center",
        alignItems: "center",
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
      <Box sx={{ mx: "5%", display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2}>
          {/* first row */}
          <Grid item xs={12} sm={6} lg={4} md={4}>
            <FeaturesCard
              icon="educationIcon"
              title="Education System"
              desc="Many desktop publishing packages and web page editors now use for them."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} md={4}>
            <FeaturesCard
              icon="fitnessIcon"
              title="Sports & Fitness"
              desc="Many desktop publishing packages and web page editors now use for them."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} md={4}>
            <FeaturesCard
              icon="beautyIcon"
              title="Beauty and Wellness"
              desc="Many desktop publishing packages and web page editors now use for them."
            />
          </Grid>

          {/* second row */}
          <Grid item xs={12} sm={6} lg={4} md={4}>
            <FeaturesCard
              icon="officialsIcon"
              title="Officials & Financial"
              desc="Many desktop publishing packages and web page editors now use for them."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} md={4}>
            <FeaturesCard
              icon="medicalIcon"
              title="Medical Services"
              desc="Many desktop publishing packages and web page editors now use for them."
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} md={4}>
            <FeaturesCard
              icon="eventsIcon"
              title="Events & Entertainment"
              desc="Many desktop publishing packages and web page editors now use for them."
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default BusinessesSection;
