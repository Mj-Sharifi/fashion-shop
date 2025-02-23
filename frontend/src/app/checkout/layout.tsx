
import Navbar from "Components/Navbar";
import StoreProvider from "../StoreProvider";
import Footer from "Components/Footer";


export default function Layout({ children }) {
  return (
      <StoreProvider>
        <Navbar/>
        <main>{children}</main>
        <Footer />
      </StoreProvider>
  );
}
