import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{minHeight:"90vh"}}>
        {children}
      </main>
      <Footer />
    </>
  );
}
 