import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaCompass } from "react-icons/fa";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/top-destinations" },
  { name: "Tours", path: "/tours-packages" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const title = "DISCOVER";
const slogan = "Experience beyond imagination".split(" ");

const useMagnetic = () => {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;

    gsap.to(el, { x, y, duration: 0.35, ease: "power3.out" });
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 768) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
  };

  return { ref, onMouseMove, onMouseLeave };
};

export default function PremiumHero() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const exploreMag = useMagnetic();
  const tourMag = useMagnetic();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* HAMBURGER */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 right-5 z-[10000] text-white text-xl bg-black/40 backdrop-blur-xl border border-white/20 p-3 rounded-full hover:scale-110 transition"
      >
        <FaBars />
      </button>

      {/* BACKGROUND */}
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80"
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* SINGLE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70 z-[1]" />

      {/* HERO CONTENT */}
      <div className="relative z-[2] min-h-screen flex flex-col justify-center items-center text-center px-6">

        {/* DISCOVER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="select-none"
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
                className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.12em] drop-shadow-[0_0_60px_rgba(255,255,255,0.45)]"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* the world */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ fontFamily: "Pacifico, cursive" }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl -mt-5 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]"
          >
            the world
          </motion.div>

          {/* SLOGAN */}
          <div className="flex justify-center flex-wrap gap-3 mt-6">
            {slogan.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.6 }}
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-white/85 text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex gap-6 mt-12 flex-wrap justify-center"
        >
          <button
            ref={exploreMag.ref}
            onMouseMove={exploreMag.onMouseMove}
            onMouseLeave={exploreMag.onMouseLeave}
            onClick={() => navigate("/top-destinations")}
            className="px-10 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-full font-semibold hover:shadow-[0_0_45px_rgba(139,92,246,0.9)] transition"
          >
            Explore Now
          </button>

          <button
            ref={tourMag.ref}
            onMouseMove={tourMag.onMouseMove}
            onMouseLeave={tourMag.onMouseLeave}
            onClick={() => navigate("/tours-packages")}
            className="px-10 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition"
          >
            View Tours
          </button>
        </motion.div>

      </div>

      {/* SIDE NAV */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[10001] p-8"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl"
            >
              <FaTimes />
            </button>

            <div className="mt-32 flex flex-col gap-8 text-center">
              {menu.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  className="text-white text-2xl tracking-wider hover:text-indigo-400 transition"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

    </section>
  );
}
