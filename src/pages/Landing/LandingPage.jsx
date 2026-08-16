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
    <div className="min-h-dvh bg-[#070F1B] text-foreground antialiased selection:bg-cyan selection:text-navy">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1728]/90 text-white backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo + Navigation Links */}
          <div className="flex items-center gap-8 md:gap-10">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="grid size-9 place-items-center rounded-lg bg-cyan/15 border border-cyan/30 text-cyan group-hover:scale-105 transition-transform shadow-sm">
                <Anchor className="size-5" />
              </span>
              <span className="font-display font-bold text-xl tracking-tight text-white">
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
          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/select-organization"
              className="rounded-lg bg-cyan px-4 py-2 text-sm font-semibold text-[#0B1728] hover:bg-cyan/90 transition-colors shadow-sm"
            >
              Explore platform
            </Link>
          </div>
        </div>
      </header>

      {/* STUNNING 2-COLUMN HERO SECTION MATCHING SCREENSHOT EXACTLY */}
      <section id="platform" className="relative overflow-hidden bg-[#070F1B] pt-12 pb-20 lg:pt-16 lg:pb-28 text-white">
        {/* Background Tactical Radar Grid Noise & Ambient Gradient Glows */}
        <div className="absolute inset-0 grid-noise opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -left-32 size-[500px] rounded-full bg-cyan/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 size-[500px] rounded-full bg-ocean/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            {/* LEFT COLUMN: BADGE, HEADLINE, DESCRIPTION & BUTTONS */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1.5 text-xs font-medium text-cyan backdrop-blur-md shadow-sm">
                <Anchor className="size-3.5" />
                <span>Built for ship management &amp; vessel operators</span>
              </div>

              {/* Bold Gradient Headline matching exact text from image */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
                Manage your fleet.<br />
                Maintain your vessels.<br />
                <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                  Operate with confidence.
                </span>
              </h1>

              {/* Subheading Copy matching exact text */}
              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
                A modern marine engineering management platform for vessel operators, ship management companies and maritime engineering teams &mdash; maintenance, procurement, compliance and QHSE in one command center.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/login"
                  className="rounded-lg bg-[#2DD4BF] px-6 py-3.5 text-sm font-bold text-[#0B1728] hover:bg-[#2DD4BF]/90 transition-all shadow-lg shadow-teal-500/20"
                >
                  Book a demo
                </Link>
                <Link
                  to="/select-organization"
                  className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  Explore platform
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-TECH COMMAND CENTER WINDOW MOCKUP */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-cyan/20 bg-[#0F2338]/90 p-5 backdrop-blur-xl shadow-2xl shadow-cyan/10">

                {/* Mac Window Title Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-400 flex items-center gap-2">
                    <span>Fleet operational overview — Oceanic Marine Group</span>
                  </div>
                  <div className="size-4" /> {/* Spacer */}
                </div>

                {/* Top Stat Cards Row (3 Columns) */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {/* Stat 1: Vessels */}
                  <div className="rounded-xl border border-white/10 bg-[#0B1728]/80 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">VESSELS</p>
                    <p className="mt-1.5 font-display text-3xl font-extrabold text-white">24</p>
                  </div>
                  {/* Stat 2: Operational */}
                  <div className="rounded-xl border border-white/10 bg-[#0B1728]/80 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">OPERATIONAL</p>
                    <p className="mt-1.5 font-display text-3xl font-extrabold text-emerald-400">21</p>
                  </div>
                  {/* Stat 3: Critical */}
                  <div className="rounded-xl border border-white/10 bg-[#0B1728]/80 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">CRITICAL</p>
                    <p className="mt-1.5 font-display text-3xl font-extrabold text-red-500">1</p>
                  </div>
                </div>

                {/* Bottom Split Row (Chart + Critical Attention Table) */}
                <div className="grid gap-3 md:grid-cols-2">
                  {/* Left: Maintenance completion vs plan Bar Chart */}
                  <div className="rounded-xl border border-white/10 bg-[#0B1728]/80 p-4 flex flex-col justify-between">
                    <p className="text-xs font-medium text-slate-300">Maintenance completion vs plan</p>

                    {/* Animated Bar Chart Bars */}
                    <div className="mt-5 flex h-28 items-end gap-2 px-1">
                      {[45, 62, 55, 78, 68, 88, 72].map((height, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                          <span
                            className="w-full rounded-t bg-gradient-to-t from-teal-500/40 via-teal-400 to-cyan-400 group-hover:brightness-125 transition-all duration-300"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Critical Attention Items List */}
                  <div className="rounded-xl border border-white/10 bg-[#0B1728]/80 p-4">
                    <p className="text-xs font-medium text-slate-300 mb-3">Critical attention</p>

                    <div className="space-y-2 text-xs">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                        <span className="text-slate-300 font-medium">Overdue work orders</span>
                        <span className="font-bold text-red-400 font-mono">118</span>
                      </div>
                      {/* Row 2 */}
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                        <span className="text-slate-300 font-medium">Certificates expiring</span>
                        <span className="font-bold text-amber-400 font-mono">4</span>
                      </div>
                      {/* Row 3 */}
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                        <span className="text-slate-300 font-medium">Spares below minimum</span>
                        <span className="font-bold text-amber-400 font-mono">8</span>
                      </div>
                      {/* Row 4 */}
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                        <span className="text-slate-300 font-medium">Open deviations</span>
                        <span className="font-bold text-cyan-400 font-mono">4</span>
                      </div>
                    </div>
                  </div>
                </div>

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
