import React from "react";
import { KpiCard, MetricRow, PageHeader, Panel, Section } from "@/components/app/kit";
import { criticalItems, maintenanceKpis, upcomingWork } from "@/data/marine";

export default function MaintenancePage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Maintenance / PMS" description="Planned maintenance across 24 vessels · 566 jobs planned this month" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {maintenanceKpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>
      <Section title="Upcoming work">
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Due & pending" padded={false}>
            <div className="p-2">{upcomingWork.map((u) => <MetricRow key={u.label} label={u.label} value={u.value} to="/app/work-orders" />)}</div>
          </Panel>
          <Panel title="Critical items & spares" padded={false}>
            <div className="p-2">{criticalItems.map((c) => <MetricRow key={c.label} label={c.label} value={c.value} tone={c.tone} to="/app/inventory" />)}</div>
          </Panel>
        </div>
      </Section>
    </div>
  );
}
