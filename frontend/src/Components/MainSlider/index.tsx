"use client";
import Slide from "./Slide";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";
// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { Main_Slider } from "Types/api";
export default function MainSlider() {
  const [slides, setSlides] = useState<Main_Slider[]>();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}main-sliders?populate=*`)
      .then((res) => res.json())
      .then((data) => setSlides(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Swiper
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      className="mySwiper main-slider"
    >
      {slides?.map(({ attributes: { title, subtitle, image } }, i) => (
        <SwiperSlide key={i}>
          <Slide
            title={title}
            subtitle={subtitle}
            img={image.data?.attributes.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
