import React, { useEffect } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useMediaQuery } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
export default function Toast({ type="success", message }) {
  const mobileSize = useMediaQuery('(max-width:580px)')
  useEffect(() => {
    toast(message);
  }, [message]);
  return (
    <ToastContainer
      position={mobileSize ? "bottom-center" : "bottom-left"}
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick={false}
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition={Slide}
    />
  );
}
