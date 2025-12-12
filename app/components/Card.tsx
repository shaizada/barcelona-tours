import Link from "next/link";

export function Card({
  title,
  subtitle,
  right,
  href,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
}) {
  const Body = (
    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 shadow-sm hover:shadow-md transition p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          {subtitle ? <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{subtitle}</p> : null}
        </div>
        {right}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );

  return href ? <Link href={href}>{Body}</Link> : Body;
}
