"use client";
import fetchData from "@/Utils/fetchData";
import {
  FavoriteBorderOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Rating,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function DailyDeals() {
  //Tabs
  const [tab, setTab] = useState(0);
  const handleTab = (event, newtab) => {
    setTab(newtab);
  };
  // Products
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      let data;
      switch (tab) {
        case 0:
          data = await fetchData(
            process.env.NEXT_PUBLIC_BASE_API +
              `products?populate=*&filters[isNew][$eq]=true`
          );
          break;
        case 1:
          data = await fetchData(
            process.env.NEXT_PUBLIC_BASE_API +
              `products?populate=*&filters[bestSeller][$eq]=true`
          );
          break;
        case 2:
          data = await fetchData(
            process.env.NEXT_PUBLIC_BASE_API +
              `products?populate=*&sort=discount:desc&pagination[start]=0&pagination[limit]=8`
          );

          break;
        default:
          break;
      }
      setProducts(data?.data);
    })();
  }, [tab]);
  return (
    <>
      <Typography
        variant="h3"
        component={"h3"}
        textTransform={"uppercase"}
        sx={{
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
            "& button": { opacity: "0.75", color: "text.black" },
            "& button.Mui-selected": { opacity: "1" },
          }}
        >
          <Tab disableRipple sx={{ fontSize: "16px" }} label="New Arrivals" />
          <Tab disableRipple sx={{ fontSize: "16px" }} label="Best Seller" />
          <Tab disableRipple sx={{ fontSize: "16px" }} label="Sale Items" />
        </Tabs>
      </Box>
      <Grid container spacing={4}>
        {products?.map((e, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <Stack
              width={"100%"}
              overflow={"hidden"}
              position={"relative"}
              paddingBottom={"60px"}
              alignItems={"center"}
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
                  "& .buttons div": {
                    transform: "translateY(0)",
                    opacity: "1",
                  },
                },
              }}
            >
              <Box
                height={"70%"}
                width={"100%"}
                position={"relative"}
                overflow={"hidden"}
              >
                <Box
                  component={"img"}
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    e?.attributes.imageprimary.data.attributes.url
                  }
                  sx={{ width: "100%", transition: "0.5s" }}
                />
                <Box
                  component={"img"}
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    e?.attributes.imagesecondary.data.attributes.url
                  }
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
              </Box>
              <Typography>{e?.attributes.title}</Typography>
              <Rating
                readOnly
                precision={0.5}
                value={+e?.attributes.rating?.slice(1)}
              />
              <Stack direction={"row"}>
                {e?.attributes.discount ? (
                  <Typography>
                    $
                    {(
                      e?.attributes.price -
                      (e?.attributes.price * e?.attributes.discount) / 100
                    ).toFixed(2)}
                    -
                    <span
                      style={{
                        textDecoration: "strikethrough",
                        color: "#8e8e8e",
                      }}
                    >
                      ${(e?.attributes.price).toFixed(2)}
                    </span>
                  </Typography>
                ) : (
                  <Typography>{`$${e?.attributes.price.toFixed(
                    2
                  )}`}</Typography>
                )}
              </Stack>
              <Stack
                sx={{ position: "absolute", top: "5%", right: "5%" }}
                gap={1}
              >
                {e?.attributes.isNew && (
                  <Chip
                    variant="filled"
                    label="New"
                    sx={{
                      width: "60px",
                      paddingY: "3px",
                      borderRadius: "5px",
                      bgcolor: "colors.violet",
                      color: "text.white",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  />
                )}
                {e?.attributes.discount ? (
                  <Chip
                    variant="filled"
                    label={`${e?.attributes.discount}%`}
                    sx={{
                      width: "60px",
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
              <Stack
                className="buttons"
                width={"100%"}
                direction={"row"}
                position={"absolute"}
                bottom={"0"}
              >
                <Stack
                  sx={{
                    transition: "0.3s",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    height: "40px",
                    bgcolor: "colors.violet",
                    color: "text.white",
                    transform: "translateY(100%)",
                    opacity: "0",
                  }}
                >
                  <FavoriteBorderOutlined />
                </Stack>
                <Stack
                  sx={{
                    transition: "0.3s",
                    transitionDelay:"0.1s",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60%",
                    height: "40px",
                    bgcolor: "colors.violet",
                    color: "text.white",
                    border: "1px solid #ffffff90",
                    borderBottom: "0",
                    borderTop: "0",
                    transform: "translateY(100%)",
                    opacity: "0",
                  }}
                >
                  More info ...
                </Stack>
                <Stack
                  sx={{
                    transition: "0.3s",
                    transitionDelay:"0.2s",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    height: "40px",
                    bgcolor: "colors.violet",
                    color: "text.white",
                    transform: "translateY(100%)",
                    opacity: "0",
                  }}
                >
                  <VisibilityOutlined />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
