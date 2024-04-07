import {
  Box,
  Chip,
  Stack,
  Typography,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import { FavoriteBorderOutlined, CompareArrows } from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/Lib/hooks";
import { addToWishlist } from "@/Lib/Features/Wishlist/wishSlice";
const isInWishlist = (id, wishlist) => {
  let isIn = false;
  for (const w of wishlist) {
    if (id == w.id) {
      isIn = true;
      break;
    }
  }
  return isIn;
};
export default function DetailedProductCard({
  id,
  slug,
  title,
  imgPrimary,
  imgSecondary,
  rating,
  price,
  discount,
  shortDescription,
  isNew,
  isAvailable,
}) {
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
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
        width={{ xs: "100%", md: "30%" }}
        position={"relative"}
        overflow={"hidden"}
        sx={{
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
          src={imgPrimary}
          sx={{
            width: "100%",
            transition: "0.5s",
            objectFit: "contain",
          }}
        />
        <Box
          component={"img"}
          src={imgSecondary}
          sx={{
            transition: "0.5s",
            position: "absolute",
            top: "0",
            right: "0",
            width: "100%",
            visibility: "hidden",
            opacity: "0.8",
            transform: "translateX(100%)",
          }}
        />
        <Stack sx={{ position: "absolute", top: "5%", right: "5%" }} gap={1}>
          {isNew && (
            <Chip
              variant="filled"
              label="New"
              sx={{
                width: "65px",
                paddingY: "3px",
                borderRadius: "5px",
                bgcolor: "colors.violet",
                color: "text.white",
                fontSize: "14px",
                fontWeight: "500",
              }}
            />
          )}
          {discount ? (
            <Chip
              variant="filled"
              label={`-${discount}%`}
              sx={{
                width: "65px",
                paddingY: "3px",
                borderRadius: "5px",
                bgcolor: "colors.pink",
                color: "text.white",
                fontSize: "14px",
                fontWeight: "500",
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
          <Stack direction={"row"} gap={2}>
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
        <Rating readOnly precision={0.5} value={rating} />
        <Typography
          variant="body2"
          sx={{ opacity: "0.7" }}
          textAlign={{ xs: "center", md: "start" }}
        >
          {shortDescription?.split(" ").slice(0, 20).join(" ")}...
        </Typography>
        <Stack direction={"row"} gap={3}>
          <Link href={`/product/${id}/${title.toLowerCase().replace(/ /g,"-")}`}>
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
          <IconButton
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
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
