import {
  Call,
  Close,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import {
  Box,
  Input,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CompareArrows,
  FavoriteBorderOutlined,
  Menu,
  Person3Outlined,
  Search,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import React from "react";
import Link from "next/link";
const menuItems = ["Home", "Shop", "Blog","Contact"];
export default function HamburgerMenu({ mobileMenu, handleMobileMenu }) {
  return (
    <Stack
      sx={{
        width: "400px",
        maxWidth: "100%",
        height: "100vh",
        transition: "0.3s",
        position: "fixed",
        top: "0",
        right: "0",
        zIndex: "10000",
        transform: `${mobileMenu ? "translateX(0)" : "translateX(100%)"}`,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <IconButton
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "0",
          bgcolor: "colors.lightblack",
          "&:hover>svg": { transform: "rotateZ(90deg) !important" },
        }}
        onClick={handleMobileMenu}
      >
        <Close sx={{ transition: "0.3s", color: "text.white" }} />
      </IconButton>
      <Paper sx={{ width: "100%", height: "100%", borderRadius: "0" }}>
        <Stack
          bgcolor={"colors.lightgray"}
          width={"100%"}
          height={"40px"}
          direction="row"
          alignItems={"center"}
          paddingX={"10px"}
        >
          <Input
            placeholder="Search..."
            sx={{
              transition: "all 0.3s",
              height: "45px",
              width: "100%",
              paddingX: "5px",
              fontSize: "14px",
              outline: "none",
              border: "none",
              "& input::placeholder": { color: "text.black", opacity: "1" },
              "&::after": {
                border: "none !important",
              },
              "&::before": {
                border: "none !important",
              },
            }}
          />
          <Search sx={{ color: "#aaa" }} />
        </Stack>
        {/* Menu Items */}
        <Stack gap={3} px={3} mt={4}>
          {menuItems.map((e, i) => (
            <Link key={i} href={e.toLowerCase()}>
              <Typography
                variant="subtitle2"
                component={"p"}
                fontWeight={"600"}
                textTransform={"uppercase"}
              >
                {e}
              </Typography>
            </Link>
          ))}
        </Stack>
        <Stack mt={6} px={3} alignItems={"start"} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Call fontSize="small" />
            <Typography>(+98) 9039104679</Typography>{" "}
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Email fontSize="small" />
            <Typography>mj.sharifimanesh@gmail.com</Typography>
          </Stack>
        </Stack>
        {/* Social Media Logos */}
        <Stack
          direction={"row"}
          mt={3}
          px={3}
          sx={{
            "& button": { padding: "0" },
            "& button:hover": { backgroundColor: "transparent" },
            "& svg": { color: "text.black" },
          }}
          gap={2}
        >
          <IconButton
            sx={{
              "&:hover svg": {
                color: "red !important",
              },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            sx={{
              "&:hover svg": {
                color: "#1877F2 !important",
              },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            sx={{
              "&:hover svg": {
                color: "#1DA1F2 !important",
              },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            sx={{
              "&:hover svg": {
                color: "#075E54 !important",
              },
            }}
          >
            <WhatsApp />
          </IconButton>
        </Stack>
      </Paper>
    </Stack>
  );
}
