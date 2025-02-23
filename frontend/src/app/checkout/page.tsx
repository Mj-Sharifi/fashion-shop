"use client";
import countryList from "Utils/countries";
import { Close } from "@mui/icons-material";
import {
  Container,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Input,
  Divider,
  Button,
  Grid2,
} from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "Hooks/redux";

export default function Checkout() {
  // importing Shopping List from Redux
  const { list } = useAppSelector((state) => state.cart);
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
    (<Container>
      <Grid2 container spacing={5}>
        <Grid2
          item
          xs={12}
          md={7}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography variant="h4" gutterBottom>
            Billing Details
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} sx={{
            columnGap: 2
          }}>
            <Stack sx={{
              width: { xs: "100%", sm: "50%" }
            }}>
              First Name
              <Input
                name="firstName"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
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
            <Stack sx={{
              width: { xs: "100%", sm: "50%" }
            }}>
              Last Name
              <Input
                name="lastName"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
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
          </Stack>
          <Stack sx={{
            width: { xs: "100%" }
          }}>
            Company Name
            <Input
              name="companyName"
              sx={{
                "& input::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
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
          <Stack sx={{
            width: "100%"
          }}>
            Country
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={country}
                onChange={handleCountry}
                sx={{
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
          <Stack sx={{
            width: { xs: "100%" }
          }}>
            Street Addres
            <Input
              name="companyName"
              placeholder="House number and street name"
              sx={{
                "& input::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
                border: "1px solid",
                borderColor: "colors.darkgray",
                borderRadius: "5px",
                width: "100%",
                height: "45px",
                px: "10px",
                marginBottom: "10px !important",

                "&.Mui-focused": {
                  border: "1px solid !important",
                  borderColor: "colors.lightblack",
                },
              }}
            />
            <Input
              name="companyName"
              placeholder="Apartment, suite, unit etc."
              sx={{
                "& input::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
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
          <Stack sx={{
            width: { xs: "100%" }
          }}>
            Town / City
            <Input
              name="companyName"
              sx={{
                "& input::placeholder": { opacity: "0.7 !important" },
                "&::after": { border: "none !important" },
                "&::before": { border: "none !important" },
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              width: "100%",
              gap: 2
            }}>
            <Stack sx={{
              width: { xs: "100%", sm: "50%" }
            }}>
              State / County
              <Input
                name="companyName"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
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
            <Stack sx={{
              width: { xs: "100%", sm: "50%" }
            }}>
              Postcode / ZIP
              <Input
                name="companyName"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
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
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              width: "100%",
              gap: 2
            }}>
            <Stack sx={{
              width: { xs: "100%", sm: "50%" }
            }}>
              Phone
              <Input
                name="companyName"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
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
            <Stack sx={{
              width: { xs: "100%", sm: "50%" }
            }}>
              Email Address
              <Input
                name="companyName"
                sx={{
                  "& input::placeholder": { opacity: "0.7 !important" },
                  "&::after": { border: "none !important" },
                  "&::before": { border: "none !important" },
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
          </Stack>
          <Typography variant="h4">Additional information</Typography>
          <Typography variant="menuItmes">Order notes</Typography>
          <Input
            name="additionalInfo"
            multiline
            placeholder="Notes about your order, e.g special notes for delivery"
            sx={{
              alignItems: "start",
              "& textarea::placeholder": { opacity: "0.7 !important" },
              "&::after": { border: "none !important" },
              "&::before": { border: "none !important" },
              border: "1px solid",
              borderColor: "colors.darkgray",
              borderRadius: "5px",
              width: "100%",
              height: "200px",
              padding: "15px",
              "&.Mui-focused": {
                border: "1px solid !important",
                borderColor: "colors.lightblack",
              },
            }}
          />
        </Grid2>
        <Grid2
          item
          xs={12}
          md={5}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography variant="h4">Your Order</Typography>
          <Stack
            sx={{
              backgroundColor: "colors.lightgray",
              width: "100%",
              padding: "25px",
              borderRadius: "2%",
            }}
          >
            <Stack direction={"row"} sx={{
              justifyContent: "space-between"
            }}>
              <Typography variant="menuItems">Prodcut</Typography>
              <Typography variant="menuItems">Total</Typography>
            </Stack>
            <Divider sx={{ marginBottom: "30px", marginTop: "20px" }} />
            {list?.map((e, i) => (
              <Stack
                key={i}
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <Typography variant="body2">
                  {e?.attributes.title}
                  {/* <Close fontSize="emall"/> */}<span>&nbsp; x</span>
                  {e?.quantity}
                </Typography>
                <Typography variant="body2">
                  ${" "}
                  {e?.quantity *
                    (e.attributes.price -
                      (e.attributes.discount / 100) * e.attributes.price)}
                </Typography>
              </Stack>
            ))}
            <Divider sx={{ marginBottom: "30px", marginTop: "20px" }} />
            <Stack direction={"row"} sx={{
              justifyContent: "space-between"
            }}>
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2">Free Shipping</Typography>
            </Stack>
            <Divider sx={{ marginBottom: "30px", marginTop: "20px" }} />
            <Stack direction={"row"} sx={{
              justifyContent: "space-between"
            }}>
              <Typography variant="h5">Total</Typography>
              <Typography variant="h5" sx={{ color: "colors.violet" }}>
                & {totalPrice}
              </Typography>
            </Stack>
          </Stack>
          <Button
            disableRipple
            sx={{
              width: "100%",
              height: "45px",
              borderRadius: "50px",
              color: "text.white",
              backgroundColor: "colors.violet",
              "&:hover": { backgroundColor: "colors.lightblack" },
            }}
          >
            PLace Order
          </Button>
        </Grid2>
      </Grid2>
    </Container>)
  );
}
