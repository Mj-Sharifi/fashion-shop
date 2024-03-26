"use client";
import React,{useState,useEffect} from "react";


export default function ProductDetail({ params }) {
  const [product, setProduct] = useState();
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_BASE_API +
        `products/${params.productSlugs[0]}?populate=*`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  }, []);
  // const product = fetchData(
  //   process.env.BASE_API + `products/${params.productSlugs[0]}?populate=*`
  // );
  return <div>ProductDetail</div>;
}
