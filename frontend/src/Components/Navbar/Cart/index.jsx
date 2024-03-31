import { useAppDispatch, useAppSelector } from "@/Lib/hooks";
import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Close, CropSquareSharp } from "@mui/icons-material";
import { removeItem } from "@/Lib/Features/Cart/cartSlice";
import Link from "next/link";
export default function Cart() {
  const { list } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  let totalPrice = 0;
  for (const i of list) {
    totalPrice +=
      i.quantity *
      (i.attributes.price - (i.attributes.discount / 100) * i.attributes.price);
  }
  return (
    <>
      {list.length ? (
        <Stack>
          {list.map((e, i) => (
            <Box key={i}>
              <Stack
                direction={"row"}
                width={"100%"}
                gap={1}
                alignItems={"start"}
              >
                <Box
                  component={"img"}
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    e.attributes.imageprimary.data.attributes.url
                  }
                  sx={{ width: "40%" }}
                />
                <Stack width={"50%"} alignItems={"start"} gap={"5px"}>
                  <Typography variant="h4" gutterBottom>
                    {e.attributes.title}
                  </Typography>
                  <Typography variant="menuItems">Qty: {e.quantity}</Typography>
                  <Typography variant="menuItems" gutterBottom>
                    $
                    {(
                      e.quantity *
                      (e.attributes.price -
                        (e.attributes.discount / 100) * e.attributes.price)
                    ).toFixed(2)}
                  </Typography>
                  {e.color && (
                    <Typography variant="menuItems">
                      Color: {e.color}
                    </Typography>
                  )}
                  {e.size && (
                    <Typography variant="menuItems">Size: {e.size}</Typography>
                  )}
                </Stack>
                <IconButton
                  className="closeBtn"
                  disableRipple
                  sx={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: "colors.violet",
                    "&:hover": { backgroundColor: "colors.lightblack" },
                  }}
                  onClick={() =>
                    dispatch(
                      removeItem({ product: e, color: e.color, size: e.size })
                    )
                  }
                >
                  <Close
                    className="closeBtn"
                    sx={{ color: "white !important" }}
                  />
                </IconButton>
              </Stack>
              <Divider sx={{ marginY: "10px" }} />
            </Box>
          ))}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
            marginY={3}
          >
            <Typography>Total:</Typography>
            <Typography>{totalPrice}</Typography>
          </Stack>
          <Link href={"/cart"}>
            <Button
              variant="outlined"
              disableRipple
              sx={{
                width: "100%",
                height: "45px",
                color: "text.black",
                borderColor: "colors.lightblack",
              }}
            >
              View Cart
            </Button>
          </Link>
          <Link href={"/checkout"} style={{marginTop:"15px"}}>
            <Button
              variant="outlined"
              disableRipple
              sx={{
                width: "100%",
                height: "45px",
                color: "text.black",
                borderColor: "colors.lightblack",
              }}
            >
              Checkout
            </Button>
          </Link>
        </Stack>
      ) : (
        <Stack>
          <Typography variant="menuItems" textAlign={"center"}>No items added to cart</Typography>
        </Stack>
      )}
    </>
  );
}
