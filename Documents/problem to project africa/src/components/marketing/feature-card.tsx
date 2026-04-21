type FeatureCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function FeatureCard({ eyebrow, title, description }: FeatureCardProps) {
  return (
    <article className="rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
    </article>
  );
}
