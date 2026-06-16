import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaQuoteLeft, FaArrowRight, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { site } from "../data/site";

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

const CASES = [
  { industry: "Manufacturing", location: "Coimbatore", amount: "₹ 4 Crore", days: "3", growth: "+20%", story: "A manufacturer secured working capital to fulfill a bulk export order that banks couldn't process in time. Disbursed in 3 days — project completed, turnover grew 20%." },
  { industry: "Trading", location: "Chennai", amount: "₹ 1.5 Crore", days: "2", growth: "+35%", story: "A wholesale trader with no property to pledge captured peak-season inventory demand with ₹1.5Cr. Disbursed in 2 working days." },
  { industry: "IT Services", location: "Coimbatore", amount: "₹ 80 Lakhs", days: "3", growth: "+30%", story: "An IT services firm bridged a delayed client payment to protect payroll through a critical project delivery phase." },
  { industry: "Construction", location: "Kerala", amount: "₹ 2.2 Crore", days: "3", growth: "On Time", story: "A civil contractor funded raw material procurement before a major project deadline — no collateral, clear terms, direct disbursal." },
];

const TESTIMONIALS = [
  { quote: "Prakax understood our urgency and disbursed funds within 3 days — something no bank could match. Their team made the entire process transparent from day one.", name: "Manufacturing Business Owner", loc: "Coimbatore" },
  { quote: "No collateral, no broker fees, and a decision in 48 hours. We captured a seasonal opportunity we'd otherwise have missed.", name: "Trading Company Director", loc: "Chennai" },
  { quote: "When a client payment got delayed, Prakax bridged the gap so we could pay our team on time. Genuinely felt like a growth partner, not just a lender.", name: "IT Services Founder", loc: "Coimbatore" },
];

export default function Results() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 md:pt-44 pb-16 bg-[#0A1710] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <Label>Case Studies</Label>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold text-white leading-tight">
              Real Businesses.<br /><span className="gold-text">Real Outcomes.</span>
            </h1>
            <p className="text-[var(--text-muted)] mt-4 max-w-md mx-auto">Funding results across industries and South Indian cities — from manufacturing floors to IT offices.</p>
          </FadeIn>
        </div>
      </section>

      {/* CASE GRID */}
      <section className="py-20 bg-[#14241F]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-5">
            {CASES.map((c, i) => (
              <FadeIn key={c.industry + c.location} delay={i * 0.08}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}
                  className="border border-[rgba(255,255,255,0.06)] hover:border-[rgba(201,168,76,0.2)] bg-[rgba(28,48,42,0.3)] rounded-2xl p-7 h-full flex flex-col gap-5 transition-all duration-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[11px] font-mono text-[var(--gold)] uppercase tracking-[2px]">{c.industry}</div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-0.5 font-mono">{c.location}</div>
                    </div>
                    <div className="font-display text-3xl font-bold gold-text">{c.amount}</div>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">{c.story}</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(255,255,255,0.05)] text-center">
                    {[{ val: c.days + " Days", label: "Disbursed" }, { val: c.growth, label: "Growth" }, { val: "Zero", label: "Collateral" }].map(m => (
                      <div key={m.label}>
                        <div className="font-display font-bold text-[var(--gold-light)] text-lg">{m.val}</div>
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#0A1710] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 70%)" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-14">
            <Label>What Clients Say</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white">
              Trusted by business owners<br /><span className="gold-text">across South India</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="glass rounded-2xl p-7 h-full flex flex-col border-gold-glow">
                  <FaQuoteLeft className="text-[var(--gold)] opacity-30 mb-4" size={24} />
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>
                  <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">{t.loc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-20 bg-[#14241F]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">
          <FadeIn className="mb-10">
            <Label>Follow Our Journey</Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white mb-3">
              Updates on LinkedIn & X
            </h2>
            <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto">Funding milestones, SME insights, and client success stories — live on our social pages.</p>
          </FadeIn>
          <div className="flex justify-center gap-5 flex-wrap">
            <FadeIn delay={0.1}>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.3)] rounded-2xl px-8 py-5 transition-all duration-300 glass">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center"><FaLinkedin size={20} /></div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">LinkedIn</div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">@prakax-fin-serv</div>
                </div>
                <FaArrowRight size={12} className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors ml-4" />
              </a>
            </FadeIn>
            <FadeIn delay={0.15}>
              <a href={site.social.x} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.3)] rounded-2xl px-8 py-5 transition-all duration-300 glass">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center"><FaXTwitter size={18} /></div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">X (Twitter)</div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">@FinPrakax24315</div>
                </div>
                <FaArrowRight size={12} className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors ml-4" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A1710] text-center border-t border-[rgba(201,168,76,0.05)]">
        <FadeIn className="max-w-xl mx-auto px-6">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--gold)] mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Your business could be our<br />next success story.</h2>
          <p className="text-[var(--text-muted)] mb-8 text-sm">Apply today — free eligibility check, response in 2 hours.</p>
          <NavLink to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-[#0A1710] font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#E8C96A,#C9A84C)" }}>
            Apply Now <FaArrowRight size={13} />
          </NavLink>
        </FadeIn>
      </section>
    </>
  );
}
