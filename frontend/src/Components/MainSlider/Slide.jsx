"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
export default function Slide({ title, subtitle, img }) {
  return (
    <Container
      sx={{
        height: {
          xs: "auto",
          sm: "450px",
          md: "520px",
          lg: "650px",
          xl: "750px",
        },
        overflow: "hidden",
      }}
    >
      <Grid container height={"100%"} rowGap={4}>
        <Grid
          item
          xs={12}
          sm={6}
          height={{ sm: "100%" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center !important"}
          alignItems={{ xs: "center", sm: "inherit" }}
        >
          <Typography variant="h3" component={"h3"} gutterBottom>
            {subtitle}
          </Typography>
          <Typography
            variant="h1"
            component={"h2"}
            textAlign={{ xs: "center", sm: "start" }}
            gutterBottom
          >
            {title}
          </Typography>
          <Link href="/">
            <Button
              disableRipple
              variant="outlined"
              sx={{
                border: "1px solid",
                borderColor:"text.black",
                color: "text.black",
                display: "inline-block",
                fontSize: "16px",
                padding: "19px 50px 21px",
                isolation: "isolate",
                position: "relative",
                transition: "all 0.5s ease-in-out 0s",
                "&::before": {
                  bottom: "0",
                  content: "''",
                  height: "100%",
                  left: "0",
                  position: " absolute",
                  transition: "all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
                  width: "100%",
                  zIndex: "-1",
                },
                "&::after": {
                  backgroundColor: "colors.violet",
                  left: "auto",
                  right: "0",
                  width: "0",
                  bottom: "0",
                  content: "''",
                  height: "100%",
                  position: "absolute",
                  transition: "all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
                  zIndex: "-1",
                },
                "&:hover": {
                  border: "1px solid",
                  borderColor:"colors.violet",
                  color: "#fff",
                },
                "&:hover::after": {
                  left: "0",
                  right: "auto",
                  width: "100%",
                },
              }}
            >
              SHOP NOW
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          height={{ sm: "100%" }}
          display={"flex"}
          alignItems={"end"}
        >
          <Box
            component={"img"}
            src={process.env.NEXT_PUBLIC_BASE_URL + img}
            alt={title}
            sx={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
