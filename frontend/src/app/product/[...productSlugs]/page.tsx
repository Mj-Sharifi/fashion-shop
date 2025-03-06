"use client";
// MUI components
import {
  Box,
  Container,
  Stack,
  Rating,
  Typography,
  Divider,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// React
import React, { useState, useEffect } from "react";

// Custom components
import ProductSlider from "./ProductSlider";
import Comments from "./Comments";
import Cart from "./Cart";

// Related Products Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
import ProductCard from "Components/ProductCard";
import GoUp from "Components/GoUp";
// Toastify
import { ToastContainer } from "react-toastify";
import { Single_Product } from "Types/api";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Single_Product>();
  const [relatedProducts, setRelatedProducts] = useState<Single_Product[]>();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_API +
            `products/${params?.productSlugs[0]}?populate=*`
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

  // Handle Tabs
  const [tab, setTab] = useState<"1"|"2"|"3">("1");
  const handleTab = (event:React.SyntheticEvent, newTab:"1"|"2"|"3") => {
    setTab(newTab);
  };
  const scrollableTab = useMediaQuery("(max-width:580px)");
  return (
    <>
      {product && (
        <Container>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              columnGap: 6,
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
              }}
            >
              <ProductSlider
                images={product?.attributes?.imagesall?.data}
                discount={product?.attributes?.discount}
              />
            </Box>
            <Stack
              sx={{
                width: { xs: "100%", md: "50%" },
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

              {/* Add to Cart Button */}
              <Cart product={product} />
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
                <Stack
                  direction={"row"}
                  sx={{
                    gap: 5,
                  }}
                >
                  <Stack
                    sx={{
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      Material
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      Dimension
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      Weight
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      Other info
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      gap: 2,
                    }}
                  >
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
                <Comments productId={product?.id} />
              </TabPanel>
            </TabContext>
          </Box>
          {/* Related Products */}
          <Stack
            direction={"column"}
            sx={{
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              component={"h3"}
              sx={{
                textTransform: "uppercase",
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
                    product={e}
                    // id={e?.id}
                    // slug={e.slug}
                    // title={e?.attributes.title}
                    // rating={e?.attributes.rating.slice(1)}
                    // imgAll={e?.attributes?.imagesall}
                    // imgPrimary={
                    //   process.env.NEXT_PUBLIC_BASE_URL +
                    //   e?.attributes.imageprimary.data.attributes.url
                    // }
                    // imgSecondary={
                    //   process.env.NEXT_PUBLIC_BASE_URL +
                    //   e?.attributes.imagesecondary.data.attributes.url
                    // }
                    // shortDescription={e?.attributes.shortDescription}
                    // colors={e.attributes.colors}
                    // sizes={e.attributes.sizes}
                    // discount={e?.attributes.discount}
                    // price={e?.attributes.price}
                    // isNew={e?.attributes.isNew}
                    // isAvailable={e?.attributes.isAvailable}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Stack>
        </Container>
      )}
      <GoUp />
      <ToastContainer />
    </>
  );
}
