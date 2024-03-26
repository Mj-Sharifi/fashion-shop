import { Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function MegaMenu() {
  //Handle Categories and Subcategories
  const [categories, setCategories] = useState();
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_API + "categories?populate=*")
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(categories);
  return (
    <Grid container sx={{ height: "100%", width: "100%" }}>
      {categories?.map((e, i) => (
        <Grid key={i} item xs={3}>
          <Link href={`/shop/${e?.attributes.title.toLowerCase()}`}>
            <Typography
              variant="body2"
              sx={{
                transition: "0.3s",
                "&:hover": { color: "colors.violet" },
                cursor: "pointer",
              }}
            >
              {e?.attributes.title}
            </Typography>
            <Stack>
              {e?.attributes.subcategories.data.map((m, n) => (
                <Link
                  href={`/shop/${e?.attributes.title.toLowerCase()}/${
                    m.attributes.title
                  }`}
                >
                  <Typography
                    key={n}
                    sx={{
                      transition: "0.3s",
                      "&:hover": { color: "colors.violet" },
                    }}
                  >
                    {m.attributes.title}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
