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
import React from "react";
import ProductSlider from "./ProductSlider";
import ProductCart from "./Cart";
import { Single_Product } from "Types/api";

type props = {
  quickView: boolean;
  product: Single_Product;
  handleQuickViewClose: () => void;
};
export default function QuickView({
  quickView,
  product,
  handleQuickViewClose,
}: props) {
  return (
    <Dialog
      open={quickView}
      fullWidth={true}
      maxWidth={"lg"}
      sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column" }}
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
        >
          <ProductSlider
            images={product.attributes.imagesall.data}
            discount={product?.attributes.discount}
          />
        </Box>
        <Stack
          sx={{
            width: { xs: "100%", md: "50%" },
            gap: 0,
          }}
        >
          <Typography component={"h2"} variant="h3" gutterBottom>
            {product?.attributes.title}
          </Typography>
          {product?.attributes.discount ? (
            <Stack
              direction={"row"}
              sx={{
                gap: 3,
              }}
            >
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
            size="small"
            readOnly
            precision={0.5}
            value={+product?.attributes.rating.slice(1)}
            sx={{ marginY: "10px" }}
          />
          <Typography variant="body2">
            {product?.attributes.shortDescription}
          </Typography>
          <Divider sx={{ marginY: "25px", bgcolor: "colors.darkgray" }} />

          {/* Add to Cart Button */}
          <ProductCart product={product} />
        </Stack>
      </Stack>
    </Dialog>
  );
}
