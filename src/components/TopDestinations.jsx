import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    id: 1,
    title: "Maldives",
    image:
      "https://static1.evcdn.net/images/reduction/355607_w-3840_h-2160_q-70_m-crop.jpg",
    price: "$920.00",
  },
  {
    id: 2,
    title: "Santorini",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/f6/2d/d1.jpg",
    price: "$870.00",
  },
  {
    id: 3,
    title: "The Bahamas",
    image:
      "https://media.cntraveler.com/photos/68fa677afabbcb0b533aac99/1:1/w_1412,h_1412,c_limit/GettyImages-1390487394.jpg",
    price: "$850.00",
  },
  {
    id: 4,
    title: "Bali",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZFOE-JLlCIgrElAPo1VluQb9YXS7rN6UowQ&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDxnDcHv7kezWGIWQpU2zL2Q8ZgYCgw9Aq3w&s",
    price: "$750.00",
  },
  {
    id: 5,
    title: "Switzerland",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTsqLPeZwcLZRKBuzkFvfyHqBkJSs1hw0zlg&s",
    price: "$1,050.00",
  },
  {
    id: 6,
    title: "Paris",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1400&h=1400&s=1",
    price: "$1,050.00",
  },
   {
    id: 7,
    title: "London",
    image:
      "https://www.visitlondon.com/-/media/images/london/visit/things-to-do/nightlife/tower-bridge-at-night1920x1080.png?mw=800&rev=743f319d95bf47638fe287a5322c115c&hash=4EE2C2E9D2540601359FE846DC4B55C0",
    price: "$670.00",
  },
   {
    id: 8,
    title: "Thailand",
    image:
      "data:image/jpeg;base64,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",
    price: "$670.00",
  },
   {
    id: 9,
    title: "Venice",
    image:
      "data:image/jpeg;base64,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",
    price: "$255.00",
  },
];

export default function TopDestinations() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [active, setActive] = useState(2);
  const navigate= useNavigate ()

  const slideTo = (index) => {
    const container = containerRef.current;
    const card = cardsRef.current[index];

    if (!container || !card) return;

    const offset =
      card.offsetLeft -
      container.offsetWidth / 2 +
      card.offsetWidth / 2;

    gsap.to(container, {
      scrollLeft: offset,
      duration: 1,
      ease: "power4.inOut",
    });

    setActive(index);
  };

  useEffect(() => {
    slideTo(active);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % destinations.length;
        slideTo(next);
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#070b10] to-black flex items-center justify-center py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full text-center px-4">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Top Destinations
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-14">
          Discover breathtaking locations across the world, crafted for
          unforgettable travel experiences.
        </p>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative overflow-x-scroll scrollbar-hide"
        >
          <div
            ref={trackRef}
            className="flex gap-6 w-max px-[40vw]"
          >
            {destinations.map((d, i) => (
              <div
                key={d.id}
                ref={(el) => (cardsRef.current[i] = el)}
                onClick={() => slideTo(i)}
                className={`w-[230px] md:w-[260px] h-[360px] md:h-[420px]
                  rounded-[28px] overflow-hidden relative cursor-pointer
                  transition-all duration-700 ease-out
                  ${i === active
                    ? "scale-110 blur-0 opacity-100 z-20"
                    : "scale-90 blur-[1.5px] opacity-50"}
                `}
              >
                {/* Image */}
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <h3 className="text-xl font-semibold text-white">
                    {d.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">
                    {d.price}
                  </p>

                  <button  onClick={() => navigate("/booking", { state: { step: 2 } })
}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-full transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <div className="flex gap-2 items-center">
            {destinations.map((_, i) => (
              <span
                key={i}
                className={`h-[2px] w-10 transition-all duration-300
                  ${i === active ? "bg-green-400" : "bg-gray-600"}
                `}
              />
            ))}
          </div>

          <div className="flex gap-12 text-gray-500">
            {destinations.map((_, i) => (
              <span
                key={i}
                className={`text-sm transition
                  ${i === active ? "text-green-400 font-semibold" : ""}
                `}
              >
                {(i + 1).toString().padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </section>
  );
}
