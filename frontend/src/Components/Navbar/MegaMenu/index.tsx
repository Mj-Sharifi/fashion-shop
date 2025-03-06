import { Box, Grid2, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Single_Category } from "Types/api";

type props = { categories: Single_Category[] };
export default function MegaMenu({ categories }: props) {
  return (
    <Grid2 container sx={{ height: "100%", width: "100%" }} spacing={2}>
      {categories?.map((cat, i) => (
        <Grid2 key={i} size={{ md: 3 }}>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              width: "100%",
              marginTop: 1,
              paddingRight: 1,
              borderRight: `${i !== 3 && "1px solid"}`,
              borderColor: "colors.darkgray",
            }}
          >
            <Box
              sx={{
                width: "40%",
              }}
            >
              <Link href={`/shop/${cat?.attributes.slug}`}>
                <Typography
                  variant="menuItems"
                  sx={{
                    fontWeight: "600",
                    transition: "0.3s",
                    "&:hover": { color: "colors.violet" },
                    cursor: "pointer",
                  }}
                >
                  {cat?.attributes.title}
                </Typography>
              </Link>
              <Stack
                sx={{
                  gap: 1,
                  marginTop: 2,
                }}
              >
                {cat?.attributes.subcategories.data.map((m, n) => (
                  <Link
                    key={n}
                    href={`/shop/${cat?.attributes.slug}/${m.attributes.slug}`}
                  >
                    <Typography
                      variant="menuItems"
                      sx={{
                        opacity: "0.750",
                        transition: "0.3s",
                        "&:hover": { color: "colors.violet" },
                      }}
                    >
                      {m.attributes.title}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Box>
            <Box
              component={"img"}
              src={`/assets/menu/${cat?.attributes.title}.jpg`}
              sx={{ width: "60%", objectFit: "cover", aspectRatio: "0.857" }}
            />
          </Stack>
        </Grid2>
      ))}
    </Grid2>
  );
}
