import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/",        label: "Home"       },
  { to: "/services", label: "Services"  },
  { to: "/about",   label: "About"      },
  { to: "/results", label: "Results"    },
  { to: "/contact", label: "Contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#0A1710]/90 backdrop-blur-2xl border-b border-[rgba(201,168,76,0.1)] shadow-[0_4px_60px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-[76px]">

          {/* ── LOGO ── */}
          <NavLink to="/" className="flex items-center gap-3 group" aria-label="Prakax Fin Serv">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-md group-hover:bg-gold/35 transition-all duration-500 scale-110" />
              <img
                src="/prakax-logo.png"
                alt="Prakax"
                className="relative w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(201,168,76,0.6)]"
              />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="font-display text-[22px] font-bold leading-none gold-text tracking-wide">PRAKAX</span>
              <span className="text-[9px] font-mono font-medium tracking-[3px] text-[var(--text-muted)] uppercase">Fin Serv</span>
            </div>
          </NavLink>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-md
                  ${isActive
                    ? "text-[var(--gold-light)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-md bg-white/5 border border-[rgba(201,168,76,0.15)]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/contact"
              className="relative group overflow-hidden px-6 py-2.5 rounded-lg font-semibold text-[13px] text-[#0A1710] transition-all duration-300"
              style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              <span className="relative">Apply Now →</span>
            </NavLink>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
            aria-label="Menu"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="block w-5 h-[1.5px] bg-[var(--gold)] rounded-full" />
            <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} className="block w-5 h-[1.5px] bg-[var(--gold)] rounded-full" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="block w-5 h-[1.5px] bg-[var(--gold)] rounded-full" />
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[98] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 z-[99] w-72 bg-[#0A1710] border-l border-[rgba(201,168,76,0.1)] flex flex-col p-8 md:hidden"
            >
              <div className="flex items-center gap-3 mb-10">
                <img src="/prakax-logo.png" alt="Prakax" className="w-14 h-14 object-contain" />
                <span className="font-display text-xl gold-text font-bold">PRAKAX</span>
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {links.map((l, i) => (
                  <motion.div key={l.to} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}>
                    <NavLink
                      to={l.to} end={l.to === "/"}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          isActive ? "bg-white/5 text-[var(--gold-light)] border-l-2 border-[var(--gold)]" : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                        }`
                      }
                    >{l.label}</NavLink>
                  </motion.div>
                ))}
              </nav>
              <NavLink to="/contact" className="mt-6 block text-center py-3 rounded-lg font-bold text-[#0A1710] text-sm" style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}>
                Apply Now
              </NavLink>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
