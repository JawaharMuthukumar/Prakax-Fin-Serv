import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaArrowRight, FaFileInvoiceDollar, FaFileContract, FaReceipt, FaChevronDown } from "react-icons/fa6";

function Label({ children }) {
  return (
    <div className="mb-3">
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

const SERVICES = [
  {
    id: "unsecured",
    num: "01",
    title: "Unsecured Business Loans",
    sub: "No property. No machinery. No gold. Just your business performance.",
    range: "₹ 50 Lakhs – ₹ 50 Crores",
    body: [
      "Get the capital your business needs without putting your assets at risk. Our unsecured loans are evaluated purely on business performance, turnover, GST filings, and bank statements.",
      "As a direct lender, we make the credit decision in-house. No waiting for third-party approval. No broker fees eating into your amount. Just fast, fair, direct funding.",
    ],
    chips: ["Zero Collateral", "Turnover-Based", "Direct Lender", "1–3 Day Disbursal"],
  },
  {
    id: "working-capital",
    num: "02",
    title: "Working Capital Finance",
    sub: "Bridge cash flow gaps without disrupting operations.",
    range: "Flexible tenure",
    body: [
      "Cash flow gaps are the number one reason healthy businesses stall. Inventory to purchase, payroll to run, orders to fulfill, but the bank account doesn't match the calendar.",
      "We structure working capital solutions around your actual operating cycle, repayment aligns with when your business generates revenue, not an arbitrary bank schedule.",
    ],
    chips: ["Cycle-Aligned Terms", "Fast Disbursal", "No Collateral", "Flexible Repayment"],
  },
  {
    id: "short-term",
    num: "03",
    title: "Short-Term Business Funding",
    sub: "3 to 10 months. Capital now. Repay as cashflow returns.",
    range: "3–10 Month Tenure",
    body: [
      "When your business needs capital for a defined period and you know when cash will return, short-term funding is the most efficient tool. You're not carrying long-term debt for a short-term need.",
      "Interest rates are competitive and based on your business turnover profile. As a direct lender, we cut out intermediary margins, better rates pass directly to you.",
    ],
    chips: ["3–10 Month Tenure", "Competitive Rates", "No Middlemen", "Clean Exit"],
  },
];

const DOCS = [
  { icon: <FaFileInvoiceDollar size={24} />, title: "Bank Statements", desc: "Last 6 months, business account" },
  { icon: <FaFileContract size={24} />, title: "GST Returns", desc: "Last 6 months of filings" },
  { icon: <FaReceipt size={24} />, title: "IT Returns", desc: "Last 2 years of income tax returns" },
];

const FAQS = [
  { q: "Do I need to provide collateral?", a: "No. Our loans are entirely unsecured. We do not require property, machinery, gold, or any other asset. Eligibility is based solely on business turnover and financial health." },
  { q: "What interest rates do you offer?", a: "Rates are competitive and determined based on your business turnover, cash flow patterns, and tenure. As a direct lender there's no broker markup, you get better rates than most intermediary-routed channels." },
  { q: "How long does approval take?", a: "Once all documents are submitted, approval decisions are typically made within 24–48 hours. Disbursal follows within 1–3 working days total." },
  { q: "What determines eligibility?", a: "We evaluate primarily on business turnover, GST filings, and bank statements, not credit scores. Many clients have been funded after being turned down by banks for credit-related reasons." },
  { q: "Can I repay early?", a: "Early repayment terms are discussed clearly at loan structuring. There are no hidden charges or surprise penalties. All terms are clear before you sign." },
  { q: "Which regions do you serve?", a: "Tamil Nadu, Kerala, Pondicherry, Karnataka (Urban Cities), and Hyderabad, Telangana. Contact us if you're nearby, we evaluate on a case-by-case basis." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors">
        <span className="font-medium text-[var(--text-primary)] text-sm">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-[var(--gold)] shrink-0">
          <FaChevronDown size={13} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
            className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[rgba(255,255,255,0.05)]">
            <div className="pt-4">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="pt-32 md:pt-44 pb-16 bg-[#0A1710] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%,rgba(201,168,76,0.08) 0%,transparent 70%)" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <Label>Our Services</Label>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold text-white leading-tight">
              Built for how<br /><span className="gold-text">SMEs operate.</span>
            </h1>
            <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto text-base leading-relaxed">
              Fast, unsecured business funding designed around the reality of South Indian businesses, not bank paperwork.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      {SERVICES.map((s, i) => (
        <section key={s.id} id={s.id} className={`py-24 md:py-28 scroll-mt-20 ${i % 2 === 0 ? "bg-[#14241F]" : "bg-[#0A1710]"}`}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <FadeIn>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[3px] uppercase">{s.num}</span>
                  <span className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
                </div>
                <Label>{s.range}</Label>
                <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-white leading-tight mb-3">{s.title}</h2>
                <p className="text-[var(--gold-light)] text-sm mb-5 font-medium">{s.sub}</p>
                {s.body.map((p, pi) => <p key={pi} className="text-[var(--text-muted)] leading-relaxed mb-4 text-sm">{p}</p>)}
                <div className="flex flex-wrap gap-2 mt-6">
                  {s.chips.map(c => (
                    <span key={c} className="text-[11px] font-mono text-[var(--gold)] bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] px-3 py-1.5 rounded-full">{c}</span>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="relative rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[rgba(28,48,42,0.3)] p-10 flex items-center justify-center aspect-square max-w-sm mx-auto overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-52 h-52 rounded-full border border-dashed border-[rgba(201,168,76,0.15)]" />
                  <div className="relative w-24 h-24 rounded-full border-2 border-[var(--gold)] flex items-center justify-center bg-[rgba(201,168,76,0.06)] shadow-glow">
                    <span className="font-display text-4xl font-bold gold-text">{s.num}</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* DOCUMENTS */}
      <section className="py-20 md:py-28 bg-[#14241F]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-14">
            <Label>Minimal Paperwork</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white">3 Documents. That's all.</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {DOCS.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 text-center border-gold-glow hover:shadow-glow transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-[rgba(201,168,76,0.08)] text-[var(--gold)] flex items-center justify-center mx-auto mb-4">{d.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">{d.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm">{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[#0A1710]">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-12">
            <Label>FAQ</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white">Frequently Asked</h2>
          </FadeIn>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.05}><FAQItem q={f.q} a={f.a} /></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#14241F] text-center">
        <FadeIn className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Ready to get funded?</h2>
          <p className="text-[var(--text-muted)] mb-8">Free eligibility check. No obligation. Response within 2 hours.</p>
          <NavLink to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-[#0A1710] font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}>
            Apply Now <FaArrowRight size={13} />
          </NavLink>
        </FadeIn>
      </section>
    </>
  );
}
