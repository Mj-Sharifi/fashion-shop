import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { handleLogin } from "Lib/Features/Auth/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "Hooks/redux";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      identifier: Yup.string().required("Please enter your username"),
      password: Yup.string().required("Please enter your password"),
    }),
    validateOnChange: false,
    onSubmit: () => {
      fetch(process.env.NEXT_PUBLIC_BASE_API + "auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formik.values),
      })
        .then((res) => res.json())
        .then((data) => dispatch(handleLogin(data)))
        .then((path) => router.push("/my-profile"))
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
        name="identifier"
        id="identifier"
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
        value={formik.values.identifier}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        placeholder="Password"
        name="password"
        id="password"
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
      <Stack
        direction={"row"}
        sx={{
          width: { xs: "90%", md: "80%" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            sx={{ "& .Mui-checked": { color: "colors.violet" } }}
          />
        </FormGroup>
        <Typography variant="body2" sx={{ cursor: "pointer" }}>
          Forget Password?
        </Typography>
      </Stack>
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
        onClick={() => formik.handleSubmit()}
      >
        Login
      </Button>
    </Paper>
  );
}
