import { NavLink, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Menu, X, Loader2 } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

const loadFlutterwaveScript = () => {
  return new Promise((resolve) => {
    if (window.FlutterwaveCheckout) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

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

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      await loadFlutterwaveScript();
      
      const tx_ref = `RPRO-APPT-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      
      const paymentConfig = {
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
          description: `${bookingDetails.appointmentType.toUpperCase()} Appointment Booking`,
          logo: "https://your-logo-url.com/logo.png",
        },
        meta: {
          appointment_type: bookingDetails.appointmentType,
          appointment_date: bookingDetails.appointmentDate,
        },
        callback: function(response) {
          if (response.status === "successful") {
            // Send booking confirmation to your backend
            sendBookingConfirmation({
              transactionId: response.transaction_id,
              ...bookingDetails,
              tx_ref: tx_ref,
            });
            
            alert(`✓ Payment Successful!\n\nTransaction ID: ${response.transaction_id}\nWe'll send a confirmation email to ${bookingDetails.email}\n\nYour appointment has been booked!`);
            setShowBookingModal(false);
            setBookingDetails({
              name: "",
              email: "",
              phone: "",
              appointmentDate: "",
              appointmentType: "consultation",
              amount: 5000,
            });
          } else {
            alert("Payment was not successful. Please try again.");
          }
          setIsProcessing(false);
        },
        onclose: function() {
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

  const sendBookingConfirmation = async (data: any) => {
    // You'll need to create a backend endpoint for this
    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log("Booking confirmation sent:", await response.json());
    } catch (error) {
      console.error("Failed to send confirmation:", error);
    }
  };

  const openBookingForm = () => {
    setShowBookingModal(true);
    setOpen(false);
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
            className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-105 transition-transform"
          >
           PAY SMALL SMALL
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
                onClick={openBookingForm}
                className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                PAY SMALL SMALL
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowBookingModal(false)}
        >
          <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 text-white"
  onClick={(e) => e.stopPropagation()}
>
            <h2 className="text-2xl font-bold mb-4">PAY SMALL SMALL</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                value={bookingDetails.name}
                onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                value={bookingDetails.email}
                onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                value={bookingDetails.phone}
                onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
              />
              <input
                type="date"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                value={bookingDetails.appointmentDate}
                onChange={(e) => setBookingDetails({...bookingDetails, appointmentDate: e.target.value})}
              />
              <select
                className="w-full px-4 py-2 bg-background-dark-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                value={bookingDetails.appointmentType}
                onChange={(e) => {
                  const amount = e.target.value === "consultation" ? 5000 : 
                                e.target.value === "business-plan" ? 25000 : 10000;
                  setBookingDetails({...bookingDetails, appointmentType: e.target.value, amount});
                }}
              >
                <option value="consultation">Business Consultation - ₦5,000</option>
                <option value="business-plan">Business Plan Writing - ₦25,000</option>
                <option value="strategy">Rpro start - ₦10,000</option>
                <option value="strategy">R-Pro beginer - ₦20,000</option>
                <option value="strategy">R-Pro pro max - ₦30,000</option>
              </select>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.appointmentDate || isProcessing}
                  className="flex-1 px-4 py-2 bg-brand-red text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

declare global {
  interface Window {
    FlutterwaveCheckout: (config: any) => void;
  }
}