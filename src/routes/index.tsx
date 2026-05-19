import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight, Sparkles, ShieldCheck, BadgeDollarSign, Briefcase,
  FileText, Rocket, Lightbulb, Calendar, Users, CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HeroSlider } from "@/components/HeroSlider";
import webinarImage from "../assets/webinar.png";

const features = [
  { icon: Sparkles, title: "Stand Out", desc: "Make your brand stand out with our help." },
  { icon: ShieldCheck, title: "Complete Support", desc: "We help you from start to finish." },
  { icon: Lightbulb, title: "Expert Advice", desc: "We know a lot about many industries." },
  { icon: BadgeDollarSign, title: "Affordable Quality", desc: "Great services at good prices." },
];

const services = [
  { icon: Briefcase, tag: "Business Registration", title: "Start Your Business Easily", desc: "We register your business quickly and handle the paperwork end-to-end.", span: "md:col-span-2 md:row-span-2" },
  { icon: FileText, tag: "Brand Documentations", title: "Build Your Brand", desc: "Logos, taglines, and guidelines crafted for a professional identity." },
  { icon: Rocket, tag: "Brand Upscaling", title: "Make Your Brand Bigger", desc: "Reach more customers and grow your sales with strategic upscaling." },
  { icon: Lightbulb, tag: "Consultancy", title: "Expert Business Advice", desc: "Sharper decisions, smoother operations, better outcomes." },
];

const webinars = [
  { day: "Monday", title: "R-Pro Travels and Tours", time: "2:00 PM – 2:30 PM (GMT)", zoom: "https://zoom.us/join1", image: webinarImage },
  { day: "Tuesday", title: "R-Pro Business Consult", time: "1:00 PM – 1:30 PM (GMT)", zoom: "https://zoom.us/join2", image: webinarImage },
  { day: "Wednesday", title: "R-Pro Abroad Consult", time: "2:00 PM – 2:30 PM (GMT)", zoom: "https://zoom.us/join3", image: webinarImage },
  { day: "Thursday", title: "Retail / Sales", time: "1:00 PM – 1:30 PM (GMT)", zoom: "https://zoom.us/join4", image: webinarImage },
  { day: "Friday", title: "IT", time: "1:00 PM – 1:30 PM (GMT)", zoom: "https://zoom.us/join5", image: webinarImage },
];

const stats = [
  { value: "130+", label: "Businesses Registered" },
  { value: "500+", label: "Clients Attended To" },
  { value: "600+", label: "Requests Processed" },
];

// You'll need to create this component or replace with an img tag
const WebinarAvatar = () => (
  <div className="w-full h-full bg-gradient-to-br from-brand-red to-red-900" />
);

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSlider />

      {/* FEATURES BENTO */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-3">Why Choose Us</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold max-w-2xl">Features that move your business forward</h2>
            </div>
            <p className="text-muted-foreground max-w-md">Achieve more with R-Pro — specialized services for registration, consultancy, and brand growth.</p>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow"
              >
                <div className="grid place-items-center size-12 rounded-xl bg-brand-red text-primary-foreground mb-5 group-hover:rotate-6 transition-transform">
                  <f.icon className="size-6" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES BENTO */}
      <section className="relative bg-gradient-subtle py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-3">Our Services</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Services to make your business grow</h2>
              <p className="mt-4 text-muted-foreground">From starting your business to giving expert advice — we are here to help.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3 md:auto-rows-[220px]">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className={s.span ?? ""}>
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  className={`relative group h-full overflow-hidden rounded-3xl border border-border p-7 flex flex-col justify-between ${
                    i === 0 ? "bg-gradient-hero text-white" : "bg-card text-card-foreground"
                  }`}
                >
                  {i === 0 && <div className="absolute -bottom-20 -right-20 size-56 rounded-full bg-brand-red/40 blur-3xl" />}
                  <div className="relative">
                    <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-wider mb-3 ${i === 0 ? "text-white/70" : "text-primary"}`}>
                      <s.icon className="size-4" /> {s.tag}
                    </div>
                    <h3 className={`font-display font-bold mb-2 ${i === 0 ? "text-3xl md:text-4xl" : "text-xl"}`}>{s.title}</h3>
                    <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/80 max-w-md" : "text-muted-foreground"}`}>{s.desc}</p>
                  </div>
                  <Link
                    to="/services"
                    className={`relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all ${i === 0 ? "text-white" : "text-primary"}`}
                  >
                    Read More <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-hero text-white p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-72 rounded-full bg-brand-red/30 blur-3xl" />
          <div className="grid gap-10 md:grid-cols-3 relative">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="font-display text-6xl md:text-7xl font-bold text-brand-red">{s.value}</div>
                  <div className="mt-2 text-white/70 text-sm uppercase tracking-wider">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     {/* WEBINARS */}
<section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: "#8B0000" }}>
  <div className="relative mx-auto max-w-6xl px-6">
    <Reveal>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Upcoming Webinars</h2>
      <p className="text-white/70 mb-12">Stay updated with our webinar schedule and join us at the designated times.</p>
    </Reveal>
    <div className="flex flex-col">
      {webinars.map((w, i) => (
        <Reveal key={w.day} delay={i * 0.06}>
          <>
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 md:gap-8 py-5"
            >
              <div className="shrink-0 size-16 md:size-20 rounded-full bg-[#1a1a2e] border-2 border-white/20 overflow-hidden">
                <img 
                  src={w.image} 
                  alt={w.day}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-28 md:w-36 shrink-0">
                <span className="font-display text-2xl md:text-3xl font-bold text-white">{w.day}</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/40 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm md:text-base">
                  <span className="font-bold">{w.title}:</span>{" "}
                  <span className="text-white/80">{w.time}</span>
                </p>
              </div>
              <a
                href={w.zoom}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 animate-pulse-btn bg-[#6b0000] hover:bg-[#5a0000] hover:[animation:none] text-white font-bold text-sm md:text-base px-5 md:px-8 py-3 md:py-4 rounded transition-colors"
                style={{
                  animation: "webinarPulse 2s ease-in-out infinite",
                }}
                onMouseEnter={e => e.currentTarget.style.animation = "none"}
                onMouseLeave={e => e.currentTarget.style.animation = "webinarPulse 2s ease-in-out infinite"}
              >
                Join Webinar
              </a>
            </motion.div>
            {i < webinars.length - 1 && <div className="h-px bg-white/20" />}
          </>
        </Reveal>
      ))}
      <div className="h-px bg-white/20" />
    </div>
  </div>

  <style>{`
    @keyframes webinarPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.25); }
      50% { transform: scale(1.07); box-shadow: 0 0 0 10px rgba(255,255,255,0); }
    }
  `}</style>
</section>


      {/* SURVEY CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
            <div className="grid place-items-center size-20 rounded-2xl bg-brand-red text-primary-foreground shrink-0">
              <Users className="size-10" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">We Value Your Feedback!</h3>
              <p className="text-muted-foreground">Please take a moment to complete our Customer Satisfaction Survey and help us improve.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-105 transition-transform"
            >
              Take the Survey <CheckCircle2 className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}