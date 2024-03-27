"use client";
import {
  Box,
  Button,
  Container,
  Stack,
  Rating,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductSlider from "./ProductSlider";
import {
  Add,
  Remove,
  FavoriteBorderOutlined,
  CompareArrows,
} from "@mui/icons-material";
import { useAppDispatch} from "@/Lib/hooks";

import { addItem } from "@/Lib/Features/Cart/cartSlice";

export default function ProductDetail({ params }) {

  const [product, setProduct] = useState();
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_BASE_API +
        `products/${params.productSlugs[0]}?populate=*`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  }, []);
  // Hanlde Size
  const [size, setSize] = useState();
  //Handle Color
  const [color, setColor] = useState();
  //Handle Quantity
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };
  const dispatch = useAppDispatch();
  console.log(product);
  return (
    <>
      {product && (
        <Container>
          <Stack direction={{ xs: "column", md: "row" }} columnGap={6}>
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
                      (product?.attributes.price *
                        product?.attributes.discount) /
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
                value={+product?.attributes.rating?.slice(1)}
                sx={{ marginY: "25px" }}
              />
              <Typography variant="bosy2">
                {product?.attributes.shortDescription}
              </Typography>
              <Divider sx={{ marginY: "25px", bgcolor: "colors.darkgray" }} />
              {/* Color and Size Selection */}
              {product?.attributes.isAvailable && (
                <Stack direction={"row"} gap={5}>
                  <Stack direction={"column"} gap={2}>
                    <Typography variant="body2">Color</Typography>
                    <Stack direction={"row"} gap={1}>
                      {product?.attributes.colors?.data?.map((e, i) => (
                        <Stack
                          key={i}
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "25px",
                            height: "25px",
                            padding: "2px",
                            borderRadius: "100%",
                            border: "1px solid",
                            borderColor: `${
                              color === e?.attributes.color
                                ? "colors.lightblack"
                                : "transparent"
                            }`,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            id={e?.attributes.color}
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "100%",
                              bgcolor: e?.attributes.color,
                            }}
                            onClick={(e) => setColor(e.target.id)}
                          ></Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                  <Stack direction={"column"} gap={2}>
                    <Typography variant="body2">Size</Typography>
                    <Stack direction={"row"} gap={1}>
                      {product?.attributes.sizes?.data?.map((e, i) => (
                        <Stack
                          key={i}
                          sx={{
                            px: "5px",
                            height: "25px",
                            justifyContent: "center",
                            borderRadius: "5px",
                            fontSize: "14px",
                            bgcolor: `${
                              size === e?.attributes.size
                                ? "colors.purple"
                                : "colors.lightgray"
                            }`,
                          }}
                          onClick={(e) => setSize(e.target.innerHTML)}
                        >
                          {e?.attributes.size}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              )}
              {/* Add to Cart Button */}
              <Stack direction={"row"} gap={4} marginY={3}>
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid",
                    borderColor: "colors.lightgray",
                    borderRadius: "5px",
                    height: "60px",
                    width: "80px",
                  }}
                >
                  <IconButton
                    disableRipple
                    sx={{ padding: "0" }}
                    onClick={handleIncrease}
                    disabled={!product?.attributes.isAvailable}
                  >
                    <Add
                      sx={{
                        transition: "all 0.3s",
                        color: "colors.darkgray",
                        "&:hover": { color: "colors.violet" },
                      }}
                    />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton
                    disableRipple
                    sx={{ padding: "0" }}
                    onClick={handleDecrease}
                    disabled={
                      quantity === 1 || !product?.attributes.isAvailable
                    }
                  >
                    <Remove
                      sx={{
                        transition: "all 0.3s",
                        color: "colors.darkgray",
                        "&:hover": { color: "colors.violet" },
                      }}
                    />
                  </IconButton>
                </Stack>
                <Button
                  onClick={() =>
                    dispatch(addItem({ product, size, quantity, color }))
                  }
                  disableRipple
                  disabled={!product?.attributes.isAvailable || !color || !size}
                  sx={{
                    height: "60px",
                    width: "120px",
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
                      transition:
                        "all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
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
                      transition:
                        "all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
                      zIndex: "-1",
                    },
                    "&:hover::after": {
                      left: `${product?.attributes.isAvailable && "0"}`,
                      right: `${product?.attributes.isAvailable && "auto"}`,
                      width: `${product?.attributes.isAvailable && "100%"}`,
                    },
                  }}
                >
                  {product?.attributes.isAvailable
                    ? "Add to Cart"
                    : "Out of Stock"}
                </Button>
                <Stack direction={"row"} gap={1}>
                  <IconButton disableRipple sx={{ padding: "0" }}>
                    <FavoriteBorderOutlined
                      sx={{
                        transition: "all 0.3s",
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
          </Stack>
        </Container>
      )}
    </>
  );
}
