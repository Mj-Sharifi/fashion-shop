import { KeyboardDoubleArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function GoUp() {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0.7 * window.innerHeight) {
        setVisibility(true);
      } else {
        setVisibility(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return(()=>window.removeEventListener("scroll", handleScroll))
  }, []);
  return (
    <IconButton
      sx={{
        "@keyframes slideUp": {
          from: { transform: "translateY(100%)", opacity: "0.3" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        backgroundColor: "colors.violet",
        width: "40px",
        height: "40px",
        display: `${visibility ? "block" : "none"}`,
        position: "fixed",
        bottom: "10%",
        right: "5%",
        "&:hover svg": {
          animationName: "slideUp",
          animationDuration: "0.7s",
        },
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <KeyboardDoubleArrowUp sx={{ color: "white" }} />
    </IconButton>
  );
}
