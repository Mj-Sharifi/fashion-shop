"use client";
import {
  Container,
  Grid,
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "@/Components/ProductCard";
import Loading from "@/Components/Loading";
export default function Category({ params }) {
  const [products, setProducts] = useState();
  const [subcategories, setSubcategories] = useState();
  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();
  //**** Filters ****//
  // Category
  const [category, setCategory] = useState("All");
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  // Colors
  const [color, setColor] = useState("All");
  const handleColor = (event) => {
    setColor(event.target.value);
  };
  // Size
  const [size, setSize] = useState("All");
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  // for getting products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_API +
            `products?populate=*&filters[categories][title][$eq]=${
              params.category.charAt(0).toUpperCase() + params.category.slice(1)
            }&${
              category === "All"
                ? ""
                : `filters[subcategories][title][$eq]=${category}`
            }&${
              color === "All" ? "" : `filters[colors][color][$eq]=${color}`
            }&${size === "All" ? "" : `filters[sizes][size][$eq]=${size}`}`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category, color, size]);
  // for getting colors and subcategories
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_BASE_API +
        `categories?populate=*&filters[title][$eq]=${
          params.category.charAt(0).toUpperCase() + params.category.slice(1)
        }`
    )
      .then((res) => res.json())
      .then((data) =>
        setSubcategories(data.data[0].attributes.subcategories.data)
      )
      .catch((err) => console.log(err));

    if (params.category != "cosmetics") {
      fetch(process.env.NEXT_PUBLIC_BASE_API + "colors?populate=*")
        .then((res) => res.json())
        .then((data) => setColors(data.data))
        .catch((err) => console.log(err));
    }
  }, []);
  // for geeting sizes related to product category
  useEffect(() => {
    if (params.category != "cosmetics") {
      fetch(process.env.NEXT_PUBLIC_BASE_API + "sizes?populate=*")
        .then((res) => res.json())
        .then((data) =>
          setSizes(
            ["Jeans"].includes(category)
              ? data.data.filter((e) => +e.attributes.size > 0)
              : data.data
          )
        )
        .catch((err) => console.log(err));
    }
  }, [category]);

  return (
    <Container sx={{ marginTop: { xs: "50px", sm: "70px", md: "90px" } }}>
      {products ? (
        <Grid container columnSpacing={4}>
          <Grid item sm={3}>
            <Stack rowGap={4}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Category
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={category}
                  onChange={handleCategory}
                >
                  <FormControlLabel
                    value="All"
                    control={<Radio size="small" />}
                    label="All Categories"
                  />
                  {subcategories?.map((e, i) => (
                    <FormControlLabel
                      key={i}
                      value={e.attributes.title}
                      control={<Radio size="small" />}
                      label={e.attributes.title}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              {colors && (
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Color
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={color}
                    onChange={handleColor}
                  >
                    <FormControlLabel
                      value="All"
                      control={<Radio size="small" />}
                      label="All Colors"
                    />
                    {colors?.map((e, i) => (
                      <FormControlLabel
                        key={i}
                        value={e.attributes.color}
                        control={
                          <Radio
                            size="small"
                            sx={{
                              "&.Mui-checked": {
                                color: e.attributes.color.toLowerCase(),
                              },
                            }}
                          />
                        }
                        label={e.attributes.color}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
              {sizes && (
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Size
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={size}
                    onChange={handleSize}
                  >
                    <FormControlLabel
                      value="All"
                      control={<Radio size="small" />}
                      label="All Sizes"
                    />
                    {sizes?.map((e, i) => (
                      <FormControlLabel
                        key={i}
                        value={e.attributes.size}
                        control={<Radio size="small" />}
                        label={e.attributes.size}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </Stack>
          </Grid>
          <Grid item sm={9}>
            <Grid container sx={{ width: "100%" }} spacing={4}>
              {products?.map((e, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} xxl={3}>
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
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
