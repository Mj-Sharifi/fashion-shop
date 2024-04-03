"use client";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { useAppSelector } from "@/Lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import StoreProvider from "../StoreProvider";

export default function Layout({ children }) {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!token) {
      router.push("/auth");
    }
  });
  return (
    <StoreProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </StoreProvider>
  );
}
