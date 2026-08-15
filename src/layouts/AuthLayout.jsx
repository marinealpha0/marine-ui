import React from "react";
import { Ship, Check } from "lucide-react";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2 bg-background font-sans text-foreground">
      {/* LEFT SIDE: MARITIME TACTICAL DARK PANEL WITH BLUE CHECK LINES */}
      <div className="hidden flex-col justify-between bg-navy p-10 text-navy-foreground grid-noise lg:flex select-none relative overflow-hidden">
        {/* Subtle top-right blue ambient glow */}
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center gap-2.5 relative z-10">
          <span className="grid size-9 place-items-center rounded-lg bg-cyan/15 text-cyan border border-cyan/20 shadow-sm">
            <Ship className="size-5" />
          </span>
          <span className="font-display font-semibold text-xl text-navy-foreground tracking-tight">
            Meridian<span className="text-cyan">OPS</span>
          </span>
        </div>

        {/* Hero Copy & Blue Check Line Features */}
        <div className="my-auto py-8 space-y-6 relative z-10">
          <div>
            <h1 className="max-w-md font-display text-3xl sm:text-4xl leading-tight font-semibold text-navy-foreground tracking-tight">
              One operational command center for your entire fleet.
            </h1>
            <p className="mt-3 max-w-md text-sm sm:text-base text-navy-muted leading-relaxed">
              Maintenance, procurement, compliance and QHSE for vessels — in a single, auditable system of record.
            </p>
          </div>

          {/* Blue Check Line Feature Highlights */}
          <ul className="space-y-3 pt-2">
            <li className="flex items-center gap-3 text-sm text-navy-foreground font-medium">
              <span className="grid size-5 place-items-center rounded-full bg-cyan/20 text-cyan shrink-0 border border-cyan/30">
                <Check className="size-3.5 stroke-[2.5]" />
              </span>
              <span>Real-time vessel tracking &amp; maintenance scheduling</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-navy-foreground font-medium">
              <span className="grid size-5 place-items-center rounded-full bg-cyan/20 text-cyan shrink-0 border border-cyan/30">
                <Check className="size-3.5 stroke-[2.5]" />
              </span>
              <span>Streamlined maritime procurement &amp; inventory control</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-navy-foreground font-medium">
              <span className="grid size-5 place-items-center rounded-full bg-cyan/20 text-cyan shrink-0 border border-cyan/30">
                <Check className="size-3.5 stroke-[2.5]" />
              </span>
              <span>Automated ISM &amp; QHSE compliance auditing</span>
            </li>
          </ul>
        </div>

        {/* Security Badges with Blue Check Indicators */}
        <div className="pt-6 border-t border-cyan/15 flex flex-wrap items-center gap-4 text-xs font-medium text-navy-muted relative z-10">
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-cyan stroke-[2.5]" /> SOC 2 aligned
          </span>
          <span className="text-cyan/30">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-cyan stroke-[2.5]" /> Tenant isolation
          </span>
          <span className="text-cyan/30">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-cyan stroke-[2.5]" /> Role-based access
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: CLEAN FORM PANEL */}
      <div className="flex items-center justify-center p-6 sm:p-10 relative bg-background">
        <div className="w-full max-w-sm space-y-5">
          {/* Mobile Brand Header */}
          <div className="flex items-center gap-2 lg:hidden mb-2">
            <span className="grid size-8 place-items-center rounded-md bg-cyan/15 text-cyan">
              <Ship className="size-4.5" />
            </span>
            <span className="font-display font-semibold text-foreground">
              Meridian<span className="text-ocean">OPS</span>
            </span>
          </div>

          {title && (
            <div>
              <h2 className="text-2xl font-semibold font-display text-foreground tracking-tight">{title}</h2>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}

          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
