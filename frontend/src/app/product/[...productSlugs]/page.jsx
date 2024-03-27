"use client";
import {
  Box,
  Container,
  Stack,
  Rating,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductSlider from "./ProductSlider";

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
              <Stack marginY={3}></Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </>
  );
}
