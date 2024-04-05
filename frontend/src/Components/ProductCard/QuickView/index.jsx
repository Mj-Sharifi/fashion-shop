import { Clear } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductSlider from "./ProductSlider";
import Cart from "./Cart";

export default function QuickView({ quickView, product,handleQuickViewClose }) {
  return (
    <Dialog
      open={quickView}
      fullWidth={true}
      maxWidth={"lg"}
      sx={{ display: {xs:"none",sm:"flex"}, flexDirection: "column" }}
      onClose={handleQuickViewClose}
    >
      <Stack
        sx={{
          alignItems: "end",
          width: "100%",
          borderColor: "colors.lightgray",
          borderBottom: "1px solid",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "transparent",
            "&:hover svg": { color: "colors.violet" },
          }}
          onClick={handleQuickViewClose}
        >
          <Clear />
        </IconButton>
      </Stack>
      <Stack width={"100%"} direction={{ xs: "column", md: "row" }} gap={3}>
        <Box width={{ xs: "100%", md: "50%" }}>
          <ProductSlider
            images={product?.attributes?.imagesall?.data}
            discount={product?.attributes.discount}
          />
        </Box>
        <Stack width={{ xs: "100%", md: "50%" }}>
          <Typography component={"h2"} variant="h3" gutterBottom>
            {product?.attributes.title}
          </Typography>

          {product?.attributes.discount ? (
            <Stack direction={"row"} gap={3}>
              <Typography variant="h4" sx={{ color: "red" }}>
                $
                {(
                  product?.attributes.price -
                  (product?.attributes.price * product?.attributes.discount) /
                    100
                ).toFixed(2)}
              </Typography>
              <Typography
                variant="h4"
                sx={{ textDecoration: "line-through", color: "#8e8e8e" }}
              >
                ${product?.attributes.price.toFixed(2)}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="h4">{`$${product?.attributes.price.toFixed(
              2
            )}`}</Typography>
          )}
          <Rating
            readOnly
            precision={0.5}
            value={+product?.attributes.rating}
            sx={{ marginY: "25px" }}
          />
          <Typography variant="body2">
            {product?.attributes.shortDescription}
          </Typography>
          <Divider sx={{ marginY: "25px", bgcolor: "colors.darkgray" }} />

          {/* Add to Cart Button */}
          <Cart product={product} />
        </Stack>
      </Stack>
    </Dialog>
  );
}
