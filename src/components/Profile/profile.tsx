"use client";
import { palette } from "@/theme/palette";
import { Box, Button, CircularProgress, FormControl, Stack, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { TextField } from "../TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/Styles/profilePhoneNoStyle.css";
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

const alphaRegex = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  // companyName: Yup.string().required("Company Name is required"),
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  city: Yup.string()
    .matches(alphaRegex, "Invalid City")
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
  const {data:session} = useSession();
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
    if (session?.accessToken)
    fetchProfile();
  }, [fetchProfile,session?.accessToken,counter]);
  // Image
  const [uploadImage, setUploadImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');
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
    countryCode: "PK",
  };

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        const data = {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          city: values.city,
          state: values.state,
          address: values.address,
          ...(uploadImage ? {image:uploadImage} : {})
          // image: image,
        };
        
        profileUpdate({apiRoute:`${backendURL}/users/my-profile`,data:data}).then((res)=>{          
          setUploadImage(null);
          setImageUrl(res?.image);
          dispatch(increment())
          console.log("Updateed Succesfully");
        }).catch((err)=>{
          console.error(err);
        })
      },
    });
  return (
    <>
      <hr />
      <Box
        borderRadius={3}
        sx={{
          alignSelf: "center",
          margin: "20px",
          marginTop: "70px",
          width: "97%",
          height: "928px",
          backgroundColor: palette.base.white,
        }}
      >
        {/* top bar */}
        <Box
          sx={{
            height: "156px",
            background: `linear-gradient(92.47deg, #3F4DE1 47.93%, #4B59E8 112.85%)`,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            position: "relative",
          }}
        ></Box>

        {/* circle avatar */}
        <ProfileAvatar uploadImage={uploadImage} setUploadImage={setUploadImage} imageUrl={imageUrl} setImageUrl={setImageUrl} />

        {/* name and email  */}
        <Stack direction={"column"} sx={{ ml: "210px", mt: "5px" }}>
          <Typography variant="display-xs-semibold">{profileData?.name}</Typography>
          <Typography
            variant="text-md-regular"
            sx={{ color: palette.color.gray[735] }}
          >
            {profileData?.email}
          </Typography>
        </Stack>

        {/* profile detail section */}
        <form onSubmit={handleSubmit}>
          <Stack
            direction={"column"}
            sx={{
              mt: "50px",
              mx: "20px",
              p: "20px",
              border: `1px solid ${palette.color.gray[5]}`,
              borderRadius: "10px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="text-xl-semibold">
                Profile Details
              </Typography>
              <Button disabled={profileLoading} type="submit" variant="contained" sx={{ gap: "7px" }}>
               {profileLoading ? <CircularProgress size={18} sx={{ color: "#8477DA" }} /> : 'Edit Profile'} 
                {profileLoading ? '' : <Icon icon="editWhiteIcon" width={12} height={14} />}
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ mt: "30px" }}
            >
              <FormControl sx={{ width: "333px" }}>
                <TextField
                  label="Name/Company Name"
                  size="large"
                  name="name"
                  sx={{ width: "333px" }}
                  value={values.name}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                />
              </FormControl>
              <FormControl sx={{ width: "333px" }} >
                <TextField
                  label="Email"
                  size="large"
                  name="email"
                  sx={{ width: "333px" }}
                  disabled={true}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                />
              </FormControl>
              <FormControl sx={{ width: "333px" }}>
                <Typography
                  variant="text-sm-medium"
                  sx={{ marginBottom: "5px" }}
                >
                  Phone
                </Typography>
                <PhoneInput
                  style={{ width: "333px" }}
                  name="phoneNumber"
                  className="custom-phone-input"
                  defaultCountry="pk"
                  value={values.phoneNumber || ""}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "phoneNumber",
                        value: value,
                      },
                    });
                  }}
                  onBlur={() => handleBlur({ target: { name: "phoneNumber" } })}
                />
                {/* {touched.phoneNumber && Boolean(errors.phoneNumber) && (
                    <Typography
                      color="error"
                      variant="text-xs-regular"
                      sx={{ marginTop: "5px", marginLeft: "15px" }}
                    >
                      {isString(errors.phoneNumber)
                        ? errors.phoneNumber
                        : "Invalid phone number"}
                    </Typography>
                  )} */}
              </FormControl>
            </Stack>

            {/* city, state , address */}
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ mt: "20px" }}
            >
              <FormControl sx={{ width: "333px" }}>
                <TextField
                  label="City"
                  size="large"
                  name="city"
                  sx={{ width: "333px" }}
                  onChange={handleChange}
                  value={values.city}
                  helperText={touched.city && errors.city}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                />
              </FormControl>
              <FormControl sx={{ width: "333px" }}>
                <TextField
                  label="State"
                  size="large"
                  name="state"
                  sx={{ width: "333px" }}
                  onChange={handleChange}
                  value={values.state}
                  helperText={touched.state && errors.state}
                  onBlur={handleBlur}
                  error={touched.state && Boolean(errors.state)}
                />
              </FormControl>
              <FormControl sx={{ width: "333px" }}>
                <TextField
                  label="Address"
                  size="large"
                  name="address"
                  sx={{ width: "333px" }}
                  onChange={handleChange}
                  value={values.address}
                  helperText={touched.address && errors.address}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                />
              </FormControl>
            </Stack>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default Profile;
