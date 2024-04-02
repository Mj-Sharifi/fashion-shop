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
  Divider,
  useMediaQuery,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  Collapse,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "@/Components/ProductCard";
import Loading from "@/Components/Loading";
import { Apps, ExpandMore, FormatListBulleted } from "@mui/icons-material";
import DetailedProductCard from "@/Components/DetailedProductCard";
import GoUp from "@/Components/GoUp";

export default function Category({ params }) {
  const mobileSize = useMediaQuery("(max-width:580px)");
  // Page Layout
  const [layout, setLayout] = useState("card");
  const handleLayout = (event, newLayout) => {
    if (newLayout) {
      setLayout(newLayout);
    }
  };
  //
  const [products, setProducts] = useState();
  const [subcategories, setSubcategories] = useState();
  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();
  // Pagination
  const [productsNumber, setProductNumber] = useState();
  const [page, setPage] = useState(1);
  const handlePagination = (event, value) => {
    setPage(value);
  };
  //**** Filters ****//
  // Sort
  const [sortMethod, setSortMethod] = useState("");
  const handleSortMethod = (event) => {
    setSortMethod(event.target.value);
  };
  // Price
  const [price, setPrice] = useState([10, 1000]);
  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };
  // Category
  const [category, setCategory] = useState("All");
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const handleCategoryExpansion = () => {
    setCategoryExpanded(!categoryExpanded);
  };
  // Colors
  const [color, setColor] = useState("All");
  const handleColor = (event) => {
    setColor(event.target.value);
  };
  const [colorsExpanded, setColorsExpanded] = useState();
  const handleColorExpansion = () => {
    setColorsExpanded(!colorsExpanded);
  };
  // Size
  const [size, setSize] = useState("All");
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const [sizeExpanded, setSizeExpanded] = useState();
  const handleSizeExpansion = () => {
    setSizeExpanded(!sizeExpanded);
  };
  // for getting products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_API +
            `products?populate=*&filters[categories][title][$eq]=${
              params.category.charAt(0).toUpperCase() + params.category.slice(1)
            }${
              category === "All"
                ? ""
                : `&filters[subcategories][title][$eq]=${category}`
            }${
              color === "All" ? "" : `&filters[colors][color][$eq]=${color}`
            }${
              size === "All" ? "" : `&filters[sizes][size][$eq]=${size}`
            }&filters[price][$gte]=${price[0]}&filters[price][$lte]=${
              price[1]
            }&sort=${sortMethod}&pagination[page]=${page}&pagination[pageSize]=12`
        );
        const data = await res.json();
        setProductNumber(data.meta.pagination.total);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category, color, size, price, sortMethod, page]);

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
        <>
          <Grid
            container
            columnSpacing={10}
            mb={4}
            display={{ xs: "none", sm: "flex" }}
          >
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={9}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={sortMethod}
                    onChange={handleSortMethod}
                    displayEmpty
                    sx={{
                      "&.Mui-focused fieldset": {
                        borderColor: "colors.violet",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .Mui-selected": {
                            backgroundColor: "colors.purple",
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value={"price:desc"}>Price: High to Low</MenuItem>
                    <MenuItem value={"price:asc"}>Price: Low to High</MenuItem>
                    <MenuItem value={"discount:desc"}>Discount</MenuItem>
                    <MenuItem value={"rating:desc"}>Recommended</MenuItem>
                  </Select>
                </FormControl>
                <ToggleButtonGroup
                  value={layout}
                  exclusive
                  onChange={handleLayout}
                  aria-label="page layout"
                  sx={{
                    "& button.Mui-selected": {
                      transition: "all 0.3s",
                      color: "text.white",
                      backgroundColor: "colors.violet",
                    },
                    "& button.MuiToggleButton-root:not(.Mui-selected):hover": {
                      backgroundColor: "colors.purple",
                    },
                  }}
                >
                  <ToggleButton value="card" aria-label="card">
                    <Apps />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list">
                    <FormatListBulleted />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Grid>
          </Grid>
          <Grid container columnSpacing={4}>
            <Grid item xs={12} sm={3}>
              <Stack
                rowGap={4}
                sx={{
                  "& .MuiTypography-root ": {
                    fontSize: { xs: "14px !important", sm: "16px !important" },
                    fontWeight: "400",
                  },
                  "& .Mui-checked": { color: "colors.violet" },
                  "& .MuiFormLabel-root": {
                    color: "text.black",
                    fontWeight: "500",
                  },
                }}
              >
                <Stack>
                  <FormLabel>Price Range</FormLabel>
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={price}
                    onChange={handlePrice}
                    valueLabelDisplay="auto"
                    min={10}
                    max={1000}
                    step={10}
                    sx={{
                      color: "colors.violet",
                    }}
                    slotProps={{
                      valueLabel: {
                        sx: {
                          color: "text.white",
                          backgroundColor: "colors.violet",
                        },
                      },
                    }}
                  />
                </Stack>
                <Divider />
                <FormControl>
                  <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Category
                    </FormLabel>
                    {mobileSize && (
                      <ExpandMore
                        sx={{
                          cursor: "pointer",
                          transform: `${categoryExpanded && "rotate(180deg)"}`,
                        }}
                        onClick={handleCategoryExpansion}
                      />
                    )}
                  </Stack>
                  {mobileSize ? (
                    <Collapse
                      in={categoryExpanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <RadioGroup
                        row={mobileSize ? true : false}
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
                    </Collapse>
                  ) : (
                    <RadioGroup
                      row={mobileSize ? true : false}
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
                  )}
                </FormControl>
                {colors && <Divider />}
                
                {colors && (
                  <FormControl>
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Color
                      </FormLabel>
                      {mobileSize && (
                        <ExpandMore
                          sx={{
                            cursor: "pointer",
                            transform: `${
                              categoryExpanded && "rotate(180deg)"
                            }`,
                          }}
                          onClick={handleColorExpansion}
                        />
                      )}
                    </Stack>
                    {mobileSize ? (
                      <Collapse in={colorsExpanded} unmountOnExit>
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
                                      color: `${e.attributes.color
                                        .toLowerCase()
                                        .split(" ")
                                        .join("")} !important`,
                                    },
                                  }}
                                />
                              }
                              label={e.attributes.color}
                            />
                          ))}
                        </RadioGroup>
                      </Collapse>
                    ) : (
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
                                    color: `${e.attributes.color
                                      .toLowerCase()
                                      .split(" ")
                                      .join("")} !important`,
                                  },
                                }}
                              />
                            }
                            label={e.attributes.color}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </FormControl>
                )}
                {sizes && <Divider/>}
                {sizes && (
                  <FormControl>
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Size
                      </FormLabel>
                      {mobileSize && (
                        <ExpandMore
                          sx={{
                            cursor: "pointer",
                            transform: `${
                              categoryExpanded && "rotate(180deg)"
                            }`,
                          }}
                          onClick={handleSizeExpansion}
                        />
                      )}
                    </Stack>
                    {mobileSize ? (
                      <Collapse in={sizeExpanded} unmountOnExit>
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
                      </Collapse>
                    ) : (
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
                    )}
                  </FormControl>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} display={{ sm: "none" }}>
              <Divider sx={{ marginTop: "30px" }} />
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={sortMethod}
                    onChange={handleSortMethod}
                    displayEmpty
                    sx={{
                      "&.Mui-focused fieldset": {
                        borderColor: "colors.violet",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .Mui-selected": {
                            backgroundColor: "colors.purple",
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value={"price:asc"}>Price: High to Low</MenuItem>
                    <MenuItem value={"price:desc"}>Price: Low to High</MenuItem>
                    <MenuItem value={"discount:asc"}>Discount</MenuItem>
                    <MenuItem value={"rating:asc"}>Recommended</MenuItem>
                  </Select>
                </FormControl>
                <ToggleButtonGroup
                  value={layout}
                  exclusive
                  onChange={handleLayout}
                  aria-label="page layout"
                  sx={{
                    "& button.Mui-selected": {
                      transition: "all 0.3s",
                      color: "text.white",
                      backgroundColor: "colors.violet",
                    },
                    "& button.MuiToggleButton-root:not(.Mui-selected):hover": {
                      backgroundColor: "colors.purple",
                    },
                  }}
                >
                  <ToggleButton value="card" aria-label="card">
                    <Apps />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="list">
                    <FormatListBulleted />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Divider
                sx={{
                  display: { sm: "none" },
                  height: "1px",
                  bgcolor: "colors.darkgray",
                  mb: "50px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              {layout === "card" ? (
                <Grid
                  container
                  sx={{ width: "100%" }}
                  spacing={4}
                  display={"flex"}
                  justifyContent={{ xs: "center", md: "start" }}
                >
                  {products?.map((e, i) => (
                    <Grid key={i} item xs={10} sm={6} lg={4}>
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
              ) : (
                <Grid
                  container
                  sx={{ width: "100%" }}
                  spacing={4}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  {products?.map((e, i) => (
                    <Grid key={i} item xs={10} sm={12}>
                      <DetailedProductCard
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
                        shortDescription={e?.attributes.shortDescription}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid container mt={6}>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={9}>
              <Stack direction={"row"} width={"100%"} justifyContent={"center"}>
                <Pagination
                  count={Math.ceil(productsNumber / 12)}
                  page={page}
                  onChange={handlePagination}
                  sx={{
                    "& button.Mui-selected": {
                      backgroundColor: "colors.violet",
                      color: "text.white",
                    },
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <GoUp/>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
