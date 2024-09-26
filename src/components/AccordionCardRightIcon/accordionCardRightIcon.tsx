import { palette } from "@/theme/palette";
import { IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";

interface AccordionCardRightIconProps {
  title?: string;
  desc?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionCardRightIcon: FC<AccordionCardRightIconProps> = ({
  title,
  desc,
  isOpen,
  onToggle,
}) => {
  return (
    <Stack
      direction={"column"}
      gap={0}
      sx={{
        // width: "100%",
        // my: "1%",
        // background: isOpen ? "#F9FAFB" : "transparent",
        borderRadius: "16px",
        // p: isOpen ? "2%" : "2%",
        transition: "background 0.3s, padding 0.3s",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          py: { md: "32px", xs: "10px" },
          borderBottom: "1px solid #0000001A",
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={isOpen ? "flex-start" : "center"}
          gap={2}
          sx={{ width: "100%", transition: "all 0.3s" }}
        >
          <Typography
            variant="display-xs"
            sx={{
              color: palette.color.gray[820],
              fontFamily: "Product Sans, sans-serif",
              mt: "1%",
              cursor: "pointer",
              fontSize: { md: "22px", xs: "14px" },
              lineHeight: { md: "28px", xs: "18px" },
              fontWeight: { md: 400 },
            }}
            onClick={onToggle}
          >
            {title}
          </Typography>

          <div
            style={{
              maxHeight: isOpen ? "100px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            <Typography
              variant="text-md-regular"
              sx={{
                fontFamily: "Product Sans, sans-serif",
                color: palette.color.gray[725],
                transition: "opacity 0.3s",
                fontSize: { md: "16px", xs: "12px" },
                lineHeight: { md: "24px", xs: "18px" },
                fontWeight: { md: 400 },
              }}
            >
              {desc}
            </Typography>
          </div>
        </Stack>
        <IconButton onClick={onToggle} sx={{ mt: "0.8%" }}>
          <Icon
            icon={isOpen ? "arrowDownUpIcon" : "arrowDownBlueIcon"}
            width={15}
            height={7.5}
          />
        </IconButton>
      </Stack>
      {/* <hr
        style={{
          width: "100%",
          margin: "0px 0px 0px 0px",
          height: "1px",
          // backgroundColor: "rgba(156, 163, 175, 1)",
          // color: "rgba(156, 163, 175, 1)",
        }}
      ></hr> */}
    </Stack>
  );
};

export default AccordionCardRightIcon;
