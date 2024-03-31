import React from "react";
import { Button, Input, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().min(5,"It must be at least 5 characters").required("Please enter your username"),
      email: Yup.string().email().required("Please enter your email"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Please enter your password"),
    }),
    validateOnChange: false,
    onSubmit: () => {
        console.log(formik.values)
        console.log(formik.errors)
      fetch(process.env.NEXT_PUBLIC_BASE_API + "auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formik.values),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
  });
  return (
    <Paper
      sx={{
        width: { xs: "90%", sm: "70%", md: "50%", lg: "35%" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        paddingY: { xs: "10px", sm: "40px", md: "60px" },
      }}
    >
      <Input
        placeholder="Username"
        name="username"
        sx={{
          "& input::placeholder": { opacity: "0.7 !important" },
          "&::after": { border: "none !important" },
          "&::before": { border: "none !important" },
          border: "1px solid",
          borderColor: "colors.darkgray",
          borderRadius: "5px",
          width: { xs: "90%", md: "80%" },
          height: "45px",
          px: "10px",
        }}
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        placeholder="Email"
        name="email"
        sx={{
          "& input::placeholder": { opacity: "0.7 !important" },
          "&::after": { border: "none !important" },
          "&::before": { border: "none !important" },
          border: "1px solid",
          borderColor: "colors.darkgray",
          borderRadius: "5px",
          width: { xs: "90%", md: "80%" },
          height: "45px",
          px: "10px",
        }}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        placeholder="Password"
        name="password"
        sx={{
          "& input::placeholder": { opacity: "0.7 !important" },
          "&::after": { border: "none !important" },
          "&::before": { border: "none !important" },
          border: "1px solid",
          borderColor: "colors.darkgray",
          borderRadius: "5px",
          width: { xs: "90%", md: "80%" },
          height: "45px",
          px: "10px",
        }}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        placeholder="Confirm Password"
        name="cPassword"
        sx={{
          "& input::placeholder": { opacity: "0.7 !important" },
          "&::after": { border: "none !important" },
          "&::before": { border: "none !important" },
          border: "1px solid",
          borderColor: "colors.darkgray",
          borderRadius: "5px",
          width: { xs: "90%", md: "80%" },
          height: "45px",
          px: "10px",
        }}
        // value={formik.values.email}
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
      />

      <Button
        disableRipple
        sx={{
          backgroundColor: "colors.darkgray",
          color: "text.black",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: "colors.violet",
            color: "text.white",
          },
        }}
        onClick={formik.handleSubmit}
      >
        Register
      </Button>
      {/* {formik.errors && console.log(formik.errors)} */}
    </Paper>
  );
}
