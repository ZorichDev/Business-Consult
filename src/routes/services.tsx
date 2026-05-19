import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Briefcase, FileText, Rocket, Lightbulb, Building2, Landmark, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const services = [
  { icon: Briefcase, tag: "Business Registration", title: "Start Your Business Easily", desc: "We help you register your business quickly and without hassle. Our experts handle all the paperwork and make sure everything is done right. Whether you're starting a small shop or a big company, we've got you covered." },
  { icon: FileText, tag: "Brand Documentations", title: "Build Your Brand", desc: "We create all the important documents your brand needs, like logos, taglines, and guidelines. Our team makes sure your brand looks professional and stands out." },
  { icon: Rocket, tag: "Brand Upscaling", title: "Make Your Brand Bigger", desc: "We help you take your brand to the next level — improving your image, reaching more customers, and increasing sales." },
  { icon: Lightbulb, tag: "Consultancy", title: "Expert Business Advice", desc: "Our consultants help you solve problems, improve operations, and make better decisions. Professional guidance to take your business to the next level." },
  { icon: Building2, tag: "Business Development", title: "Grow Your Operations", desc: "Structured development plans, partnership facilitation, and market entry strategies tailored to your industry." },
  { icon: Landmark, tag: "CBN Licensing", title: "Licensing & Documentations", desc: "Navigate CBN licensing requirements with experienced hands. We prepare, review, and submit your documentation end-to-end." },
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
