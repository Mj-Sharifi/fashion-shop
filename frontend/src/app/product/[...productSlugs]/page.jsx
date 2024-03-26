import fetchData from "@/Utils/fetchData";
import React from "react";

export default async function ProductDetail({ params }) {
  const product = await fetchData(
    process.env.BASE_API +
      `products/${params.productSlugs[0]}?populate=*`
  );
  console.log(product)
  return <div>ProductDetail</div>;
}
