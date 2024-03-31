import React,{useState} from "react";
// MUI components
import { Box, Button, Stack, Typography, IconButton } from "@mui/material";
import {
  Add,
  Remove,
  FavoriteBorderOutlined,
  CompareArrows,
} from "@mui/icons-material";

// Redux
import { useAppDispatch } from "@/Lib/hooks";
import { addItem } from "@/Lib/Features/Cart/cartSlice";
export default function Cart({ product }) {
  // Hanlde Size
  const [size, setSize] = useState();
  //Handle Color
  const [color, setColor] = useState();
  //Handle Quantity
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };
  const dispatch = useAppDispatch();
  return (
    <>
      {/* Color and Size Selection */}
      {product?.attributes.isAvailable && (
        <Stack direction={"row"} gap={5}>
          {/* Color */}
          {product?.attributes.colors.data.length ? (
            <Stack direction={"column"} gap={2}>
              <Typography variant="body2">Color</Typography>
              <Stack direction={"row"} gap={1}>
                {product?.attributes.colors?.data?.map((e, i) => (
                  <Stack
                    key={i}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "25px",
                      height: "25px",
                      padding: "2px",
                      borderRadius: "100%",
                      border: `${
                        color === e?.attributes.color
                          ? "3px solid"
                          : "1px solid"
                      }`,
                      borderColor: "colors.lightblack",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      id={e?.attributes.color}
                      sx={{
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                        borderRadius: "100%",
                        bgcolor: e?.attributes.color,
                      }}
                      onClick={(e) => setColor(e.target.id)}
                    ></Box>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ) : (
            ""
          )}

          {/* Size */}
          {product?.attributes.sizes?.data.length ? (
            <Stack direction={"column"} gap={2}>
              <Typography variant="body2">Size</Typography>
              <Stack direction={"row"} gap={1}>
                {product?.attributes.sizes?.data?.map((e, i) => (
                  <Stack
                    key={i}
                    sx={{
                      cursor: "pointer",
                      px: "5px",
                      height: "25px",
                      justifyContent: "center",
                      borderRadius: "5px",
                      fontSize: "14px",
                      color: "cream",
                      bgcolor: `${
                        size === e?.attributes.size
                          ? "colors.purple"
                          : "colors.lightgray"
                      }`,
                    }}
                    onClick={(e) => setSize(e.target.innerHTML)}
                  >
                    {e?.attributes.size}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      )}
      <Stack direction={"row"} gap={4} marginY={3}>
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid",
            borderColor: "colors.lightgray",
            borderRadius: "5px",
            height: "50px",
            width: "80px",
          }}
        >
          <IconButton
            disableRipple
            sx={{ padding: "0" }}
            onClick={handleIncrease}
            disabled={!product?.attributes.isAvailable}
          >
            <Add
              sx={{
                transition: "all 0.3s",
                color: "colors.darkgray",
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton
            disableRipple
            sx={{ padding: "0" }}
            onClick={handleDecrease}
            disabled={quantity === 1 || !product?.attributes.isAvailable}
          >
            <Remove
              sx={{
                transition: "all 0.3s",
                color: "colors.darkgray",
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton>
        </Stack>
        <Button
          onClick={() => dispatch(addItem({ product, size, quantity, color }))}
          disableRipple
          disabled={
            !product?.attributes.isAvailable ||
            (product?.attributes.colors.data.length && !color) ||
            (product?.attributes.colors.data.length && !size)
          }
          sx={{
            height: "50px",
            width: "150px",
            borderRadius: "5px",
            color: "text.white",
            bgcolor: "colors.lightblack",
            isolation: "isolate",
            position: "relative",
            transition: "all 0.5s ease-in-out 0s",
            "&::before": {
              bottom: "0",
              content: "''",
              height: "100%",
              left: "0",
              position: " absolute",
              transition: "all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
              width: "100%",
              zIndex: "-1",
            },
            "&::after": {
              backgroundColor: "colors.violet",
              left: "auto",
              right: "0",
              width: "0",
              bottom: "0",
              content: "''",
              height: "100%",
              borderRadius: "5px",
              position: "absolute",
              transition: "all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
              zIndex: "-1",
            },
            "&:hover::after": {
              left: `${product?.attributes.isAvailable && "0"}`,
              right: `${product?.attributes.isAvailable && "auto"}`,
              width: `${product?.attributes.isAvailable && "100%"}`,
            },
          }}
        >
          {product?.attributes.isAvailable ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Stack direction={"row"} gap={1}>
          <IconButton disableRipple sx={{ padding: "0" }}>
            <FavoriteBorderOutlined
              sx={{
                transition: "all 0.3s",
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton>
          <IconButton disableRipple sx={{ padding: "0" }}>
            <CompareArrows
              sx={{
                transition: "all 0.3s",
                "&:hover": { color: "colors.violet" },
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
