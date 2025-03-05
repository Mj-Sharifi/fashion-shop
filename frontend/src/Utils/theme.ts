"use client";
import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 580,
      md: 800,
      lg: 1190,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    menuItems: {
      fontFamily: poppins.style.fontFamily,
      color: "#222",
      fontSize: "15px",
      lineHeight: "18px",
      fontWeight: "500",
    }
  },
  palette: {
    colors: {
      violet: "#a749ff !important",
      purple: "#f0e0ff !important",
      pink: "#fa6bff",
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
  fontFamily: poppins.style.fontFamily,
  color: "#222",
  fontSize: "30px",
  lineHeight: "42px",
  fontWeight: "400",
  [theme.breakpoints.up("sm")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "42px",
    lineHeight: "54px",
  },
  [theme.breakpoints.up("md")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "52px",
    lineHeight: "68px",
  },
  [theme.breakpoints.up("lg")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "72px",
    lineHeight: "98px",
  },
};
theme.typography.h3 = {
  fontFamily: poppins.style.fontFamily,
  color: "#222",
  fontSize: "20px",
  fontWeight: "500",
  [theme.breakpoints.up("sm")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "24px",
  },
  [theme.breakpoints.up("md")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "26px",
  },
  [theme.breakpoints.up("lg")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "30px",
  },
};
theme.typography.h4 = {
  fontFamily: poppins.style.fontFamily,
  color: "#222",
  fontSize: "18px",
  fontWeight: "500",
  lineHeight: "30px",
  [theme.breakpoints.up("sm")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "20px",
  },
};
theme.typography.h5 = {
  fontFamily: poppins.style.fontFamily,
  color: "#222",
  fontSize: "18px",
  fontWeight: "400",
  lineHeight: "20px",
};

theme.typography.body2 = {
  fontFamily: poppins.style.fontFamily,
  color: "#222",
  fontSize: "14px",
  lineHeight: "24px",
  fontWeight: "400",
  [theme.breakpoints.up("sm")]: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "16px",
  },
};
theme.typography.menuItems = {
  fontFamily: poppins.style.fontFamily,
  color: "#222",
  fontSize: "15px",
  lineHeight: "18px",
  fontWeight: "500",
}
export default theme;
