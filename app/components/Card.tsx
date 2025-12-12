import Link from "next/link";
import React from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  href?: string;
  children?: React.ReactNode; // ✅ НЕобязательный
};

export function Card({
  title,
  subtitle,
  right,
  href,
  children,
}: CardProps) {
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      href={href as any}
      className="block rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          )}
        </div>

        {right && <div>{right}</div>}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </Wrapper>
  );
}
