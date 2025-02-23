import React, { useEffect, useState } from "react";
import { Box, Stack, Paper, Input, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import Link from "next/link"
export default function SearchBar({ endpoint }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();
  useEffect(() => {
    if (search.length > 2) {
      fetch(
        process.env.NEXT_PUBLIC_BASE_API +
          `${endpoint}?populate=*&filters[title][$containsi]=${search}`
      )
        .then((res) => res.json())
        .then((data) => setResult(data.data))
        .catch((err) => console.log(err));
    }
  }, [search]);
  return (
    (<Stack
      sx={{
        width: "100%",
        gap: 3
      }}>
      <Typography variant="h3">Search</Typography>
      <Stack
        direction={"row"}
        sx={{
          height: "45px",
          width: "100%",
          border: "1px solid",
          borderColor: "coloes.lightblack",
          py: "5px",
          borderRadius: "5px",
          position: "relative"
        }}>
        <Input
          type="text"
          placeholder="Search here..."
          sx={{
            transition: "all 0.3s",
            height: "100%",
            width: "220px",
            paddingX: "10px",
            fontSize: "14px",
            color: "text.black",
            outline: "none",
            "&::after": {
              border: "none !important",
            },
            "&::before": {
              border: "none !important",
            },
          }}
          onKeyUp={(e) => setSearch(e.target.value)}
        />
        <Stack
          sx={{
            width: "45px",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderLeft: "1px solid",
            borderColor: "colors.lightblack",
            width: "60px"
          }}>
          <Search
            sx={{
              transition: "all 0.3s",
              color: "colors.lightblack",
              "&:hover": { color: "colors.violet" },
            }}
          />
        </Stack>
        <Paper
          sx={{
            transition: "all 0.3s",
            position: "absolute",
            visibility: `${search.length > 1 ? "visible" : "hidden"}`,
            opacity: `${search.length > 1 ? "1" : "0"}`,
            transformOrigin: "top center",
            transform: `${search.length > 1 ? "rotateX(0deg)" : "rotateX(90deg)"}`,
            backgroundColor: "colors.lightgray",
            padding: "10px",
            top: "110%",
            right: "0",
            left: "0",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            zIndex: "800",
          }}
        >
          {result?.map((e, i) => (
            <Link key={i} href={`/product/${e?.id}/${e.attributes?.title.toLowerCase().trim().replace(/ /g,"-")}`}>
              <Stack
                direction={"row"}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  gap: 1,
                  "&:hover p":{transition:"all 0.3s",color:"colors.violet"}
                }}>
                <Box
                  component={"img"}
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    e.attributes.imageprimary.data.attributes.formats.small.url
                  }
                  sx={{ width: "30%", maxHeight: "60px", objectFit: "cover" }}
                />
                <Typography
                  variant="h4"
                  sx={{ "&:hover": { color: "colors.violet" } }}
                >
                  {e.attributes?.title}
                </Typography>
              </Stack>
            </Link>
          ))}
        </Paper>
      </Stack>
    </Stack>)
  );
}
