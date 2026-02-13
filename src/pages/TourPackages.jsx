import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const TourPackagesPage = () => {
  const heroRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          scrub: true,
        },
      });

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(filtersRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const tourPackages = [
    {
      id: 1,
      title: "Maldives Paradise",
      location: "Maldives",
      category: "Beach",
      duration: "7 Days",
      price: 1299,
      rating: 4.9,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
      description: "Luxury water villas, crystal-clear lagoons, white sandy beaches.",
      includes: ["5-Star Resort", "All Meals", "Water Sports", "Spa Access"],
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      location: "Switzerland",
      category: "Mountain",
      duration: "10 Days",
      price: 2499,
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200",
      description: "Snow-capped peaks, glacier walks, alpine luxury lodges.",
      includes: ["Mountain Lodge", "Breakfast", "Ski Pass", "Guide"],
    },
    {
      id: 3,
      title: "Dubai Luxury Escape",
      location: "UAE",
      category: "City",
      duration: "5 Days",
      price: 1899,
      rating: 4.7,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
      description: "Iconic skyline, desert safari, elite shopping & nightlife.",
      includes: ["5-Star Hotel", "Breakfast", "City Tour", "Desert Safari"],
    },
    {
      id: 4,
      title: "Bali Cultural Journey",
      location: "Bali, Indonesia",
      category: "Cultural",
      duration: "8 Days",
      price: 999,
      rating: 4.9,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200",
      description: "Immerse in Balinese culture with temples and rice terraces.",
      includes: ["Boutique Hotel", "All Meals", "Cultural Tours", "Cooking Class"],
    },
    {
      id: 5,
      title: "Iceland Northern Lights",
      location: "Iceland",
      category: "Adventure",
      duration: "6 Days",
      price: 1799,
      rating: 4.8,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1200",
      description: "Witness magical Northern Lights, glaciers, and hot springs.",
      includes: ["Cabin Stay", "Breakfast", "Northern Lights Tour", "Blue Lagoon"],
    },
    {
      id: 6,
      title: "Paris Romance",
      location: "Paris, France",
      category: "City",
      duration: "5 Days",
      price: 1599,
      rating: 4.9,
      reviews: 523,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
      description: "Experience the city of love with iconic landmarks and dining.",
      includes: ["4-Star Hotel", "Breakfast", "Seine Cruise", "Louvre Tickets"],
    },
    {
      id: 7,
      title: "African Safari",
      location: "Kenya",
      category: "Wildlife",
      duration: "9 Days",
      price: 2299,
      rating: 4.9,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200",
      description: "Unforgettable safari adventure with the Big Five.",
      includes: ["Safari Lodge", "All Meals", "Game Drives", "Professional Guide"],
    },
    {
      id: 8,
      title: "Tokyo Explorer",
      location: "Tokyo, Japan",
      category: "City",
      duration: "7 Days",
      price: 1499,
      rating: 4.8,
      reviews: 398,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
      description: "Perfect blend of tradition and modernity in Japan's capital.",
      includes: ["3-Star Hotel", "Breakfast", "JR Pass", "Cultural Tours"],
    },
    {
      id: 9,
      title: "Santorini Sunset",
      location: "Santorini, Greece",
      category: "Beach",
      duration: "6 Days",
      price: 1399,
      rating: 4.9,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200",
      description: "Stunning sunsets, white-washed villages, crystal-clear waters.",
      includes: ["Cave Hotel", "Breakfast", "Wine Tour", "Boat Trip"],
    }
  ];

  // Filter logic
  const filteredPackages = tourPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    const durationDays = parseInt(pkg.duration);
    const matchesDuration = selectedDuration === 'All' || 
                           (selectedDuration === 'Short' && durationDays <= 5) ||
                           (selectedDuration === 'Medium' && durationDays >= 6 && durationDays <= 8) ||
                           (selectedDuration === 'Long' && durationDays >= 9);
    const matchesPrice = priceRange === 'All' ||
                        (priceRange === 'Budget' && pkg.price < 1000) ||
                        (priceRange === 'Mid' && pkg.price >= 1000 && pkg.price < 2000) ||
                        (priceRange === 'Luxury' && pkg.price >= 2000);
    
    return matchesSearch && matchesCategory && matchesDuration && matchesPrice;
  });

  // Sort logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popular': return b.reviews - a.reviews;
      default: return 0;
    }
  });

  return (
  <div className="min-h-screen bg-black text-white overflow-hidden">

    {/* BACK BUTTON */}
    <motion.button
      onClick={() => navigate("/")}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed top-6 left-6 z-[9999] 
                 w-12 h-12 rounded-full 
                 bg-white/10 backdrop-blur-xl 
                 border border-white/20 
                 shadow-lg hover:shadow-purple-500/40 
                 flex items-center justify-center 
                 transition-all duration-300"
      aria-label="Go back to home"
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </motion.button>

      
      {/* HERO */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />

        {/* Floating Glow */}
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-80 h-80 bg-purple-600/30 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-pink-600/30 blur-[140px] rounded-full"
        />

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Explore Our Tours
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Ultra-luxury curated travel experiences crafted for explorers.
          </p>
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <section ref={filtersRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search destinations, packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
            />
            <svg 
              className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block text-sm font-medium text-purple-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-all cursor-pointer"
            >
              <option value="All" className="bg-gray-900">All Categories</option>
              <option value="Beach" className="bg-gray-900">Beach</option>
              <option value="Mountain" className="bg-gray-900">Mountain</option>
              <option value="City" className="bg-gray-900">City</option>
              <option value="Cultural" className="bg-gray-900">Cultural</option>
              <option value="Adventure" className="bg-gray-900">Adventure</option>
              <option value="Wildlife" className="bg-gray-900">Wildlife</option>
            </select>
          </motion.div>

          {/* Duration Filter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-purple-300 mb-2">Duration</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-all cursor-pointer"
            >
              <option value="All" className="bg-gray-900">All Durations</option>
              <option value="Short" className="bg-gray-900">Short (1-5 days)</option>
              <option value="Medium" className="bg-gray-900">Medium (6-8 days)</option>
              <option value="Long" className="bg-gray-900">Long (9+ days)</option>
            </select>
          </motion.div>

          {/* Price Filter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <label className="block text-sm font-medium text-purple-300 mb-2">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-all cursor-pointer"
            >
              <option value="All" className="bg-gray-900">All Prices</option>
              <option value="Budget" className="bg-gray-900">Budget (&lt;$1000)</option>
              <option value="Mid" className="bg-gray-900">Mid-Range ($1000-$2000)</option>
              <option value="Luxury" className="bg-gray-900">Luxury ($2000+)</option>
            </select>
          </motion.div>

          {/* Sort By */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-purple-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-all cursor-pointer"
            >
              <option value="popular" className="bg-gray-900">Most Popular</option>
              <option value="rating" className="bg-gray-900">Highest Rated</option>
              <option value="price-low" className="bg-gray-900">Price: Low to High</option>
              <option value="price-high" className="bg-gray-900">Price: High to Low</option>
            </select>
          </motion.div>
        </div>

        {/* View Mode Toggle & Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 text-sm sm:text-base"
          >
            Showing <span className="text-purple-400 font-semibold">{sortedPackages.length}</span> tour packages
          </motion.p>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12" 
              : "flex flex-col gap-6"
            }
          >
            {sortedPackages.length > 0 ? (
              sortedPackages.map((pkg, i) => (
                <TourCard key={pkg.id} pkg={pkg} index={i} viewMode={viewMode} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-20"
              >
                <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">No packages found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

const TourCard = ({ pkg, index, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:shadow-purple-500/40 transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-1/3 h-64 md:h-auto overflow-hidden">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold">
              ${pkg.price}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  {pkg.location}
                </p>
              </div>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium rounded-full">
                {pkg.category}
              </span>
            </div>

            <p className="text-gray-300 mb-4">{pkg.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-white font-semibold">{pkg.rating}</span>
                  <span className="text-gray-400">({pkg.reviews})</span>
                </div>
                <span className="text-gray-400">• {pkg.duration}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
      className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:shadow-purple-500/40 transition-all duration-500"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-4 right-4 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-sm sm:text-base">
          ${pkg.price}
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium rounded-full">
          {pkg.category}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-1">{pkg.title}</h3>
        <p className="text-gray-400 mb-3 text-sm sm:text-base flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          {pkg.location}
        </p>
        <p className="text-gray-300 mb-4 sm:mb-5 text-sm sm:text-base">{pkg.description}</p>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1 text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-white font-semibold">{pkg.rating}</span>
            <span className="text-gray-400">({pkg.reviews})</span>
          </div>
          <span className="text-gray-400">{pkg.duration}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TourPackagesPage;