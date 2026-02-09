import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const BookingPage = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    packageId: "", packageName: "", packagePrice: 0,
    firstName: "", lastName: "", email: "", phone: "", country: "",
    startDate: "", endDate: "", travelers: 1, roomType: "standard",
    specialRequests: "", cardNumber: "", cardName: "", expiryDate: "", cvv: "",
    agreeTerms: false,
  });

  const packages = [
    { id: 1, name: "Maldives Paradise", price: 1299, duration: "7 Days", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800", description: "Luxury water villas" },
    { id: 2, name: "Swiss Alps Adventure", price: 2499, duration: "10 Days", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800", description: "Alpine luxury" },
    { id: 3, name: "Dubai Luxury", price: 1899, duration: "5 Days", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800", description: "Desert safari" },
    { id: 4, name: "Bali Cultural", price: 999, duration: "8 Days", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", description: "Temples & culture" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, { yPercent: 30, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", scrub: true }});
      gsap.from(formRef.current, { opacity: 0, y: 50, duration: 1, ease: "power3.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePackageSelect = (pkg) => {
    setBookingData(prev => ({ ...prev, packageId: pkg.id, packageName: pkg.name, packagePrice: pkg.price }));
    setCurrentStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateTotal = () => {
    const basePrice = bookingData.packagePrice * bookingData.travelers;
    const roomUpgrade = bookingData.roomType === 'deluxe' ? 200 : bookingData.roomType === 'suite' ? 500 : 0;
    return basePrice + roomUpgrade;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <section ref={heroRef} className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920" className="absolute inset-0 w-full h-full object-cover scale-110" alt="Booking" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full" />
        <motion.div animate={{ y: [0, 30, 0], x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {showConfirmation ? "Booking Confirmed!" : "Book Your Journey"}
          </h1>
          <p className="text-xl text-gray-300">{showConfirmation ? "Get ready for an unforgettable adventure" : "Secure your dream destination today"}</p>
        </motion.div>
      </section>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <AnimatePresence mode="wait">
          {showConfirmation ? <ConfirmationScreen bookingData={bookingData} total={calculateTotal()} /> : (
            <div ref={formRef}>
              <ProgressBar currentStep={currentStep} />
              <div className="mt-12">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && <PackageSelection packages={packages} onSelect={handlePackageSelect} selectedPackage={bookingData.packageId} />}
                  {currentStep === 2 && <PersonalDetails data={bookingData} onChange={handleInputChange} onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
                  {currentStep === 3 && <TravelDetails data={bookingData} onChange={handleInputChange} onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />}
                  {currentStep === 4 && <PaymentDetails data={bookingData} onChange={handleInputChange} onSubmit={handleSubmit} onBack={() => setCurrentStep(3)} total={calculateTotal()} />}
                </AnimatePresence>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProgressBar = ({ currentStep }) => {
  const steps = [{ number: 1, name: "Package" }, { number: 2, name: "Details" }, { number: 3, name: "Travel" }, { number: 4, name: "Payment" }];
  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: index * 0.1 }} className="flex flex-col items-center relative z-10">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl transition-all duration-500 ${currentStep >= step.number ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50' : 'bg-white/10 text-gray-500 border-2 border-white/20'}`}>
              {currentStep > step.number ? <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> : step.number}
            </div>
            <span className={`mt-2 text-xs sm:text-sm font-medium ${currentStep >= step.number ? 'text-cyan-400' : 'text-gray-500'}`}>{step.name}</span>
          </motion.div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 mx-2 sm:mx-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: "0%" }} animate={{ width: currentStep > step.number ? "100%" : "0%" }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-cyan-500 to-purple-600" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const PackageSelection = ({ packages, onSelect, selectedPackage }) => (
  <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }}>
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Choose Your Package</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {packages.map((pkg, index) => (
        <motion.div key={pkg.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.03, y: -5 }} onClick={() => onSelect(pkg)}
          className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${selectedPackage === pkg.id ? 'border-cyan-400 shadow-2xl shadow-cyan-500/30' : 'border-white/10 hover:border-cyan-400/50'}`}>
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-lg sm:text-xl shadow-lg">${pkg.price}</div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{pkg.name}</h3>
            <p className="text-gray-400 mb-4">{pkg.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-semibold">{pkg.duration}</span>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform">Select</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const PersonalDetails = ({ data, onChange, onNext, onBack }) => (
  <motion.form initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} onSubmit={(e) => { e.preventDefault(); onNext(); }} className="max-w-3xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Personal Information</h2>
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">First Name *</label><input type="text" name="firstName" value={data.firstName} onChange={onChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" placeholder="John" /></div>
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Last Name *</label><input type="text" name="lastName" value={data.lastName} onChange={onChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" placeholder="Doe" /></div>
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Email *</label><input type="email" name="email" value={data.email} onChange={onChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" placeholder="john@example.com" /></div>
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Phone *</label><input type="tel" name="phone" value={data.phone} onChange={onChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" placeholder="+1 (555) 000-0000" /></div>
        <div className="sm:col-span-2"><label className="block text-sm font-medium text-cyan-400 mb-2">Country *</label><select name="country" value={data.country} onChange={onChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"><option value="" className="bg-gray-900">Select Country</option><option value="US" className="bg-gray-900">United States</option><option value="UK" className="bg-gray-900">United Kingdom</option><option value="CA" className="bg-gray-900">Canada</option><option value="IN" className="bg-gray-900">India</option></select></div>
      </div>
      <div className="flex gap-4 mt-8">
        <button type="button" onClick={onBack} className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all">Back</button>
        <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30">Continue</button>
      </div>
    </div>
  </motion.form>
);

const TravelDetails = ({ data, onChange, onNext, onBack }) => (
  <motion.form initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} onSubmit={(e) => { e.preventDefault(); onNext(); }} className="max-w-3xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Travel Details</h2>
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Start Date *</label><input type="date" name="startDate" value={data.startDate} onChange={onChange} required min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all" /></div>
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">End Date *</label><input type="date" name="endDate" value={data.endDate} onChange={onChange} required min={data.startDate || new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all" /></div>
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Number of Travelers *</label><input type="number" name="travelers" value={data.travelers} onChange={onChange} required min="1" max="10" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all" /></div>
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Room Type *</label><select name="roomType" value={data.roomType} onChange={onChange} required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"><option value="standard" className="bg-gray-900">Standard Room</option><option value="deluxe" className="bg-gray-900">Deluxe Room (+$200)</option><option value="suite" className="bg-gray-900">Suite (+$500)</option></select></div>
        <div className="sm:col-span-2"><label className="block text-sm font-medium text-cyan-400 mb-2">Special Requests</label><textarea name="specialRequests" value={data.specialRequests} onChange={onChange} rows="4" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all resize-none" placeholder="Any special requirements or requests..." /></div>
      </div>
      <div className="flex gap-4 mt-8">
        <button type="button" onClick={onBack} className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all">Back</button>
        <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30">Continue</button>
      </div>
    </div>
  </motion.form>
);

const PaymentDetails = ({ data, onChange, onSubmit, onBack, total }) => (
  <motion.form initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} onSubmit={onSubmit} className="max-w-3xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Payment Information</h2>
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 mb-6">
      <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-2xl border border-cyan-400/30">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Order Summary</h3>
        <div className="space-y-2 text-gray-300">
          <div className="flex justify-between"><span>Package:</span><span className="font-semibold">{data.packageName}</span></div>
          <div className="flex justify-between"><span>Base Price:</span><span>${data.packagePrice}</span></div>
          <div className="flex justify-between"><span>Travelers:</span><span>×{data.travelers}</span></div>
          {data.roomType !== 'standard' && <div className="flex justify-between"><span>Room Upgrade:</span><span>+${data.roomType === 'deluxe' ? 200 : 500}</span></div>}
          <div className="border-t border-white/20 pt-2 mt-2"></div>
          <div className="flex justify-between text-xl font-bold text-cyan-400"><span>Total:</span><span>${total}</span></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Card Number *</label><input type="text" name="cardNumber" value={data.cardNumber} onChange={onChange} required maxLength="19" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" /></div>
        <div><label className="block text-sm font-medium text-cyan-400 mb-2">Cardholder Name *</label><input type="text" name="cardName" value={data.cardName} onChange={onChange} required placeholder="John Doe" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-cyan-400 mb-2">Expiry Date *</label><input type="text" name="expiryDate" value={data.expiryDate} onChange={onChange} required placeholder="MM/YY" maxLength="5" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" /></div>
          <div><label className="block text-sm font-medium text-cyan-400 mb-2">CVV *</label><input type="text" name="cvv" value={data.cvv} onChange={onChange} required placeholder="123" maxLength="3" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all" /></div>
        </div>
        <div className="flex items-start gap-3">
          <input type="checkbox" name="agreeTerms" checked={data.agreeTerms} onChange={onChange} required className="mt-1 w-5 h-5 rounded border-white/20 text-cyan-500 focus:ring-cyan-400 cursor-pointer" />
          <label className="text-sm text-gray-300">I agree to the <span className="text-cyan-400 cursor-pointer hover:underline">Terms & Conditions</span> and <span className="text-cyan-400 cursor-pointer hover:underline">Privacy Policy</span></label>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button type="button" onClick={onBack} className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all">Back</button>
        <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30">Confirm Booking</button>
      </div>
    </div>
  </motion.form>
);

const ConfirmationScreen = ({ bookingData, total }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
      </motion.div>
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Booking Confirmed!</h2>
      <p className="text-gray-300 mb-8">Your adventure begins soon. We've sent confirmation details to <span className="text-cyan-400 font-semibold">{bookingData.email}</span></p>
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-2xl p-6 border border-cyan-400/30 mb-8 text-left">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">Booking Details</h3>
        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between"><span>Package:</span><span className="font-semibold text-white">{bookingData.packageName}</span></div>
          <div className="flex justify-between"><span>Traveler:</span><span>{bookingData.firstName} {bookingData.lastName}</span></div>
          <div className="flex justify-between"><span>Dates:</span><span>{bookingData.startDate} to {bookingData.endDate}</span></div>
          <div className="flex justify-between"><span>Travelers:</span><span>{bookingData.travelers} {bookingData.travelers > 1 ? 'people' : 'person'}</span></div>
          <div className="flex justify-between"><span>Room:</span><span className="capitalize">{bookingData.roomType}</span></div>
          <div className="border-t border-white/20 pt-3 mt-3"></div>
          <div className="flex justify-between text-xl font-bold text-cyan-400"><span>Total Paid:</span><span>${total}</span></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-transform">Download Receipt</button>
        <button onClick={() => window.location.href = '/'} className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all">Back to Home</button>
      </div>
    </div>
  </motion.div>
);

export default BookingPage;