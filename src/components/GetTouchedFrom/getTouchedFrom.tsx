import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Form, Field, FieldProps } from "formik";
import { PhoneInput } from "react-international-phone";
import * as Yup from "yup";
import "react-international-phone/style.css";
import "@/Styles/getIntTouchPhoneNoStyle.css";
import "./getTouchedFrom.css";
import { PhoneInputWithCode } from "../PhoneInputWithCode";
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .max(35, "First name must be 35 characters or less")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .max(35, "Last name must be 35 characters or less")
    .required("Last name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .email("Invalid email format")
    .required("Email is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
  message: Yup.string().required("Message is required"),
  agreement: Yup.bool().oneOf([true], "You must accept the privacy policy"),
});

const GetTouchForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
        agreement: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Message sent successfully!");
              resetForm();
            } else {
              alert("Failed to send message.");
            }
          })
          .catch((error) => {
            alert("An error occurred while sending the message.");
          });
      }}
    >
      {({ errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            {/* First Name and Last Name */}
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box width={"50%"}>
                <Typography
                  variant="body2"
                  component="p"
                  pb={"6px"}
                  sx={{ fontFamily: "Product Sans, sans-serif" }}
                >
                  First Name
                </Typography>
                <Field name="firstName">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      placeholder="First name"
                      fullWidth
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  )}
                </Field>
              </Box>
              <Box width={"50%"}>
                <Typography
                  variant="body2"
                  component="p"
                  pb={"6px"}
                  sx={{ fontFamily: "Product Sans, sans-serif" }}
                >
                  Last Name
                </Typography>
                <Field name="lastName">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      placeholder="Last name"
                      fullWidth
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  )}
                </Field>
              </Box>
            </Box>

            {/* Email */}
            <Box>
              <Typography
                variant="body2"
                component="p"
                pb={"6px"}
                sx={{ fontFamily: "Product Sans, sans-serif" }}
              >
                Email
              </Typography>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    placeholder="Email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                )}
              </Field>
            </Box>

            {/* Phone Number */}
            <FormControl sx={{ width: "100%" }}>
              <Typography
                variant="body2"
                sx={{
                  marginBottom: "6px",
                  color: "#000000",
                  fontFamily: "Product Sans, sans-serif",
                }}
              >
                Phone
              </Typography>

              {/* <Field name="phoneNumber">
                {({ field }: FieldProps) => (
                  <PhoneInput
                    {...field}
                    style={{ width: "100% !important" }}
                    className="custom-phone-input"
                    defaultCountry="us"
                    onChange={(value: string) =>
                      handleChange({
                        target: {
                          name: "phoneNumber",
                          value,
                        },
                      })
                    }
                    onBlur={() =>
                      handleBlur({ target: { name: "phoneNumber" } })
                    }
                  />
                )}
              </Field>
              {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ marginTop: "5px", marginLeft: "15px" }}
                >
                  {typeof errors.phoneNumber === "string"
                    ? errors.phoneNumber
                    : "Invalid phone number"}
                </Typography>
              )} */}

              <Field name="phoneNumber">
                {({ field }: FieldProps) => (
                  <PhoneInputWithCode
                    // value={}
                    onChange={(value) =>
                      handleChange({
                        target: {
                          name: "phoneNumber",
                          value,
                        },
                      })
                    }
                    height="44px"
                  />
                )}
              </Field>
              {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                <Typography
                  color="error"
                  variant="text-xs-regular"
                  sx={{ marginTop: "5px", marginLeft: "15px" }}
                >
                  {/* {errors.phoneNumber || "Invalid phone number"} */}
                  {typeof errors.phoneNumber === "string"
                    ? errors.phoneNumber
                    : "Invalid phone number"}{" "}
                  {/* Ensure it's a string or fallback */}
                </Typography>
              )}
            </FormControl>

            {/* Message */}
            <Box>
              <Typography
                variant="body2"
                component="p"
                pb={"6px"}
                sx={{ fontFamily: "Product Sans, sans-serif" }}
              >
                Message
              </Typography>
              <Field name="message">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    placeholder="Leave us a message..."
                    multiline
                    rows={5}
                    fullWidth
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                  />
                )}
              </Field>
            </Box>

            {/* Agreement */}
            <FormControlLabel
              control={<Field as={Checkbox} name="agreement" />}
              label={
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Product Sans, sans-serif" }}
                >
                  You agreed to our friendly <a href="#">privacy policy</a>
                </Typography>
              }
            />
            {touched.agreement && errors.agreement && (
              <Typography variant="caption" color="error">
                {errors.agreement}
              </Typography>
            )}

            {/* Submit Button */}
            <Button
              sx={{
                mt: 1,
                height: "48px !important",
                fontFamily: "Product Sans, sans-serif",
                fontSize: "16px !important",
                lineHeight: "24px !important",
                fontWeight: "700 !important",
              }}
              type="submit"
              variant="contained"
              fullWidth
            >
              Send message
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default GetTouchForm;
