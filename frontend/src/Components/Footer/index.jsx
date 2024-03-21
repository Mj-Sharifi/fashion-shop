import { Box, Button, Container, Grid, Input, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <Box
    component={"footer"}
      sx={{
        backgroundColor: "colors.lightgray",
        paddingTop: { xs: "60px", md: "100px" },
        paddingBottom: { xs: "30px", md: "70px" },
      }}
    >
      <Container>
        <Grid container columnSpacing={2} rowSpacing={4}>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
            display="flex"
            flexDirection={"column"}
            alignItems={{ xs: "center", sm: "start" }}
          >
            <Image
              src="/assets/fashion-logo.png"
              width={80}
              height={80}
              alt="Fashion Logo"
            />
            <Typography>Fashion Shop</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
            display="flex"
            flexDirection={"column"}
            alignItems={{ xs: "center", sm: "start" }}
          >
            <Typography mb={2}>USEFUL LINKS</Typography>
            <Link href={"/contact"}>
              <Typography gutterBottom>Contact</Typography>
            </Link>
            <Link href={"/checkout"}>
              <Typography gutterBottom>Checkout</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>Login/Register</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>Stores Location</Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
            display="flex"
            flexDirection={"column"}
            alignItems={{ xs: "center", sm: "start" }}
          >
            <Typography mb={2}>USEFUL LINKS</Typography>
            <Link href={"#"}>
              <Typography gutterBottom>Returns</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>Support Policy</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>Size Guide</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>FAQs</Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
            display="flex"
            flexDirection={"column"}
            alignItems={{ xs: "center", sm: "start" }}
          >
            <Typography mb={2}>FOLLOW US</Typography>
            <Link href={"#"}>
              <Typography gutterBottom>Instagram</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>Facebook</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>Twitter</Typography>
            </Link>
            <Link href={"#"}>
              <Typography gutterBottom>Whatsapp</Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={4}
            display="flex"
            flexDirection={"column"}
            alignItems={{ xs: "center", sm: "start" }}
          >
            <Typography mb={2}>SUBSCRIBE</Typography>
            <Typography>
              Get E-mail updates about our latest shop and special offers.
            </Typography>
            <Input
              placeholder="Enter your email address..."
              sx={{
                marginY:"15px",
                width: "100%",
                "& input": { width: "100%" },
                "&::after": { borderColor: "text.black" },
              }}
            ></Input>
            <Button
              variant="text"
              sx={{
                transition: "all 0.3s",
                borderBottom: "1px solid",
                borderColor: "text.black",
                borderRadius: "0",
                paddingY: "0",
                color: "text.black",
                "&:hover": {
                  bgcolor: "transparent",
                  color: "colors.violet",
                  borderColor: "colors.violet",
                },
              }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
