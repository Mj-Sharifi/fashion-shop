"use client";
import { ExpandMore } from "@mui/icons-material";
import {
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Input,
  Button,
} from "@mui/material";
import React, { useState } from "react";

export default function MyProfile() {
  // Handle Accordion
  const [expanded, setExpanded] = useState<"panel1"|"panel2"|"panel3" | false>("panel1");

  const handleChange =
    (panel: "panel1"|"panel2"|"panel3") => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Stack
      sx={{
        minHeight: "600px",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        "& .MuiPaper-root": { boxShadow: "none" },

        "& .MuiPaper-root::before": {
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Accordion
        expanded={expanded == "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          width: { xs: "95%", sm: "80%", md: "60%", lg: "45%", xl: "40%" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            backgroundColor: "colors.lightgray",
            border: "1px solid",
            borderColor: "colors.darkgray",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            height: "70px",
            "&:hover p,&:hover svg": { color: "colors.violet" },
          }}
        >
          <Typography sx={{ textTransform: "uppercase" }}>
            1. EDIT YOUR ACCOUNT INFORMATION
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "1px solid",
            borderColor: "colors.darkgray",
            borderTop: "0px",
          }}
        >
          <Stack
            sx={{
              gap: "15px",
              width: "100%",
              alignItems: "end",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{
                width: "100%",
                gap: "15px",
              }}
            >
              <Stack
                sx={{
                  width: { xs: "100%", md: "50%" },
                }}
              >
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
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  width: { xs: "100%", md: "50%" },
                }}
              >
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
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              sx={{
                width: "100%",
              }}
            >
              Email Address
              <Input
                name="email"
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
                }}
              />
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{
                width: "100%",
                gap: "15px",
              }}
            >
              <Stack
                sx={{
                  width: { xs: "100%", md: "50%" },
                }}
              >
                Telephone
                <Input
                  name="telephone"
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
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  width: { xs: "100%", md: "50%" },
                }}
              >
                Fax
                <Input
                  name="fax"
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
                  }}
                />
              </Stack>
            </Stack>
            <Button
              disableRipple
              sx={{
                width: "135px",
                height: "45px",
                backgroundColor: "colors.lightgray",
                color: "text.black",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "colors.violet",
                  color: "text.white",
                },
              }}
            >
              Continue
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded == "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          width: { xs: "95%", sm: "80%", md: "60%", lg: "45%", xl: "40%" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={{
            backgroundColor: "colors.lightgray",
            border: "1px solid",
            borderColor: "colors.darkgray",
            height: "70px",
            "&:hover p,&:hover svg": { color: "colors.violet" },
          }}
        >
          <Typography sx={{ textTransform: "uppercase" }}>
            2. change your password
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "1px solid",
            borderColor: "colors.darkgray",
            borderTop: "0px",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              gap: "15px",
              alignItems: "end",
            }}
          >
            <Stack
              sx={{
                width: "100%",
              }}
            >
              Password
              <Input
                name="email"
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
                }}
              />
            </Stack>
            <Stack
              sx={{
                width: "100%",
              }}
            >
              Password Confirm
              <Input
                name="email"
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
                }}
              />
            </Stack>
            <Button
              disableRipple
              sx={{
                width: "135px",
                height: "45px",
                backgroundColor: "colors.lightgray",
                color: "text.black",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "colors.violet",
                  color: "text.white",
                },
              }}
            >
              Continue
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded == "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          width: { xs: "95%", sm: "80%", md: "60%", lg: "45%", xl: "40%" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          sx={{
            backgroundColor: "colors.lightgray",
            border: "1px solid",
            borderColor: "colors.darkgray",
            borderBottomLeftRadius: `${expanded === "panel3" ? "" : "5px"}`,
            borderBottomRightRadius: `${expanded === "panel3" ? "" : "5px"}`,
            height: "70px",
            "&:hover p,&:hover svg": { color: "colors.violet" },
          }}
        >
          <Typography sx={{ textTransform: "uppercase" }}>
            3. modify your address book entries
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "1px solid",
            borderColor: "colors.darkgray",
            borderTop: "0px",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "end",
              gap: "15px",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{
                width: "100%",
                border: "1px solid",
                borderColor: "colors.darkgray",
                py: { xs: "20px", sm: "5px" },
              }}
            >
              <Stack
                sx={{
                  width: { xs: "100%", md: "60%" },
                  borderRight: { md: "1px solid" },
                  borderColor: "colors.darkgray",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  John Doe
                  <br /> Paul Park
                  <br /> Lorem Ipsum Dolor Set Amet
                  <br /> NYC
                  <br /> New York
                </Typography>
                <Stack
                  sx={{
                    width: "100%",
                    display: { xs: "flex", md: "none" },
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    mt: "15px",
                  }}
                >
                  <Button
                    disableRipple
                    sx={{
                      width: "70px",
                      height: "35px",
                      backgroundColor: "#df5c39",
                      color: "text.white",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "colors.violet",
                        color: "text.white",
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    disableRipple
                    sx={{
                      width: "70px",
                      height: "35px",
                      backgroundColor: "colors.lightblack",
                      color: "text.white",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "colors.violet",
                        color: "text.white",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  width: { xs: "100%", md: "40%" },
                  display: { xs: "none", md: "flex" },
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  disableRipple
                  sx={{
                    width: "70px",
                    height: "35px",
                    backgroundColor: "#df5c39",
                    color: "text.white",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "colors.violet",
                      color: "text.white",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  disableRipple
                  sx={{
                    width: "70px",
                    height: "35px",
                    backgroundColor: "colors.lightblack",
                    color: "text.white",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "colors.violet",
                      color: "text.white",
                    },
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
            <Button
              disableRipple
              sx={{
                width: "135px",
                height: "45px",
                backgroundColor: "colors.lightgray",
                color: "text.black",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "colors.violet",
                  color: "text.white",
                },
              }}
            >
              Continue
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}
