import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css"

// import required modules
import { FreeMode} from "swiper/modules";
import { Image_Api } from "Types/api";

type props = {
  images: Image_Api[];
  discount: number;
}
export default function ProductSlider({ images, discount }:props) {
  const [imgSlide, setImgSlide] = useState(0);
  const handleSlide = (s:number) => {
    setImgSlide(s);
  };
  return (<>
    <Box
      sx={{
        width: "100%",
        position: "relative"
      }}>
      <Box
        component={"img"}
        src={
          process.env.NEXT_PUBLIC_BASE_URL + images[imgSlide]?.attributes.url
        }
        alt=""
        sx={{
          width: "100%",
          maxHeight:{xs:"250px",md:"400px"},
          objectFit: "contain",
          px: "10%",
          pb: "30px"
        }} />
      {discount ? (
        <Chip
          variant="filled"
          label={`-${discount}%`}
          sx={{
            position: "absolute",
            top: "5%",
            left: "15%",
            borderRadius: "8px",
            bgcolor: "colors.pink",
            color: "text.white",
            fontSize: "14px",
            fontWeight: "500",
            "& .MuiChip-label": { padding: "2px 8px" },
          }}
        />
      ) : undefined}
    </Box>
    <Box sx={{
      width: "100%"
    }}>
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
              sx={{ cursor:"pointer",width: "100%", maxHeight:{xs:"100px",md:"150px"},objectFit: "contain" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  </>);
}