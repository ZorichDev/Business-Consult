import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "@/assets/slide-1.jpg";
import slide2 from "@/assets/slide-2.jpg";
import slide3 from "@/assets/slide-3.jpg";

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

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative isolate h-[88vh] min-h-[640px] overflow-hidden bg-brand-ink text-white">
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
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/70 to-brand-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-transparent" />
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
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-4 text-sm font-semibold text-white shadow-accent hover:scale-105 transition-transform"
              >
                Pay small small <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
  );
}
