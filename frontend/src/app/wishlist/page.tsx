"use client";
import React from "react";
import Link from "next/link";
import { Clear, FavoriteBorderOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
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
  useMediaQuery,
} from "@mui/material";
import {
  removeAllWishlist,
  removeFromWishlist,
} from "Lib/Features/Wishlist/wishSlice";
import { toast, Slide, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "Hooks/redux";
import { useRouter } from "next/navigation";
import { createProductSlug } from "Utils/utils";
export default function Wishlist() {
  const mobileSize = useMediaQuery("(max-width:580px)");
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleRemoveFromWishlist = (id: number, title: string) => {
    dispatch(removeFromWishlist({ id }));
    toast.error(`${title} removed from wishlist`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
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
  const handleRemoveAllWishlist = () => {
    dispatch(removeAllWishlist());
    toast.error(`All items removed from wishlist`, {
      position: mobileSize ? "bottom-center" : "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
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
  console.log(wishlist);
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {wishlist.length ? (
        <>
          <Typography variant="h4">Your wishlist items</Typography>
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
                  <TableCell align="center" sx={{ width: "25%" }}>
                    PRODUCT NAME
                  </TableCell>
                  <TableCell align="center" sx={{ width: "25%" }}>
                    UNIT PRICE
                  </TableCell>
                  <TableCell align="center" sx={{ width: "25%" }}>
                    ADD TO CART
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{"& .MuiTableCell-root	": {padding: "8px"}}}>
                {wishlist.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton
                        sx={{ backgroundColor: "transparent" }}
                        onClick={() => handleRemoveFromWishlist(e.id, e.title)}
                      >
                        <Clear />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        component="img"
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          e.imageprimary.data.attributes.url
                        }
                        alt={e.title}
                        sx={{
                          // width: "100%",
                          maxHeight:"150px",
                          objectFit:"contain"
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        sx={{
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Typography variant="h4" gutterBottom>
                          {e.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {e.discount ? (
                        <Typography>
                          ${(e.price - (e.price * e.discount) / 100).toFixed(2)}
                          -
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#8e8e8e",
                            }}
                          >
                            ${e.price.toFixed(2)}
                          </span>
                        </Typography>
                      ) : (
                        <Typography>{`$${e.price.toFixed(2)}`}</Typography>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Link
                        href={`/product/${e.id}/${createProductSlug(e.title)}`}
                      >
                        <Button
                          disableRipple
                          sx={{
                            padding: "4px 12px",
                            borderRadius: "35px",
                            backgroundColor: `${
                              e.isAvailable
                                ? "colors.violet"
                                : "colors.lightblack"
                            }`,
                            color: "text.white",
                            "&:hover": {
                              backgroundColor: "colors.lightblack",
                            },
                          }}
                        >{`${
                          e.isAvailable ? "More info" : "Out oF Stock"
                        }`}</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              rowGap: 2,
            }}
          >
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
              onClick={() => router.push("/shop")}
            >
              Continue Shopping
            </Button>
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
              onClick={handleRemoveAllWishlist}
            >
              Clear Wishlist
            </Button>
          </Stack>
        </>
      ) : (
        <Stack
          sx={{
            width: "100%",
            minHeight: "80vh",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <FavoriteBorderOutlined sx={{ fontSize: "100px", mb: "30px" }} />
          <Typography variant="h5">No items found in wishlist</Typography>
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
    </Container>
  );
}
