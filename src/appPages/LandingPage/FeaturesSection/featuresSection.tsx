import { Icon } from "@/components/Icon";
import { palette } from "@/theme/palette";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const FeaturesSection = () => {
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
      <Box sx={{ display: "flex", justifyContent: "center", my: "30px" }}>
        <Typography variant="display-lg-bold">Amazing Features</Typography>
      </Box>
      <Stack
        direction={"row"}
        gap={9}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {/* left features section */}
        <Stack direction={"column"} gap={4}>
          {/* easy to use */}
          <Stack
            direction={"row"}
            gap={2}
            sx={{
              py: "20px",
              px: "10px",
              boxShadow: palette.boxShadows[300],
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#D9DBF9",
                borderRadius: 45,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Icon icon="easyUseIcon" width={24} height={24} />
            </Box>
            <Stack direction={"column"} sx={{ width: "307px" }}>
              <Typography variant="text-xl-semibold">Easy to Use</Typography>
              <Typography variant="text-md-regular">
                Many desktop publishing packages and web page editors now use
                for them.
              </Typography>
            </Stack>
          </Stack>

          {/* custom color */}
          <Stack
            direction={"row"}
            gap={2}
            sx={{
              px: "10px",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#D9DBF9",
                borderRadius: 45,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Icon icon="customColorIcon" width={24} height={24} />
            </Box>
            <Stack direction={"column"} sx={{ width: "307px" }}>
              <Typography variant="text-xl-semibold">Custom Color</Typography>
              <Typography variant="text-md-regular">
                Many desktop publishing packages and web page editors now use
                for them.
              </Typography>
            </Stack>
          </Stack>

          {/* free generate */}
          <Stack
            direction={"row"}
            gap={2}
            sx={{
              px: "10px",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#D9DBF9",
                borderRadius: 45,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Icon icon="freeGenerateIcon" width={24} height={24} />
            </Box>
            <Stack direction={"column"} sx={{ width: "307px" }}>
              <Typography variant="text-xl-semibold">Free Generate</Typography>
              <Typography variant="text-md-regular">
                Many desktop publishing packages and web page editors now use
                for them.
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* right features section */}

        <Box
          sx={{
            width: 596,
            height: 375,
            // mt:"3%",
            display: "flex",
            justifyContent: "right",

          }}
        >
          <Image
            src="/Images/features-image.png"
            width={540}
            height={335}
            alt="rectangle bg"
          />
        </Box>
      </Stack>
    </Box>
  );
};
export default FeaturesSection;
