import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronLeft, ChevronRight, Loader2, CreditCard, X } from "lucide-react";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";

declare global {
  interface Window {
    FlutterwaveCheckout: (config: any) => void;
  }
}

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

// Plan prices
const PLAN_PRICES = {
  consultation: { id: 'consultation', name: 'Business Consultation', price: 50000 },
  'business-plan': { id: 'business-plan', name: 'Business Plan Writing', price: 150000 },
  registration: { id: 'registration', name: 'Business Registration', price: 350000 },
  strategy: { id: 'strategy', name: 'Strategic Planning', price: 100000 },
};

const API_URL = 'http://localhost:3000/api';

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
  const [step, setStep] = useState<'details' | 'installment' | 'payment'>('details');

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
    startDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  // Update total amount when plan changes
  useEffect(() => {
    const plan = PLAN_PRICES[bookingDetails.appointmentType as keyof typeof PLAN_PRICES];
    if (plan) {
      const newTotalAmount = plan.price;
      const newAmountPerInstallment = Math.ceil(newTotalAmount / installmentPlan.numberOfInstallments);
      setInstallmentPlan(prev => ({
        ...prev,
        totalAmount: newTotalAmount,
        amountPerInstallment: newAmountPerInstallment,
      }));
    }
  }, [bookingDetails.appointmentType]);

  // Update amount per installment when number of installments changes
  useEffect(() => {
    const newAmountPerInstallment = Math.ceil(installmentPlan.totalAmount / installmentPlan.numberOfInstallments);
    setInstallmentPlan(prev => ({
      ...prev,
      amountPerInstallment: newAmountPerInstallment,
    }));
  }, [installmentPlan.numberOfInstallments, installmentPlan.totalAmount]);

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
        tx_ref: tx_ref,
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
          source: "hero_slider",
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
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subscriptionData),
            });

            const result = await apiResponse.json();

            if (result.status === 'success') {
              alert(`✓ Installment Plan Activated!\n\nPlan: ${plan.name}\nTotal Amount: ₦${installmentPlan.totalAmount.toLocaleString()}\nNumber of Installments: ${installmentPlan.numberOfInstallments}\nAmount per Installment: ₦${installmentPlan.amountPerInstallment.toLocaleString()}\nPayment Day: Day ${installmentPlan.paymentDay} of each month\n\nFirst payment of ₦${firstPaymentAmount.toLocaleString()} has been charged.\nRemaining ${installmentPlan.numberOfInstallments - 1} payments will be automatically charged on day ${installmentPlan.paymentDay} of each month.\n\nWe'll send you a receipt each month.`);
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

  const resetForm = () => {
    setStep('details');
    setBookingDetails({
      name: "",
      email: "",
      phone: "",
      appointmentDate: "",
      appointmentType: "consultation",
    });
    setInstallmentPlan({
      totalAmount: 50000,
      numberOfInstallments: 1,
      amountPerInstallment: 50000,
      paymentDay: 1,
      startDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleNextToInstallment = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.appointmentDate) {
      alert("Please fill in all required fields");
      return;
    }
    setStep('installment');
  };

  const handleCreateInstallment = () => {
    setStep('payment');
    handlePayment();
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
                  onClick={() => setShowBookingModal(true)}
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
                      Pay Small Small <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
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

      {/* Installment Payment Modal */}
      {showBookingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8"
          onClick={() => setShowBookingModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white">PAY SMALL SMALL</h2>
                <p className="text-gray-300 text-sm mt-1">Create your custom installment plan</p>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-white">
                <X className="size-6" />
              </button>
            </div>

            <div className="p-6">
              {step === 'details' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Details</h3>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white placeholder:text-gray-400"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white placeholder:text-gray-400"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white placeholder:text-gray-400"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white"
                    value={bookingDetails.appointmentDate}
                    onChange={(e) => setBookingDetails({...bookingDetails, appointmentDate: e.target.value})}
                  />
                  <select
                    className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white"
                    value={bookingDetails.appointmentType}
                    onChange={(e) => setBookingDetails({...bookingDetails, appointmentType: e.target.value})}
                  >
                    <option value="consultation">Business Consultation - ₦{PLAN_PRICES.consultation.price.toLocaleString()}</option>
                    <option value="business-plan">Business Plan Writing - ₦{PLAN_PRICES['business-plan'].price.toLocaleString()}</option>
                    <option value="registration">Business Registration - ₦{PLAN_PRICES.registration.price.toLocaleString()}</option>
                    <option value="strategy">Strategic Planning - ₦{PLAN_PRICES.strategy.price.toLocaleString()}</option>
                  </select>

                  <button
                    onClick={handleNextToInstallment}
                    className="w-full mt-4 px-6 py-3 bg-brand-red rounded-lg hover:opacity-90 text-white font-semibold"
                  >
                    Continue to Installment Plan
                  </button>
                </div>
              )}

              {step === 'installment' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Customize Your Installment Plan</h3>

                  <div className="bg-brand-red/10 rounded-lg p-4 border border-brand-red/20 mb-4">
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
                      onChange={(e) => setInstallmentPlan({...installmentPlan, numberOfInstallments: parseInt(e.target.value)})}
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
                      className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white"
                      value={installmentPlan.paymentDay}
                      onChange={(e) => setInstallmentPlan({...installmentPlan, paymentDay: parseInt(e.target.value)})}
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
                      className="w-full px-4 py-3 bg-background-dark-100 border border-border rounded-lg text-white"
                      value={installmentPlan.startDate}
                      onChange={(e) => setInstallmentPlan({...installmentPlan, startDate: e.target.value})}
                    />
                  </div>

                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 mt-4">
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
                      onClick={() => setStep('details')}
                      className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-white/10 text-white"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCreateInstallment}
                      className="flex-1 px-6 py-3 bg-brand-red rounded-lg hover:opacity-90 text-white font-semibold"
                    >
                      Pay ₦{installmentPlan.amountPerInstallment.toLocaleString()} (First Installment)
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

export default HeroSlider;