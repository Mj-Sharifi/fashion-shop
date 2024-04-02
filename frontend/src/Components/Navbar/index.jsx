"use client";
import {
  CompareArrows,
  FavoriteBorderOutlined,
  KeyboardArrowDown,
  Menu,
  Person3Outlined,
  Search,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Container,
  IconButton,
  Input,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./style.module.css";
import MegaMenu from "./MegaMenu";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { useAppSelector } from "@/Lib/hooks";
const menuItems = ["Home", "Shop", "Blog", "Contact"];

export default function Navbar() {
  const tabletSize = useMediaQuery("(max-width:800px)");
  const { list } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  // handle navbar position
  const navbar = useRef();
  const [stickyClass, setSticykClass] = useState(false);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight > 80) {
        setSticykClass(true);
      } else {
        setSticykClass(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  // handle Search
  const [searchOpen, setSearchOpen] = useState(false);
  // handle mobile menu
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        setMobileMenu(false);
      }
    });
  }, []);
  // Handle Cart Menu
  const [cartMenu, setCartMenu] = useState(false);
  const handleCartMenu = () => {
    setCartMenu(!cartMenu);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 800) {
        setCartMenu(false);
      }
    });
  }, []);
  //Handle Categories and Subcategories
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_API + "categories?populate=*")
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <nav
      id="navbar"
      className={`${styles.navbar} ${stickyClass && styles.stick}`}
      ref={navbar}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: "5px",
        }}
      >
        <Image
          src={"/assets/fashion-logo.png"}
          width={70}
          height={70}
          alt="Fasion Shop"
        />
        <Stack direction={"row"} gap={3} display={{ xs: "none", md: "flex" }}>
          {menuItems.map((e, i) => {
            if (e != "Shop") {
              return (
                <Link key={i} href={`/${e != "Home" ? e.toLowerCase() : ""}`}>
                  <Typography
                    variant="body2"
                    sx={{
                      transition: "0.3s",
                      "&:hover": { color: "colors.violet" },
                    }}
                  >
                    {e}
                  </Typography>
                </Link>
              );
            } else {
              return (
                <Box
                  key={i}
                  sx={{
                    "&:hover": {
                      "& .MuiPaper-root": {
                        visibility: "visible",
                        opacity: "1",
                        height: "250px",
                      },
                    },
                  }}
                >
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography
                      variant="body2"
                      sx={{
                        transition: "0.3s",
                        "&:hover": { color: "colors.violet" },
                        cursor: "pointer",
                      }}
                    >
                      {e}
                    </Typography>
                    <KeyboardArrowDown />
                  </Stack>

                  <Paper
                    sx={{
                      transition: "0.3s",
                      position: "absolute",
                      top: "80px",
                      left: "2%",
                      right: "2%",
                      zIndex: "1000",
                      visibility: "hidden",
                      opacity: "0",
                      height: "0px",
                      overflow: "hidden",
                      px: "1%",
                    }}
                  >
                    <MegaMenu categories={categories} />
                  </Paper>
                </Box>
              );
            }
          })}
        </Stack>
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            "& button:not(.closeBtn)": { bgcolor: "transparent !important" },
            "& svg:not(.closeBtn)": {
              transition: "all 0.3s",
              color: "text.black",
            },
            "& svg:not(.closeBtn):hover": { color: "colors.violet" },
          }}
        >
          <Box
            sx={{ position: "relative", display: { xs: "none", md: "flex" } }}
          >
            <IconButton
              sx={{ backgroundColor: "transparent !important" }}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search />
            </IconButton>
            <Stack
              direction={"row"}
              sx={{
                padding: "10px",
                position: "absolute",
                transition: "all 0.5s",
                boxShadow: "0 1px 1px 1px rgba(0,0,0,.1)",
                visibility: `${searchOpen ? "visible" : "hidden"}`,
                opacity: `${searchOpen ? "1" : "0"}`,
                transform: `rotateX(${searchOpen ? "0" : "90deg"})`,
                transformOrigin: "top",
                right: "0",
                top: "165%",
                bgcolor: "text.white",
              }}
            >
              <Input
                type="text"
                placeholder="Search"
                sx={{
                  transition: "all 0.3s",
                  height: "45px",
                  width: "220px",
                  paddingX: "5px",
                  fontSize: "14px",
                  outline: "none",
                  border: "1px solid",
                  borderColor: "colors.darkgray",
                  "&::after": {
                    border: "none !important",
                  },
                  "&::before": {
                    border: "none !important",
                  },
                }}
              />
              <Stack
                width={"45px"}
                height={"45px"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "45px",
                  width: "60px",
                  bgcolor: "colors.violet",
                  "&:hover": { bgcolor: "text.black" },
                }}
              >
                <Search sx={{ color: "text.white" }} />
              </Stack>
            </Stack>
          </Box>
          <IconButton sx={{ display: { xs: "none", md: "flex" } }}>
            <Person3Outlined />
          </IconButton>
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "colors.violet",
                color: "text.white",
                top: "10%",
                right: "10%",
              },
            }}
          >
            <IconButton>
              <CompareArrows />
            </IconButton>
          </Badge>
          <Badge
            badgeContent={wishlist.length}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "colors.violet",
                color: "text.white",
                top: "10%",
                right: "10%",
              },
            }}
          >
            <Link href={"/wishlist"}>
              <IconButton>
                <FavoriteBorderOutlined />
              </IconButton>
            </Link>
          </Badge>
          <Badge
            badgeContent={list.length}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "colors.violet",
                color: "text.white",
                top: "10%",
                right: "10%",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              {tabletSize ? (
                <Link href="/cart">
                  <IconButton>
                    <ShoppingBagOutlined />
                  </IconButton>
                </Link>
              ) : (
                <IconButton onClick={handleCartMenu}>
                  <ShoppingBagOutlined />
                </IconButton>
              )}

              <Paper
                className="cartMenu"
                sx={{
                  transition: "all 0.5s",
                  position: "absolute",
                  top: "60px",
                  right: "0",
                  width: "310px",
                  height:"500px",
                  overflowY:"scroll",
                  zIndex: "1000",
                  visibility: `${cartMenu ? "visible" : "hidden"}`,
                  opacity: `${cartMenu ? "1" : "0"}`,
                  transformOrigin: "top center",
                  transform: `${cartMenu ? "rotateX(0deg)" : "rotateX(90DEG)"}`,
                  overflowX: "hidden",
                  padding: "10px 25px",
                }}
              >
                <Cart />
              </Paper>
            </Box>
          </Badge>
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleMobileMenu}
          >
            <Menu />
          </IconButton>
        </Stack>
      </Container>
      <HamburgerMenu
        mobileMenu={mobileMenu}
        handleMobileMenu={handleMobileMenu}
        categories={categories}
      />
    </nav>
  );
}
