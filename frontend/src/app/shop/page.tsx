"use client";
import {
  Container,
  Grid2,
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
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import ProductCard from "Components/ProductCard";
import Loading from "Components/Loading";
import { Apps, ExpandMore, FormatListBulleted } from "@mui/icons-material";
import DetailedProductCard from "Components/DetailedProductCard";
import GoUp from "Components/GoUp";
import SearchBar from "Components/SearchBar";
import { ToastContainer } from "react-toastify";
import {
  Fetch_RES,
  Single_Category,
  Single_Color,
  Single_Product,
  Single_Size,
  Single_Subcategory,
} from "Types/api";
import PaginationContainer from "Components/Pagination";
import { productPerPage } from "Utils/utils";
import { Shop_Layout } from "Types/shop";

export default function Collection() {
  const mobileSize = useMediaQuery("(max-width:580px)");
  // Page Layout
  const [layout, setLayout] = useState<Shop_Layout>("card");
  const handleLayout = (event: React.MouseEvent, newLayout: Shop_Layout) => {
    if (newLayout) {
      setLayout(newLayout);
    }
  };
  // Main States
  const [products, setProducts] = useState<Single_Product[]>();
  const [subcategories, setSubcategories] = useState<Single_Subcategory[]>();
  const [categories, setCategories] = useState<Single_Category[]>();
  const [colors, setColors] = useState<Single_Color[]>();
  const [sizes, setSizes] = useState<Single_Size[]>();
  // Pagination
  const [productsCount, setProductCount] = useState<number>();
  const [page, setPage] = useState(1);
  const handlePagination = (event: SyntheticEvent, value: number) => {
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
  const handlePrice = (event: Event, newValue: number[]) => {
    setPrice(newValue);
  };
  // Category
  const [category, setCategory] = useState("All");
  const handleCategory = (event: ChangeEvent, value: string) => {
    setCategory(value);
  };
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const handleCategoryExpansion = () => {
    setCategoryExpanded(!categoryExpanded);
  };
  // SubCategory
  const [subcategory, setSubcategory] = useState("All");
  const handleSubcategory = (event: ChangeEvent, value: string) => {
    setSubcategory(value);
  };
  const [subcategoryExpanded, setSubcategoryExpanded] = useState(false);
  const handleSubcategoryExpansion = () => {
    setSubcategoryExpanded(!subcategoryExpanded);
  };

  // Colors
  const [color, setColor] = useState("All");
  const handleColor = (event: React.ChangeEvent, value: string) => {
    setColor(value);
  };
  const [colorsExpanded, setColorsExpanded] = useState(false);
  const handleColorExpansion = () => {
    setColorsExpanded(!colorsExpanded);
  };
  // Size
  const [size, setSize] = useState("All");
  const handleSize = (event: React.ChangeEvent, value: string) => {
    setSize(value);
  };
  const [sizeExpanded, setSizeExpanded] = useState(false);
  const handleSizeExpansion = () => {
    setSizeExpanded(!sizeExpanded);
  };
  // for getting products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_API +
            `products?populate=*${
              category === "All"
                ? ""
                : `&filters[categories][title][$eq]=${category}`
            }${
              subcategory === "All"
                ? ""
                : `&filters[subcategories][title][$eq]=${subcategory}`
            }${color === "All" ? "" : `&filters[colors][color][$eq]=${color}`}${
              size === "All" ? "" : `&filters[sizes][size][$eq]=${size}`
            }&filters[price][$gte]=${price[0]}&filters[price][$lte]=${
              price[1]
            }&sort=${sortMethod}&pagination[page]=${page}&pagination[pageSize]=12`
        );
        const data: Fetch_RES<Single_Product> = await res.json();
        setProductCount(data.meta.pagination.total);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category, subcategory, color, size, price, sortMethod, page]);

  // for getting colors and categories
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_API + `categories?populate=*`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);
  // for getting subcategories and colors related to categories
  useEffect(() => {
    if (category === "All") {
      fetch(process.env.NEXT_PUBLIC_BASE_API + "subcategories")
        .then((res) => res.json())
        .then((data) => setSubcategories(data?.data));
    } else {
      fetch(
        process.env.NEXT_PUBLIC_BASE_API +
          `subcategories?populate=*&filters[categories][title][$eq]=${category}`
      )
        .then((res) => res.json())
        .then((data) => setSubcategories(data?.data));
    }
    const cosmeticsSubcategories = [
      "Skin Care",
      "Face",
      "Nail Care",
      "Hair Care",
      "Eye and Eyebrow",
    ];
    if (
      category != "Cosmetics" &&
      !cosmeticsSubcategories.includes(subcategory)
    ) {
      fetch(process.env.NEXT_PUBLIC_BASE_API + "colors?populate=*")
        .then((res) => res.json())
        .then((data) => setColors(data.data))
        .catch((err) => console.log(err));
    } else {
      setColors([]);
    }
  }, [category]);
  // for geeting sizes related to product category
  useEffect(() => {
    const cosmeticsSubcategories = [
      "Skin Care",
      "Face",
      "Nail Care",
      "Hair Care",
      "Eye and Eyebrow",
    ];
    if (
      category != "Cosmetics" &&
      !cosmeticsSubcategories.includes(subcategory)
    ) {
      fetch(process.env.NEXT_PUBLIC_BASE_API + "sizes?populate=*")
        .then((res) => res.json())
        .then((data) =>
          setSizes(
            ["Jeans", "Jacket"].includes(subcategory)
              ? data.data.filter((e) => +e.attributes.size > 0)
              : data.data
          )
        )
        .catch((err) => console.log(err));
    } else {
      setSizes([]);
    }
  }, [category, subcategory]);

  return (
    <Container sx={{ marginTop: { xs: "50px", sm: "70px", md: "90px" } }}>
      {products ? (
        <>
          <Grid2
            container
            columnSpacing={10}
            sx={{
              mb: 4,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3 }}></Grid2>
            <Grid2 size={{ xs: 12, sm: 9 }}>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
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
            </Grid2>
          </Grid2>
          <Grid2 container columnSpacing={4}>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Stack
                sx={{
                  rowGap: 4,

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
                {/* Search Bar */}
                <SearchBar endpoint={"products"} />
                <Divider />
                {/* Price Range */}
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
                        style: {
                          color: "text.white",
                          backgroundColor: "colors.violet",
                        },
                      },
                    }}
                  />
                </Stack>
                <Divider />
                {/* Categories */}
                <FormControl>
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <FormLabel id="category-radio-buttons-group-label">
                      Category
                    </FormLabel>
                    {mobileSize && (
                      <ExpandMore
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.3s",
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
                        aria-labelledby="category-controlled-radio-buttons-group"
                        name="category-controlled-radio-buttons-group"
                        value={category}
                        onChange={handleCategory}
                      >
                        <FormControlLabel
                          value="All"
                          control={<Radio size="small" />}
                          label="All Categories"
                        />
                        {categories?.map((e, i) => (
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
                      aria-labelledby="category-controlled-radio-buttons-group"
                      name="category-controlled-radio-buttons-group"
                      value={category}
                      onChange={handleCategory}
                    >
                      <FormControlLabel
                        value="All"
                        control={<Radio size="small" />}
                        label="All Categories"
                      />
                      {categories?.map((e, i) => (
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
                <Divider />
                {/* Subcategories */}
                <FormControl>
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <FormLabel id="subcategory-radio-buttons-group-label">
                      Subcategory
                    </FormLabel>
                    {mobileSize && (
                      <ExpandMore
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.3s",
                          transform: `${
                            subcategoryExpanded && "rotate(180deg)"
                          }`,
                        }}
                        onClick={handleSubcategoryExpansion}
                      />
                    )}
                  </Stack>
                  {mobileSize ? (
                    <Collapse
                      in={subcategoryExpanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <RadioGroup
                        row={mobileSize ? true : false}
                        aria-labelledby="subcategory-controlled-radio-buttons-group"
                        name="subcategory-controlled-radio-buttons-group"
                        value={subcategory}
                        onChange={handleSubcategory}
                      >
                        <FormControlLabel
                          value="All"
                          control={<Radio size="small" />}
                          label="All Subcategories"
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
                      aria-labelledby="subcategory-controlled-radio-buttons-group"
                      name="subcategory-controlled-radio-buttons-group"
                      value={subcategory}
                      onChange={handleSubcategory}
                    >
                      <FormControlLabel
                        value="All"
                        control={<Radio size="small" />}
                        label="All Subcategories"
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
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Color
                      </FormLabel>
                      {mobileSize && (
                        <ExpandMore
                          sx={{
                            cursor: "pointer",
                            transition: "all 0.3s",
                            transform: `${colorsExpanded && "rotate(180deg)"}`,
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
                {sizes && <Divider />}
                {sizes && (
                  <FormControl>
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Size
                      </FormLabel>
                      {mobileSize && (
                        <ExpandMore
                          sx={{
                            cursor: "pointer",
                            transition: "all 0.3s",
                            transform: `${sizeExpanded && "rotate(180deg)"}`,
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
            </Grid2>
            <Grid2
              size={{ xs: 12 }}
              sx={{
                display: { sm: "none" },
              }}
            >
              <Divider sx={{ marginTop: "30px" }} />
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
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
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 9 }}>
              {layout === "card" ? (
                <Grid2
                  container
                  spacing={4}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "start" },
                    width: "100%",
                  }}
                >
                  {products.map((e, i) => (
                    <Grid2 key={i} size={{ xs: 10, sm: 6, lg: 4 }}>
                      <ProductCard
                        product={e}
                        // id={e?.id}
                        // title={e?.attributes.title}
                        // rating={e?.attributes.rating?.slice(1)}
                        // imgAll={e?.attributes?.imagesall?.data}
                        // imgPrimary={
                        //   process.env.NEXT_PUBLIC_BASE_URL +
                        //   e?.attributes.imageprimary.data.attributes.url
                        // }
                        // imgSecondary={
                        //   process.env.NEXT_PUBLIC_BASE_URL +
                        //   e?.attributes.imagesecondary.data.attributes.url
                        // }
                        // shortDescription={e?.attributes.shortDescription}
                        // colors={e.attributes.colors.data}
                        // sizes={e.attributes.sizes.data}
                        // discount={e?.attributes.discount}
                        // price={e?.attributes.price}
                        // isNew={e?.attributes.isNew}
                        // isAvailable={e?.attributes.isAvailable}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              ) : (
                <Grid2
                  container
                  spacing={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {products?.map((e, i) => (
                    <Grid2 key={i} size={{ xs: 10, sm: 12 }}>
                      <DetailedProductCard product={e} />
                    </Grid2>
                  ))}
                </Grid2>
              )}
            </Grid2>
          </Grid2>
          {/* Pagination */}
          <PaginationContainer
            count={Math.ceil(productsCount / productPerPage)}
            page={page}
            handlePagination={handlePagination}
          />
          <GoUp />
          <ToastContainer />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
