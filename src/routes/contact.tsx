import { motion } from "motion/react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-brand-navy/40 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-xs uppercase tracking-[0.18em] text-brand-red font-semibold mb-4">Contact</div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
              How to <span className="text-brand-red italic">reach us</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              You can reach us easily by phone, email, or by visiting our office. We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="space-y-6">
            <InfoCard icon={MapPin} title="Head Office" lines={["House 13, Lekki Garden Estate Phase 1,", "off DKK Bus Stop, Sangotedo-Ajah,", "Eti-Osa, Lagos State. Nigeria."]} />
            <InfoCard icon={Phone} title="Hotline" lines={["+(234) 0903 663 0650", "02013309113"]} />
            <InfoCard icon={Mail} title="Email" lines={["custormercare@rprogroup.net"]} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft"
          >
            <h3 className="font-display text-2xl font-bold mb-6">Drop Your Message</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name *" name="name" required />
              <Field label="Email *" name="email" type="email" required />
              <Field label="Phone" name="phone" />
              <Field label="Company Name" name="company" />
              <Field label="Subject *" name="subject" required className="md:col-span-2" />
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Message *</label>
                <textarea required rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" />
              </div>
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-105 transition-transform">
              {sent ? "Message Sent ✓" : <><span>Send Message</span> <Send className="size-4" /></>}
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof MapPin; title: string; lines: string[] }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex gap-4">
        <div className="grid place-items-center size-12 rounded-xl bg-brand-red text-primary-foreground shrink-0">
          <Icon className="size-6" />
        </div>
        <div>
          <h4 className="font-display text-lg font-bold mb-1">{title}</h4>
          {lines.map((l, i) => <p key={i} className="text-sm text-muted-foreground">{l}</p>)}
        </div>
      </div>
    </motion.div>
  );
}

function Field({ label, name, type = "text", required, className }: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        type={type} name={name} required={required}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
      />
    </div>
  );
}
