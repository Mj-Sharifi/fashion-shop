"use client";
import { useAppSelector, useAppDispatch } from "@/Lib/hooks";
import { Container, Stack, Typography, Button } from "@mui/material";
import React from "react";
import Link from "next/link";
import { CompareArrows } from "@mui/icons-material";

export default function Compare() {
  const { compareList } = useAppSelector((state) => state.compare);
  const dispatch = useAppDispatch();
  return (
    <Container>
      {compareList.length ? (
        <Stack></Stack>
      ) : (
        <Stack
          width={"100%"}
          minHeight={"80vh"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <CompareArrows sx={{ fontSize: "100px", mb: "30px" }} />
          <Typography variant="h5">No items found in compare</Typography>
          <Link href={"/"}>
            <Button
              disableRipple
              sx={{
                width: "135px",
                height: "45px",
                color: "text.white",
                backgroundColor: "colors.lightblack",
                "&:hover": { backgroundColor: "colors.violet" },
              }}
            >
              Add Item
            </Button>
          </Link>
        </Stack>
      )}
    </Container>
  );
}
