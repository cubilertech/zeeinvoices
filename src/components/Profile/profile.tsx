"use client";
import { palette } from "@/theme/palette";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { TextField } from "../TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/Styles/profilePhoneNoStyle.css";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

import ProfileAvatar from "../ProfileAvatar/profileAvatar";
import {
  useEditDocument,
  useFetchSingleDocument,
} from "@/utils/ApiHooks/common";
import { backendURL } from "@/utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { imageConvertion } from "@/utils/common";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getCountValue, increment } from "@/redux/features/counterSlice";
import { PhoneInputWithCode } from "../PhoneInputWithCode";
import { countryCodes } from "@/utils/data";
import "@/Styles/sectionStyle.css";

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  // companyName: Yup.string().required("Company Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  city: Yup.string().matches(alphaRegex, "Invalid City"),
  // .required("City is required"),
  // state: Yup.string()
  //   .matches(alphaRegex, "Invalid State")
  //   .min(3, "City must be at least 3 characters long")
  //   .required("State is required"),
  // address: Yup.string()
  //   .matches(alphaRegex, "Invalid Address")
  //   .min(5, "Too short")
  //   .required("Address is required"),
});

interface Profile {}

const Profile: FC<Profile> = ({}) => {
  const { data: session } = useSession();
  const isModile = useMediaQuery("(max-width: 500px)");
  const counter = useSelector(getCountValue);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Get Data Of Login User
  const {
    data: profileData,
    refetch: fetchProfile,
    isFetching: fetchingProfile,
  } = useFetchSingleDocument(`${backendURL}/users/my-profile`);
  const {
    mutateAsync: profileUpdate,
    isLoading: profileLoading,
    isSuccess: profileSuccess,
  } = useEditDocument();
  useEffect(() => {
    if (session?.accessToken) fetchProfile();
  }, [fetchProfile, session?.accessToken, counter]);
  // Image
  const [uploadImage, setUploadImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (profileData?.image) setImageUrl(profileData?.image);
  }, [profileData?.image]);
  // Form Handle
  const initialValues = {
    name: profileData?.name || "",
    email: profileData?.email || "",
    phoneNumber: profileData?.phoneNumber || "",
    city: profileData?.city || "",
    state: profileData?.state || "",
    address: profileData?.address || "",
    countryCode: "",
  };

  interface FormErrors {
    name?: string;
    companyName?: string;
    email?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    address?: string;
  }

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,

    validate: (values) => {
      const errors: FormErrors = {}; // Use FormErrors type here

      // Validate other fields
      // ...

      // Validate phone number
      const phoneError = validatePhoneNumber(
        values.phoneNumber,
        values.countryCode
      );
      if (phoneError) {
        errors.phoneNumber = phoneError;
      }

      return errors;
    },

    onSubmit: (values) => {
      const data = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        city: values.city,
        state: values.state,
        address: values.address,
        ...(uploadImage ? { image: uploadImage } : {}),
        // image: image,
      };

      profileUpdate({
        apiRoute: `${backendURL}/users/my-profile`,
        data: data,
      })
        .then((res) => {
          setUploadImage(null);
          setImageUrl(res?.image);
          dispatch(increment());
          console.log("Updateed Succesfully");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  function isString(value: any): value is string {
    return typeof value === "string";
  }

  const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: string
  ): string => {
    // Ensure countryCode is a valid CountryCode
    // const validCountryCode: CountryCode = countryCode as CountryCode;
    const validCountryCode = countryCode as CountryCode;
    if (!phoneNumber) {
      // return "Phone number is required";
      return "";
    }
    const phoneNumberInstance = parsePhoneNumberFromString(
      // This function parses the phone number according to the given country code.
      phoneNumber,
      validCountryCode
    );
    if (!phoneNumberInstance) {
      return "Invalid phone number.";
    }
    if (!phoneNumberInstance.isValid()) {
      return "Invalid phone number";
    }
    return "";
  };
  const handlePhoneInputChange = (value: string) => {
    console.log(value, "val");
    const isCountryCodeOnly = countryCodes.some(
      (code) => value === code || value === `${code} `
    );

    if (isCountryCodeOnly) {
      // Clear the phone number field if only country code is entered
      handleChange({
        target: {
          name: "phoneNumber",
          value: "",
        },
      });
    } else {
      // Otherwise, update with the full value
      handleChange({
        target: {
          name: "phoneNumber",
          value: value,
        },
      });
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: palette.base.white }}>
        <Container
          className="mainContainer"
          sx={{
            overflowY: "auto",
            height: "100%",
            mt: { sm: 0, xs: 0 },
            px: { md: "0%", lg: "0%", xs: "0%" },
          }}
        >
          <Box
            sx={{
              border: `1px solid ${palette.color.gray[5]}`,
              boxShadow: palette.boxShadows.shadowxs,
              borderRadius: "12px",
              alignSelf: "center",
              marginTop: { sm: "104px", xs: "104px" },
              width: { sm: "100%", xs: "100%" },
              height: { sm: "auto", xs: "auto" },
              backgroundColor: palette.base.white,
              px: { md: "0%", lg: "0%", xs: "0%" },
              pb: "24px",
            }}
          >
            {/* top bar */}
            <Box
              sx={{
                height: "156px",
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                position: "relative",
                width: "100%",
              }}
            ></Box>

            {/* circle avatar */}
            <Box sx={{ marginLeft: { sm: "24px", xs: "29%" } }}>
              <ProfileAvatar
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            </Box>
            <Stack
              direction={{ sm: "row", xs: "column" }}
              justifyContent={"space-between"}
              gap={"20px"}
              sx={{
                mx: { sm: "0px", xs: "24px" },
                pr: { sm: "24px", xs: "0px" },
                pt: { sm: "16px", xs: "0px" },
                minHeight: "78px",
              }}
            >
              {/* name and email  */}
              <Stack
                direction={"column"}
                sx={{
                  ml: { sm: "200px", xs: "auto" },
                  mt: { sm: "0px", xs: "90px" },
                  mr: { sm: 0, xs: "auto" },
                  textAlign: { sm: "start", xs: "center" },
                }}
              >
                <Typography
                  variant="display-xs-semibold"
                  sx={{
                    color: palette.color.gray[900],
                    fontSize: "30px",
                    lineHeight: "38px",
                    fontWeight: 600,
                  }}
                >
                  {profileData ? profileData.name : "---"}
                </Typography>
                <Typography
                  variant="text-md-regular"
                  sx={{
                    color: palette.color.gray[725],
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 400,
                  }}
                >
                  {profileData ? profileData.email : "---"}
                </Typography>
              </Stack>
              <Button
                disabled={profileLoading}
                type="submit"
                variant="contained"
                sx={{
                  height: "40px",
                  gap: "7px",
                  borderRadius: { sm: "4px", xs: "4px" },
                  fontFamily: "Product Sans, sans-serif !important",
                  fontSize: "14px !important",
                  fontWeight: "400 !important",
                  background:
                    "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                }}
              >
                {profileLoading ? (
                  <CircularProgress size={18} sx={{ color: "#8477DA" }} />
                ) : (
                  "Edit Profile"
                )}
                {profileLoading ? (
                  ""
                ) : (
                  <Icon icon="editWhiteIcon" width={12} height={14} />
                )}
              </Button>
            </Stack>
          </Box>
          <Box>
            {/* profile detail section */}
            <form onSubmit={handleSubmit}>
              <Stack
                direction={"column"}
                sx={{
                  width: "100%",
                  mt: "16px",
                  mb: "40px",
                  mx: { sm: "0px", xs: "0px" },
                  p: "20px",
                  border: `1px solid ${palette.color.gray[5]}`,
                  boxShadow: palette.boxShadows.shadowxs,
                  borderRadius: "12px",
                }}
              >
                <Stack
                  // direction={"row"}
                  justifyContent={"space-between"}
                  sx={{
                    flexDirection: { sm: "row", xs: "column" },
                    gap: { sm: 0, xs: 3 },
                  }}
                >
                  <Typography variant="text-xl-semibold">
                    Profile Details
                  </Typography>
                  <Button
                    disabled={profileLoading}
                    type="submit"
                    variant="contained"
                    sx={{
                      gap: "7px",
                      borderRadius: { sm: "4px", xs: "4px" },
                      fontFamily: "Product Sans, sans-serif !important",
                      fontSize: "14px !important",
                      fontWeight: "400 !important",
                      background:
                        "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                    }}
                  >
                    {profileLoading ? (
                      <CircularProgress size={18} sx={{ color: "#8477DA" }} />
                    ) : (
                      "Edit Profile"
                    )}
                    {profileLoading ? (
                      ""
                    ) : (
                      <Icon icon="editWhiteIcon" width={12} height={14} />
                    )}
                  </Button>
                </Stack>

                {/* section for text fields */}
                <Stack
                  direction={{
                    md: "row",
                    lg: "column",
                  }}
                  justifyContent={"space-evenly"}
                >
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "column",
                      md: "column",
                      lg: "row",
                    }}
                    justifyContent={"space-between"}
                    sx={{ mt: "30px" }}
                  >
                    <FormControl sx={{ width: { sm: "333px", xs: "100%" } }}>
                      <TextField
                        label="Name/Company Name"
                        size="large"
                        name="name"
                        sx={{ width: { sm: "333px", xs: "100%" } }}
                        value={values.name}
                        onChange={handleChange}
                        helperText={touched.name && errors.name}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        width: { sm: "333px", xs: "100%" },
                        mt: { sm: 0, xs: 1 },
                      }}
                    >
                      <TextField
                        label="Email"
                        size="large"
                        name="email"
                        sx={{ width: { sm: "333px", xs: "100%" } }}
                        disabled={true}
                        onChange={handleChange}
                        value={values.email}
                        helperText={touched.email && errors.email}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                      />
                    </FormControl>
                    {/* <FormControl
                      sx={{
                        width: { sm: "333px", xs: "100%" },
                        mt: { sm: 0, xs: 1 },
                      }}
                    >
                      <Typography
                        variant="text-sm-medium"
                        sx={{ marginBottom: "5px" }}
                      >
                        Phone
                      </Typography>
                      <PhoneInput
                        style={{ width: isModile ? "100%" : "333px" }}
                        name="phoneNumber"
                        className="custom-phone-input"
                        defaultCountry="us"
                        value={values.phoneNumber || ""}
                        onChange={(value) => {
                          handleChange({
                            target: {
                              name: "phoneNumber",
                              value: value,
                            },
                          });
                        }}
                        onBlur={() =>
                          handleBlur({ target: { name: "phoneNumber" } })
                        }
                      />
                      {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                        <Typography
                          color="error"
                          variant="text-xs-regular"
                          sx={{ marginTop: "5px", marginLeft: "15px" }}
                        >
                          {isString(errors.phoneNumber)
                            ? errors.phoneNumber
                            : "Invalid phone number"}
                        </Typography>
                      )}
                    </FormControl> */}
                    <FormControl
                      sx={{
                        width: { sm: "333px", xs: "100%" },
                        mt: { sm: 0, xs: 1 },
                      }}
                    >
                      <Typography
                        variant="text-sm-medium"
                        sx={{ marginBottom: "5px" }}
                      >
                        Phone
                      </Typography>

                      <PhoneInputWithCode
                        value={values.phoneNumber} // Bind Formik's phoneNumber value
                        onChange={(value) => handlePhoneInputChange(value)}
                        onCountrySelect={(selectedCountry) => {}}
                        height="48px"
                      />

                      {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                        <Typography
                          color="error"
                          variant="text-xs-regular"
                          sx={{ marginTop: "5px", marginLeft: "15px" }}
                        >
                          {typeof errors.phoneNumber === "string"
                            ? errors.phoneNumber
                            : "Invalid phone number"}{" "}
                        </Typography>
                      )}
                    </FormControl>
                  </Stack>

                  {/* city, state , address */}
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "column",
                      md: "column",
                      lg: "row",
                    }}
                    justifyContent={"space-between"}
                    sx={{ mt: "20px" }}
                  >
                    <FormControl sx={{ width: { sm: "333px", xs: "100%" } }}>
                      <TextField
                        label="City"
                        size="large"
                        name="city"
                        sx={{ width: { sm: "333px", xs: "100%" } }}
                        onChange={handleChange}
                        value={values.city}
                        helperText={touched.city && errors.city}
                        onBlur={handleBlur}
                        error={touched.city && Boolean(errors.city)}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        width: { sm: "333px", xs: "100%" },
                        mt: { sm: 0, xs: 1 },
                      }}
                    >
                      <TextField
                        label="State"
                        size="large"
                        name="state"
                        sx={{ width: { sm: "333px", xs: "100%" } }}
                        onChange={handleChange}
                        value={values.state}
                        helperText={touched.state && errors.state}
                        onBlur={handleBlur}
                        error={touched.state && Boolean(errors.state)}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        width: { sm: "333px", xs: "100%" },
                        mt: { sm: 0, xs: 1 },
                      }}
                    >
                      <TextField
                        label="Address"
                        size="large"
                        name="address"
                        sx={{ width: { sm: "333px", xs: "100%" } }}
                        onChange={handleChange}
                        value={values.address}
                        helperText={touched.address && errors.address}
                        onBlur={handleBlur}
                        error={touched.address && Boolean(errors.address)}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
