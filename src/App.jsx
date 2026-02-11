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
import ContactPage from "./pages/ContactPAge";


function App() {
  return (
    <>
     

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
               <Hero/>
              <SearchTabs />
              <TopDestinations />
              <Offers />
              <TestimonialSection />
            </>
          }
        />

        {/* TOP DESTINATIONS */}
        <Route path="/top-destinations" element={<TopDestinations />} />

        {/* TOURS PAGE */}
        <Route path="/tours-packages" element={<TourPackagesPage />} />

        {/* BOOKING */}
        <Route path="/booking" element={<BookingPage />} />

        {/* ABOUT */}
        <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage/>} />
        
       


      </Routes>

      <Footer />
    </>
  );
}

export default App;
