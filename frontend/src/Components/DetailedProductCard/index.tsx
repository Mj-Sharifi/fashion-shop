import {
  Box,
  Chip,
  Stack,
  Typography,
  Rating,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { FavoriteBorderOutlined, CompareArrows } from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import { toast, Slide } from "react-toastify";
import { addToWishlist } from "Lib/Features/Wishlist/wishSlice";
import { addToCompare } from "Lib/Features/Compare/compareSlice";
import { useAppDispatch, useAppSelector } from "Hooks/redux";
import { Single_Product } from "Types/api";
import { isInComparelist, isInWishlist } from "Utils/utils";

type props = {
  product: Single_Product;
};

export default function DetailedProductCard({ product }: props) {
  const {
    id,
    attributes: {
      title,
      imageprimary,
      imagesecondary,
      rating,
      price,
      discount,
      shortDescription,
      isNew,
      isAvailable,
    },
  } = product;
  const mobileSize = useMediaQuery("(max-width:580px)");
  // Handle wishlist and compare
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { compareList } = useAppSelector((state) => state.compare);
  const handleWishlist = () => {
    dispatch(
      addToWishlist({
        id,
        title,
        imageprimary,
        price,
        discount,
        isAvailable,
      })
    );
    toast.success(`${title} added to wishlist`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,

      closeOnClick: false,
      closeButton: false,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      theme: "light",
      transition: Slide,
    });
  };
  const handleCompare = () => {
    dispatch(addToCompare({ product }));
    toast.success(`${title} added to compare`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      theme: "light",
      transition: Slide,
    });
  };
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: "30px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            "img:nth-child(1)": {
              transform: "translateX(-100%)",
            },
            "img:nth-child(2)": {
              visibility: "visible !important",
              opacity: "1 !important",
              transform: "translateX(0)",
            },
          },
        }}
      >
        <Box
          component={"img"}
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            imageprimary?.data?.attributes.url
          }
          sx={{
            transition: "0.5s",
            width: "100%",
            maxHeight: { xs: "150px", md: "250px" },
            objectFit: "contain",
          }}
        />
        <Box
          component={"img"}
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            imagesecondary.data.attributes.url
          }
          sx={{
            transition: "0.5s",
            position: "absolute",
            top: "0",
            right: "0",
            width: "100%",
            maxHeight: { xs: "150px", md: "250px" },
            objectFit: "contain",
            visibility: "hidden",
            opacity: "0.8",
            transform: "translateX(100%)",
          }}
        />
        <Stack
          sx={{
            gap: 1,
            position: "absolute",
            top: "5%",
            right: "5%",
          }}
        >
          {isNew && (
            <Chip
              variant="filled"
              label="New"
              sx={{
                width: "42px",
                height: "26px",
                borderRadius: "5px",
                bgcolor: "colors.violet",
                color: "text.white",
                fontSize: "12px",
                fontWeight: "500",
                "& .MuiChip-label": { padding: "0" },
              }}
            />
          )}
          {discount ? (
            <Chip
              variant="filled"
              label={`-${discount}%`}
              sx={{
                width: "42px",
                height: "26px",
                borderRadius: "5px",
                bgcolor: "colors.pink",
                color: "text.white",
                fontSize: "12px",
                fontWeight: "500",
                "& .MuiChip-label": { padding: "0" },
              }}
            />
          ) : undefined}
        </Stack>
      </Box>
      <Stack
        sx={{
          width: { xs: "100%", md: "70%" },
          gap: "5px",
          alignItems: { xs: "center", md: "start" },
        }}
      >
        <Typography variant="h4" component={"h2"}>
          {title}
        </Typography>
        {discount ? (
          <Stack
            direction={"row"}
            sx={{
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ color: "red" }}>
              ${(price - (price * discount) / 100).toFixed(2)}
            </Typography>
            <Typography
              variant="h4"
              sx={{ textDecoration: "line-through", color: "colors.darkgray" }}
            >
              ${price.toFixed(2)}
            </Typography>
          </Stack>
        ) : (
          <Typography variant="h4">{`$${price.toFixed(2)}`}</Typography>
        )}
        <Rating
          readOnly
          precision={0.5}
          value={+rating.slice(1)}
          size="small"
        />
        <Typography
          variant="body2"
          sx={{
            textAlign: { xs: "center", md: "start" },
            opacity: "0.7",
          }}
        >
          {shortDescription?.split(" ").slice(0, 20).join(" ")}...
        </Typography>
        <Stack
          direction={"row"}
          sx={{
            gap: 3,
          }}
        >
          <Link
            href={`/product/${id}/${title.toLowerCase().replace(/ /g, "-")}`}
          >
            <Button
              sx={{
                height: "40px",
                width: "160px",
                borderRadius: "5px",
                color: "text.white",
                bgcolor: "colors.lightblack",
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
                  borderRadius: "5px",
                  position: "absolute",
                  transition: "all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
                  zIndex: "-1",
                },
                "&:hover::after": {
                  left: `${isAvailable && "0"}`,
                  right: `${isAvailable && "auto"}`,
                  width: `${isAvailable && "100%"}`,
                },
              }}
            >
              {isAvailable ? "More info ..." : "Out of Stock"}
            </Button>
          </Link>
          {/* <IconButton
            disableRipple
            sx={{ padding: "0" }}
            onClick={() =>
              dispatch(
                addToWishlist({
                  id,
                  title,
                  imageprimary: imgPrimary,
                  price,
                  discount,
                  isAvailable,
                })
              )
            }
          >
            <FavoriteBorderOutlined
              sx={{
                transition: "all 0.3s",
                cursor: `${
                  isInWishlist(id, wishlist) ? "not-allowed" : "pointer"
                }`,
                color: `${isInWishlist(id, wishlist) ? "colors.violet" : ""}`,
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton>
          <IconButton disableRipple sx={{ padding: "0" }}>
            <CompareArrows
              sx={{
                transition: "all 0.3s",
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton> */}
          <IconButton
            disableRipple
            sx={{ padding: "0" }}
            onClick={handleWishlist}
          >
            <FavoriteBorderOutlined
              sx={{
                transition: "all 0.3s",
                cursor: `${
                  isInWishlist(id, wishlist) ? "not-allowed" : "pointer"
                }`,
                color: `${isInWishlist(id, wishlist) ? "colors.violet" : ""}`,
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton>
          <IconButton
            disableRipple
            sx={{ padding: "0" }}
            onClick={handleCompare}
          >
            <CompareArrows
              sx={{
                transition: "all 0.3s",
                cursor: `${
                  isInComparelist(id, compareList) ? "not-allowed" : "pointer"
                }`,
                color: `${
                  isInComparelist(id, compareList) ? "colors.violet" : ""
                }`,
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
