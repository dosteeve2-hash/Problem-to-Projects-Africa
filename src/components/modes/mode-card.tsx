import Link from "next/link";

type ModeCardProps = {
  title: string;
  description: string;
  prompt: string;
  href: string;
};

export function ModeCard({ title, description, prompt, href }: ModeCardProps) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-[30px] border border-border bg-card p-6 shadow-[var(--shadow)] transition-transform duration-300 hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        <div className="mt-5 rounded-2xl bg-accent-soft p-4 text-sm leading-6 text-foreground">
          {prompt}
        </div>
      </div>
      <Link
        href={href}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-strong"
      >
        Continuer
      </Link>
    </article>
  );
}
