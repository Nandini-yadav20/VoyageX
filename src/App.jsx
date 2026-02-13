import { Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import SearchTabs from "./components/SearchTabs";
import TopDestinations from "./components/TopDestinations";
import Offers from "./pages/Offers";
import Footer from "./components/Footer";
import TestimonialSection from "./components/Testimonial";
import TourPackagesPage from "./pages/TourPackages";
import BookingPage from "./pages/BookingPage";
import AboutUsPage from "./pages/AboutusPage";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/Scrolltotop";


function App() {
  return (
    <>
      {/* ✅ Scroll reset on route change */}
 <ScrollToTop/>

      {/* ROUTES ONLY */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <SearchTabs />
              <TopDestinations />
              <Offers />
              <TestimonialSection />
            </>
          }
        />

        <Route path="/top-destinations" element={<TopDestinations />} />
        <Route path="/tours-packages" element={<TourPackagesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer OUTSIDE Routes */}
      <Footer />
    </>
  );
}

export default App;
