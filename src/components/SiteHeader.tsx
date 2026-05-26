import { NavLink, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
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
  <img 
    src={logo} 
    alt="R-Pro Business Consult Logo" 
    className="size-10 rounded-md object-cover shadow-elegant"
  />
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
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-105 transition-transform"
        >
          Pay small smallAppointment
        </Link>
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
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Pay small smallAppointment
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
