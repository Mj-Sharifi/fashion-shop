"use client";
import {
  Box,
  IconButton,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { toast, Slide, ToastContainer } from "react-toastify";
import React from "react";
import { CompareArrows, Clear } from "@mui/icons-material";
import { removeFromCompare } from "Lib/Features/Compare/compareSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "Hooks/redux";
import { Single_Product } from "Types/api";

export default function Compare() {
  const mobileSize = useMediaQuery("(max-width:580px)");
  const router = useRouter();
  const { compareList } = useAppSelector((state) => state.compare);
  const dispatch = useAppDispatch();
  const handleRemoveFromCompare = (product: Single_Product, title: string) => {
    dispatch(removeFromCompare({ product }));
    toast.error(`${title} removed from compare`, {
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
  return (
    <Container>
      {compareList.length ? (
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 320 }}
              aria-label="compare table"
            >
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      backgroundColor: "colors.darkgray",
                      width: "15%",
                      minWidth: "100px",
                    }}
                  >
                    <Typography>Product Info</Typography>
                  </TableCell>
                  {compareList.map((m, n) => (
                    <TableCell key={n} sx={{ maxWidth: "150px" }}>
                      <Stack
                        sx={{
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <IconButton
                          sx={{ backgroundColor: "transparent" }}
                          onClick={() =>
                            handleRemoveFromCompare(m, m.attributes.title)
                          }
                        >
                          <Clear />
                        </IconButton>
                        <Box
                          component={"img"}
                          src={`${
                            typeof m.attributes.imageprimary === "string"
                              ? m.attributes.imageprimary
                              : process.env.NEXT_PUBLIC_BASE_URL +
                                m.attributes.imageprimary.data.attributes.url
                          }`}
                          alt={m.attributes.title}
                          sx={{
                            width: "100%",
                            maxHeight: "400px",
                            objectFit: "contain",
                          }}
                        />
                        <Typography variant="h4" gutterBottom>
                          {m.attributes.title}
                        </Typography>
                        <Button
                          onClick={() =>
                            router.push(
                              `/product/${m.id}/${m.attributes.title
                                .toLowerCase()
                                .split(" ")
                                .join("-")}`
                            )
                          }
                          disableRipple
                          sx={{
                            width: "135px",
                            widht: "35px",
                            borderRadius: "35px",
                            backgroundColor: `${
                              m.attributes.isAvailable
                                ? "colors.violet"
                                : "colors.lightblack"
                            }`,
                            color: "text.white",
                            "&:hover": {
                              backgroundColor: "colors.lightblack",
                            },
                          }}
                        >{`${
                          m.attributes.isAvailable
                            ? "More info"
                            : "Out oF Stock"
                        }`}</Button>
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      backgroundColor: "colors.darkgray",
                      minWidth: "100px",
                    }}
                  >
                    <Typography>Price</Typography>
                  </TableCell>
                  {compareList.map((e, i) => (
                    <TableCell key={e.id + i} align="center">
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
                  ))}
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      backgroundColor: "colors.darkgray",
                      minWidth: "100px",
                    }}
                  >
                    <Typography>Description</Typography>
                  </TableCell>
                  {compareList.map((e, i) => (
                    <TableCell key={e.id + i}>
                      <Typography variant="body2">
                        {e.attributes.shortDescription}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      backgroundColor: "colors.darkgray",
                      minWidth: "100px",
                    }}
                  >
                    <Typography>Rating</Typography>
                  </TableCell>
                  {compareList.map((e, i) => (
                    <TableCell key={e.id + i} align="center">
                      <Rating
                        readOnly
                        precision={0.5}
                        value={
                          e?.attributes.rating.startsWith("a")
                            ? +e?.attributes.rating?.slice(1)
                            : +e?.attributes.rating
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
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
          <CompareArrows sx={{ fontSize: "100px", mb: "30px" }} />
          <Typography variant="h5">No items found in compare</Typography>
          <Button
            disableRipple
            sx={{
              width: "135px",
              height: "45px",
              color: "text.white",
              backgroundColor: "colors.lightblack",
              "&:hover": { backgroundColor: "colors.violet" },
            }}
            onClick={() => router.push("/shop")}
          >
            Add Item
          </Button>
        </Stack>
      )}
      <ToastContainer />
    </Container>
  );
}
