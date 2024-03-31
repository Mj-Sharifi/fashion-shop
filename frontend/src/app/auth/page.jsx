"use client"
import React, { useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import Login from "./login";
import Register from "./register";
export default function Auth() {
  const [pageType, setPageType] = useState(true);
  const handlePageType = (bool) => {
    setPageType(bool);
  };
  return (
    <Stack
      minHeight={"100vh"}
      width={"100%"}
      alignItems={"center"}
      paddingY={{xs:"30%",sm:"25%",md:"20%",lg:"10%"}}
    >
      <Stack direction={"row"} alignItems={"center"} mb={1}>
        <Typography
          variant="h4"
          sx={{ cursor:"pointer",transition: "all 0.3s",color:`${pageType&&"colors.violet"}` ,"&:hover": { color: "colors.violet" } }}
          onClick={()=>handlePageType(true)}
        >
          Login
        </Typography>
        <Divider orientation="vertical" sx={{height:"20px",marginX:"15px",backgroundColor:"colors.lightblack"}}/>
        <Typography
          variant="h4"
          sx={{ cursor:"pointer",transition: "all 0.3s",color:`${!pageType&&"colors.violet"}`, "&:hover": { color: "colors.violet" } }}
          onClick={()=>handlePageType(false)}
        >
          Register
        </Typography>
      </Stack>
      {pageType ? <Login /> : <Register />}
    </Stack>
  );
}
