import { NavLink, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Menu, X, ArrowRight, CreditCard, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

declare global {
  interface Window {
    FlutterwaveCheckout: (config: any) => void;
  }
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

// Matches HeroSlider prices
const PLAN_PRICES = {
  consultation:    { id: "consultation",  name: "Business Consultation",  price: 50000  },
  "business-plan": { id: "business-plan", name: "Business Plan Writing",   price: 150000 },
  registration:    { id: "registration",  name: "Business Registration",   price: 350000 },
  strategy:        { id: "strategy",      name: "Strategic Planning",      price: 100000 },
};

const API_URL = "http://localhost:3000/api";

const loadFlutterwaveScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (typeof window.FlutterwaveCheckout === "function") { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [step, setStep] = useState<"details" | "installment" | "payment">("details");

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentType: "consultation",
  });

  const [installmentPlan, setInstallmentPlan] = useState({
    totalAmount: 50000,
    numberOfInstallments: 1,
    amountPerInstallment: 50000,
    paymentDay: 1,
    startDate: new Date().toISOString().split("T")[0],
  });

  // Sync total when service type changes
  useEffect(() => {
    const plan = PLAN_PRICES[bookingDetails.appointmentType as keyof typeof PLAN_PRICES];
    if (plan) {
      setInstallmentPlan((prev) => ({
        ...prev,
        totalAmount: plan.price,
        amountPerInstallment: Math.ceil(plan.price / prev.numberOfInstallments),
      }));
    }
  }, [bookingDetails.appointmentType]);

  // Recalculate per-installment when count changes
  useEffect(() => {
    setInstallmentPlan((prev) => ({
      ...prev,
      amountPerInstallment: Math.ceil(prev.totalAmount / prev.numberOfInstallments),
    }));
  }, [installmentPlan.numberOfInstallments, installmentPlan.totalAmount]);

  const resetForm = () => {
    setStep("details");
    setBookingDetails({ name: "", email: "", phone: "", appointmentDate: "", appointmentType: "consultation" });
    setInstallmentPlan({ totalAmount: 50000, numberOfInstallments: 1, amountPerInstallment: 50000, paymentDay: 1, startDate: new Date().toISOString().split("T")[0] });
  };

  const handleNextToInstallment = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.appointmentDate) {
      alert("Please fill in all required fields");
      return;
    }
    setStep("installment");
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

      const plan = PLAN_PRICES[bookingDetails.appointmentType as keyof typeof PLAN_PRICES];
      const tx_ref = `RPRO-INSTALL-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      const firstPaymentAmount = installmentPlan.amountPerInstallment;

      const paymentConfig: any = {
        public_key: "FLWPUBK_TEST-96c4b0b3e46e45ba8c9405b5c0f1350c-X",
        tx_ref,
        amount: firstPaymentAmount,
        currency: "NGN",
        payment_options: "card",
        customer: {
          email: bookingDetails.email,
          phone_number: bookingDetails.phone,
          name: bookingDetails.name,
        },
        customizations: {
          title: "R-Pro Business Consult - Pay Small Small",
          description: `${plan.name} - Installment ${installmentPlan.numberOfInstallments} months`,
          logo: "https://your-logo-url.com/logo.png",
        },
        meta: {
          service_type: bookingDetails.appointmentType,
          appointment_date: bookingDetails.appointmentDate,
          total_amount: installmentPlan.totalAmount,
          number_of_installments: installmentPlan.numberOfInstallments,
          amount_per_installment: installmentPlan.amountPerInstallment,
          payment_day: installmentPlan.paymentDay,
          start_date: installmentPlan.startDate,
          source: "site_header",
        },
        tokenization: true,
        callback: async (response: any) => {
          if (response.status === "successful" && response.card_token) {
            const subscriptionData = {
              customerName: bookingDetails.name,
              customerEmail: bookingDetails.email,
              customerPhone: bookingDetails.phone,
              planId: bookingDetails.appointmentType,
              planName: plan.name,
              totalAmount: installmentPlan.totalAmount,
              numberOfInstallments: installmentPlan.numberOfInstallments,
              amountPerInstallment: installmentPlan.amountPerInstallment,
              paymentDay: installmentPlan.paymentDay,
              startDate: installmentPlan.startDate,
              cardToken: response.card_token,
              firstPaymentTransactionId: response.transaction_id,
            };

            const apiResponse = await fetch(`${API_URL}/subscriptions/create-installment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(subscriptionData),
            });

            const result = await apiResponse.json();

            if (result.status === "success") {
              alert(
                `✓ Installment Plan Activated!\n\nPlan: ${plan.name}\nTotal: ₦${installmentPlan.totalAmount.toLocaleString()}\nInstallments: ${installmentPlan.numberOfInstallments}\nPer Month: ₦${installmentPlan.amountPerInstallment.toLocaleString()}\nPayment Day: Day ${installmentPlan.paymentDay}\n\nFirst payment of ₦${firstPaymentAmount.toLocaleString()} charged.\nRemaining ${installmentPlan.numberOfInstallments - 1} payments auto-charged on day ${installmentPlan.paymentDay} monthly.`
              );
              setShowBookingModal(false);
              resetForm();
            } else {
              alert("Payment successful but failed to save installment plan. Please contact support.");
            }
          } else {
            alert("Payment was not successful. Please try again.");
          }
          setIsProcessing(false);
        },
        onclose: () => setIsProcessing(false),
      };

      window.FlutterwaveCheckout(paymentConfig);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to initialize payment. Please try again later.");
      setIsProcessing(false);
    }
  };

  const handleCreateInstallment = () => {
    setStep("payment");
    handlePayment();
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
            <img src={logo} alt="R-Pro Business Consult Logo" className="size-10 rounded-md object-cover shadow-elegant" />
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
            onClick={() => setShowBookingModal(true)}
            disabled={isProcessing}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="size-4 animate-spin" /> Processing...</>
            ) : (
              <>PAY SMALL SMALL <ArrowRight className="size-4" /></>
            )}
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
                onClick={() => { setOpen(false); setShowBookingModal(true); }}
                disabled={isProcessing}
                className="mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {isProcessing ? <><Loader2 className="size-4 animate-spin" /> Processing...</> : "PAY SMALL SMALL"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Multi-step Installment Modal — matches HeroSlider */}
      {showBookingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8"
          onClick={() => { setShowBookingModal(false); resetForm(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white">PAY SMALL SMALL</h2>
                <p className="text-gray-300 text-sm mt-1">Create your custom installment plan</p>
              </div>
              <button onClick={() => { setShowBookingModal(false); resetForm(); }} className="text-gray-400 hover:text-white">
                <X className="size-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Step 1 — Details */}
              {step === "details" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Details</h3>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                    value={bookingDetails.appointmentDate}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, appointmentDate: e.target.value })}
                  />
                  <select
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                    value={bookingDetails.appointmentType}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, appointmentType: e.target.value })}
                  >
                    <option value="consultation">Business Consultation — ₦{PLAN_PRICES.consultation.price.toLocaleString()}</option>
                    <option value="business-plan">Business Plan Writing — ₦{PLAN_PRICES["business-plan"].price.toLocaleString()}</option>
                    <option value="registration">Business Registration — ₦{PLAN_PRICES.registration.price.toLocaleString()}</option>
                    <option value="strategy">Strategic Planning — ₦{PLAN_PRICES.strategy.price.toLocaleString()}</option>
                  </select>
                  <button
                    onClick={handleNextToInstallment}
                    className="w-full mt-4 px-6 py-3 bg-brand-red rounded-lg hover:opacity-90 text-white font-semibold"
                  >
                    Continue to Installment Plan
                  </button>
                </div>
              )}

              {/* Step 2 — Installment Plan */}
              {step === "installment" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Customize Your Installment Plan</h3>

                  <div className="bg-brand-red/10 rounded-lg p-4 border border-brand-red/20">
                    <p className="text-gray-300 text-sm">Total Plan Amount</p>
                    <p className="text-3xl font-bold text-brand-red">₦{installmentPlan.totalAmount.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 block mb-2">Number of Installments (Months)</label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={installmentPlan.numberOfInstallments}
                      onChange={(e) => setInstallmentPlan({ ...installmentPlan, numberOfInstallments: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>1 month</span>
                      <span className="text-brand-red font-bold">{installmentPlan.numberOfInstallments} months</span>
                      <span>12 months</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">Amount per Installment</p>
                    <p className="text-2xl font-bold text-white">₦{installmentPlan.amountPerInstallment.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">× {installmentPlan.numberOfInstallments} installments</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 block mb-2">Preferred Payment Day of Month</label>
                    <select
                      className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={installmentPlan.paymentDay}
                      onChange={(e) => setInstallmentPlan({ ...installmentPlan, paymentDay: parseInt(e.target.value) })}
                    >
                      {[...Array(28)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>Day {i + 1} of each month</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 block mb-2">Start Date (First Payment)</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                      value={installmentPlan.startDate}
                      onChange={(e) => setInstallmentPlan({ ...installmentPlan, startDate: e.target.value })}
                    />
                  </div>

                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <p className="text-sm text-blue-300 flex items-center gap-2">
                      <CreditCard className="size-4" />
                      Your card will be saved for automatic monthly payments
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      First payment: ₦{installmentPlan.amountPerInstallment.toLocaleString()} on {installmentPlan.startDate}
                      <br />
                      Subsequent payments: ₦{installmentPlan.amountPerInstallment.toLocaleString()} on day {installmentPlan.paymentDay} of each month
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep("details")}
                      className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-white/10 text-white transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCreateInstallment}
                      disabled={isProcessing}
                      className="flex-1 px-6 py-3 bg-brand-red rounded-lg hover:opacity-90 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <><Loader2 className="size-4 animate-spin" /> Processing...</>
                      ) : (
                        `Pay ₦${installmentPlan.amountPerInstallment.toLocaleString()} (First Installment)`
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default SiteHeader;