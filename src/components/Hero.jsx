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
 {/* DISCOVER */}
  const title = "DISCOVER";
const slogan = "Experience beyond imagination".split(" ");

/* Magnetic Button Hook */
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
        className="fixed top-6 right-6 z-[9999] text-white text-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-full hover:scale-110 transition"
      >
        <FaBars />
      </button>

     {/* BACKGROUND */}
<img
  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80"
  alt="hero"
  className="absolute inset-0 w-full h-full object-cover"
/>

{/* OVERLAY */}
<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

      {/* HERO CONTENT */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6">

        <motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }}
  className="text-center leading-none"
/>
 

<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  }}
  className="text-center leading-none select-none"
>
  {/* DISCOVER LETTER ANIMATION */}
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
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        style={{ fontFamily: "Playfair Display, serif" }}
        className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.12em] drop-shadow-[0_0_40px_rgba(255,255,255,0.35)]"
      >
        {char}
      </motion.span>
    ))}
  </div>

  {/* the world */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
    style={{ fontFamily: "Pacifico, cursive" }}
    className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl -mt-5 drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]"
  >
    the world
  </motion.div>

  {/* SLOGAN */}
  <div className="flex justify-center flex-wrap gap-2 mt-6">
    {slogan.map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.1 + i * 0.15,
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{ fontFamily: "Inter, sans-serif" }}
        className="text-white/80 text-sm sm:text-base md:text-lg tracking-widest uppercase"
      >
        {word}
      </motion.span>
    ))}
  </div>
</motion.div>


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-white/70 mt-6 max-w-xl"
        >
          Luxury journeys, hand-picked destinations and unforgettable experiences crafted just for you.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex gap-6 mt-12 flex-wrap justify-center"
        >
          <button
            ref={exploreMag.ref}
            onMouseMove={exploreMag.onMouseMove}
            onMouseLeave={exploreMag.onMouseLeave}
            onClick={() => navigate("/top-destinations")}
            className="relative px-10 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-full font-semibold transition overflow-hidden hover:shadow-[0_0_45px_rgba(139,92,246,0.8)]"
          >
            Explore Now
          </button>

          <button
            ref={tourMag.ref}
            onMouseMove={tourMag.onMouseMove}
            onMouseLeave={tourMag.onMouseLeave}
            onClick={() => navigate("/tours-packages")}
            className="relative px-10 py-3 border border-white/25 text-white rounded-full transition hover:bg-white/10 hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]"
          >
            View Tours
          </button>
        </motion.div>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="group bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 flex items-center gap-4 transition hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:border-indigo-400/50">
            <FaCompass className="text-indigo-400 text-xl" />
            <input
              placeholder="Where do you want to go?"
              className="bg-transparent outline-none w-full text-white placeholder-white/40 text-sm"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-full font-semibold">
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* SIDE NAVBAR */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-[80%] sm:w-[380px] bg-black/95 backdrop-blur-xl border-l border-white/10 z-[9999] p-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl hover:rotate-90 transition"
            >
              <FaTimes />
            </button>

            <div className="mt-28 flex flex-col gap-8">
              {menu.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  className="text-white text-xl text-left hover:text-indigo-400 transition"
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
