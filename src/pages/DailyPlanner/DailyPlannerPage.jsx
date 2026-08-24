import React from "react";
import { PageHeader, StatusChip } from "@/components/app/kit";
import { dailyPlan } from "@/data/marine";

export default function DailyPlannerPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Daily work planner" description="Monday 10 August 2026 · 5 vessels reporting" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dailyPlan.map((col) => (
          <div key={col.status} className="rounded-lg border border-border bg-surface-sunken p-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">{col.status}</h2>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium tabular-nums">{col.tasks.length}</span>
            </div>
            <ul className="space-y-2">
              {col.tasks.map((t) => (
                <li key={t.id} className="rounded-md border border-border bg-surface p-3 shadow-card">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.vessel} · {t.assignee} · {t.hours} h</p>
                  <div className="mt-2"><StatusChip status={t.priority} /></div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
