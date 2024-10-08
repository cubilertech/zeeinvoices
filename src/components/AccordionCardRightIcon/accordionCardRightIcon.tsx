import { palette } from "@/theme/palette";
import { IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";

interface AccordionCardRightIconProps {
  qIndex?: number;
  title?: string;
  desc?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionCardRightIcon: FC<AccordionCardRightIconProps> = ({
  qIndex,
  title,
  desc,
  isOpen,
  onToggle,
}) => {
  return (
    <Stack
      direction={"column"}
      gap={0}
      justifyContent={"space-between"}
      sx={{
        width: "100%",
        transition: "background 0.3s, padding 0.3s",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        gap={3}
        sx={{
          width: "100%",
          pt:
            qIndex == 0 ? { md: "0px", xs: "0px" } : { md: "24px", xs: "24px" },
          pb: { md: "24px", xs: "24px" },
          borderBottom: "1px solid #0000001A",
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={isOpen ? "center" : "center"}
          gap={1}
          sx={{ width: "100%", transition: "all 0.3s" }}
        >
          <Typography
            variant="display-xs"
            sx={{
              color: palette.color.gray[900],
              fontFamily: "Product Sans, sans-serif",
              cursor: "pointer",
              fontSize: { md: "18px", xs: "18px" },
              lineHeight: { md: "22px", xs: "22px" },
              fontWeight: { md: 400 },
            }}
            onClick={onToggle}
          >
            {title}
          </Typography>

          {isOpen && (
            <div
              style={{
                maxHeight: isOpen ? "192px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
            >
              <Typography
                variant="text-md-regular"
                sx={{
                  fontFamily: "Product Sans, sans-serif",
                  color: palette.color.gray[610],
                  transition: "opacity 0.3s",
                  fontSize: { md: "16px", xs: "16px" },
                  lineHeight: { md: "24px", xs: "24px" },
                  fontWeight: { md: 400 },
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: desc || "",
                  }}
                  style={{ fontWeight: "lighter" }}
                />
              </Typography>
            </div>
          )}
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
