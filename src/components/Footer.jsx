import { NavLink } from "react-router-dom";
import { FaLinkedin, FaXTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaMapLocationDot, FaArrowRight } from "react-icons/fa6";
import { site } from "../data/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/results", label: "Results" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1710] border-t border-[rgba(201,168,76,0.06)] relative overflow-hidden">
      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      {/* watermark logo */}
      <div className="absolute right-0 bottom-0 w-[360px] opacity-[0.025] pointer-events-none">
        <img src="/prakax-logo.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(255,255,255,0.04)]">

          {/* BRAND — col 1-4 */}
          <div className="md:col-span-4">
            <NavLink to="/" className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[rgba(201,168,76,0.15)] blur-md" />
                <img src="/prakax-logo.png" alt="Prakax" className="relative w-14 h-14 object-contain drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]" />
              </div>
              <div>
                <div className="font-display text-xl font-bold gold-text leading-none">PRAKAX</div>
                <div className="text-[9px] font-mono text-[var(--text-muted)] tracking-[3px] uppercase">Fin Serv</div>
              </div>
            </NavLink>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              Direct lender for unsecured business loans across Tamil Nadu, Kerala, Pondicherry, Karnataka, and Hyderabad - Telangana.
            </p>
            <div className="flex gap-2.5 mt-6">
              {[
                { href: site.social.linkedin, icon: <FaLinkedin size={14} />, label: "LinkedIn" },
                { href: site.social.x,        icon: <FaXTwitter  size={14} />, label: "X" },
                { href: site.social.whatsapp, icon: <FaWhatsapp  size={14} />, label: "WhatsApp" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.07)] hover:border-[rgba(201,168,76,0.4)] bg-white/[0.03] hover:bg-[rgba(201,168,76,0.08)] text-[var(--text-muted)] hover:text-[var(--gold)] flex items-center justify-center transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* SPACER */}
          <div className="hidden md:block md:col-span-1" />

          {/* PAGES — col 6-7 */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[3px] text-[var(--gold)] mb-4">Pages</h4>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} end={n.to === "/"}
                    className={({ isActive }) => `text-sm transition-colors duration-200 ${isActive ? "text-[var(--gold-light)]" : "text-[var(--text-muted)] hover:text-white"}`}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES — col 8-9 */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[3px] text-[var(--gold)] mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { to: "/services#unsecured",      label: "Unsecured Loans"     },
                { to: "/services#working-capital", label: "Working Capital"     },
                { to: "/services#short-term",      label: "Short-Term Funding"  },
              ].map((s) => (
                <li key={s.to}>
                  <NavLink to={s.to} className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">{s.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT — col 10-12 */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[3px] text-[var(--gold)] mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href={`tel:${site.chennai.phone}`} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                <FaPhone size={11} className="text-[var(--gold)] shrink-0" />{site.chennai.phone}
              </a>
              <a href={`mailto:${site.emails.admin}`} className="flex items-center gap-2.5 text-xs text-[var(--text-muted)] hover:text-white transition-colors">
                <FaEnvelope size={11} className="text-[var(--gold)] shrink-0" />{site.emails.admin}
              </a>
              <a href={`mailto:${site.emails.sales}`} className="flex items-center gap-2.5 text-xs text-[var(--text-muted)] hover:text-white transition-colors">
                <FaEnvelope size={11} className="text-[var(--gold)] shrink-0" />{site.emails.sales}
              </a>
              <div className="flex items-start gap-2.5 mt-1">
                <FaMapLocationDot size={11} className="text-[var(--gold)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono text-[var(--gold)] tracking-wider mb-0.5">Chennai HQ</div>
                  <div className="text-xs text-[var(--text-muted)] leading-relaxed">{site.chennai.addressShort}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FaMapLocationDot size={11} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider mb-0.5">Coimbatore Branch</div>
                  <div className="text-xs text-[var(--text-muted)] leading-relaxed">{site.coimbatore.addressShort}</div>
                  <a href={`tel:${site.coimbatore.phone}`} className="text-[10px] text-[var(--gold)] mt-1 block">{site.coimbatore.phone}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-[var(--text-muted)]">© 2026 Prakax Fin Serv. All rights reserved.</span>
          <div className="flex gap-6 text-[11px] font-mono text-[var(--text-muted)]">
            <a href="#" className="hover:text-[var(--gold-light)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--gold-light)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
