import { NavLink, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

// Define proper types for Flutterwave
declare global {
  interface Window {
    FlutterwaveCheckout: (config: FlutterwaveConfig) => void;
  }
}

interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  meta?: {
    [key: string]: string;
  };
  callback: (response: FlutterwaveResponse) => void;
  onclose: () => void;
}

interface FlutterwaveResponse {
  status: string;
  transaction_id: string;
  tx_ref: string;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
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

  const loadFlutterwaveScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if FlutterwaveCheckout is already a function
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

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const scriptLoaded = await loadFlutterwaveScript();
      if (!scriptLoaded) {
        alert("Unable to load payment system. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      const tx_ref = `RPRO-APPT-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      
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
          source: "site_header",
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

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border"
      >
        <div className="hidden md:flex items-center justify-end gap-6 px-6 py-2 text-xs text-muted-foreground bg-brand-red text-primary-foreground">
          <a href="tel:+2349036630650" className="flex items-center gap-1.5 hover:opacity-80">
            <Phone className="size-3" /> +(234) 0903 663 0650
          </a>
          <a href="tel:02013309113" className="hover:opacity-80">02013309113</a>
          <span className="opacity-80">Customercare@rprogroup.com.ng</span>
        </div>
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="R-Pro Business Consult Logo" 
              className="size-10 rounded-md object-cover shadow-elegant"
            />
            <div className="leading-tight">
              <div className="font-display text-base font-bold tracking-tight">R-Pro</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Business Consult</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors relative ${
                    isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-brand-red rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={openBookingForm}
            disabled={isProcessing}
            className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Book Appointment / Pay"}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openBookingForm();
                }}
                disabled={isProcessing}
                className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Book Appointment / Pay"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>

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
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 text-white"
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
                      <span className="animate-spin">⏳</span>
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

export default SiteHeader;