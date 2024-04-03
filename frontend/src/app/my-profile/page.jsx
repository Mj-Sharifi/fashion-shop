"use client";
import { useAppSelector } from "@/Lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function MyProfile() {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);
  if (!token) {
    router.push("/auth");
  }

  return <div>MyProfile</div>;
}
