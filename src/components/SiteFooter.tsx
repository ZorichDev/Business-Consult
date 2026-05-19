import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-brand-ink text-white overflow-hidden">
      <div className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-red/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-navy/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
     <div>
  <div className="flex items-center gap-2 mb-4">
    <div className="size-10 rounded-md bg-brand-red shadow-elegant flex items-center justify-center overflow-hidden">
      <img 
        src={logo}
        alt="R-Pro Business Consult Logo"
        className="w-full h-full object-cover"
      />
    </div>
    <span className="font-display text-xl font-bold">R-Pro Business Consult</span>
  </div>
  <p className="text-sm text-white/70 leading-relaxed">
    We believe in building long-term partnerships with our clients. Passionate about helping you grow your business.
  </p>
</div>
        <div>
          <h4 className="font-display text-lg mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Business Registration</li>
            <li>Brand Documentations</li>
            <li>Business Development Services</li>
            <li>Business Consultancy Services</li>
            <li>Brand Upscaling Services</li>
            <li>CBN Licensing and Documentations</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <MapPin className="size-4 mt-0.5 shrink-0 text-brand-red" />
              House 13, Lekki Garden Estate Phase 1, off DKK Bus Stop, Sangotedo-Ajah, Eti-Osa, Lagos State. Nigeria.
            </li>
            <li className="flex gap-2">
              <Phone className="size-4 mt-0.5 shrink-0 text-brand-red" />
              +(234) 0903 663 0650, 02013309113
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 mt-0.5 shrink-0 text-brand-red" />
              custormercare@rprogroup.net
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/60">
          <div>© 2026 R-Pro Business Consult. All Rights Reserved.</div>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about" className="hover:text-white">About Us</Link>
            <Link to="/support" className="hover:text-white">FAQ</Link>
            <Link to="/contact" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
