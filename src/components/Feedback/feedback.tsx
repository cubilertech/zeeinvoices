import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { Icon } from "../Icon";
import { icons } from "@/utils/constants";
import { IconTypes } from "@/types/icons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface Feedback {
  title?: string;
  placeholder?: string;
  width?: string;
  height?: string;
}

const Feedback: FC<Feedback> = ({
  title,
  placeholder,
  width = "100%",
  height = "295px",
}) => {
  const { data: session } = useSession();
  const [feedbackValue, setFeedbackValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChangeFeedback = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFeedbackValue(value);
  };

  const handleSubmit = () => {
    if (feedbackValue === "") {
      setIsEmpty(true);
    } else {
      setIsLoading(true);
      const values = {
        email: session?.user?.email ? session?.user?.email : "guest",
        message: feedbackValue,
      };
      fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.status === 200) {
            setFeedbackValue("");
            setIsLoading(false);
            setIsEmpty(false);
            toast.success("Feedback sent successfully!");
          } else {
            setIsLoading(false);
            alert("Failed to send message.");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert("An error occurred while sending the message.");
        });
    }
  };

  return (
    <Stack direction={"column"} gap={1.5} sx={{ height: { height } }}>
      <Typography
        variant="text-sm-semibold"
        sx={{ color: palette.color.gray[610] }}
      >
        {title}
      </Typography>
      <TextField
        multiline
        rows={3}
        sx={{
          width: "100%",
          "& .MuiInputBase-input": {
            px: "0px !important",
            height: "187px !important",
            border: `0px dashed ${"#F9F9F9"}`,
          },
          "& .MuiInputBase-input::placeholder": {
            color: palette.color.gray[610],
            opacity: 1,
          },
          "& .MuiOutlinedInput-root": {
            py: "10px !important",
            border: "none !important",
            borderRadius: "8px",
            "& fieldset": {
              borderColor: palette.color.gray[200],
            },
          },
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (feedbackValue !== "") {
            setIsEmpty(false);
          }
          handleChangeFeedback(e);
        }}
        value={feedbackValue}
        id="outlined-basic"
        placeholder={placeholder}
        variant="outlined"
        error={feedbackValue === "" ? isEmpty : false}
        helperText={
          isEmpty && feedbackValue === "" ? "field should not empty" : ""
        }
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          onClick={handleSubmit}
          variant="outlined"
          // disabled={loading}
          sx={{
            width: "92px",
            px: "16px !important",
            py: "10px !important",
            borderRadius: "8px",
            border: `1px solid ${palette.color.gray[310]}`,
            fontFamily: "Product Sans, sans-serif",
            fontSize: {
              md: "16px !important",
              xs: "16px !important",
            },
            lineHeight: {
              md: "24px !important",
              xs: "24px !important",
            },
            fontWeight: "700 !important",
          }}
        >
          {isLoading ? (
            <CircularProgress size={18} sx={{ color: palette.primary.main }} />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </Stack>
  );
};

export default Feedback;
