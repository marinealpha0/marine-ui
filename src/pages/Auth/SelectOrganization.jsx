import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Building2, Ship } from "lucide-react";

const mockOrganizations = [
  { id: "org_1", name: "Oceanic Marine Systems", vessels: 24, plan: "Enterprise" },
  { id: "org_2", name: "Atlantic Tankers Ltd", vessels: 12, plan: "Pro" },
  { id: "org_3", name: "Pacific Cargo Operations", vessels: 8, plan: "Standard" },
];

const mockFleets = [
  { id: "fl_1", name: "LNG Carriers", count: 6 },
  { id: "fl_2", name: "VLCC Fleet", count: 10 },
  { id: "fl_3", name: "Container Ships", count: 8 },
];

const SelectOrganization = () => {
  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      {/* Navigation Top Header */}
      <header className="border-b border-border bg-surface px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-navy text-cyan">
              <Ship className="size-4.5" />
            </span>
            <span className="font-display font-semibold text-foreground">
              Meridian<span className="text-cyan">OPS</span>
            </span>
          </div>
          <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground">
            Sign out
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
          Select your organization
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          You have access to {mockOrganizations.length} operational tenants.
        </p>

        <ul className="mt-6 space-y-3">
          {mockOrganizations.map((o) => (
            <li key={o.id}>
              <Link
                to="/"
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 shadow-card hover:border-ocean/40 hover:shadow-raised transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="grid size-10 place-items-center rounded-md bg-surface-sunken border border-border group-hover:border-ocean/30 text-ocean">
                    <Building2 className="size-5" />
                  </div>
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground group-hover:text-ocean transition-colors">
                      {o.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {o.vessels} vessels &bull; {o.plan} plan
                    </span>
                  </span>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-ocean transition-colors" />
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Available Fleets
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {mockFleets.map((f) => (
            <Link
              key={f.id}
              to="/"
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              {f.name} &bull; <span className="font-semibold text-ocean">{f.count}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SelectOrganization;
