import Footer from "@/Components/Footer";
import MainSlider from "@/Components/MainSlider";
import Navbar from "@/Components/Navbar";
import { Box, Container, Grid, ListItemText, Stack } from "@mui/material";
import React from "react";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* main slider */}
        <MainSlider />
        {/* features */}
        <Container>
          <Grid container columnSpacing={2} paddingTop={{xs:"60px",md:"100px"}} paddingBottom={{xs:"30px",md:"60px"}}>
            <Grid item xs={12} sm={6} md={3} display={"flex"} alignItems={"center"} gap={1}>
              <Box
                component={"img"}
                src="/assets/home/features/free-shipping.png"
              />
              <ListItemText
                primary="Free Shipping"
                secondary="Free shipping on all order"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} display={"flex"} alignItems={"center"} gap={1}>
              <Box component={"img"} src="/assets/home/features/support.png" />
              <ListItemText
                primary="Support 24/7"
                secondary="Free shipping on all order"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} display={"flex"} alignItems={"center"} gap={1}>
              <Box
                component={"img"}
                src="/assets/home/features/money-return.png"
              />
              <ListItemText
                primary="Money Return"
                secondary="Free shipping on all order"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} display={"flex"} alignItems={"center"} gap={1}>
              <Box component={"img"} src="/assets/home/features/discount.png" />
              <ListItemText
                primary="Order Discount"
                secondary="Free shipping on all order"
              />
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
