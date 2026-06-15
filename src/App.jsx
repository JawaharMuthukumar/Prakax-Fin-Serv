import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Results from "./pages/Results";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      >
        <Routes location={location}>
          <Route path="/"        element={<Home />}     />
          <Route path="/services" element={<Services />} />
          <Route path="/about"   element={<About />}    />
          <Route path="/results" element={<Results />}  />
          <Route path="/contact" element={<Contact />}  />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1710]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
