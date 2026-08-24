import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, ArrowRight, Droplets, Flame, Fuel, Info, ShieldAlert,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ActionButton, DataTable, EmptyState, ExportButton, KpiCard, MetricRow, PageHeader, Panel, ProgressBar, Section, StatusChip,
  healthTone,
} from "@/components/app/kit";
import {
  activityFeed, certificateStats, criticalAlerts, criticalItems, fleetSummary,
  maintenanceKpis, maintenanceTrend, procurement, upcomingWork, vessels, voyageActivities,
  workOrders,
} from "@/data/marine";

const healthDonut = [
  { name: "Operational", value: fleetSummary.operational, color: "var(--success)" },
  { name: "Under maintenance", value: fleetSummary.atRisk, color: "var(--warning)" },
  { name: "Critical", value: fleetSummary.critical, color: "var(--critical)" },
];

const severityStyles = {
  critical: { chip: "bg-critical-soft text-critical", icon: ShieldAlert },
  warning: { chip: "bg-warning-soft text-warning", icon: AlertTriangle },
  info: { chip: "bg-info-soft text-info", icon: Info },
};

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Good morning, Alex"
        description="Fleet operational overview · Oceanic Marine Group · updated 4 minutes ago"
        actions={
          <>
            <ActionButton>Last 30 days</ActionButton>
            <ExportButton label="Export report" />
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Vessels in scope" value={fleetSummary.vessels} delta="3 fleets · 2 regions" to="/app/fleet" />
        <KpiCard label="Operational" value={fleetSummary.operational} tone="healthy" delta="87.5% of fleet" to="/app/fleet" />
        <KpiCard label="At risk" value={fleetSummary.atRisk} tone="warning" delta="Maintenance backlog rising" to="/app/maintenance" />
        <KpiCard label="Critical" value={fleetSummary.critical} tone="critical" delta="MV Atlantic Pioneer" to="/app/fleet" />
      </div>

      <Section title="Fleet health">
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Vessel status distribution" className="lg:col-span-1">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={healthDonut} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2} stroke="none">
                    {healthDonut.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1">
              {healthDonut.map((d) => (
                <li key={d.name} className="flex items-center justify-between px-1 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-semibold tabular-nums">{d.value}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Health indices" className="lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { label: "Maintenance health", value: fleetSummary.maintenanceHealth, to: "/app/maintenance" },
                { label: "Certificate health", value: fleetSummary.certificateHealth, to: "/app/certificates" },
                { label: "Safety health", value: fleetSummary.safetyHealth, to: "/app/qms" },
                { label: "Procurement health", value: fleetSummary.procurementHealth, to: "/app/purchase-orders" },
              ].map((m) => (
                <Link key={m.label} to={m.to} className="group rounded-md p-2 transition-colors hover:bg-secondary">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">{m.label}</span>
                    <span className="font-display text-xl font-semibold tabular-nums">{m.value}%</span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={m.value} tone={healthTone(m.value)} />
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-ocean">
                    View detail <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section title="Critical attention required" description="Ordered by operational impact. Every item opens the filtered workspace.">
        <div className="grid gap-3 md:grid-cols-2">
          {criticalAlerts.map((a) => {
            const s = severityStyles[a.severity] || severityStyles.info;
            const Icon = s.icon;
            return (
              <Link
                key={a.id}
                to={a.to}
                className="group flex items-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-card transition-all hover:border-ocean/40 hover:shadow-raised"
              >
                <span className={`grid size-9 shrink-0 place-items-center rounded-md ${s.chip}`}>
                  <Icon className="size-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{a.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {a.vessel} · {a.meta}
                  </span>
                </span>
                <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </Section>

      <Section
        title="Maintenance command center"
        actions={<Link to="/app/maintenance" className="text-sm font-medium text-ocean hover:underline">Open PMS →</Link>}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {maintenanceKpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Planned vs completed vs overdue" className="lg:col-span-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={maintenanceTrend} margin={{ left: -18, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="planned" stroke="var(--ocean)" fill="var(--ocean)" fillOpacity={0.08} strokeWidth={2} />
                  <Area type="monotone" dataKey="completed" stroke="var(--success)" fill="var(--success)" fillOpacity={0.12} strokeWidth={2} />
                  <Area type="monotone" dataKey="overdue" stroke="var(--critical)" fill="var(--critical)" fillOpacity={0.12} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <div className="space-y-4">
            <Panel title="Upcoming work" padded={false}>
              <div className="p-2">
                {upcomingWork.map((u) => (
                  <MetricRow key={u.label} label={u.label} value={u.value} to="/app/work-orders" />
                ))}
              </div>
            </Panel>
            <Panel title="Critical items & spares" padded={false}>
              <div className="p-2">
                {criticalItems.map((c) => (
                  <MetricRow key={c.label} label={c.label} value={c.value} tone={c.tone} to="/app/inventory" />
                ))}
              </div>
            </Panel>
          </div>
        </div>
        <Panel title="Work orders requiring action" padded={false}
          action={<Link to="/app/work-orders" className="text-xs font-medium text-ocean hover:underline">View all</Link>}>
          <DataTable
            columns={["Work order", "Vessel", "Equipment", "Priority", "Status", "Due"]}
            rows={workOrders.slice(0, 5).map((w) => [
              <span key="a" className="font-medium">{w.id} · {w.title}</span>,
              w.vessel,
              <span key="c" className="text-muted-foreground">{w.equipment}</span>,
              <StatusChip key="d" status={w.priority} />,
              <StatusChip key="e" status={w.status} />,
              <span key="f" className="tabular-nums text-muted-foreground">{w.due}</span>,
            ])}
          />
        </Panel>
      </Section>

      <Section title="Voyage & remaining on board">
        <div className="grid gap-4 lg:grid-cols-3">
          {voyageActivities.map((g) => (
            <Panel key={g.group} title={g.group} padded={false}>
              <div className="p-2">
                {g.items.map((i) => (
                  <MetricRow key={i.label} label={i.label} value={i.value} to="/app/voyages" />
                ))}
              </div>
            </Panel>
          ))}
        </div>
        <Panel title="Remaining on board — MT Ocean Star">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Fuel oil", value: vessels[0]?.rob?.fuel || 72, icon: Fuel },
              { label: "Lube oil", value: vessels[0]?.rob?.lube || 58, icon: Droplets },
              { label: "Fresh water", value: vessels[0]?.rob?.water || 81, icon: Flame },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <r.icon className="size-4 text-ocean" /> {r.label}
                  </span>
                  <span className="font-display text-lg font-semibold tabular-nums">{r.value}%</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={r.value} tone={healthTone(r.value)} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Section>

      <Section title="Procurement & supply">
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Monthly spend vs budget" className="lg:col-span-2">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={procurement.spend} margin={{ left: -10, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis tickFormatter={(v) => `${v / 1000}k`} tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <Tooltip formatter={(v) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }} />
                  <Bar dataKey="budget" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spend" fill="var(--ocean)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <div className="space-y-4">
            <Panel title="Purchase requisitions" padded={false}>
              <div className="p-2">
                {procurement.requisitions.map((r) => (
                  <MetricRow key={r.label} label={r.label} value={r.value} tone={r.tone} to="/app/requisitions" />
                ))}
              </div>
            </Panel>
            <Panel title="Purchase orders & supply" padded={false}>
              <div className="p-2">
                {[...procurement.orders, ...procurement.supply].map((r) => (
                  <MetricRow key={r.label} label={r.label} value={r.value} tone={r.tone} to="/app/purchase-orders" />
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </Section>

      <Section title="Compliance, QHSE & activity">
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Certificate compliance">
            <div className="flex items-center gap-5">
              <div className="relative grid size-24 shrink-0 place-items-center rounded-full"
                style={{ background: "conic-gradient(var(--success) 0 98%, var(--secondary) 98% 100%)" }}>
                <span className="grid size-[76px] place-items-center rounded-full bg-surface font-display text-xl font-semibold">
                  98%
                </span>
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                {certificateStats.slice(0, 4).map((c) => (
                  <MetricRow key={c.label} label={c.label} value={c.value} tone={c.tone} to="/app/certificates" />
                ))}
              </div>
            </div>
          </Panel>
          <Panel title="QHSE snapshot" padded={false}>
            <div className="p-2">
              <MetricRow label="Open deviations" value={3} tone="warning" to="/app/deviations" />
              <MetricRow label="Overdue corrective actions" value={1} tone="critical" to="/app/capa" />
              <MetricRow label="Overdue preventive actions" value={1} tone="critical" to="/app/capa" />
              <MetricRow label="Investigations pending" value={3} tone="warning" to="/app/qms" />
              <MetricRow label="Drills pending review" value={1} tone="info" to="/app/drills" />
              <MetricRow label="Safety meeting action items" value={5} tone="info" to="/app/safety-meetings" />
            </div>
          </Panel>
          <Panel title="Recent activity" padded={false}>
            <ul className="divide-y divide-border">
              {activityFeed.map((a, i) => (
                <li key={i} className="px-4 py-3">
                  <p className="text-sm">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.vessel} · {a.when}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        <EmptyState
          title="No unresolved port state control detentions"
          description="All vessels cleared at last inspection. Nothing requires your attention here."
        />
      </Section>
    </div>
  );
}
