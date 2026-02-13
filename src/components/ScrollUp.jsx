import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Automatically scrolls to top when route changes
 * Place this component in your App.jsx or main router file
 */
export default function ScrollUp() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // Use "instant" for immediate scroll, "smooth" for smooth scroll
    });
  }, [pathname]);

  return null;
}