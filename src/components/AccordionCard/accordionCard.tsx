import { palette } from "@/theme/palette";
import { IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";

interface AccordionCardProps {
  title?: string;
  desc?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionCard: FC<AccordionCardProps> = ({
  title,
  desc,
  isOpen,
  onToggle,
}) => {
  return (
    <Stack
      direction={"row"}
      gap={2}
      sx={{
        // my: "1%",
        background: isOpen ? "#F9FAFB" : "transparent",
        borderRadius: "16px",
        p: isOpen ? "2%" : "2%",
        transition: "background 0.3s, padding 0.3s",
        overflow: "hidden",
      }}
    >
      <IconButton onClick={onToggle}>
        <Icon icon={isOpen ? "minusCircleIcon" : "plusCircleIcon"} />
      </IconButton>
      <Stack
        direction={"column"}
        justifyContent={isOpen ? "flex-start" : "center"}
        gap={2}
        sx={{ width: "100%", transition: "all 0.3s" }}
      >
        <Typography
          variant="text-lg-medium"
          sx={{ color: palette.color.gray[820], mt: "1%", cursor: "pointer" }}
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
              color: palette.color.gray[725],
              transition: "opacity 0.3s",
            }}
          >
            {desc}
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
};

export default AccordionCard;
