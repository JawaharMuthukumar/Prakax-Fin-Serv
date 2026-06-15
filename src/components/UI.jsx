import { Link } from "react-router-dom";

export function SectionTag({ children, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-gold-light bg-gold/10 px-3.5 py-1.5 rounded-full mb-4 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
      {children}
    </div>
  );
}

export function GoldButton({ to, href, children, className = "", ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-br from-gold-light to-gold text-matte-deep font-semibold text-sm shadow-glow hover:shadow-[0_0_50px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 transition-all duration-300 ${className}`;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <Link to={to} className={cls} {...rest}>{children}</Link>;
}

export function OutlineButton({ to, href, children, className = "", ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-stone-100 font-semibold text-sm hover:border-gold hover:text-gold-light transition-all duration-300 ${className}`;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <Link to={to} className={cls} {...rest}>{children}</Link>;
}

export function DarkButton({ to, href, children, className = "", ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-matte-mid border border-white/10 text-stone-100 font-semibold text-sm hover:bg-matte-light transition-all duration-300 ${className}`;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <Link to={to} className={cls} {...rest}>{children}</Link>;
}
