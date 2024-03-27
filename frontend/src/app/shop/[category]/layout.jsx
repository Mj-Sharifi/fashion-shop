import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import StoreProvider from "@/app/StoreProvider";

export default function Layout({ children }) {
  return (
    <>
      <StoreProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </StoreProvider>
    </>
  );
}
