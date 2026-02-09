import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const testimonials = [
    { id: 1, name: "Sophia Lee", image: "https://i.pravatar.cc/150?img=1", text: "VoyageX planned the most luxurious Maldives escape. Every detail was flawless." },
    { id: 2, name: "Rahul Mehta", image: "https://i.pravatar.cc/150?img=5", text: "Smooth booking, premium hotels and breathtaking destinations. Loved it!" },
    { id: 3, name: "Emma Watson", image: "https://i.pravatar.cc/150?img=9", text: "Every journey with VoyageX feels cinematic. Outstanding experience." },
    { id: 4, name: "Daniel Cruz", image: "https://i.pravatar.cc/150?img=10", text: "Luxury, comfort and adventure — perfectly balanced." },
    { id: 5, name: "Aisha Khan", image: "https://i.pravatar.cc/150?img=20", text: "Our Bali trip was magical. Highly recommended!" },
    { id: 6, name: "Alex Turner", image: "https://i.pravatar.cc/150?img=25", text: "Premium travel done right. Will book again!" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title elements with proper checking
      if (titleRef.current && titleRef.current.children) {
        gsap.from(titleRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }

      // Animate cards individually
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            delay: index * 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [testimonials]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-[#050814] via-[#070d1c] to-black overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-500/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Heading */}
        <div ref={titleRef} className="space-y-6 lg:sticky lg:top-24">
          <p className="text-cyan-400 tracking-[0.3em] uppercase text-xs font-semibold">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Loved by <br />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Travelers Worldwide
            </span>
          </h2>

          <p className="text-gray-300 max-w-lg leading-relaxed">
            Discover why thousands of travelers trust VoyageX to craft premium journeys across the globe.
          </p>

          <button className="px-8 sm:px-9 py-3 sm:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-105 transition-transform duration-300 font-semibold shadow-xl shadow-cyan-500/40 text-white">
            Explore Stories
          </button>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative bg-[#0c1427] border border-white/10 rounded-2xl p-6 shadow-xl hover:border-cyan-400/40 hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    {/* Glow behind avatar */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-indigo-400 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={t.image}
                      alt={t.name}
                      className="relative w-14 h-14 rounded-full object-cover ring-2 ring-cyan-400/40 group-hover:ring-cyan-400 transition-all duration-300"
                    />
                  </div>
                  <h4 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
                    {t.name}
                  </h4>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {t.text}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/0 to-indigo-500/10 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;