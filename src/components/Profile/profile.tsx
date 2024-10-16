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
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { imageConvertion } from "@/utils/common";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getCountValue, increment } from "@/redux/features/counterSlice";
import { PhoneInputWithCode } from "../PhoneInputWithCode";
import { countryCodes } from "@/utils/data";
import "@/Styles/sectionStyle.css";
import { UserProfileDetails } from "../UserProfileDetails";

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().min(3).max(35).required("Name is required"),
  // companyName: Yup.string().required("Company Name is required"),
  email: Yup.string()
    // .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  city: Yup.string()
    .matches(alphaRegex, "Invalid City")
    .min(3, "City must be at least 3 characters long")
    .max(20, "City must be at most 20 characters long")
    .required("City is required"),
  state: Yup.string()
    .matches(alphaRegex, "Invalid State")
    .min(2, "State must be at least 2 characters long")
    .max(20, "State must be at most 20 characters long")
    .required("State is required"),
  address: Yup.string()
    .matches(alphaRegex, "Invalid Address")
    .min(5, "Too short")
    .max(225, "State must be at most 225 characters long"),

  // .required("Address is required"),
});

interface Profile {}

const Profile: FC<Profile> = ({}) => {
  const { data: session } = useSession();
  const isModile = useMediaQuery("(max-width: 500px)");
  const counter = useSelector(getCountValue);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isEdit, setIsEdit] = React.useState(false);

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
      console.log(isEdit, "iseditSub");
      const isChange =
        values.name !== profileData?.name ||
        values.address !== profileData?.address ||
        values.email !== profileData?.email ||
        values.city !== profileData?.city ||
        values.state !== profileData?.state ||
        values.phoneNumber !== profileData?.phoneNumber;
      console.log(isChange, "isChange");
      if (isEdit) {
        if (isChange) {
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
        }
        setIsEdit(false);
      } else {
        setIsEdit(true);
      }
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

  const handleEditClick = () => {
    console.log(isEdit, "isedithdledit");
    setIsEdit(true);
  };

  console.log(isEdit, "isedit");
  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
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
              pb: { sm: "24px", xs: "16px" },
            }}
          >
            {/* top bar */}
            {/* <Box
              sx={{
                height: "156px",
                background: "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                position: "relative",
                width: "100%",
              }}
            ></Box> */}
            <Box
              sx={{
                height: "156px",
                width: "100%",
                overflow: "hidden",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                backgroundImage: "url(/Images/profile-bg.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contained",
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
                    maxWidth: { sm: "100%", xs: "100%" },
                    overflow: "hidden",
                    wordBreak: "break-word",
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
                    maxWidth: { sm: "100%", xs: "100%" },
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  {profileData ? profileData.email : "---"}
                </Typography>
              </Stack>

              {isEdit ? (
                // <Box sx={{ width: "100%" }}>
                <form onSubmit={handleSubmit}>
                  <Button
                    disabled={profileLoading || !isEdit}
                    type="submit"
                    variant="contained"
                    // onClick={handleSubmit}
                    sx={{
                      px: "14px !important",
                      py: "10px !important",
                      width: "100%",
                      height: "40px",
                      gap: "7px",
                      borderRadius: { sm: "4px", xs: "4px" },
                      fontFamily: "Product Sans, sans-serif !important",
                      fontSize: "14px !important",
                      fontWeight: "400 !important",
                      // background:
                      //   "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                      backgroundColor: palette.primary.main,
                    }}
                  >
                    {profileLoading ? (
                      ""
                    ) : (
                      <Icon icon="editWhiteIcon" width={12} height={14} />
                    )}
                    {profileLoading ? (
                      <CircularProgress size={18} sx={{ color: "#8477DA" }} />
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              ) : (
                // </Box>
                <Button
                  // disabled={profileLoading}
                  type="button"
                  variant="contained"
                  onClick={handleEditClick}
                  sx={{
                    px: "14px !important",
                    py: "10px !important",
                    height: "40px",
                    gap: "7px",
                    borderRadius: { sm: "4px", xs: "4px" },
                    fontFamily: "Product Sans, sans-serif !important",
                    fontSize: "14px !important",
                    fontWeight: "400 !important",
                    // background:
                    //   "linear-gradient(180deg, #4F35DF 0%, #2702F5 100%)",
                    backgroundColor: palette.primary.main,
                  }}
                >
                  <Icon icon="editWhiteIcon" width={12} height={14} />
                  {profileLoading ? (
                    <CircularProgress size={18} sx={{ color: "#8477DA" }} />
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              )}
            </Stack>
          </Box>

          {/* profile detail section */}
          {isEdit ? (
            <Box>
              {/* <form onSubmit={handleSubmit}> */}
              <Stack
                direction={"column"}
                sx={{
                  width: "100%",
                  mt: "16px",
                  mb: "40px",
                  mx: { sm: "0px", xs: "0px" },
                  px: { sm: "20px", xs: "16px" },
                  py: { sm: "20px", xs: "24px" },
                  border: `1px solid ${palette.color.gray[5]}`,
                  boxShadow: palette.boxShadows.shadowxs,
                  borderRadius: "12px",
                }}
              >
                <Stack
                  justifyContent={"space-between"}
                  sx={{
                    flexDirection: { sm: "row", xs: "column" },
                    gap: { sm: 0, xs: 3 },
                  }}
                >
                  <Typography
                    variant="text-xl-semibold"
                    sx={{
                      color: palette.color.gray[900],
                      fontSize: {
                        md: "20px !important",
                        xs: "16px !important",
                      },
                      lineHeight: {
                        md: "30px !important",
                        xs: "24px !important",
                      },
                      fontWeight: 600,
                    }}
                  >
                    Account Details
                  </Typography>
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
                    gap={2}
                    justifyContent={"space-between"}
                    sx={{ mt: "24px" }}
                  >
                    <FormControl sx={{ width: { sm: "100%", xs: "100%" } }}>
                      <TextField
                        label="Name/Company Name"
                        size="large"
                        name="name"
                        borderRadius="4px"
                        labelColor={"#344054"}
                        sx={{
                          width: { sm: "100%", xs: "100%" },
                          "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                          "& .MuiInputBase-input": {
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            color: "#101828",
                          },
                        }}
                        value={values.name}
                        onChange={handleChange}
                        helperText={touched.name && errors.name}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        width: { sm: "100%", xs: "100%" },
                        mt: { sm: 0, xs: 0 },
                      }}
                    >
                      <TextField
                        label="Email"
                        size="large"
                        name="email"
                        labelColor={"#344054"}
                        sx={{
                          width: { sm: "100%", xs: "100%" },
                          "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                          "& .MuiInputBase-input": {
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            color: "#101828",
                          },
                        }}
                        disabled={true}
                        onChange={handleChange}
                        value={values.email}
                        helperText={touched.email && errors.email}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                      />
                    </FormControl>

                    <FormControl
                      sx={{
                        width: { sm: "100%", xs: "100%" },
                        mt: { sm: 0, xs: 0 },
                      }}
                    >
                      <Typography
                        variant="text-sm-medium"
                        sx={{
                          marginBottom: "5px",
                          color: palette.text.textSecondary,
                        }}
                      >
                        Phone
                      </Typography>

                      <PhoneInputWithCode
                        value={values.phoneNumber} // Bind Formik's phoneNumber value
                        onChange={(value) => handlePhoneInputChange(value)}
                        onCountrySelect={(selectedCountry) => {}}
                        height="48px"
                        borderRadius="4px"
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
                    gap={2}
                    justifyContent={"space-between"}
                    sx={{ mt: "16px" }}
                  >
                    <FormControl sx={{ width: { sm: "100%", xs: "100%" } }}>
                      <TextField
                        label="City"
                        size="large"
                        name="city"
                        labelColor={"#344054"}
                        sx={{
                          width: { sm: "100%", xs: "100%" },
                          "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                          "& .MuiInputBase-input": {
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            color: "#101828",
                          },
                        }}
                        onChange={handleChange}
                        value={values.city}
                        helperText={touched.city && errors.city}
                        onBlur={handleBlur}
                        error={touched.city && Boolean(errors.city)}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        width: { sm: "100%", xs: "100%" },
                        mt: { sm: 0, xs: 0 },
                      }}
                    >
                      <TextField
                        label="Country/State"
                        size="large"
                        name="state"
                        labelColor={"#344054"}
                        sx={{
                          width: { sm: "100%", xs: "100%" },
                          "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                          "& .MuiInputBase-input": {
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            color: "#101828",
                          },
                        }}
                        onChange={handleChange}
                        value={values.state}
                        helperText={touched.state && errors.state}
                        onBlur={handleBlur}
                        error={touched.state && Boolean(errors.state)}
                      />
                    </FormControl>
                    <FormControl
                      sx={{
                        width: { sm: "100%", xs: "100%" },
                        mt: { sm: 0, xs: 0 },
                      }}
                    >
                      <TextField
                        label="Address"
                        size="large"
                        name="address"
                        labelColor={"#344054"}
                        sx={{
                          width: { sm: "100%", xs: "100%" },
                          "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                          "& .MuiInputBase-input": {
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            color: "#101828",
                          },
                        }}
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
              {/* </form> */}
            </Box>
          ) : (
            <UserProfileDetails profileData={profileData} />
          )}
        </Container>
      </Box>
      {/* </form> */}
    </>
  );
};

export default Profile;
