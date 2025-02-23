import React from "react";
import { Stack } from "@mui/material";
import { BounceLoader } from "react-spinners";
export default function Loading() {
  return (
    (<Stack
      sx={{
        minHeight: "70vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <BounceLoader color="#a749ff" />
    </Stack>)
  );
}
