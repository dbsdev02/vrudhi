export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: { eyebrow?: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="divider-ornament text-[10px] tracking-[0.4em] uppercase mb-5">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-foreground leading-[1.05]">{title}</h2>
      {subtitle && <p className="mt-5 text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
