"use client";
import Slide from "./Slide";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
export default function MainSlider() {
  const [slides, setSlides] = useState();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}main-sliders?populate=*`)
      .then((res) => res.json())
      .then((data) => setSlides(data.data))
      .catch((err) => console.log(err));
  }, []);
  Swiper.ac;
  return (
    <Swiper
      navigation={true}
      modules={[Navigation ]}
      className="mySwiper"
    >
      {slides?.map((e, i) => (
        <SwiperSlide key={i}>
          <Slide
            title={e.attributes.title}
            subtitle={e.attributes.subtitle}
            img={e.attributes.image.data?.attributes.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
