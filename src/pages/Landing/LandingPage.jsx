import React from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  BarChart3,
  Boxes,
  Building2,
  Check,
  Gauge,
  Layers,
  Lock,
  Package,
  Route as RouteIcon,
  ShieldCheck,
  Ship,
  Wrench,
} from "@/assets/icons";

const modules = [
  { icon: Ship, name: "Fleet Management", copy: "Live vessel status, position and health across every fleet." },
  { icon: Wrench, name: "Maintenance & PMS", copy: "Planned, corrective and statutory jobs with full traceability." },
  { icon: Package, name: "Procurement", copy: "Requisitions → approvals → purchase orders → receipts." },
  { icon: Boxes, name: "Inventory", copy: "Criticality-aware spares with minimum-level enforcement." },
  { icon: RouteIcon, name: "Voyage Management", copy: "Journals, booking reports and remaining on board." },
  { icon: ShieldCheck, name: "Compliance", copy: "Certificates, surveys and inspections that never lapse." },
  { icon: Anchor, name: "QHSE", copy: "Incidents, deviations, risk, corrective and preventive actions." },
  { icon: BarChart3, name: "Analytics", copy: "Operational data turned into decisions your board trusts." },
];

const problems = [
  "Scattered maintenance data",
  "Missed certificate deadlines",
  "Manual approval chains",
  "Poor fleet-wide visibility",
  "Procurement delays",
  "Slow, manual reporting",
];

