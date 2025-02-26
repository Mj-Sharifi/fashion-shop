"use client";
import Footer from "Components/Footer";
import MainSlider from "Components/MainSlider";
import Navbar from "Components/Navbar";
import {
  Box,
  Container,
  ListItemText,
  Typography,
  Tab,
  Tabs,
  Grid2,
} from "@mui/material";
import React, { useState, useEffect, SyntheticEvent } from "react";
import fetchData from "Utils/fetchData";
import styles from "./page.module.css";
import ProductCard from "Components/ProductCard";
import GoUp from "Components/GoUp";
import { ToastContainer } from "react-toastify";
import { Fetch_RES, Single_Product } from "Types/api";

export default function Home() {
  //Tabs
  const [tab, setTab] = useState(0);
  const handleTab = (event: SyntheticEvent, newtab: number) => {
    setTab(newtab);
  };
  // Products
  const [products, setProducts] = useState<{ [tab: string]: Single_Product[] }>(
    {}
  );
  useEffect(() => {
    const paginationLimit = 8;
    if (!products[String(tab)]) {
      (async () => {
        let data: Fetch_RES<Single_Product>;
        switch (tab) {
          case 0:
            data = await fetchData(
              process.env.NEXT_PUBLIC_BASE_API +
                `products?populate=*&filters[isNew][$eq]=true&pagination[start]=0&pagination[limit]=${paginationLimit}`
            );
            break;
          case 1:
            data = await fetchData(
              process.env.NEXT_PUBLIC_BASE_API +
                `products?populate=*&filters[bestSeller][$eq]=true&pagination[start]=0&pagination[limit]=${paginationLimit}`
            );
            break;
          case 2:
            data = await fetchData(
              process.env.NEXT_PUBLIC_BASE_API +
                `products?populate=*&sort=discount:desc&pagination[start]=0&pagination[limit]=${paginationLimit}`
            );

            break;
          default:
            break;
        }
        setProducts({ ...products, [String(tab)]: data?.data });
      })();
    }
  }, [tab]);
  return (
    <>
      <Navbar />
      <main>
        {/* main slider */}
        <MainSlider />
        <Container>
          {/* features */}
          <Grid2
            container
            columnSpacing={2}
            sx={{
              paddingTop: { xs: "60px", md: "100px" },
              paddingBottom: { xs: "30px", md: "60px" },
            }}
          >
            <Grid2
              size={{ xs: 12, sm: 6, md: 3 }}
              className={styles.feature}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                component={"img"}
                src="/assets/home/features/free-shipping.png"
              />
              <ListItemText
                primary="Free Shipping"
                secondary="Free shipping on all order"
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 6, md: 3 }}
              className={styles.feature}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box component={"img"} src="/assets/home/features/support.png" />
              <ListItemText
                primary="Support 24/7"
                secondary="Free shipping on all order"
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 6, md: 3 }}
              className={styles.feature}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                component={"img"}
                src="/assets/home/features/money-return.png"
              />
              <ListItemText
                primary="Money Return"
                secondary="Free shipping on all order"
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 6, md: 3 }}
              className={styles.feature}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box component={"img"} src="/assets/home/features/discount.png" />
              <ListItemText
                primary="Order Discount"
                secondary="Free shipping on all order"
              />
            </Grid2>
          </Grid2>
          {/* daily deals */}
          <Typography
            variant="h3"
            component={"h3"}
            sx={{
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",

              "&::before": {
                content: "''",
                width: "90px",
                height: "2px",
                bgcolor: "text.black",
              },

              "&::after": {
                content: "''",
                width: "90px",
                height: "2px",
                bgcolor: "text.black",
              },
            }}
          >
            Daily Deals
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={tab}
              onChange={handleTab}
              centered
              sx={{
                "& .MuiTabs-indicator": { width: "0 !important" },
                "& button": { opacity: "0.6", color: "text.black" },
                "& button.Mui-selected": { opacity: "1" },
              }}
            >
              <Tab
                disableRipple
                sx={{ fontSize: "16px" }}
                label="New Arrivals"
              />
              <Tab
                disableRipple
                sx={{ fontSize: "16px" }}
                label="Best Seller"
              />
              <Tab disableRipple sx={{ fontSize: "16px" }} label="Sale Items" />
            </Tabs>
          </Box>
          <Grid2
            container
            spacing={4}
            sx={{
              paddingTop: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {products[String(tab)]?.map((e, i) => (
              <Grid2 key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard
                  id={e?.id}
                  title={e?.attributes.title}
                  rating={e?.attributes.rating?.slice(1)}
                  imgAll={e?.attributes?.imagesall?.data}
                  imgPrimary={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    e?.attributes.imageprimary.data.attributes.url
                  }
                  imgSecondary={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    e?.attributes.imagesecondary.data.attributes.url
                  }
                  shortDescription={e?.attributes.shortDescription}
                  colors={e.attributes.colors.data}
                  sizes={e.attributes.sizes.data}
                  discount={e?.attributes.discount}
                  price={e?.attributes.price}
                  isNew={e?.attributes.isNew}
                  isAvailable={e?.attributes.isAvailable}
                />
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </main>
      <Footer />
      <GoUp />
      <ToastContainer />
    </>
  );
}
