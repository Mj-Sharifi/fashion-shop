"use client"
import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Input,
  Button,
} from "@mui/material";
import {
  Phone,
  Public,
  LocationOn,
  LinkedIn,
  Instagram,
  Facebook,
  GitHub,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";
import GoUp from "@/Components/GoUp";
export default function Contact() {
  return (
    <Container>
      <Stack gap={4}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12852.952643329256!2d59.543364487260305!3d36.35500974262615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1712563715660!5m2!1sen!2s"
          style={{border:"0",borderRadius:"1%",width:"100%",aspectRatio:"1.78"}}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <Stack direction={{ xs: "column", md: "row" }} gap={1}>
          {/* Contact Info */}
          <Stack
            sx={{
              width: { xs: "100%", md: "45%", lg: "40%", xl: "30%" },
              backgroundColor: "colors.lightgray",
              borderRadius: "1%",
              paddingY: { xs: "80px", sm: "100px", md: "120px" },
              alignItems: "center",
              gap: "45px",
            }}
          >
            <Stack sx={{ marginX: "auto", alignItems: "start", gap: "30px" }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
              >
                <Phone
                  fontSize="large"
                  sx={{
                    borderRadius: "50%",
                    padding: "7px",
                    border: "1px solid",
                    borderColor: "colors.lightblack",
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "text.white",
                      backgroundColor: "colors.lightblack",
                    },
                  }}
                />
                <Stack>
                  <Typography variant="body2">+98 9039104679</Typography>
                  <Typography variant="body2">+98 9039104679</Typography>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
              >
                <Public
                  fontSize="large"
                  sx={{
                    borderRadius: "50%",
                    padding: "7px",
                    border: "1px solid",
                    borderColor: "colors.lightblack",
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "text.white",
                      backgroundColor: "colors.lightblack",
                    },
                  }}
                />
                <Stack>
                  <Typography variant="body2">
                    mj.sharifimanesh@gmail.com
                  </Typography>
                  <Typography variant="body2">www.mj-end.ir</Typography>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
              >
                <LocationOn
                  fontSize="large"
                  sx={{
                    borderRadius: "50%",
                    padding: "7px",
                    border: "1px solid",
                    borderColor: "colors.lightblack",
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "text.white",
                      backgroundColor: "colors.lightblack",
                    },
                  }}
                />
                <Stack>
                  <Typography variant="body2">Address goes here,</Typography>
                  <Typography variant="body2">
                    street, Crossroad 123.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack alignItems={"center"} gap={1}>
              <Typography variant="h4">Follow Us</Typography>
              <Stack
                direction={"row"}
                gap={1}
                sx={{
                  "& svg:hover": {
                    transition: "all 0.3s",
                    color: "colors.violet",
                  },
                }}
              >
                <Link href={"#"} target="_blank">
                  <LinkedIn />
                </Link>
                <Link href={"https://github.com/Mj-Sharifi"} target="_blank">
                  <GitHub />
                </Link>
                <Link href={"#"}>
                  <Instagram />
                </Link>
                <Link href={"#"}>
                  <Facebook />
                </Link>
                <Link href={"#"}>
                  <YouTube />
                </Link>
              </Stack>
            </Stack>
          </Stack>
          {/* Form */}
          <Stack
            sx={{
              width: { xs: "100%", md: "55%", lg: "60%", xl: "70%" },
              backgroundColor: "colors.lightgray",
              borderRadius: "1%",
              paddingY: "50px",
              paddingX: { xs: "30px", md: "50px", xl: "100px" },
              columnGap: "10px",
              rowGap: "20px",
            }}
          >
            <Stack
              width={"100%"}
              direction={{ xs: "column", sm: "row" }}
              gap={"20px"}
              mt={1}
            >
              <Input
                placeholder="Name*"
                name="author"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
                  border: "1px solid",
                  borderColor: "colors.darkgray",
                  borderRadius: "5px",
                  width: { xs: "100%", sm: "50%" },
                  height: "45px",
                  px: "10px",
                }}
              />
              <Input
                placeholder="Email*"
                name="email"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
                  border: "1px solid",
                  borderColor: "colors.darkgray",
                  borderRadius: "5px",
                  width: { xs: "100%", sm: "50%" },
                  height: "45px",
                  px: "10px",
                }}
              />
            </Stack>
            <Input
              placeholder="Subject*"
              name="email"
              sx={{
                "& input::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
                border: "1px solid",
                borderColor: "colors.darkgray",
                borderRadius: "5px",
                width: { xs: "100%", sm: "50%" },
                height: "45px",
                px: "10px",
              }}
            />
            <Input
              name="content"
              multiline
              placeholder="Your Message*"
              sx={{
                alignItems: "start",
                "& textarea::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
                border: "1px solid",
                borderColor: "colors.darkgray",
                borderRadius: "5px",
                width: "100%",
                height: "200px",
                padding: "15px",
                "&.Mui-focused": {
                  border: "1px solid !important",
                  borderColor: "colors.lightblack",
                },
              }}
            />
            <Button
              disableRipple
              sx={{
                height: "45px",
                width: "135px",
                backgroundColor: "colors.lightblack",
                color: "text.white",
                "&:hover": { backgroundColor: "colors.violet" },
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <GoUp />
    </Container>
  );
}
