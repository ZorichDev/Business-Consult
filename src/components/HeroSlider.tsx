import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";
import type { FlutterwaveConfig, FlutterwaveResponse } from "@/types/flutterwave";

const slides = [
  {
    image: slide1,
    eyebrow: "Trusted Business Partner",
    title: "Your Partner in",
    accent: "Business Success",
    desc: "Offering expert services for growth, development, and documentation across Nigeria.",
  },
  {
    image: slide2,
    eyebrow: "End-to-End Registration",
    title: "Achieve More with",
    accent: "R-Pro Consult",
    desc: "Specialized services for business registration, consultancy, and CBN licensing.",
  },
  {
    image: slide3,
    eyebrow: "Long-Term Partnership",
    title: "Building Stronger",
    accent: "Businesses Together",
    desc: "Professional support for all your business needs — from startup to scale.",
  },
];

const loadFlutterwaveScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window.FlutterwaveCheckout === "function") {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentType: "consultation",
    amount: 5000,
  });

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const scriptLoaded = await loadFlutterwaveScript();
      if (!scriptLoaded) {
        alert("Unable to load payment system. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      const tx_ref = `RPRO-HERO-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      
      const paymentConfig: FlutterwaveConfig = {
        public_key: "FLWPUBK_TEST-96c4b0b3e46e45ba8c9405b5c0f1350c-X",
        tx_ref: tx_ref,
        amount: bookingDetails.amount,
        currency: "NGN",
        payment_options: "card,ussd,banktransfer,mobilemoney",
        customer: {
          email: bookingDetails.email,
          phone_number: bookingDetails.phone,
          name: bookingDetails.name,
        },
        customizations: {
          title: "R-Pro Business Consult",
          description: `${bookingDetails.appointmentType.toUpperCase()} Service Payment`,
          logo: "https://your-logo-url.com/logo.png",
        },
        meta: {
          service_type: bookingDetails.appointmentType,
          appointment_date: bookingDetails.appointmentDate,
          source: "hero_slider",
        },
        callback: (response: FlutterwaveResponse) => {
          if (response.status === "successful") {
            alert(`✓ Payment Successful!\n\nTransaction ID: ${response.transaction_id}\nAmount: ₦${bookingDetails.amount.toLocaleString()}\n\nWe'll contact you shortly at ${bookingDetails.email} to confirm your service.`);
            setShowBookingModal(false);
            resetBookingForm();
          } else {
            alert("Payment was not successful. Please try again.");
          }
          setIsProcessing(false);
        },
        onclose: () => {
          setIsProcessing(false);
        },
      };
      
      window.FlutterwaveCheckout(paymentConfig);
      
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to initialize payment. Please try again later.");
      setIsProcessing(false);
    }
  };

  const resetBookingForm = () => {
    setBookingDetails({
      name: "",
      email: "",
      phone: "",
      appointmentDate: "",
      appointmentType: "consultation",
      amount: 5000,
    });
  };

  const openBookingForm = () => {
    setShowBookingModal(true);
  };

  const slide = slides[index];

  return (
    <>
      <section className="relative isolate h-[88vh] min-h-160 overflow-hidden bg-brand-ink text-white">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img src={slide.image} alt="" className="size-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-linear-to-r from-brand-ink/90 via-brand-ink/70 to-brand-ink/30" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-ink via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

        <div className="relative mx-auto max-w-7xl px-6 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.18em]">
                <span className="size-1.5 rounded-full bg-brand-red animate-pulse" />
                {slide.eyebrow}
              </div>
              <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05]">
                {slide.title}
                <br />
                <span className="text-brand-red italic">{slide.accent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed">{slide.desc}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={openBookingForm}
                  disabled={isProcessing}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-4 text-sm font-semibold text-white shadow-accent hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay small small <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <Play className="size-4" /> Explore Services
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-10 left-6 right-6 flex items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="group relative h-1 w-12 overflow-hidden rounded-full bg-white/20"
                >
                  {i === index && (
                    <motion.div
                      key={`bar-${index}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-brand-red"
                    />
                  )}
                </button>
              ))}
              <span className="ml-3 font-display text-sm tabular-nums text-white/70">
                0{index + 1} <span className="text-white/30">/ 0{slides.length}</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                className="grid place-items-center size-12 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
                className="grid place-items-center size-12 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowBookingModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-linear-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Book a Service</h2>
              <p className="text-gray-300 text-sm">Fill in your details to get started</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full px-4 py-2 bg-background-dark-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-white placeholder:text-gray-400"
                value={bookingDetails.name}
                onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full px-4 py-2 bg-background-dark-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-white placeholder:text-gray-400"
                value={bookingDetails.email}
                onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                className="w-full px-4 py-2 bg-background-dark-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-white placeholder:text-gray-400"
                value={bookingDetails.phone}
                onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
              />
              <input
                type="date"
                className="w-full px-4 py-2 bg-background-dark-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-white"
                value={bookingDetails.appointmentDate}
                onChange={(e) => setBookingDetails({...bookingDetails, appointmentDate: e.target.value})}
              />
              <select
                className="w-full px-4 py-2 bg-background-dark-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red text-white"
                value={bookingDetails.appointmentType}
                onChange={(e) => {
                  const amount = e.target.value === "consultation" ? 5000 : 
                                e.target.value === "business-plan" ? 25000 : 
                                e.target.value === "registration" ? 35000 : 10000;
                  setBookingDetails({...bookingDetails, appointmentType: e.target.value, amount});
                }}
              >
                <option value="consultation" className="bg-background-dark-100 text-white">Business Consultation - ₦5,000</option>
                <option value="business-plan" className="bg-background-dark-100 text-white">Business Plan Writing - ₦25,000</option>
                <option value="registration" className="bg-background-dark-100 text-white">Business Registration - ₦35,000</option>
                <option value="strategy" className="bg-background-dark-100 text-white">Strategic Planning - ₦10,000</option>
              </select>
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-4 text-white">
                  <span className="text-sm">Total Amount:</span>
                  <span className="text-2xl font-bold text-brand-red">
                    ₦{bookingDetails.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-white/10 transition text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.appointmentDate || isProcessing}
                  className="flex-1 px-4 py-2 bg-brand-red rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white font-semibold"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₦${bookingDetails.amount.toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default HeroSlider;