export default function Landing() {
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased selection:bg-cyan selection:text-navy">
      {/* Navigation Header matching image exact */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1728] text-white backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo + Navigation Links */}
          <div className="flex items-center gap-8 md:gap-10">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="grid size-8 place-items-center rounded-lg bg-[#14324D] border border-cyan/20 text-cyan group-hover:scale-105 transition-transform">
                <Anchor className="size-4.5" />
              </span>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                Nauticore
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
              <a href="#platform" className="hover:text-white transition-colors">
                Platform
              </a>
              <a href="#modules" className="hover:text-white transition-colors">
                Modules
              </a>
              <a href="#architecture" className="hover:text-white transition-colors">
                Architecture
              </a>
              <a href="#security" className="hover:text-white transition-colors">
                Security
              </a>
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/select-organization"
              className="rounded-lg bg-[#38BDF8] px-4 py-2 text-sm font-semibold text-[#0B1728] hover:bg-[#38BDF8]/90 transition-colors shadow-sm"
            >
              Explore platform
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="platform" className="relative overflow-hidden bg-[#0B1728] text-navy-foreground">
        <div className="absolute inset-0 grid-noise opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(14,165,233,0.25),transparent_60%)] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan uppercase">
            Marine engineering management
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl tracking-tight">
            Manage your fleet. Maintain your vessels. Stay compliant. Operate with confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-navy-muted sm:text-lg leading-relaxed">
            A modern marine engineering management platform built for vessel operators, ship management
            companies and maritime engineering teams.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/login"
              className="rounded-md bg-cyan px-6 py-3 text-sm font-bold text-[#0B1728] hover:bg-cyan/90 transition-all shadow-md"
            >
              Book a demo
            </Link>
            <Link
              to="/select-organization"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore platform
            </Link>
          </div>

          <div className="mt-14 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur shadow-2xl">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Fleet health", "87%"],
                ["Certificate compliance", "98%"],
                ["Overdue work orders", "118"],
                ["Open deviations", "3"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg border border-white/10 bg-[#0B1728]/70 p-4">
                  <p className="text-xs text-navy-muted font-medium">{l}</p>
                  <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-[#0B1728]/70 p-4 lg:col-span-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-navy-muted font-medium">Fleet positions</p>
                  <span className="text-[11px] text-cyan font-mono">12 Vessels Active</span>
                </div>
                <div className="mt-4 flex h-32 items-end gap-2">
                  {[42, 61, 55, 78, 66, 84, 72, 90, 68, 76, 88, 94].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-ocean/40 to-cyan hover:opacity-100 transition-opacity"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0B1728]/70 p-4">
                <p className="text-xs text-navy-muted font-medium">Critical alerts</p>
                <ul className="mt-3.5 space-y-2.5 text-sm">
                  <li className="flex items-center gap-2.5 text-white/90">
                    <span className="size-2 shrink-0 rounded-full bg-critical animate-pulse" />
                    8 overdue work orders
                  </li>
                  <li className="flex items-center gap-2.5 text-white/90">
                    <span className="size-2 shrink-0 rounded-full bg-warning" />
                    3 certificates expiring
                  </li>
                  <li className="flex items-center gap-2.5 text-white/90">
                    <span className="size-2 shrink-0 rounded-full bg-warning" />
                    146 spares below minimum
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed For Section */}
      <section className="border-b border-border bg-surface py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Designed for
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-foreground/80">
            {[
              "Ship management companies",
              "Fleet operators",
              "Marine engineering teams",
              "Offshore operators",
              "Technical managers",
              "QHSE teams",
            ].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-ocean" />
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Your fleet shouldn't be managed across spreadsheets, emails and disconnected systems.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p}
              className="rounded-lg border border-border bg-surface p-5 text-sm font-medium shadow-sm hover:border-ocean/40 transition-colors"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="border-y border-border bg-surface-sunken py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            One operational command center for your fleet.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground text-base">
            Every module shares one data model, one permission system and one audit trail.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <div
                key={m.name}
                className="rounded-lg border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <span className="grid size-10 place-items-center rounded-md bg-accent text-ocean group-hover:bg-ocean group-hover:text-white transition-colors">
                  <m.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{m.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture & Security Section */}
      <section id="architecture" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for organizations with fleets of any size.
            </h2>
            <p className="mt-3 text-muted-foreground text-base">
              Strict tenant isolation with an operating hierarchy that matches how marine organizations actually work.
            </p>
            <ol className="mt-8 space-y-3">
              {[
                { icon: Building2, l: "Organization / tenant" },
                { icon: Layers, l: "Fleet" },
                { icon: Ship, l: "Vessel" },
                { icon: Gauge, l: "Departments & teams" },
                { icon: Wrench, l: "Operations, maintenance, procurement, QHSE" },
              ].map((s) => (
                <li
                  key={s.l}
                  className="flex items-center gap-3.5 rounded-md border border-border bg-surface p-3.5 text-sm font-medium shadow-sm"
                >
                  <s.icon className="size-4.5 shrink-0 text-ocean" />
                  {s.l}
                </li>
              ))}
            </ol>
          </div>
          <div id="security" className="rounded-xl border border-border bg-surface p-7 shadow-sm">
            <span className="grid size-10 place-items-center rounded-md bg-accent text-ocean">
              <Lock className="size-5" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-foreground">Security & governance</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Role-based access control",
                "Department and vessel scoping",
                "Immutable audit trails",
                "Tenant isolation by design",
                "SAML SSO and MFA",
                "Granular permission management",
              ].map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <Check className="size-4 shrink-0 text-success" />
                  <span className="font-medium text-foreground/90">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="font-semibold text-foreground">Integration ready:</strong> ERP &bull; Accounting &bull; Email &bull; IoT &bull; AIS &bull; Weather &bull; Document management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Hero Section */}
      <section className="bg-[#0B1728] py-20 text-navy-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl tracking-tight">
            Bring your entire fleet into one operational command center.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              to="/login"
              className="rounded-md bg-cyan px-6 py-3 text-sm font-bold text-[#0B1728] hover:bg-cyan/90 transition-colors shadow-md"
            >
              Book a demo
            </Link>
            <Link
              to="/select-organization"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Explore platform
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <Anchor className="size-4 text-ocean" />
            <span>&copy; 2026 Nauticore</span>
          </div>
          <span>Marine engineering management platform</span>
        </div>
      </footer>
    </div>
  );
}
