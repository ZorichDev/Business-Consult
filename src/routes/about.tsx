import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Target, Heart, Eye, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const pillars = [
  { icon: Target, title: "Our Mission", desc: "Empower businesses with the tools, registration support, and expertise they need to thrive in today's competitive market." },
  { icon: Eye, title: "Our Vision", desc: "To become Africa's most trusted partner for business growth, brand development, and end-to-end consultancy." },
  { icon: Heart, title: "Our Values", desc: "Integrity. Excellence. Partnership. We treat every client's business as if it were our own — with care and precision." },
];

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-brand-red/40 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-xs uppercase tracking-[0.18em] text-brand-red font-semibold mb-4">About R-Pro</div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
              Helping businesses <span className="text-brand-red italic">grow and succeed</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
              Welcome to R-Pro Business Consult. Our goal is to give businesses the tools and advice they need to do well — from your very first registration to scaling your brand to new markets.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft hover:shadow-elegant transition-shadow">
                <div className="grid place-items-center size-14 rounded-2xl bg-brand-red text-primary-foreground mb-6">
                  <p.icon className="size-7" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gradient-subtle py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-4">Our Story</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">A trusted partner since day one</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We believe in building long-term partnerships with our clients. With over 130 businesses registered, 500+ clients served, and 600+ requests processed, R-Pro Business Consult is passionate about helping you grow.
            </p>
            <div className="mt-10">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-105 transition-transform">
                Work with us <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
