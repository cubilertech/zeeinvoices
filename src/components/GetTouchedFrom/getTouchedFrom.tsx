import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import { PhoneInput } from "react-international-phone";
import * as Yup from "yup";
import "react-international-phone/style.css";
import "@/Styles/contactPhoneNoStyle.css";
import "./getTouchedFrom.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
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
              alert("Message sent successfully!");
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
              gap: 2,
              width: "100%",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            {/* First Name and Last Name */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box width={"50%"}>
                <Typography variant="body2" component="p" pb={0.5}>
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
                <Typography variant="body2" component="p" pb={0.5}>
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
              <Typography variant="body2" component="p" pb={0.5}>
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
                sx={{ marginBottom: "5px", color: "#344054" }}
              >
                Phone
              </Typography>
              <Field name="phoneNumber">
                {({ field }: FieldProps) => (
                  <PhoneInput
                    {...field}
                    style={{ width: "100% !important" }}
                    className="custom-phone-input"
                    defaultCountry="pk"
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
              )}
            </FormControl>

            {/* Message */}
            <Box>
              <Typography variant="body2" component="p" pb={0.5}>
                Message
              </Typography>
              <Field name="message">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    placeholder="Leave us a message..."
                    multiline
                    rows={4}
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
                <Typography variant="body2">
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
              sx={{ height: "48px !important" }}
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
