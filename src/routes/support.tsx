import { motion } from "motion/react";
import { Mail, MessageSquare, LifeBuoy, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

const faqs = [
  { q: "How do I register a business with R-Pro?", a: "Reach out via our contact form or call us. We'll guide you through the required documents and handle registration end-to-end." },
  { q: "How long does business registration take?", a: "Typically between 5–14 business days depending on the type of entity and any additional licensing requirements." },
  { q: "Do you handle CBN licensing?", a: "Yes — we prepare, review and submit CBN licensing documentation for qualifying financial businesses." },
  { q: "Where are you located?", a: "House 13, Lekki Garden Estate Phase 1, off DKK Bus Stop, Sangotedo-Ajah, Eti-Osa, Lagos State, Nigeria." },
  { q: "How do I file a complaint?", a: "Send an email to complaints@rprogroup.net and our team will respond promptly." },
];

export default function Support() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-red/30 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-xs uppercase tracking-[0.18em] text-brand-red font-semibold mb-4">Support</div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
              We're here to <span className="text-brand-red italic">help</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              If you have any issues or need assistance, find the relevant support information below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-8 h-full">
              <div className="grid place-items-center size-12 rounded-xl bg-brand-red text-primary-foreground mb-5">
                <MessageSquare className="size-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Contact Us for Complaints</h3>
              <p className="text-muted-foreground leading-relaxed">
                We value your feedback and are committed to providing the best service possible. If you have any complaints, please reach out — your concerns are important to us.
              </p>
              <a href="mailto:complaints@rprogroup.net" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                <Mail className="size-4" /> complaints@rprogroup.net
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-gradient-hero text-white p-8 h-full relative overflow-hidden">
              <div className="absolute -bottom-16 -right-16 size-48 rounded-full bg-brand-red/30 blur-3xl" />
              <div className="grid place-items-center size-12 rounded-xl bg-white/10 backdrop-blur mb-5 relative">
                <LifeBuoy className="size-6" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 relative">General Support</h3>
              <p className="text-white/75 leading-relaxed relative">
                Building long-term partnerships with our clients is at the heart of what we do. Have a question? Our team is one message away.
              </p>
              <a href="mailto:Customercare@rprogroup.com.ng" className="mt-6 inline-flex items-center gap-2 text-white font-semibold relative">
                <Mail className="size-4" /> Customercare@rprogroup.com.ng
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-3">FAQ</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => <Faq key={i} {...f} />)}
        </div>
      </section>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal>
      <button onClick={() => setOpen(!open)} className="w-full text-left rounded-2xl border border-border bg-card p-6 hover:border-primary transition-colors">
        <div className="flex items-center justify-between gap-4">
          <h4 className="font-display text-lg font-bold">{q}</h4>
          <ChevronDown className={`size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          className="overflow-hidden"
        >
          <p className="pt-4 text-muted-foreground leading-relaxed">{a}</p>
        </motion.div>
      </button>
    </Reveal>
  );
}
