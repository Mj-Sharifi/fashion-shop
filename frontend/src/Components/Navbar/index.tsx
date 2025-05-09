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
import NavCart from "./NavCart";
import { handleLogout } from "Lib/Features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "Hooks/redux";
import { Single_Category, Single_Product } from "Types/api";
const menuItems = ["Home", "Shop", "Contact"];

export default function Navbar() {
  const tabletSize = useMediaQuery("(max-width:800px)");
  // Handle Redux (wishlist, comparelist, cart and auth)
  const { list } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { compareList } = useAppSelector((state) => state.compare);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Handle Sticky Navbar, Mobile Menu and Cart Dropdown Menu
  const navbar = useRef();
  const [stickyClass, setSticykClass] = useState(false);
  // Mobile Menu
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  // Cart Dropdown Menu
  const [cartMenu, setCartMenu] = useState(false);
  const handleCartMenu = () => {
    setCartMenu(!cartMenu);
  };
  useEffect(() => {
    // Scroll
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setSticykClass(true);
      } else {
        setSticykClass(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Resize Mobile
    const handleResizeMobile = () => {
      if (window.innerWidth > 800) {
        setMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResizeMobile);
    // Cart Dropdown Menu
    const handleCartDropdown = () => {
      if (window.innerWidth < 800) {
        setCartMenu(false);
      }
    };
    window.addEventListener("resize", handleCartDropdown);
    return () => {
      window.removeEventListener("resize", handleResizeMobile);
      window.removeEventListener("resize", handleCartDropdown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle Search
  const [searchOpen, setSearchOpen] = useState(false);
  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Single_Product[]>();
  useEffect(() => {
    if (searchText.length > 2) {
      fetch(
        process.env.NEXT_PUBLIC_BASE_API +
          `products?filters[title][$containsi]=${searchText}&populate=*`
      )
        .then((res) => res.json())
        .then((data) => setSearchResult(data.data))
        .catch((err) => console.log(err));
    } else {
      setSearchResult([]);
    }
  }, [searchText]);
  // Handle Mobile Menu
  // const [mobileMenu, setMobileMenu] = useState(false);
  // const handleMobileMenu = () => {
  //   setMobileMenu(!mobileMenu);
  // };
  // useEffect(() => {
  //   const handleResize = ()=>{      if (window.innerWidth > 800) {
  //     setMobileMenu(false);
  //   }}
  //   window.addEventListener("resize", handleResize);
  //   return(()=>window.removeEventListener("resize",handleResize))
  // }, []);
  // Handle Cart Dropdown Menu
  // const [cartMenu, setCartMenu] = useState(false);
  // const handleCartMenu = () => {
  //   setCartMenu(!cartMenu);
  // };
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth < 800) {
  //       setCartMenu(false);
  //     }
  //   });
  // }, []);
  // Handle Login/Register Dropdown Menu
  const [loginMenu, setLoginMenu] = useState(false);
  const handleLoginMenu = () => {
    setLoginMenu(!loginMenu);
  };
  const handleLogoutButton = () => {
    dispatch(handleLogout());
    if (document.URL.includes("profile")) {
      window.location.replace("/auth");
    }
  };
  //Handle Categories and Subcategories
  const [categories, setCategories] = useState<Single_Category[]>();
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
        <Link href={"/"}>
          <Image
            src={"/assets/fashion-logo.png"}
            width={70}
            height={70}
            alt="Fasion Shop"
          />
        </Link>

        {/* Menu Items (Home, Shop etc.) */}
        <Stack
          direction={"row"}
          sx={{
            gap: 3,
            display: { xs: "none", md: "flex" },
          }}
        >
          {menuItems.map((item, i) => {
            if (item != "Shop") {
              return (
                <Link
                  key={i}
                  href={`/${item != "Home" ? item.toLowerCase() : ""}`}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      transition: "0.3s",
                      "&:hover": { color: "colors.violet" },
                    }}
                  >
                    {item}
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
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        transition: "0.3s",
                        "&:hover": { color: "colors.violet" },
                        cursor: "pointer",
                      }}
                    >
                      {item}
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
        {/* Menu Icons */}
        <Stack
          direction={"row"}
          sx={{
            gap: 2,
            "& button:not(.closeBtn)": { bgcolor: "transparent !important" },

            "& svg:not(.closeBtn)": {
              transition: "all 0.3s",
              color: "text.black",
            },

            "& svg:not(.closeBtn):hover": { color: "colors.violet" },
          }}
        >
          {/* Search */}
          <Box
            sx={{ position: "relative", display: { xs: "none", md: "flex" } }}
          >
            <IconButton
              sx={{ backgroundColor: "transparent !important" }}
              onClick={handleSearch}
            >
              <Search />
            </IconButton>
            <Paper
              sx={{
                transition: "all 0.5s",
                position: "absolute",
                top: "60px",
                right: "0",
                zIndex: "1000",
                visibility: `${searchOpen ? "visible" : "hidden"}`,
                opacity: `${searchOpen ? "1" : "0"}`,
                transformOrigin: "top center",
                transform: `${searchOpen ? "rotateX(0deg)" : "rotateX(90deg)"}`,
                padding: "10px 25px",
                display: "flex",
              }}
            >
              <Input
                type="text"
                placeholder="Search"
                value={searchText}
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
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "45px",
                  width: "60px",
                  bgcolor: "colors.violet",
                  "&:hover": { bgcolor: "text.black" },
                }}
              >
                <Search sx={{ color: "text.white" }} />
              </Stack>
            </Paper>
            <Paper
              sx={{
                transition: "all 0.3s",
                position: "absolute",
                visibility: `${searchText.length > 1 ? "visible" : "hidden"}`,
                opacity: `${searchText.length > 1 ? "1" : "0"}`,
                backgroundColor: "colors.lightgray",
                height: `${searchText.length > 1 ? "auto" : "0"}`,
                width: "300px",
                padding: "10px",
                top: "130px",
                right: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                zIndex: "800",
              }}
            >
              {searchResult?.map((e, i) => (
                <Link
                  key={i}
                  href={`/product/${e?.id}/${e.attributes?.title
                    .toLowerCase()
                    .trim()
                    .replace(/ /g, "-")}`}
                >
                  <Stack
                    direction={"row"}
                    sx={{
                      width: "100%",
                      alignItems: "center",
                      gap: 1,

                      "&:hover p": {
                        transition: "all 0.3s",
                        color: "colors.violet",
                      },
                    }}
                  >
                    <Box
                      component={"img"}
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        e.attributes.imageprimary.data.attributes.formats.small
                          .url
                      }
                      sx={{
                        width: "30%",
                        maxHeight: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ "&:hover": { color: "colors.violet" } }}
                    >
                      {e.attributes?.title}
                    </Typography>
                  </Stack>
                </Link>
              ))}
            </Paper>
          </Box>
          {/* Login/Register */}
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{ display: { xs: "none", md: "flex" } }}
              onClick={handleLoginMenu}
            >
              <Person3Outlined />
            </IconButton>
            <Paper
              sx={{
                transition: "all 0.5s",
                position: "absolute",
                top: "60px",
                right: "0",
                width: "180px",
                zIndex: "1000",
                visibility: `${loginMenu ? "visible" : "hidden"}`,
                opacity: `${loginMenu ? "1" : "0"}`,
                transformOrigin: "top center",
                transform: `${loginMenu ? "rotateX(0deg)" : "rotateX(90deg)"}`,
                padding: "10px 25px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                "& p:hover": {
                  transition: "all 0.3s",
                  color: "colors.violet",
                },
              }}
            >
              {token ? (
                <>
                  <Link href={"/my-profile"}>
                    <Typography variant="body2">Profile</Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    onClick={handleLogoutButton}
                    sx={{ cursor: "pointer" }}
                  >
                    Logout
                  </Typography>
                </>
              ) : (
                <Link href={"/auth"}>
                  <Typography variant="body2">Login / Register</Typography>
                </Link>
              )}
            </Paper>
          </Box>
          {/* Compare */}
          <Badge
            badgeContent={compareList.length}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "colors.violet",
                color: "text.white",
                top: "10%",
                right: "10%",
              },
            }}
          >
            <Link href={"/compare"}>
              <IconButton>
                <CompareArrows />
              </IconButton>
            </Link>
          </Badge>
          {/* Wishlist */}
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
          {/* Cart */}
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
                  zIndex: "1000",
                  visibility: `${cartMenu ? "visible" : "hidden"}`,
                  opacity: `${cartMenu ? "1" : "0"}`,
                  transformOrigin: "top center",
                  transform: `${cartMenu ? "rotateX(0deg)" : "rotateX(90deg)"}`,
                  overflowX: "hidden",
                  paddingY: "10px",
                }}
              >
                <NavCart />
              </Paper>
            </Box>
          </Badge>
          {/* Mobile Menu */}
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
      {/* <Toast type="error" message={toast} /> */}
    </nav>
  );
}
