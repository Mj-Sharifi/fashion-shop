"use client";
// MUI components
import {
  Box,
  Button,
  Container,
  Stack,
  Rating,
  Typography,
  Divider,
  IconButton,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Add,
  Remove,
  FavoriteBorderOutlined,
  CompareArrows,
} from "@mui/icons-material";

// React
import React, { useState, useEffect } from "react";

// Custom components
import ProductSlider from "./ProductSlider";
import Comments from "./Comments";

// Redux
import { useAppDispatch } from "@/Lib/hooks";
import { addItem } from "@/Lib/Features/Cart/cartSlice";

// Related Products Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
import ProductCard from "@/Components/ProductCard";

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_API +
            `products/${params.productSlugs[0]}?populate=*`
        );
        const data = await res.json();
        const category =
          data.data.attributes.categories.data[0].attributes.title;
        const subCategory =
          data.data?.attributes.subcategories.data[0]?.attributes?.title;

        setProduct(data.data);
        const newRes = await fetch(
          process.env.NEXT_PUBLIC_BASE_API +
            `products?populate=*&filters[categories][title][$eq]=${category}&filters[subcategories][title][$eq]=${subCategory}`
        );
        let newData = await newRes.json();
        newData = newData.data?.filter((e) => {
          if (e.id === data.data.id) {
            return false;
          } else {
            return e;
          }
        });
        setRelatedProducts(newData);
      } catch (error) {
        console.log(error);
      }
    })();
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
  // Handle Tabs
  const [tab, setTab] = useState("1");
  const handleTab = (event, newTab) => {
    setTab(newTab);
  };
  const scrollableTab = useMediaQuery("(max-width:600px)");

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
              <Typography variant="body2">
                {product?.attributes.shortDescription}
              </Typography>
              <Divider sx={{ marginY: "25px", bgcolor: "colors.darkgray" }} />
              {/* Color and Size Selection */}
              {product?.attributes.isAvailable && (
                <Stack direction={"row"} gap={5}>
                  {/* Color */}
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
                            border: `${
                              color === e?.attributes.color
                                ? "3px solid"
                                : "1px solid"
                            }`,
                            borderColor: "colors.lightblack",
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
                  {/* Size */}
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
                            color: "cream",

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
                    height: "50px",
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
                    height: "50px",
                    width: "150px",
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
          {/* Tabs */}
          <Box
            sx={{
              width: "100%",
              marginY: { xs: "50px", sm: "70px", md: "100px" },
            }}
          >
            <TabContext value={tab}>
              <Box
                sx={{
                  "& .MuiTabs-root ": {
                    borderBottom: "1px solid",
                    borderColor: "colors.lightblack",
                  },
                }}
              >
                <TabList
                  onChange={handleTab}
                  aria-label="lab API tabs example"
                  centered={!scrollableTab && true}
                  variant={scrollableTab ? "scrollable" : "standard"}
                  scrollButtons="auto"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "colors.lightblack",
                    },
                    "& button": {
                      fontSize: { xxs: "16px", sm: "18px", md: "20px" },
                      opacity: "0.75",
                      color: "text.black",
                    },
                    "& button.Mui-selected": { opacity: "1" },
                  }}
                >
                  <Tab label="Additional Information" value="1" />
                  <Tab label="Description" value="2" />
                  <Tab label="Comments" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Stack direction={"row"} gap={5}>
                  <Stack gap={2}>
                    <Typography variant="body2" fontWeight={"500"}>
                      Material
                    </Typography>
                    <Typography variant="body2" fontWeight={"500"}>
                      Dimension
                    </Typography>
                    <Typography variant="body2" fontWeight={"500"}>
                      Weight
                    </Typography>
                    <Typography variant="body2" fontWeight={"500"}>
                      Other info
                    </Typography>
                  </Stack>
                  <Stack gap={2}>
                    <Typography variant="body2">
                      60% cotton, 40% polyester
                    </Typography>
                    <Typography variant="body2">10 x 10 x 15 cm</Typography>
                    <Typography variant="body2">150 g</Typography>
                    <Typography variant="body2">
                      American heirloom jean shorts pug seitan letterpress
                    </Typography>
                  </Stack>
                </Stack>
              </TabPanel>
              <TabPanel value="2">
                <Typography variant="body2">
                  {product?.attributes.longDescription}
                </Typography>
              </TabPanel>
              <TabPanel value="3">
                <Comments />
              </TabPanel>
            </TabContext>
          </Box>
          {/* Related Products */}
          <Stack direction={"column"} gap={2}>
            <Typography
              variant="h4"
              component={"h3"}
              textTransform={"uppercase"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                "&::before": {
                  content: "''",
                  width: { xs: "50px", sm: "90px" },
                  height: "2px",
                  bgcolor: "text.black",
                },
                "&::after": {
                  content: "''",
                  width: { xs: "50px", sm: "90px" },
                  height: "2px",
                  bgcolor: "text.black",
                },
              }}
            >
              Related Products
            </Typography>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                480: { slidesPerView: 2 },
                620: { slidesPerView: 3, spaceBetween: 20 },
                800: { slidesPerView: 4, spaceBetween: 40 },
                1280: { slidesPerView: 5, spaceBetween: 60 },
              }}
              freeMode={true}
              modules={[FreeMode]}
              className="mySwiper"
            >
              {relatedProducts?.map((e, i) => (
                <SwiperSlide key={i}>
                  <ProductCard
                    id={e.id}
                    title={e?.attributes.title}
                    rating={+e?.attributes.rating?.slice(1)}
                    imgPrimary={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      e?.attributes.imageprimary.data.attributes.url
                    }
                    imgSecondary={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      e?.attributes.imagesecondary.data.attributes.url
                    }
                    discount={e?.attributes.discount}
                    price={e?.attributes.price}
                    isNew={e?.attributes.isNew}
                    isAvailable={e?.attributes.isAvailable}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Stack>
        </Container>
      )}
    </>
  );
}
