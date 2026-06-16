import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaArrowRight, FaWhatsapp, FaCircleCheck, FaPhone,
  FaArrowUpRightFromSquare, FaBuilding, FaIndustry, FaChartLine
} from "react-icons/fa6";
import { site } from "../data/site";

/* ── Counter hook ──────────────────────────── */
function useCountUp(end, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = end / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [end, duration, active]);
  return val;
}

/* ── Shared sub-components ─────────────────── */
function Label({ children, center }) {
  return (
    <div className={`mb-3 ${center ? "text-center" : ""}`}>
      <span className="text-[11px] font-mono tracking-[3px] text-[var(--gold)] uppercase">{children}</span>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Sec({ children, dark, id, className = "" }) {
  const bg = dark ? "bg-[#0A1710]" : "bg-[#14241F]";
  return (
    <section id={id} className={`py-24 md:py-32 ${bg} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">{children}</div>
    </section>
  );
}

function FloatBadge({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring" }}
      className={`glass rounded-xl px-4 py-2.5 text-xs font-medium text-white border-gold-glow shadow-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ num, suffix, label, prefix, active, delay }) {
  const val = useCountUp(num, 1600, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="text-center md:border-r border-[rgba(255,255,255,0.05)] last:border-0 px-4"
    >
      <div className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold gold-text leading-none">
        {prefix}{val}{suffix}
      </div>
      <div className="text-[11px] font-mono text-[var(--text-muted)] mt-2 tracking-wider uppercase">{label}</div>
    </motion.div>
  );
}

function ServiceRow({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: i * 0.1 }}
    >
      <NavLink to={s.link}
        className="group flex items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(28,48,42,0.3)] hover:bg-[rgba(28,48,42,0.6)] hover:border-[rgba(201,168,76,0.2)] transition-all duration-500"
      >
        <div className="flex items-center gap-6">
          <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-[2px] hidden md:block">{s.num}</span>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[var(--gold)] shrink-0 bg-[rgba(201,168,76,0.08)]">
            {s.icon}
          </div>
          <div>
            <div className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-[var(--gold-light)] transition-colors">
              {s.title}
            </div>
            <div className="text-[var(--text-muted)] text-sm mt-0.5">{s.short}</div>
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <span className="hidden md:block text-[11px] font-mono text-[var(--text-muted)] bg-white/5 px-3 py-1.5 rounded-full">{s.range}</span>
          <div className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--gold)] group-hover:border-[rgba(201,168,76,0.4)] transition-all">
            <FaArrowUpRightFromSquare size={12} />
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
}

