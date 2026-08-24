import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { fleets, organizations } from "@/data/marine";

export default function SelectOrganizationPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 bg-background min-h-dvh">
      <h1 className="text-2xl font-semibold">Select your organization</h1>
      <p className="mt-1 text-sm text-muted-foreground">You have access to {organizations.length} tenants.</p>
      <ul className="mt-6 space-y-3">
        {organizations.map((o) => (
          <li key={o.id}>
            <Link to="/app" className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 shadow-card hover:border-ocean/40 hover:shadow-raised">
              <span className="min-w-0">
                <span className="block font-semibold">{o.name}</span>
                <span className="block text-xs text-muted-foreground">{o.vessels} vessels · {o.plan} plan</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 text-sm font-semibold tracking-wide text-muted-foreground uppercase">Fleets</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {fleets.map((f) => (
          <Link key={f.id} to="/app" className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:bg-secondary">
            {f.name} · {f.count}
          </Link>
        ))}
      </div>
    </main>
  );
}
