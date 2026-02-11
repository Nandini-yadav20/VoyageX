import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";



const offers = [
  {
    id: 1,
    title: "DisneyLand",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200",
    desc: "Magical luxury getaway with cinematic experiences.",
    duration: "5 Days / 4 Nights",
    hotel: "5★ Premium Resort",
    transport: "Private Transfers",
  },
  {
    id: 2,
    title: "Kashmir",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200",
    desc: "Snow paradise with breathtaking valleys & lakes.",
    duration: "6 Days / 5 Nights",
    hotel: "Lake View Hotels",
    transport: "Luxury Coach",
  },
  {
    id: 3,
    title: "Singapore",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=80&w=1200",
    desc: "Ultra-modern city with unmatched luxury & thrill.",
    duration: "4 Days / 3 Nights",
    hotel: "5★ City Center Hotel",
    transport: "Airport Pickup",
  },
  {
    id: 4,
    title: "Dubai",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
    desc: "The world's ultimate luxury destination.",
    duration: "5 Days / 4 Nights",
    hotel: "7★ Skyline Hotel",
    transport: "Private Transfers",
  },
];

export default function Offers() {
  const sectionRef = useRef(null);
  
const navigate = useNavigate()
  const { scrollYProgress } = useScroll({ target: sectionRef });
  

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);

  const tilt = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(card, {
      rotateX: -(y / rect.height - 0.5) * 18,
      rotateY: (x / rect.width - 0.5) * 18,
      scale: 1.06,
      transformPerspective: 1400,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const resetTilt = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const magnet = (e, btn) => {
    const rect = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.45,
      y: (e.clientY - rect.top - rect.height / 2) * 0.45,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const resetMagnet = (btn) => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* CINEMATIC GRADIENT BACKGROUND */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 animate-gradient bg-[length:400%_400%] bg-gradient-to-br from-[#020617] via-[#030712] to-[#090020]"
      />

      {/* FLOATING LIGHT ORBS */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-10 left-10 w-[450px] h-[450px] bg-indigo-500/20 blur-[160px] rounded-full"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-600/20 blur-[160px] rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Exclusive VoyageX Offers
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Handcrafted premium holiday packages with cinematic luxury
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group perspective"
            >
              <div
                onMouseMove={(e) => tilt(e, e.currentTarget)}
                onMouseLeave={(e) => resetTilt(e.currentTarget)}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] transition-all"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="grid grid-cols-5 min-h-[320px]">
                  {/* IMAGE */}
                  <div className="col-span-2 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="col-span-3 p-8 flex flex-col justify-between text-white">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">
                        {offer.title}
                      </h3>
                      <p className="text-white/70 mb-4">
                        {offer.desc}
                      </p>

                      <div className="text-sm text-white/60 space-y-1">
                        <p>📅 {offer.duration}</p>
                        <p>🏨 {offer.hotel}</p>
                        <p>🚗 {offer.transport}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-indigo-400">
                        ${offer.price}
                        <span className="text-sm text-white/60"> / night</span>
                      </span>

                      <button  onClick={() => navigate("/booking", { state: { step: 2 } })}
                        onMouseMove={(e) => magnet(e, e.currentTarget)}
                        onMouseLeave={(e) => resetMagnet(e.currentTarget)}
                       
                        className="px-7 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/40 font-semibold"
                      >
                        Book Now
                      </button>
                     
                    </div>
                  </div>
                 
                </div>
              </div>
            </motion.div>
          ))}
        </div>
         {/* Floating Explore More Button */}
<button
  type="button"
  onClick={() => navigate("/tours-packages")}
  className="absolute bottom-6 right-6 z-50 px-6 py-3 rounded-full 
  bg-gradient-to-r from-indigo-500 to-purple-600 
  text-white font-semibold tracking-wide
  shadow-[0_0_25px_rgba(99,102,241,0.6)]
  hover:scale-110 transition-transform duration-300
  backdrop-blur-xl border border-white/10
  flex items-center gap-2"
>
  Explore More <MdOutlineNavigateNext className="text-xl" />
</button>

  

      </div>
     

    </section>
  );
}