function CaseCard({ c, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      whileHover={{ y: -6 }}
      className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(28,48,42,0.3)] hover:border-[rgba(201,168,76,0.2)] p-7 flex flex-col gap-5 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[11px] font-mono text-[var(--gold)] uppercase tracking-[2px]">{c.industry}</div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{c.location}</div>
        </div>
        <div className="font-display text-3xl font-bold gold-text">{c.amount}</div>
      </div>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">{c.detail}</p>
      <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] grid grid-cols-3 gap-3 text-center">
        {[{ v: c.days + " Days", l: "Disbursed" }, { v: c.growth, l: "Growth" }, { v: "Zero", l: "Collateral" }].map((m) => (
          <div key={m.l}>
            <div className="font-display font-bold text-[var(--gold-light)] text-lg">{m.v}</div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-0.5">{m.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MiniForm({ form, update, onSubmit }) {
  return (
    <div className="flex flex-col gap-4">
      {[{ label: "Business Name", name: "business", ph: "Your company name" }, { label: "Mobile Number", name: "mobile", ph: "+91 XXXXX XXXXX", type: "tel" }].map((f) => (
        <div key={f.label}>
          <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest block mb-1.5">{f.label}</label>
          <input
            type={f.type || "text"}
            name={f.name}
            value={form[f.name]}
            onChange={update}
            placeholder={f.ph}
            className="w-full bg-white/[0.04] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:border-[rgba(201,168,76,0.4)] focus:outline-none transition-colors"
          />
        </div>
      ))}
      <div>
        <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest block mb-1.5">Loan Amount</label>
        <select
          name="amount"
          value={form.amount}
          onChange={update}
          className="w-full bg-[#0A1710] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2.5 text-sm text-white focus:border-[rgba(201,168,76,0.4)] focus:outline-none transition-colors"
        >
          <option value="">Select range</option>
          {["₹ 1Cr – ₹ 5Cr", "₹ 5Cr – ₹ 10Cr", "₹ 10Cr – ₹ 25Cr", "₹ 25Cr – ₹ 50Cr", "₹ 50Cr – ₹ 100Cr"].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="group relative overflow-hidden w-full text-center py-3 rounded-lg text-[#0A1710] font-bold text-sm mt-1 block"
        style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}
      >
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
        <span className="relative">Check Eligibility →</span>
      </button>
    </div>
  );
}

/* ── Data ─────────────────────────────────── */
const TICKERS = [
  "₹ 1Cr – ₹ 100Cr Unsecured Loans", "Approved in 1–3 Working Days",
  "No Collateral Required", "Zero Broker Fees",
  "Serving Tamil Nadu · Kerala · Karnataka · Pondicherry · Hyderabad",
  "Turnover-Based Eligibility", "Working Capital Finance", "Direct Lender · No Middlemen",
];

const STATS = [
  { num: 2500, suffix: "Cr+", label: "Total Disbursed", prefix: "₹" },
  { num: 3, suffix: " Days", label: "Max Approval Time", prefix: "" },
  { num: 100, suffix: "%", label: "Unsecured Funding", prefix: "" },
  { num: 5, suffix: "+", label: "States Covered", prefix: "" },
];

const COMPARE = [
  { label: "Collateral", bank: "Required", us: "None" },
  { label: "Decision Time", bank: "7–30 Days", us: "1–3 Days" },
  { label: "Documents", bank: "20+ Papers", us: "3 Only" },
  { label: "Broker Markup", bank: "2–5%", us: "0%" },
  { label: "Eligibility", bank: "Credit Score", us: "Turnover" },
  { label: "Direct Lender", bank: "Rarely", us: "Always" },
];

const SERVICES = [
  { num: "01", icon: <FaBuilding />, title: "Unsecured Business Loans", short: "No collateral. Purely turnover-based eligibility.", range: "₹ 1Cr – ₹ 100Cr", link: "/services#unsecured" },
  { num: "02", icon: <FaChartLine />, title: "Working Capital Finance", short: "Bridge cash flow gaps without touching your assets.", range: "Flexible tenure", link: "/services#working-capital" },
  { num: "03", icon: <FaIndustry />, title: "Short-Term Business Funding", short: "3–10 month loans aligned to your business cycle.", range: "Quick disbursal", link: "/services#short-term" },
];

const STEPS = [
  { n: "01", title: "Share 3 Documents", body: "Bank statements (6M) · GST returns (6M) · IT returns (2Y). Submit in 15 minutes online or in-office." },
  { n: "02", title: "In-House Evaluation", body: "Our team evaluates based on business turnover, not credit scores or property. Decision in 24–48 hours." },
  { n: "03", title: "Funds in Your Account", body: "Direct disbursal with zero deductions, zero broker cuts. Clear repayment schedule from day one." },
];

const CASES = [
  { industry: "Manufacturing", location: "Coimbatore", amount: "₹ 4 Cr", days: "3", growth: "+20%", detail: "Fulfilled a bulk export order on an urgent 3-day window that no bank could match." },
  { industry: "Trading", location: "Chennai", amount: "₹ 1.5 Cr", days: "2", growth: "+35%", detail: "Captured peak-season inventory demand with no property to pledge." },
  { industry: "IT Services", location: "Coimbatore", amount: "₹ 80L", days: "3", growth: "+30%", detail: "Bridged a delayed client payment, protecting payroll through a critical delivery phase." },
];

const ELIGIBILITY = [
  "Business operational for 2+ years",
  "Monthly turnover of ₹ 1 Crore or more",
  "Regular GST filings up to date",
  "Active bank account with clean 6-month history",
  "IT returns filed for last 2 years",
];

/* ── Page ─────────────────────────────────── */
export default function Home() {
  const heroRef   = useRef(null);
  const statsRef  = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const [miniForm, setMiniForm] = useState(() => {
    if (typeof window === "undefined") return { business: "", mobile: "", amount: "" };
    const saved = localStorage.getItem("eligibilityForm");
    return saved ? JSON.parse(saved) : { business: "", mobile: "", amount: "" };
  });

  const updateMiniForm = (e) => setMiniForm({ ...miniForm, [e.target.name]: e.target.value });
  const goToContact = () => {
    localStorage.setItem("eligibilityForm", JSON.stringify(miniForm));
    navigate("/contact", { state: { eligibility: miniForm } });
  };

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A1710]">
        <div className="absolute inset-0 bg-grid opacity-60" />

        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(ellipse,rgba(201,168,76,0.1) 0%,transparent 70%)" }} />
        </motion.div>

        <div className="absolute left-0 right-0 top-[72px] h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-20 grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-6 overflow-hidden">
              <span className="text-[11px] font-mono tracking-[3px] text-[var(--gold)] uppercase">Direct Funder · No Middlemen</span>
            </motion.div>

            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.0] tracking-tight">
              <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
                className="block text-white">Business</motion.span>
              <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.52 }}
                className="block gold-text">Capital,</motion.span>
              <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.64 }}
                className="block text-white">Delivered.</motion.span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              className="mt-6 text-[var(--text-muted)] text-base md:text-lg max-w-[500px] leading-relaxed font-light">
              Unsecured loans from <span className="text-white font-medium">₹ 1 Crore to ₹ 100 Crores</span> approved in 1–3 working days. No property pledged. No broker fees. Straight from us to your account.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
              className="mt-8 flex flex-wrap gap-4">
              <NavLink to="/contact"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[#0A1710] font-bold text-sm"
                style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C,#A07830)" }}>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
                <span className="relative">Check Eligibility Free</span>
                <FaArrowRight className="relative" size={13} />
              </NavLink>
              <a href={site.whatsappCTA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[rgba(201,168,76,0.25)] text-[var(--text-muted)] hover:text-white hover:border-[rgba(201,168,76,0.5)] transition-all duration-300 text-sm font-medium">
                <FaWhatsapp size={16} className="text-[#25D366]" />
                WhatsApp Us
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="mt-7 flex flex-wrap gap-2">
              {["No Collateral", "1–3 Day Approval", "Turnover Based", "Zero Broker Fee"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-[var(--gold)]" />{c}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — value badges */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="hidden lg:flex items-center justify-center relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-[rgba(201,168,76,0.18)]" />
            <div className="absolute w-[270px] h-[270px] rounded-full border border-[rgba(201,168,76,0.1)]" />
            <div className="absolute w-[220px] h-[220px] rounded-full"
              style={{ background: "radial-gradient(ellipse,rgba(201,168,76,0.15) 0%,transparent 70%)" }} />
            <FloatBadge className="absolute -top-4 -right-4" delay={1.4}>Approved in <b className="ml-1">1–3 Days</b></FloatBadge>
            <FloatBadge className="absolute -bottom-2 -left-8" delay={1.6}><b>₹2500Cr+</b><span className="ml-1">Disbursed</span></FloatBadge>
          </motion.div>
        </div>

        {/* TICKER */}
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section ref={statsRef} className="bg-[#0A1710] border-b border-[rgba(201,168,76,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} active={statsInView} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════ */}
      <Sec>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <Label>The Gap We Fill</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-white mb-5">
              Banks take weeks.<br /><span className="gold-text">Your orders can't.</span>
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed mb-4 text-sm">
              Every SME owner knows the moment a bulk order arrives, a payment delays, an opportunity appears with a 48-hour window. Traditional channels fail. Brokers add cost. Credit scores derail good businesses.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mb-7 text-sm">
              Prakax Fin Serv fills that gap. We're a <span className="text-white font-medium">direct lender</span>, funds disbursed without middlemen, and a team that treats your urgency as a priority.
            </p>
            <NavLink to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)] underline-gold">
              Our story <FaArrowRight size={12} />
            </NavLink>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl overflow-hidden border border-[rgba(201,168,76,0.1)] shadow-card">
              <div className="grid grid-cols-3 bg-[#0A1710] border-b border-[rgba(255,255,255,0.05)]">
                <div className="p-4 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider"></div>
                <div className="p-4 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider border-l border-[rgba(255,255,255,0.05)] text-center">Banks</div>
                <div className="p-4 text-[11px] font-mono text-[var(--gold)] uppercase tracking-wider border-l border-[rgba(201,168,76,0.15)] text-center bg-[rgba(201,168,76,0.04)]">Prakax</div>
              </div>
              {COMPARE.map((row, i) => (
                <motion.div key={row.label}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className={`grid grid-cols-3 border-b border-[rgba(255,255,255,0.04)] last:border-0 ${i % 2 === 0 ? "bg-[rgba(255,255,255,0.01)]" : ""}`}
                >
                  <div className="p-3.5 text-[13px] text-[var(--text-muted)] font-medium">{row.label}</div>
                  <div className="p-3.5 text-[13px] text-[rgba(255,255,255,0.3)] border-l border-[rgba(255,255,255,0.04)] text-center line-through decoration-red-500/50">{row.bank}</div>
                  <div className="p-3.5 text-[13px] text-[var(--gold-light)] font-semibold border-l border-[rgba(201,168,76,0.1)] text-center bg-[rgba(201,168,76,0.04)]">✓ {row.us}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Sec>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <Sec dark>
        <FadeIn className="mb-14">
          <Label>What We Offer</Label>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white">
              Three Products.<br /><span className="gold-text">One Purpose.</span>
            </h2>
            <NavLink to="/services" className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors underline-gold">
              All services <FaArrowRight size={12} />
            </NavLink>
          </div>
        </FadeIn>
        <div className="flex flex-col gap-4">
          {SERVICES.map((s, i) => <ServiceRow key={s.num} s={s} i={i} />)}
        </div>
      </Sec>

      {/* ══════════════════════════════════════
          PROCESS
      ══════════════════════════════════════ */}
      <Sec>
        <FadeIn className="mb-14 text-center">
          <Label center>Simple Process</Label>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white">
            Funded in <span className="gold-text">3 Steps</span>
          </h2>
        </FadeIn>

        <div className="max-w-2xl mx-auto relative">
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute left-[23px] top-12 bottom-12 w-px bg-gradient-to-b from-[var(--gold)] via-[rgba(201,168,76,0.3)] to-transparent origin-top" />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div key={step.n}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.15 }}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#14241F] border-2 border-[var(--gold)] flex items-center justify-center shrink-0">
                  <span className="text-[var(--gold)] font-mono text-xs font-bold">{step.n}</span>
                </div>
                <div className="pt-3">
                  <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Sec>

      {/* ══════════════════════════════════════
          ELIGIBILITY
      ══════════════════════════════════════ */}
      <section className="bg-[#0A1710] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%,rgba(201,168,76,0.07) 0%,transparent 70%)" }} />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <Label>Eligibility</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mb-6">Do You Qualify?</h2>
            <div className="flex flex-col gap-3">
              {ELIGIBILITY.map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <FaCircleCheck className="text-[var(--gold)] shrink-0" size={16} />
                  <span className="text-[var(--text-muted)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass rounded-2xl p-8 border-gold-glow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[rgba(201,168,76,0.3)]">
                  <img src="/prakax-logo.png" alt="Prakax" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Quick Eligibility Check</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">Free · No credit pull · 2-hr response</div>
                </div>
              </div>
              <MiniForm form={miniForm} update={updateMiniForm} onSubmit={goToContact} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════ */}
      <Sec id="cases">
        <FadeIn className="mb-10">
          <Label>Real Results</Label>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white">
              Funded &<br /><span className="gold-text">Delivered.</span>
            </h2>
            <NavLink to="/results" className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors underline-gold">
              All case studies <FaArrowRight size={12} />
            </NavLink>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => <CaseCard key={c.industry} c={c} i={i} />)}
        </div>
      </Sec>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A1710] py-24">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%,rgba(201,168,76,0.06) 0%,transparent 60%)" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] pointer-events-none">
          <img src="/prakax-logo.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--gold)] mx-auto mb-6" />
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-tight mb-4">
              When your business<br />needs capital<br /><span className="gold-text">every day counts.</span>
            </h2>
            <p className="text-[var(--text-muted)] mb-9 max-w-md mx-auto">
              Talk to our funding team. Free eligibility check. No obligation. Response in 2 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <NavLink to="/contact"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-lg text-[#0A1710] font-bold text-sm"
                style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                <span className="relative">Apply Now</span>
                <FaArrowRight className="relative" size={13} />
              </NavLink>
              <a href={`tel:${site.chennai.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-[rgba(201,168,76,0.25)] text-white font-semibold text-sm hover:border-[rgba(201,168,76,0.5)] transition-all">
                <FaPhone size={13} className="text-[var(--gold)]" /> {site.chennai.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
