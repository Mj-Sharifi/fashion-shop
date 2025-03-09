import Footer from "Components/Footer";
import Navbar from "Components/Navbar";
import StoreProvider from "app/StoreProvider";
import { ReactNode } from "react";

type props = {children:ReactNode}
export default function Layout({ children }:props) {
  return (
    <StoreProvider>
      <Navbar />
        <main style={{ minHeight: "90vh" }}>{children}</main>

      <Footer />
    </StoreProvider>
  );
}
