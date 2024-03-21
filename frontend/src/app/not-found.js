import { Search } from "@mui/icons-material";
import { Container, Stack, Input, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        color={"colors.violet"}
        fontWeight={"600"}
        fontSize={{ xs: "6rem", sm: "8rem", md: "10rem", lg: "12rem" }}
        mb={6}
      >
        404
      </Typography>
      <Typography
        fontWeight={"500"}
        fontSize={{ xs: "1rem", md: "2rem" }}
        gutterBottom
      >
        OOPS! PAGE NOT FOUND
      </Typography>
      <Typography gutterBottom>
        Sorry but the page you are looking for does not exist, have been
        removed, name changed or is temporarity unavailable.
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        sx={{
          padding: "10px",
          width: "100%",
        }}
        marginBottom={6}
      >
        <Input
          type="text"
          placeholder="Search..."
          sx={{
            transition: "all 0.3s",
            height: "45px",
            width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
            paddingX: "5px",
            fontSize: "14px",
            outline: "none",
            border: "1px solid",
            borderColor: "colors.lightgray",
            "& input::placeholder": { color: "text.black", opacity: "1" },
            "&::after": {
              border: "none !important",
            },
            "&::before": {
              border: "none !important",
            },
          }}
        />
        <Stack
          width={"45px"}
          height={"45px"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            height: "45px",
            width: "60px",
            bgcolor: "colors.violet",
            "&:hover": { bgcolor: "text.black" },
          }}
        >
          <Search sx={{ color: "text.white" }} />
        </Stack>
      </Stack>
      <Link href={"/"}>
        <Button
          sx={{
            color: "text.white",
            bgcolor: "colors.violet",
            py: "10px",
            "&:hover": {
              "::after": { bgcolor: "text.black" },
              bgcolor: "text.black",
            },
            "&::after": {
              content: "''",
              height: "3px",
              width: "100%",
              borderRadius: "2px",
              position: "absolute",
              bottom: "-6px",
              bgcolor: "colors.violet",
            },
          }}
        >
          Back to homepage
        </Button>
      </Link>
    </Container>
  );
}
