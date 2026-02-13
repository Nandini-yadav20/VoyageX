import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/top-destinations" },
  { name: "Tours", path: "/tours-packages" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/Contact" },
];

const title = "DISCOVER";
const slogan = "Experience beyond imagination".split(" ");

const useMagnetic = () => {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    gsap.to(ref.current, { x, y, duration: 0.3, ease: "power3.out" });
  };

  const onMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
  };

  return { ref, onMouseMove, onMouseLeave };
};

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const exploreMag = useMagnetic();
  const tourMag = useMagnetic();

  /* Scroll Detection */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Prevent horizontal scroll (fix white space issue) */
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
  }, []);

  /* Lock body scroll when sidebar open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-black">
      
      {/* DESKTOP NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[3000]  md:block transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "bg-black/40 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.button
              onClick={() => navigate("/")}
              className="text-white text-2xl font-bold tracking-wider hover:text-indigo-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                VoyageX
              </span>
            </motion.button>

            {/* Desktop Menu */}
            <div className="flex items-center gap-8">
              {menu.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => navigate(item.path)}
                  className="text-white/90 hover:text-white text-sm tracking-wide uppercase 
                           relative group transition-colors duration-200"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r 
                                 from-indigo-400 to-fuchsia-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => navigate("/booking")}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 
                         text-white rounded-full text-sm font-semibold 
                         hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE HAMBURGER */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-5 right-5 z-[4000] text-white text-xl 
                   bg-black/60 backdrop-blur-xl border border-white/20 
                   p-3 rounded-full hover:scale-110 transition-transform duration-200
                   shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaBars />
      </motion.button>

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80"
          alt="hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-[1]" />

      {/* HERO CONTENT */}
      <div className="relative z-[2] min-h-screen flex flex-col justify-center items-center text-center px-6">

        {/* DISCOVER TEXT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          <div className="flex justify-center">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 60, rotateX: 90 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                style={{ fontFamily: "Playfair Display, serif" }}
                className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl 
                           font-bold tracking-[0.08em]"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ fontFamily: "Pacifico, cursive" }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl -mt-6"
          >
            the world
          </motion.div>

          <div className="flex justify-center flex-wrap gap-3 mt-6">
            {slogan.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.12 }}
                className="text-white/80 text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex gap-6 mt-12 flex-wrap justify-center"
        >
          <button
            ref={exploreMag.ref}
            onMouseMove={exploreMag.onMouseMove}
            onMouseLeave={exploreMag.onMouseLeave}
            onClick={() => navigate("/top-destinations")}
            className="px-10 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 
                       text-white rounded-full font-semibold 
                       hover:shadow-[0_0_45px_rgba(139,92,246,0.9)] transition-shadow duration-300"
          >
            Explore Now
          </button>

          <button
            ref={tourMag.ref}
            onMouseMove={tourMag.onMouseMove}
            onMouseLeave={tourMag.onMouseLeave}
            onClick={() => navigate("/tours-packages")}
            className="px-10 py-3 border border-white/30 text-white rounded-full 
                       hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            View Tours
          </button>
        </motion.div>
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3999]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-screen 
                         w-[85%] sm:w-[380px] 
                         bg-black/95 backdrop-blur-xl 
                         border-l border-white/10 z-[4001] p-8"
            >
              <motion.button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-white text-2xl"
              >
                <FaTimes />
              </motion.button>

              <div className="mt-16 flex flex-col gap-6">
                {menu.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                    className="text-white text-xl tracking-wider text-left"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
