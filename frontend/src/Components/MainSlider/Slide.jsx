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
            <Typography
              variant="h3"
              component={"h3"}
              gutterBottom
              sx={{
                // "@keyframes slideup": {
                //   from: { transform: "translateY(200%)", opacity: "0" },
                //   to: { transform: "trasnlateY(0)", opacity: "1" },
                // },
                // animation: `${
                //   slide?.current?.closest(".swiper-slide-active") &&
                //   "slideup 0.3s ease-out"
                // }`,
                // animationDelay: "0.5s",
                // animationFillMode: "backwards",
              }}
            >
              {subtitle}
            </Typography>
            <Typography
              variant="h1"
              component={"h2"}
              textAlign={{ xs: "center", sm: "start" }}
              gutterBottom
              sx={{
                // "@keyframes slideup": {
                //   from: { transform: "translateY(200%)", opacity: "0" },
                //   to: { transform: "trasnlateY(0)", opacity: "1" },
                // },
                // animation: `${
                //   slide?.current?.closest(".swiper-slide-active") &&
                //   "slideup 0.5s ease-out"
                // }`,
                // animationDelay: "0.8s",
                // animationFillMode: "backwards",
              }}
            >
              {title}
            </Typography>
            <Link href="/">
              <Button
                disableRipple
                variant="outlined"
                sx={{
                  // "@keyframes slideup": {
                  //   from: { transform: "translateY(150%)", opacity: "0" },
                  //   to: { transform: "trasnlateY(0)", opacity: "1" },
                  // },
                  " @keyframes hover": {
                    from: {
                      boxShadow: "inset 0 0 0 0.01px #a749ff",
                    },
                    to: {
                      boxShadow: "inset 180px 0 0 0.01px #a749ff",
                      color: "#fff",
                    },
                  },

                  "@keyframes leave": {
                    from: {
                      boxShadow: "inset -180px 0 0 0.01px #a749ff",
                      color: "#fff",
                    },
                    to: {
                      boxShadow: "inset 0 0 0 0.01px #a749ff",
                    },
                  },
                  width: "180px",
                  height: "60px",
                  borderRadius: "2px",
                  borderColor: "text.black",
                  fontSize: "16px",
                  color: "text.black",
                  animation:"leave 0.5s forwards",
                  // animation: `leave 0.5s forwards,${
                  //   slide?.current?.closest(".swiper-slide-active") &&
                  //   "slideup 0.4s ease-out 1.2s backwards"
                  // }`,
                  "&:hover": {
                    animation: "hover 0.5s forwards",
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
                // "@keyframes slideup": {
                //   from: { transform: "translateY(100%)", opacity: "0.4" },
                //   to: { transform: "trasnlateY(0)", opacity: "1" },
                // },
                // animation: `${
                //   slide?.current?.closest(".swiper-slide-active") &&
                //   "slideup 1s ease-out"
                // }`,
                // animationDelay: "1.5s",
                // animationFillMode: "backwards",
              }}
            />
          </Grid>
        </Grid>
      </Container>
  );
}
