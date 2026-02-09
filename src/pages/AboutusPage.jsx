import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";
import { SiTrustpilot } from "react-icons/si";
import { GiTrophy } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage = () => {
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((stat, index) => {
        if (!stat) return;

        const target = Number(stat.dataset.target);

        // Slow luxury counter
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 3.8,
            ease: "power4.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              once: true,
            },
            onUpdate() {
              stat.innerText = Math.floor(stat.innerText).toLocaleString();
            },
          }
        );

        // Floating 3D motion
        gsap.to(stat.parentElement, {
          y: index % 2 === 0 ? -20 : -28,
          rotateX: 8,
          rotateY: index % 2 === 0 ? 8 : -8,
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const tilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;

    gsap.to(el, { rotateY: x, rotateX: y, duration: 0.4, ease: "power3.out" });
  };

  const resetTilt = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const values = [
    { icon: <SiTrustpilot />, title: "Excellence", description: "Delivering world-class journeys with perfection in every detail." },
    { icon: <FaHandshake />, title: "Trust", description: "Building meaningful connections through reliability and integrity." },
    { icon: <FaEarthAmericas />, title: "Sustainability", description: "Travel that respects culture and protects the planet." },
    { icon: <FaLightbulb />, title: "Innovation", description: "Pushing boundaries using modern travel technologies." },
    { icon: <IoMdHeart />, title: "Passion", description: "Crafting unforgettable journeys driven by love for travel." },
    { icon: <GiTrophy />, title: "Quality", description: "Premium experiences with seamless comfort and care." },
  ];
  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/400?img=1",
      bio: "25+ years in luxury travel, passionate about creating transformative experiences."
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Travel Officer",
      image: "https://i.pravatar.cc/400?img=13",
      bio: "Expert in destination curation with connections across 150+ countries."
    },
    {
      name: "Priya Sharma",
      role: "Head of Customer Experience",
      image: "https://i.pravatar.cc/400?img=5",
      bio: "Dedicated to ensuring every journey exceeds expectations."
    },
    {
      name: "David Kim",
      role: "Director of Operations",
      image: "https://i.pravatar.cc/400?img=12",
      bio: "Streamlining luxury travel logistics for seamless adventures."
    }
  ];

  const stats = [
    { number: 50000, label: "Happy Travelers", suffix: "+" },
    { number: 150, label: "Destinations", suffix: "+" },
    { number: 25, label: "Years Experience", suffix: "" },
    { number: 98, label: "Satisfaction Rate", suffix: "%" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover scale-110 brightness-[0.65]"
          alt="about hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-4"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            About VoyageX
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mt-6 max-w-3xl mx-auto">
            Crafting unforgettable journeys through innovation, luxury & trust.
          </p>
        </motion.div>
      </section>
       <section className="relative py-20 sm:py-32 bg-gradient-to-b from-black via-[#050814] to-black">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                        className="w-full h-full object-cover"
                        alt="Our Journey"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  </motion.div>
      
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Our Story
                    </h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <p className="text-lg">
                        Founded in 1999, VoyageX began with a simple dream: to make luxury travel accessible 
                        to adventurers seeking authentic, transformative experiences around the globe.
                      </p>
                      <p className="text-lg">
                        What started as a small boutique agency has grown into a global leader in curated 
                        travel experiences, serving over 50,000 satisfied travelers across 150+ destinations.
                      </p>
                      <p className="text-lg">
                        Today, we combine cutting-edge technology with personalized service to create 
                        seamless journeys that inspire, educate, and transform lives.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
      

      {/* CORE VALUES */}
      <section className="py-24 bg-gradient-to-b from-black via-[#060913] to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-indigo-400/50 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-fuchsia-500/0 group-hover:from-indigo-500/10 group-hover:to-fuchsia-500/10 transition-all" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition">
                    {v.title}
                  </h3>
                  <p className="text-gray-300">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-28 bg-black overflow-hidden">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-500/10 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-500/10 blur-[180px] rounded-full"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                onMouseMove={tilt}
                onMouseLeave={resetTilt}
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-indigo-400/50 transition-all duration-700"
              >
                <span
                  ref={(el) => (statsRef.current[i] = el)}
                  data-target={stat.number}
                  className="block text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent"
                >
                  0
                </span>
                <span className="text-2xl font-bold text-indigo-400">
                  {stat.suffix}
                </span>
                <p className="mt-3 text-gray-300 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          
        </div>
        
      </section>
       <section className="relative py-20 sm:py-32 bg-gradient-to-b from-black to-black">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center"
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                  Join thousands of satisfied travelers and discover your next adventure with VoyageX
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
                  >
                    Explore Destinations
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-cyan-400/50 transition-all"
                  >
                    Contact Us
                  </motion.button>
                </div>
              </motion.div>
            </section>

    </div>
  );
};

export default AboutUsPage;
