import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapLocationDot, FaArrowRight } from "react-icons/fa6";
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

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[3px] mb-2">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)] focus:border-[rgba(201,168,76,0.4)] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[var(--text-muted)] outline-none transition-all duration-200" />
    </div>
  );
}

function Select({ label, name, value, onChange, options, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[3px] mb-2">{label}</label>
      <select name={name} value={value} onChange={onChange}
        className="w-full bg-[#0A1710] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)] focus:border-[rgba(201,168,76,0.4)] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200">
        <option value="">Select</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function Contact() {
  const location = useLocation();
  const savedEligibility = location.state?.eligibility ?? (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("eligibilityForm") ?? "null") : null);
  const [form, setForm] = useState({
    name: "",
    business: savedEligibility?.business ?? "",
    mobile: savedEligibility?.mobile ?? "",
    amount: savedEligibility?.amount ?? "",
    type: "",
    message: "",
  });

  useEffect(() => {
    if (location.state?.eligibility) {
      localStorage.setItem("eligibilityForm", JSON.stringify(location.state.eligibility));
    }
  }, [location.state?.eligibility]);

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  const send = e => {
    e.preventDefault();
    const text = `Hi, I'm ${form.name || "—"} from ${form.business || "—"}. Mobile: ${form.mobile || "—"}. Loan required: ${form.amount || "—"}. Business type: ${form.type || "—"}. ${form.message}`;
    window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-32 md:pt-44 pb-16 bg-[#0A1710] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%,rgba(201,168,76,0.07) 0%,transparent 60%)" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <Label>Get in Touch</Label>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold text-white leading-tight">
              Let's get your<br /><span className="gold-text">business funded.</span>
            </h1>
            <p className="text-[var(--text-muted)] mt-4 max-w-md mx-auto">Apply for an unsecured business loan. Our team responds within 2 hours.</p>
          </FadeIn>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-16 md:py-20 bg-[#14241F]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_380px] gap-10">

          {/* FORM */}
          <FadeIn>
            <div className="glass rounded-2xl border-gold-glow p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[rgba(255,255,255,0.05)]">
                <img src="/prakax-logo.png" alt="Prakax" className="w-9 h-9 object-contain" />
                <div>
                  <div className="font-semibold text-white text-sm">Eligibility Application</div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">Free · No credit pull · 2-hr response</div>
                </div>
              </div>

              <form onSubmit={send} className="grid sm:grid-cols-2 gap-5">
                <Input label="Your Name" name="name" value={form.name} onChange={update} placeholder="Full name" />
                <Input label="Business Name" name="business" value={form.business} onChange={update} placeholder="Company name" />
                <Input label="Mobile Number" name="mobile" value={form.mobile} onChange={update} placeholder="+91 XXXXX XXXXX" type="tel" />
                <Select label="Loan Amount" name="amount" value={form.amount} onChange={update}
                  options={["₹ 50L – ₹ 1Cr","₹ 1Cr – ₹ 5Cr","₹ 5Cr – ₹ 10Cr","₹ 10Cr – ₹ 25Cr","₹ 25Cr – ₹ 50Cr"]} />
                <Select label="Business Type" name="type" value={form.type} onChange={update} className="sm:col-span-2"
                  options={["Manufacturing","Trading / Distribution","Services","Construction","Export / Import","Other"]} />
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[3px] mb-2">Message (Optional)</label>
                  <textarea name="message" value={form.message} onChange={update} rows={4}
                    placeholder="Brief description of your funding requirement"
                    className="w-full bg-white/[0.03] border border-[rgba(255,255,255,0.07)] focus:border-[rgba(201,168,76,0.4)] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[var(--text-muted)] outline-none transition-all resize-none" />
                </div>
                <button type="submit"
                  className="sm:col-span-2 group relative overflow-hidden w-full py-4 rounded-xl font-bold text-sm text-[#0A1710] mt-1 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                  <span className="relative">Send via WhatsApp</span>
                  <FaWhatsapp className="relative" size={15} />
                </button>
              </form>
            </div>
          </FadeIn>

          {/* SIDEBAR */}
          <FadeIn delay={0.15} className="flex flex-col gap-4">
            {[
              { icon: <FaPhone size={15} />, label: "Call Us", val: site.chennai.phone, href: `tel:${site.chennai.phone}` },
              { icon: <FaWhatsapp size={15} />, label: "WhatsApp", val: "Chat Instantly", href: site.whatsappCTA, target: "_blank" },
              { icon: <FaEnvelope size={15} />, label: "Admin", val: site.emails.admin, href: `mailto:${site.emails.admin}` },
              { icon: <FaEnvelope size={15} />, label: "Sales", val: site.emails.sales, href: `mailto:${site.emails.sales}` },
            ].map((c) => (
              <a key={c.val} href={c.href} target={c.target} rel={c.target ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(201,168,76,0.25)] bg-[rgba(28,48,42,0.25)] rounded-xl p-4 transition-all duration-300 group">
                <span className="w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.08)] text-[var(--gold)] flex items-center justify-center shrink-0">{c.icon}</span>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">{c.label}</div>
                  <div className="text-sm text-white font-medium group-hover:text-[var(--gold-light)] transition-colors">{c.val}</div>
                </div>
              </a>
            ))}

            {/* Office cards */}
            {[
              { tag: "Chennai HQ", address: site.chennai.address, phone: site.chennai.phone, featured: true },
              { tag: "Coimbatore Branch", address: site.coimbatore.address, phone: site.coimbatore.phone, featured: false },
            ].map((o) => (
              <div key={o.tag} className={`rounded-xl p-5 ${o.featured ? "glass border-gold-glow" : "border border-[rgba(255,255,255,0.06)] bg-[rgba(28,48,42,0.2)]"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <FaMapLocationDot size={13} className="text-[var(--gold)]" />
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${o.featured ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`}>{o.tag}</span>
                </div>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-2">{o.address}</p>
                <a href={`tel:${o.phone}`} className="text-[var(--gold)] text-xs font-semibold">{o.phone}</a>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-20 bg-[#14241F]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-[rgba(201,168,76,0.1)] h-[320px]">
              <iframe
                title="Prakax Fin Serv Chennai"
                src="https://www.google.com/maps?q=Adyar,+Chennai,+Tamil+Nadu&output=embed"
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(92%) hue-rotate(180deg) saturate(0.6)" }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
