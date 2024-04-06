import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function MegaMenu({categories}) {
  return (
    <Grid container sx={{ height: "100%", width: "100%"}} spacing={2}>
      {categories?.map((e, i) => (
        <Grid key={i} item md={3}>
          <Stack direction={"row"} spacing={2} width={"100%"} marginTop={1} paddingRight={1} borderRight={`${i!==3&&"1px solid"}`} borderColor={"colors.darkgray"}>
            <Box width={"40%"}>
              <Link href={`/shop/${e?.attributes.title.toLowerCase()}`}>
                <Typography
                  variant="menuItems"
                  sx={{
                    fontWeight: "600",
                    transition: "0.3s",
                    "&:hover": { color: "colors.violet" },
                    cursor: "pointer",
                  }}
                  
                >
                  {e?.attributes.title}
                </Typography>
              </Link>
              <Stack gap={1} marginTop={2}>
                {e?.attributes.subcategories.data.map((m, n) => (
                  <Link
                    key={n}
                    href={`/shop/${e?.attributes.title.toLowerCase()}/${
                      m.attributes.title.toLowerCase()
                    }`}
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
            <Box component={"img"} src={`/assets/menu/${e?.attributes.title}.jpg`} sx={{width:"60%",objectFit:"cover",aspectRatio:"0.857"}}/>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
