import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Briefcase, FileText, Rocket, Lightbulb, Building2, Landmark, ArrowRight,
  Check, Plus, Globe2, Sparkles, Layers, Bell,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const services = [
  { icon: Briefcase, tag: "Business Registration", title: "Start Your Business Easily", desc: "We help you register your business quickly and without hassle. Our experts handle all the paperwork and make sure everything is done right. Whether you're starting a small shop or a big company, we've got you covered." },
  { icon: FileText, tag: "Brand Documentations", title: "Build Your Brand", desc: "We create all the important documents your brand needs, like logos, taglines, and guidelines. Our team makes sure your brand looks professional and stands out." },
  { icon: Rocket, tag: "Brand Upscaling", title: "Make Your Brand Bigger", desc: "We help you take your brand to the next level — improving your image, reaching more customers, and increasing sales." },
  { icon: Lightbulb, tag: "Consultancy", title: "Expert Business Advice", desc: "Our consultants help you solve problems, improve operations, and make better decisions. Professional guidance to take your business to the next level." },
  { icon: Building2, tag: "Business Development", title: "Grow Your Operations", desc: "Structured development plans, partnership facilitation, and market entry strategies tailored to your industry." },
  { icon: Landmark, tag: "CBN Licensing", title: "Licensing & Documentations", desc: "Navigate CBN licensing requirements with experienced hands. We prepare, review, and submit your documentation end-to-end." },
];

const pricingRows = [
  { title: "Business Name Registration", desc: "Sole traders, vendors, first-time entrepreneurs", price: "₦30,000" },
  { title: "Limited Liability Company — LTD (1M shares)", desc: "Nigerian companies — growth-oriented businesses & investors", price: "₦60,000" },
  { title: "Trademark Registration", desc: "Brand protection — acceptance letter & final certificate stages", price: "Price TBA" },
  { title: "Copyright Registration", desc: "Creatives, authors, musicians, filmmakers, developers", price: "Price TBA" },
  { title: "Business Name Starter Pack", desc: "Registration + TIN + Letterhead + Logo + Bank account support", price: "₦45,000", highlight: true },
  { title: "SCUML Registration", desc: "Compliance registration for designated non-financial businesses & professions", price: "₦70,000" },
  { title: "Other Services", desc: "NGO, NAFDAC, TCC, brand advisory, business plans & more", price: "Upon Request" },
];

const launchboxItems = [
  "CAC & TIN Registration",
  "Professional Logo Design",
  "Corporate Account Support",
  "Branded Letterhead (E-copy)",
  "Brand Intro Video",
  "Website Setup (where applicable)",
  "Certificate in Frame",
  "Launch Gifts & Brand Essentials",
];

const intlAddOns = [
  "Registered Office Address",
  "Bank Account Opening Support",
  "Company Secretary Service",
  "Director / Nominee Services",
  "Virtual Office Setup",
  "Annual Filing & Compliance",
  "Tax Registration Abroad",
];

export default function Services() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-navy/40 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-xs uppercase tracking-[0.18em] text-brand-red font-semibold mb-4">Our Services</div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
              Services to make your <span className="text-brand-red italic">business grow</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              From starting your business to giving expert advice — explore everything R-Pro Business Consult brings to the table.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-elegant transition-shadow flex flex-col">
                <div className="grid place-items-center size-12 rounded-xl bg-brand-red text-primary-foreground mb-5 group-hover:rotate-6 transition-transform">
                  <s.icon className="size-6" />
                </div>
                <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{s.tag}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="relative bg-gradient-subtle py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-3">Our Pricing</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Transparent, upfront pricing</h2>
              <p className="mt-4 text-muted-foreground">
                Clear pricing for the essentials — reach out for anything marked TBA or upon request.
              </p>
            </div>
          </Reveal>

          {/* PRICING GRID */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pricingRows.map((row, i) => (
              <Reveal key={row.title} delay={i * 0.05} className={row.highlight ? "sm:col-span-2 lg:col-span-1" : ""}>
                <div
                  className={`h-full flex flex-col justify-between rounded-2xl p-6 border ${
                    row.highlight
                      ? "border-brand-red/30 bg-brand-red/5 shadow-soft"
                      : "border-border bg-card shadow-soft"
                  }`}
                >
                  <div>
                    <h3 className="font-display font-bold text-lg leading-snug">{row.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{row.desc}</p>
                  </div>
                  <div
                    className={`mt-5 inline-flex self-start rounded-full px-4 py-1.5 text-sm font-bold ${
                      row.highlight
                        ? "bg-brand-red text-primary-foreground"
                        : row.price.includes("TBA") || row.price.includes("Request")
                        ? "bg-muted text-muted-foreground"
                        : "bg-brand-navy text-white"
                    }`}
                  >
                    {row.price}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="text-center text-xs text-muted-foreground mt-6 uppercase tracking-wider">
              NGN prices exclude government fees &nbsp;•&nbsp; TBA = enquire for price
            </p>
          </Reveal>

          {/* LAUNCHBOX + INTERNATIONAL */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* LAUNCHBOX PACKAGE */}
            <Reveal delay={0.15} className="h-full">
              <div className="h-full flex flex-col rounded-3xl bg-brand-red text-primary-foreground p-8 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
                    <Sparkles className="size-4" /> Launchbox Package
                  </div>
                  <div className="shrink-0 rounded-full bg-white text-primary px-4 py-1.5 text-xs font-bold whitespace-nowrap">
                    From ₦80,000
                  </div>
                </div>
                <h3 className="relative font-display text-2xl font-bold mb-2">Where your brand comes alive</h3>
                <p className="relative text-white/80 text-sm mb-6">Complete business experience — everything you need to launch and look the part.</p>
                <div className="relative grid gap-2.5 sm:grid-cols-2 mt-auto">
                  {launchboxItems.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 shrink-0 text-white/90" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* INTERNATIONAL REGISTRATION */}
            <Reveal delay={0.2} className="h-full">
              <div className="h-full flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-semibold">
                    <Globe2 className="size-4" /> International Registration
                  </div>
                  <div className="shrink-0 rounded-full bg-brand-red text-primary-foreground px-4 py-1.5 text-xs font-bold whitespace-nowrap">
                    From $400
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Register your business Abroad</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  United Kingdom &nbsp;|&nbsp; United States &nbsp;|&nbsp; Any country — upon request. Includes name check, full incorporation, certificate & post-registration guidance.
                </p>
                <div className="border-t border-border pt-5 mt-auto">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Available Add-ons</div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {intlAddOns.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <Plus className="size-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* COMING SOON */}
          <Reveal delay={0.25}>
            <div className="mt-6 rounded-3xl bg-gradient-hero text-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-brand-red/30 blur-3xl" />
              <div className="relative grid place-items-center size-14 rounded-2xl bg-white/10 shrink-0">
                <Layers className="size-7" />
              </div>
              <div className="relative flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-brand-red font-semibold mb-2">
                  <Bell className="size-3.5" /> Coming Soon
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold">R-Pro Business Cluster Incubation Programme</h3>
                <p className="mt-1 text-white/70 text-sm max-w-xl">Bringing similar small brands under one umbrella — to maximise output and compete internationally.</p>
              </div>
              <Link
                to="/contact"
                className="relative shrink-0 inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white hover:scale-105 transition-transform"
              >
                Register Interest <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl bg-brand-red text-primary-foreground p-10 md:p-14 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold">Ready to take the next step?</h3>
          <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">Book appointment with our team and let's discuss how to grow your business.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-4 text-sm font-semibold shadow-elegant hover:scale-105 transition-transform">
            Book Appointment <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}