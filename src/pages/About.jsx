import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaHandshake, FaBolt, FaUsers, FaPhone, FaArrowRight } from "react-icons/fa6";
import { site } from "../data/site";

function Label({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <span className="w-5 h-px bg-[var(--gold)]" />
      <span className="text-[11px] font-mono tracking-[3px] text-[var(--gold)] uppercase">{children}</span>
    </div>
  );
}
function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay, ease: [0.22,1,0.36,1] }} className={className}>
      {children}
    </motion.div>
  );
}

const VALUES = [
  { icon: <FaHandshake size={22} />, title: "No Intermediaries", desc: "We are a direct lender. Every decision is made in-house — faster approvals, zero broker markup." },
  { icon: <FaBolt size={22} />, title: "Same-Week Disbursal", desc: "Funds reach your account within days, not weeks. Business opportunities don't wait." },
  { icon: <FaUsers size={22} />, title: "SME-First Mindset", desc: "Every product, process, and policy is designed around how real small and medium businesses operate." },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 md:pt-44 pb-16 bg-[#0A1710] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.04] pointer-events-none">
          <img src="/prakax-logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <Label>Our Story</Label>
            <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-bold text-white leading-tight mb-5">
              Built on Trust.<br /><span className="gold-text">For Growth.</span>
            </h1>
            <p className="text-[var(--text-muted)] leading-relaxed mb-4">
              Prakax Fin Serv was founded on one idea — Indian SMEs deserve faster, fairer access to capital. Too many strong businesses are held back not by performance, but by paperwork, collateral demands, and slow bank processes.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mb-4">
              As a direct lender, we cut the layers between a business and its funding. We evaluate real performance — turnover, GST filings, cash flow — and make decisions quickly, transparently, and without hidden costs.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Headquartered in Chennai with a branch in Coimbatore, we serve businesses across Tamil Nadu, Kerala, Pondicherry, Karnataka (Urban Cities), and Hyderabad - Telangana.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "₹2500Cr+", label: "Total Disbursed" },
                { num: "1–3 Days", label: "Approval Time" },
                { num: "0%", label: "Broker Fees" },
                { num: "5 States", label: "Coverage" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-6 border-gold-glow text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold gold-text">{s.num}</div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* OFFICES */}
      <section className="py-24 bg-[#14241F]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-14">
            <Label>Our Offices</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white">Where to find us</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { tag: "Headquarters", city: "Chennai", address: site.chennai.address, phone: site.chennai.phone, featured: true },
              { tag: "Branch Office", city: "Coimbatore", address: site.coimbatore.address, phone: site.coimbatore.phone, featured: false },
            ].map((o) => (
              <FadeIn key={o.city} delay={o.featured ? 0 : 0.1}>
                <div className={`rounded-2xl p-8 h-full transition-all duration-300 ${o.featured ? "glass border-gold-glow shadow-glow" : "border border-[rgba(255,255,255,0.06)] bg-[rgba(28,48,42,0.2)]"}`}>
                  <span className={`text-[10px] font-mono font-bold tracking-[3px] uppercase px-3 py-1 rounded-full ${o.featured ? "text-[var(--gold)] bg-[rgba(201,168,76,0.1)]" : "text-[var(--text-muted)] bg-white/5"}`}>
                    {o.tag}
                  </span>
                  <h3 className="font-display text-3xl font-bold text-white mt-5 mb-3">{o.city}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{o.address}</p>
                  <a href={`tel:${o.phone}`} className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold text-sm hover:text-[var(--gold-light)] transition-colors">
                    <FaPhone size={13} /> {o.phone}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-[#0A1710]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-14">
            <Label>Our Commitment</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white">
              What makes Prakax<br /><span className="gold-text">different</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                  className="border border-[rgba(255,255,255,0.06)] bg-[rgba(28,48,42,0.25)] hover:border-[rgba(201,168,76,0.2)] rounded-2xl p-8 h-full transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.08)] text-[var(--gold)] flex items-center justify-center mb-5">{v.icon}</div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#14241F] border-t border-[rgba(201,168,76,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Let's build something bigger together.</h2>
            <p className="text-[var(--text-muted)] mt-2 text-sm">Free, no-obligation consultation with our funding team.</p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-wrap gap-4 shrink-0">
            <NavLink to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[#0A1710] font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}>
              Get in Touch <FaArrowRight size={13} />
            </NavLink>
            <a href={`tel:${site.chennai.phone}`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[rgba(255,255,255,0.1)] text-white font-semibold text-sm hover:border-[rgba(201,168,76,0.3)] transition-all">
              <FaPhone size={13} className="text-[var(--gold)]" /> {site.chennai.phone}
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
