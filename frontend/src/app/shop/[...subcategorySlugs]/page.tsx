"use client";
import React, { useState, useEffect } from "react";
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
import { Apps, ExpandMore, FormatListBulleted } from "@mui/icons-material";
import ProductCard from "Components/ProductCard";
import DetailedProductCard from "Components/DetailedProductCard";
import Loading from "Components/Loading";
import GoUp from "Components/GoUp";
import SearchBar from "Components/SearchBar";
import { ToastContainer } from "react-toastify";
import { Single_Color, Single_Product, Single_Size } from "Types/api";
import { useParams } from "next/navigation";
import { Shop_Layout } from "Types/shop";
import PaginationContainer from "Components/Pagination";
import { productPerPage } from "Utils/utils";

export default function Subcategory() {
  const params: { subcategorySlugs: string[] } = useParams();
  const mobileSize = useMediaQuery("(max-width:580px)");

  // Page Layout
  const [layout, setLayout] = useState<Shop_Layout>("card");
  const handleLayout = (_: React.MouseEvent, newLayout: Shop_Layout) => {
    if (newLayout) {
      setLayout(newLayout);
    }
  };
  //
  const [products, setProducts] = useState<Single_Product[]>();
  const [colors, setColors] = useState<Single_Color[]>();
  const [sizes, setSizes] = useState<Single_Size[]>();
  // Pagination
  const [productCount, setProductCount] = useState<number>();
  const [page, setPage] = useState(1);

  //**** Filters ****//
  // Sort
  const [sortMethod, setSortMethod] = useState("");
  const handleSortMethod = (event) => {
    setSortMethod(event.target.value);
  };
  // Price
  const [price, setPrice] = useState([10, 1000]);
  const handlePrice = (_: Event, newValue: number[]) => {
    setPrice(newValue);
  };
  // Colors
  const [color, setColor] = useState("All");
  const handleColor = (event) => {
    setColor(event.target.value);
  };
  const [colorsExpanded, setColorsExpanded] = useState(false);
  const handleColorExpansion = () => {
    setColorsExpanded(!colorsExpanded);
  };
  // Size
  const [size, setSize] = useState("All");
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const [sizeExpanded, setSizeExpanded] = useState(false);
  const handleSizeExpansion = () => {
    setSizeExpanded(!sizeExpanded);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_API +
            `products?populate=*&filters[categories][slug][$eq]=${
              params.subcategorySlugs[0]
            }&filters[subcategories][slug][$eq]=${params.subcategorySlugs[1]}${
              color === "All" ? "" : `&filters[colors][color][$eq]=${color}`
            }${
              size === "All" ? "" : `&filters[sizes][size][$eq]=${size}`
            }&filters[price][$gte]=${price[0]}&filters[price][$lte]=${
              price[1]
            }&sort=${sortMethod}&pagination[page]=${page}&pagination[pageSize]=12`
        );
        const data = await res.json();
        setProductCount(data.meta.pagination.total);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [color, size, price, sortMethod, page]);
  // for getting colors and sizes
  useEffect(() => {
    if (params.subcategorySlugs[0] != "cosmetics") {
      fetch(process.env.NEXT_PUBLIC_BASE_API + "colors?populate=*")
        .then((res) => res.json())
        .then((data) => setColors(data.data))
        .catch((err) => console.log(err));

      fetch(process.env.NEXT_PUBLIC_BASE_API + "sizes?populate=*")
        .then((res) => res.json())
        .then((data) =>
          setSizes(
            ["Jeans", "Jacket"].includes(params.subcategorySlugs[1])
              ? data.data.filter((e) => +e.attributes.size > 0)
              : data.data.filter((e) => !(+e.attributes.size > 0))
          )
        )
        .catch((err) => console.log(err));
    }
  }, []);

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
                <Stack>
                  {/* Price Range */}
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
                    // slotProps={{
                    //   valueLabel: {
                    //     sx: {
                    //       color: "text.white",
                    //       backgroundColor: "colors.violet",
                    //     },
                    //   },
                    // }}
                  />
                </Stack>
                {/* Colors Selection */}
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
                {/* Sizes Selection */}
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
                  {products?.map((e, i) => (
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
                        // colors={e.attributes.colors?.data}
                        // sizes={e.attributes.sizes?.data}
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
          <PaginationContainer
            page={page}
            count={Math.ceil(productCount / productPerPage)}
            handlePagination={(e, p) => setPage(p)}
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
