"use client";
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "@/Components/ProductCard";
export default function Category({ params }) {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_BASE_API +
        `products?populate=*&filters[categories][title][$eq]=${
          params.category.charAt(0).toUpperCase() + params.category.slice(1)
        }`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.data)).catch(err=>console.log(err));
  }, []);
  // const products = await fetchData(
  //   process.env.BASE_API +
  //     `products?populate=*&filters[categories][title][$eq]=${
  //       params.category.charAt(0).toUpperCase() + params.category.slice(1)
  //     }`
  // );
  console.log(process.env.Next_PUBLIC_BASE_API +
    `products?populate=*&filters[categories][title][$eq]=${
      params.category.charAt(0).toUpperCase() + params.category.slice(1)
    }`)
  return (
    <Container>
      <Grid container columnSpacing={4}>
        <Grid item sm={3}></Grid>
        <Grid item sm={9}>
          <Grid container sx={{ width: "100%" }}>
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
    </Container>
  );
}
