import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

      {/* toaster */}
      <Toaster />
    </>
  );
}

export default App;
