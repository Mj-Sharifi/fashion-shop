import React, { useState } from "react";
import { Box, Chip, useMediaQuery } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css"

// import required modules
import { FreeMode} from "swiper/modules";

export default function ProductSlider({ images, discount }) {
  const [imgSlide, setImgSlide] = useState(0);
  const handleSlide = (s) => {
    setImgSlide(s);
  };

  return (
    <>
      <Box width={"100%"} position={"relative"}>
        <Box
          component={"img"}
          src={
            process.env.NEXT_PUBLIC_BASE_URL + images[imgSlide]?.attributes.url
          }
          alt=""
          width={"100%"}
          px={"10%"}
          pb={"30px"}
        />
        {discount ? (
          <Chip
            variant="filled"
            label={`-${discount}%`}
            sx={{
              position: "absolute",
              top: "5%",
              left: "15%",
              width: "65px",
              paddingY: "3px",
              borderRadius: "5px",
              bgcolor: "colors.pink",
              color: "text.white",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
        ) : undefined}
      </Box>
      <Box width={"100%"}>
        <Swiper
          onClick={(e) => handleSlide(e.clickedIndex)}    
          slidesPerView={3}
          spaceBetween={"10px"}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper product-slider"
        >
          {images?.map((e, i) => (
            <SwiperSlide key={i}>
              <Box
                component={"img"}
                src={process.env.NEXT_PUBLIC_BASE_URL + e?.attributes.url}
                // sx={{ cursor:"pointer" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}