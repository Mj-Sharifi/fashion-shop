"use client";
import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  palette: {
    colors: {
      violet: "#a749ff !important",
      purple: "#f0e0ff !important",
      pink:"#fa6bff",
      lightgray: "#f6f6f8 !important",
      darkgray: "#d3d3d3 !important",
      lightblack: "#343538 !important",
    },
    text: {
      black: "#222 !important",
      white: "#fff !important",
    },
  },
});
theme.typography.h1 = {
  color: "#222",
  fontSize: "30px",
  lineHeight: "42px",
  fontWeight: "400",
  [theme.breakpoints.up("sm")]: {
    fontSize: "42px",
    lineHeight: "54px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "52px",
    lineHeight: "68px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "72px",
    lineHeight: "98px",
  },
};
theme.typography.h3 = {
  color: "#222",
  fontSize: "20px",
  fontWeight: "500",
  [theme.breakpoints.up("sm")]: {
    fontSize: "24px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "26px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "30px",
  },
};
theme.typography.h4 = {
  color: "#222",
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "30px",
};
theme.typography.h5 = {
  color: "#222",
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "20px",
};
theme.typography.body2 = {
  color: "#222",
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "0.8px",
};
export default theme;
