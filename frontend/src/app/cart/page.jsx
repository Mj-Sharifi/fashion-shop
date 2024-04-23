"use client";
import {
  decreaseQuantity,
  increaseQuantity,
  removeAll,
  removeItem,
} from "@/Lib/Features/Cart/cartSlice";
import { useAppSelector, useAppDispatch } from "@/Lib/hooks";
import { Clear, ShoppingCartOutlined, Add, Remove } from "@mui/icons-material";
import {
  Input,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import countryList from "@/Utils/countries";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
export default function Cart() {
  const mobileSize = useMediaQuery("(max-width:580px)");
  const router = useRouter();
  // importing Shopping List from Redux
  const { list } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleDecreaseQuantity = (event, item) => {

    dispatch(
      decreaseQuantity({
        id: item.id,
        size: item.size,
        color: item.color,
      })
    );
    toast.error(`1 ${item.attributes.title} removed from the cart`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      newestOnTop: true,
      closeOnClick: false,
      closeButton: false,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      theme: "light",
      transition: Slide,
    });
  };
  const handleIncreaseQuantity = (event, item) => {

    dispatch(
      increaseQuantity({
        id: item.id,
        size: item.size,
        color: item.color,
      })
    );
    toast.success(`1 ${item.attributes.title} added to the cart`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      newestOnTop: true,
      closeOnClick: false,
      closeButton: false,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      theme: "light",
      transition: Slide,
    });
  };
  const handleRemoveItem = (event, item) => {
    dispatch(
      removeItem({
        id: item.id,
        size: item.size,
        color: item.color,
      })
    );
    toast.error(`${item.attributes.title} removed from the cart`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      newestOnTop: true,
      closeOnClick: false,
      closeButton: false,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      theme: "light",
      transition: Slide,
    });
  };
  const handleRemoveAll = (event, item) => {
    dispatch(removeAll())
    toast.error(`All items removed from the cart`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      newestOnTop: true,
      closeOnClick: false,
      closeButton: false,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      theme: "light",
      transition: Slide,
    });
  };
  // Calculating the total price
  let totalPrice = 0;
  for (const i of list) {
    totalPrice +=
      i.quantity *
      (i.attributes.price - (i.attributes.discount / 100) * i.attributes.price);
  }
  // Selecting Country
  const [country, setCountry] = useState("");
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  return (
    <>
      {list.length ? (
        <Container
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Typography variant="h4">Your cart items</Typography>
          <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label="cart table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "colors.lightgray",
                      fontSize: "14px",
                    },
                  }}
                >
                  <TableCell align="center" sx={{ width: "5%" }}></TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    IMAGE
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    PRODUCT NAME
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    UNIT PRICE
                  </TableCell>
                  <TableCell align="center" sx={{ width: "25%" }}>
                    QTY
                  </TableCell>
                  <TableCell align="center" sx={{ width: "10%" }}>
                    SUBTOTAL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ width: "5%" }}>
                      <IconButton
                        sx={{ backgroundColor: "transparent" }}
                        onClick={(event, item) => handleRemoveItem(event, e)}
                      >
                        <Clear />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "20%" }}>
                      <Box
                        component={"img"}
                        src={
                          typeof e.attributes.imageprimary === "string"
                            ? e.attributes.imageprimary
                            : process.env.NEXT_PUBLIC_BASE_URL +
                              e.attributes?.imageprimary?.data.attributes.url
                        }
                        alt={e.attributes.title}
                        width={"100%"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack alignItems={"center"}>
                        <Stack alignItems={"start"} gap={1}>
                          <Typography variant="h4" gutterBottom>
                            {e.attributes.title}
                          </Typography>
                          {e.color ? (
                            <Typography>Color: {e.color}</Typography>
                          ) : (
                            ""
                          )}
                          {e.size ? (
                            <Typography>Size: {e.size}</Typography>
                          ) : (
                            ""
                          )}
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "20%" }}>
                      {e.attributes.discount ? (
                        <Typography>
                          $
                          {(
                            e.attributes.price -
                            (e.attributes.price * e.attributes.discount) / 100
                          ).toFixed(2)}
                          -
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#8e8e8e",
                            }}
                          >
                            ${e.attributes.price.toFixed(2)}
                          </span>
                        </Typography>
                      ) : (
                        <Typography>{`$${e.attributes.price.toFixed(
                          2
                        )}`}</Typography>
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "25%" }}>
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          border: "1px solid",
                          borderColor: "colors.lightgray",
                          borderRadius: "5px",
                          height: "50px",
                          width: "100px",
                          mx: "auto",
                        }}
                      >
                        <IconButton
                          disableRipple
                          sx={{ padding: "0" }}
                          // onClick={(event, item) =>
                          //   handleDecreaseQuantity(event, e)
                          // }
                          onClick={(event, item) => handleDecreaseQuantity(event, e)}
                          disabled={e.quantity === 1}
                        >
                          <Remove
                            sx={{
                              transition: "all 0.3s",
                              color: "colors.darkgray",
                              "&:hover": { color: "colors.violet" },
                            }}
                          />
                        </IconButton>
                        <Typography>{e.quantity}</Typography>
                        <IconButton
                          disableRipple
                          sx={{ padding: "0" }}
                          // onClick={() => (event, item) =>
                          //   handleIncreaseQuantity(event, e)}
                            onClick={(event, item) => handleIncreaseQuantity(event, e)}
                        >
                          <Add
                            sx={{
                              transition: "all 0.3s",
                              color: "colors.darkgray",
                              "&:hover": { color: "colors.violet" },
                            }}
                          />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "15%" }}>
                      <Typography>
                        ${" "}
                        {(
                          e.quantity *
                          (e.attributes.price -
                            (e.attributes.discount / 100) * e.attributes.price)
                        ).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"space-between"}
            alignItems={"center"}
            rowGap={2}
          >
            <Link href={"/shop"}>
              <Button
                disableRipple
                sx={{
                  height: "45px",
                  width: "225px",
                  borderRadius: "45px",
                  backgroundColor: "colors.darkgray",
                  color: "text.black",
                  "&:hover": {
                    backgroundColor: "colors.violet",
                    color: "text.white",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Link>

            <Button
              disableRipple
              sx={{
                height: "45px",
                width: "225px",
                borderRadius: "50px",
                backgroundColor: "colors.darkgray",
                color: "text.black",
                "&:hover": {
                  backgroundColor: "colors.violet",
                  color: "text.white",
                },
              }}
              onClick={() => dispatch(handleRemoveAll)}
            >
              Clear Shopping Cart
            </Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={10} md={6} lg={4}>
              <Stack
                sx={{
                  backgroundColor: "colors.lightgray",
                  borderRadius: "3%",
                  border: "1px solid",
                  borderColor: "colors.darkgray",
                  padding: "30px 15px !important",
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    position: "relative",
                    marginBottom: "20px",
                    "&::before": {
                      content: "''",
                      position: "absolute",
                      left: "0",
                      top: "15px",
                      width: "100%",
                      height: "1px",
                      backgroundColor: "colors.darkgray",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      backgroundColor: "colors.lightgray",
                      zIndex: "100",
                      pr: "10px",
                    }}
                  >
                    Estimate Shipping And Tax
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  Enter your destination to get a shipping estimate.
                </Typography>
                <Stack width={"100%"} my={"15px"}>
                  * Country
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={country}
                      onChange={handleCountry}
                      sx={{
                        backgroundColor: "white",
                        height: "45px",
                        "& fieldset": { borderColor: "colors.darkgray" },
                        "&:hover fieldset": { borderColor: "colors.darkgray" },
                        "&.Mui-focused fieldset": {
                          border: "1px solid !important",
                          borderColor: "colors.lightblack",
                        },
                      }}
                      MenuProps={{
                        slotProps: { paper: { sx: { height: "250px" } } },
                      }}
                    >
                      <MenuItem value="">Select a Country</MenuItem>
                      {countryList.map((e, i) => (
                        <MenuItem key={i} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack width={{ xs: "100%" }}>
                  * Region / State
                  <Input
                    name="region"
                    sx={{
                      "& input::placeholder": { opacity: "0.7 !important" },
                      "&::after": { border: "none !important" },
                      "&::before": { border: "none !important" },
                      backgroundColor: "white",
                      border: "1px solid",
                      borderColor: "colors.darkgray",
                      borderRadius: "5px",
                      width: "100%",
                      height: "45px",
                      px: "10px",
                      "&.Mui-focused": {
                        border: "1px solid !important",
                        borderColor: "colors.lightblack",
                      },
                    }}
                  />
                </Stack>
                <Stack width={{ xs: "100%" }} marginY="15PX">
                  * Postal Code / ZIP
                  <Input
                    name="zip"
                    sx={{
                      "& input::placeholder": { opacity: "0.7 !important" },
                      "&::after": { border: "none !important" },
                      "&::before": { border: "none !important" },
                      backgroundColor: "white",
                      border: "1px solid",
                      borderColor: "colors.darkgray",
                      borderRadius: "5px",
                      width: "100%",
                      height: "45px",
                      px: "10px",
                      "&.Mui-focused": {
                        border: "1px solid !important",
                        borderColor: "colors.lightblack",
                      },
                    }}
                  />
                </Stack>
                <Button
                  disableRipple
                  sx={{
                    width: "135px",
                    height: "45px",
                    borderRadius: "45px",
                    backgroundColor: "colors.violet",
                    color: "text.white",
                    "&:hover": { backgroundColor: "colors.lightblack" },
                  }}
                >
                  Get a Quote
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={10} md={6} lg={4}>
              <Stack
                sx={{
                  backgroundColor: "colors.lightgray",
                  borderRadius: "3%",
                  border: "1px solid",
                  borderColor: "colors.darkgray",
                  padding: "30px 15px !important",
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    position: "relative",
                    marginBottom: "20px",
                    "&::before": {
                      content: "''",
                      position: "absolute",
                      left: "0",
                      top: "15px",
                      width: "100%",
                      height: "1px",
                      backgroundColor: "colors.darkgray",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      backgroundColor: "colors.lightgray",
                      zIndex: "100",
                      pr: "10px",
                    }}
                  >
                    Use Coupon Code
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  Enter your coupon code if you have one.
                </Typography>
                <Input
                  name="coupon"
                  sx={{
                    "& input::placeholder": { opacity: "0.7 !important" },
                    "&::after": { border: "none !important" },
                    "&::before": { border: "none !important" },
                    marginY: "15px",
                    backgroundColor: "white",
                    border: "1px solid",
                    borderColor: "colors.darkgray",
                    borderRadius: "5px",
                    width: "100%",
                    height: "45px",
                    px: "10px",
                    "&.Mui-focused": {
                      border: "1px solid !important",
                      borderColor: "colors.lightblack",
                    },
                  }}
                />
                <Button
                  disableRipple
                  sx={{
                    width: "135px",
                    height: "45px",
                    borderRadius: "45px",
                    backgroundColor: "colors.violet",
                    color: "text.white",
                    "&:hover": { backgroundColor: "colors.lightblack" },
                  }}
                >
                  Apply Coupon
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={10} md={6} lg={4}>
              <Stack
                sx={{
                  backgroundColor: "colors.lightgray",
                  borderRadius: "3%",
                  border: "1px solid",
                  borderColor: "colors.darkgray",
                  padding: "30px 15px !important",
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    position: "relative",
                    marginBottom: "20px",
                    "&::before": {
                      content: "''",
                      position: "absolute",
                      left: "0",
                      top: "15px",
                      width: "100%",
                      height: "1px",
                      backgroundColor: "colors.darkgray",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      backgroundColor: "colors.lightgray",
                      zIndex: "100",
                      pr: "10px",
                    }}
                  >
                    Cart Total
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2">Total Products</Typography>
                  <Typography variant="body2">$ {totalPrice}</Typography>
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginY: "15px",
                    "& .MuiTypography-root": { color: "colors.violet" },
                  }}
                >
                  <Typography variant="h4">Grand Total</Typography>
                  <Typography variant="h4">$ {totalPrice}</Typography>
                </Stack>
                <Link href={"/checkout"}>
                  <Button
                    disableRipple
                    sx={{
                      width: "100%",
                      height: "45px",
                      borderRadius: "45px",
                      backgroundColor: "colors.violet",
                      color: "text.white",
                      "&:hover": { backgroundColor: "colors.lightblack" },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Stack
          width={"100%"}
          minHeight={"80vh"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <ShoppingCartOutlined sx={{ fontSize: "100px", mb: "30px" }} />
          <Typography variant="h5">
            No items found in cart to checkout
          </Typography>
          <Link href={"/shop"}>
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
              Shop Now
            </Button>
          </Link>
        </Stack>
      )}
      <ToastContainer />
    </>
  );
}
