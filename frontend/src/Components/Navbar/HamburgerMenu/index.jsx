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
import { Input, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import Link from "next/link";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useAppDispatch, useAppSelector } from "@/Lib/hooks";
const menuItems = ["Home", "Shop", "Blog", "Contact"];
export default function HamburgerMenu({
  mobileMenu,
  handleMobileMenu,
  categories,
}) {
  const [expandedItems, setExpandedItems] = useState([""]);
  const handleItemExpansionToggle = (event, itemId, isExpanded) => {
    if (isExpanded) {
      if (itemId === "Shop") {
        setExpandedItems([itemId]);
      } else {
        setExpandedItems(["Shop", itemId]);
      }
    } else {
      if (itemId === "Shop") {
        setExpandedItems([]);
      } else {
        setExpandedItems(["Shop"]);
      }
    }
  };
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
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
        {/* Search */}
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
        <Stack
          gap={2}
          px={3}
          mt={4}
          sx={{
            "& .MuiTypography-root:hover": {
              transition: "all 0.3s",
              color: "colors.violet",
            },
          }}
        >
          {menuItems.map((e, i) =>
            e !== "Shop" ? (
              <Link key={i} href={e.toLowerCase()}>
                <Typography
                  variant="body2"
                  fontWeight={"600"}
                  textTransform={"uppercase"}
                >
                  {e}
                </Typography>
              </Link>
            ) : (
              <SimpleTreeView
                key={i}
                expandedItems={expandedItems}
                onItemExpansionToggle={handleItemExpansionToggle}
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "transparent !important",
                  },
                  "& .MuiTreeItem-content": { paddingX: "0" },
                  "& .MuiTreeItem-content .MuiTreeItem-iconContainer": {
                    order: "2",
                  },
                  "& .MuiTreeItem-content .MuiTreeItem-label": {
                    paddingX: "0",
                    transition: "all 0.3s",
                    width: "auto",
                  },
                  "& svg": {
                    fontSize: "24px !important",
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "colors.violet",
                    },
                  },
                }}
              >
                <TreeItem
                  label={
                    <Typography variant="body2" fontWeight={"600"}>
                      {e}
                    </Typography>
                  }
                  itemId={`${e}`}
                >
                  {categories?.map((m, n) => (
                    <TreeItem
                      itemId={`${m?.attributes.title}`}
                      key={n}
                      label={
                        <Link
                          href={`/shop/${m?.attributes.slug}`}
                        >
                          <Typography variant="body2">
                            {m?.attributes.title}
                          </Typography>
                        </Link>
                      }
                    >
                      {m?.attributes.subcategories.data.map((k, l) => (
                        <TreeItem
                          itemId={m?.attributes.title + k?.attributes.title}
                          key={l}
                          label={
                            <Link
                              href={`/shop/${m?.attributes.slug}/${
                                k?.attributes.slug
                              }`}
                            >
                              <Typography variant="body2">
                                {k?.attributes.title}
                              </Typography>
                            </Link>
                          }
                        />
                      ))}
                    </TreeItem>
                  ))}
                </TreeItem>
              </SimpleTreeView>
            )
          )}
        </Stack>
        {/* Login / Register */}
        <Stack
          my={5}
          px={3}
          gap={2}
        >
          {token ? (
            <>
              <Link href={"/my-profile"}>
                <Typography
                  variant="body2"
                  fontWeight={"600"}
                  textTransform={"uppercase"}
                >
                  Profile
                </Typography>
              </Link>
              <Typography
                variant="body2"
                fontWeight={"600"}
                textTransform={"uppercase"}
                onClick={() => dispatch(handleLogout())}
                sx={{ cursor: "pointer" }}
              >
                Logout
              </Typography>
            </>
          ) : (
            <Link href={"/auth"}>
              <Typography
                variant="body2"
                fontWeight={"600"}
                textTransform={"uppercase"}
              >
                Login / Register
              </Typography>
            </Link>
          )}
        </Stack>
        {/* Contact Info */}
        <Stack mt={3} px={3} alignItems={"start"} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Call fontSize="small" />
            <Typography>(+98) 9039104679</Typography>
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
