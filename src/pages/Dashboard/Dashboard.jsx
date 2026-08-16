import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertOctagon, AlertTriangle, ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight,
  Clock, Compass, Droplets, FileText, Flame, Fuel, Info, LifeBuoy,
  LineChart as LineIcon, Package, ShieldAlert, ShieldCheck, Ship,
  ShoppingCart, SlidersHorizontal, Truck, Users, Wrench, Bell
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ActionButton, DataTable, EmptyState, ExportButton, KpiCard, KpiSparkline, MetricRow, PageHeader, Panel, ProgressBar, Section, StatusChip,
  healthTone,
} from "@/components/app/kit";
import {
  activityFeed, certificateStats, criticalAlerts, criticalItems, fleetSummary,
  maintenanceKpis, maintenanceTrend, procurement, upcomingWork, vessels, voyageActivities,
  workOrders,
} from "@/data/marine";

const healthDonut = [
  { name: "Operational", value: 21, color: "var(--success)" },
  { name: "Under maintenance", value: 2, color: "var(--warning)" },
  { name: "Critical", value: 1, color: "var(--critical)" },
];

const severityStyles = {
  critical: { chip: "bg-critical-soft text-critical border-critical/20", icon: ShieldAlert },
  warning: { chip: "bg-warning-soft text-warning border-warning/30", icon: AlertTriangle },
  info: { chip: "bg-info-soft text-info border-info/20", icon: Info },
};

const criticalAttentionItems = [
  { id: 1, severity: "critical", title: "Overdue work orders", detail: "14 work orders overdue", badge: "14", to: "/app/work-orders" },
  { id: 2, severity: "warning", title: "Certificates expiring within 30 days", detail: "2 certificates", badge: "2", to: "/app/certificates" },
  { id: 3, severity: "critical", title: "Critical equipment breakdown", detail: "MV Atlantic Pioneer", badge: "1", to: "/app/equipment" },
  { id: 4, severity: "warning", title: "Pending defect reports", detail: "9 open defects", badge: "9", to: "/app/qms" },
  { id: 5, severity: "warning", title: "Critical spares below min stock level", detail: "M/E Exhaust Valve", badge: "4", to: "/app/inventory" },
  { id: 6, severity: "info", title: "Pending MOC approvals", detail: "2 MOCs pending review", badge: "2", to: "/app/qms" },
];

const maintenanceKpiGrid = [
  {
    label: "Overdue Work Orders",
    value: 118,
    delta: "+12% vs last month",
    tone: "critical",
    icon: Wrench,
    trend: "up",
    trendValue: "+12%",
    pulse: true,
    sparklineData: [92, 98, 104, 110, 115, 118],
    to: "/app/work-orders",
  },
  {
    label: "Critical WOs Overdue",
    value: 14,
    delta: "Requires immediate action",
    tone: "critical",
    icon: ShieldAlert,
    trend: "down",
    trendValue: "Urgent",
    pulse: true,
    sparklineData: [8, 10, 9, 12, 13, 14],
    to: "/app/work-orders",
  },
  {
    label: "WOs Awaiting Approval",
    value: 22,
    delta: "Due within 48 hours",
    tone: "warning",
    icon: FileText,
    trend: "neutral",
    trendValue: "Pending",
    sparklineData: [18, 19, 21, 20, 24, 22],
    to: "/app/work-orders",
  },
  {
    label: "My Tasks",
    value: 96,
    delta: "Assigned to your team",
    tone: "info",
    icon: CheckCircle2,
    trend: "up",
    trendValue: "Active",
    sparklineData: [70, 78, 85, 89, 92, 96],
    to: "/app/work-orders",
  },
  {
    label: "Due in 30 Days",
    value: 666,
    delta: "Planned maintenance jobs",
    tone: "neutral",
    icon: Clock,
    trend: "neutral",
    trendValue: "Planned",
    sparklineData: [620, 635, 640, 652, 660, 666],
    to: "/app/work-orders",
  },
  {
    label: "Defects & Off-Specs",
    value: 9,
    delta: "7 pending Chief Engineer signoff",
    tone: "warning",
    icon: AlertTriangle,
    trend: "down",
    trendValue: "9 Open",
    sparklineData: [12, 11, 14, 10, 9, 9],
    to: "/app/work-orders",
  },
];

const qhseTelemetryGrid = [
  {
    label: "Open Incidents",
    value: 3,
    delta: "1 High severity on MV Atlantic Pioneer",
    tone: "critical",
    icon: ShieldAlert,
    status: "3 Open",
    to: "/app/qms",
  },
  {
    label: "Near Miss Reports",
    value: 14,
    delta: "Assigned for safety review",
    tone: "warning",
    icon: AlertTriangle,
    status: "Review",
    to: "/app/qms",
  },
  {
    label: "Pending MOC Approvals",
    value: 2,
    delta: "2 MOCs awaiting Master signoff",
    tone: "warning",
    icon: FileText,
    status: "Pending",
    to: "/app/qms",
  },
  {
    label: "Risk Assessments Due",
    value: 5,
    delta: "Annual vessel risk reviews",
    tone: "info",
    icon: Compass,
    status: "Planned",
    to: "/app/qms",
  },
  {
    label: "ISM / Audit Deviations",
    value: 1,
    delta: "Internal ISM audit finding",
    tone: "critical",
    icon: AlertOctagon,
    status: "1 Non-Conform",
    to: "/app/qms",
  },
  {
    label: "Safety Drills Completed",
    value: 18,
    delta: "100% compliance Q3",
    tone: "healthy",
    icon: ShieldCheck,
    status: "Compliant",
    to: "/app/qms",
  },
];

const workOrdersActionList = [
  { id: "WO-24118", title: "Main engine fuel injection valve overhaul", vessel: "MV Pacific Endeavour", due: "Due 28 Jul 2026", priority: "Overdue", tone: "critical" },
  { id: "WO-24196", title: "Auxiliary engine #2 turbocharger replacement", vessel: "MT Ocean Star", due: "Due 11 Aug 2026", priority: "In Progress", tone: "info" },
  { id: "WO-24204", title: "Purifier No. 1 bowl cleaning & bearing check", vessel: "MV Baltic Trader", due: "Due 15 Aug 2026", priority: "Open", tone: "neutral" },
  { id: "WO-24221", title: "Emergency fire pump annual performance test", vessel: "MV Atlantic Pioneer", due: "Due 18 Aug 2026", priority: "Awaiting Approval", tone: "warning" },
  { id: "WO-24240", title: "Ballast water treatment UV lamp replacement", vessel: "MV Coral Navigator", due: "Due 21 Aug 2026", priority: "Open", tone: "neutral" },
];

const certificateAlertStrips = [
  { name: "International Oil Pollution Prevention", detail: "MV Pacific Endeavour · Expiring in 18 days", status: "Expiring Soon", tone: "warning" },
  { name: "Cargo Gear Safety Equipment", detail: "MT Ocean Star · Expiring in 24 days", status: "Expiring Soon", tone: "warning" },
  { name: "ISPS Ship Security Certificate", detail: "MV Baltic Trader · Survey Due", status: "Survey Due", tone: "critical" },
];

const vesselQuickList = [
  { name: "MV Pacific Endeavour", imo: "IMO 9842103", type: "Bulk Carrier", location: "Shanghai", status: "Operational", tone: "healthy" },
  { name: "MT Ocean Star", imo: "IMO 9765432", type: "Crude Tanker", location: "Rotterdam", status: "Under Maintenance", tone: "warning" },
  { name: "MV Baltic Trader", imo: "IMO 9654321", type: "Container Ship", location: "Singapore", status: "Operational", tone: "healthy" },
  { name: "MV Atlantic Pioneer", imo: "IMO 9543210", type: "Bulk Carrier", location: "Port Klang", status: "Critical", tone: "critical" },
  { name: "MV Coral Navigator", imo: "IMO 9432109", type: "LNG Carrier", location: "Yokohama", status: "Operational", tone: "healthy" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto bg-background text-foreground font-sans">
      
      {/* Subheader / Page Header */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
          OCEANIC MARINE GROUP · ALL VESSELS
        </div>
        <PageHeader
          title="Good morning, Alex"
          description="Fleet operational overview for the last 30 days. Showing real-time health, status and alert signals."
          actions={
            <>
              <ActionButton>Last 30 days</ActionButton>
              <ExportButton label="Export report" />
            </>
          }
        />
      </div>

      {/* Row 1: 4 Top Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Vessels in scope"
          value={24}
          icon={Ship}
          trend="up"
          trendValue="+2 Q3"
          sparklineData={[20, 21, 21, 22, 23, 24]}
          tone="info"
          delta="3 fleets · 2 regions"
          to="/app/fleet"
        />
        <KpiCard
          label="Operational"
          value={21}
          icon={ShieldCheck}
          trend="up"
          trendValue="87.5%"
          sparklineData={[18, 19, 20, 20, 21, 21]}
          tone="healthy"
          progress={87.5}
          delta="87.5% of active fleet"
          to="/app/fleet"
        />
        <KpiCard
          label="At risk"
          value={2}
          icon={AlertTriangle}
          trend="down"
          trendValue="+1 backlog"
          sparklineData={[1, 1, 2, 1, 2, 2]}
          tone="warning"
          pulse
          delta="Maintenance backlog rising"
          to="/app/maintenance"
        />
        <KpiCard
          label="Critical"
          value={1}
          icon={ShieldAlert}
          trend="down"
          trendValue="Urgent"
          sparklineData={[0, 0, 1, 0, 1, 1]}
          tone="critical"
          pulse
          delta="MV Atlantic Pioneer"
          to="/app/fleet"
        />
      </div>

      {/* Row 2: Fleet Health (Left 7) vs Critical Attention Required (Right 5) */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Left: Fleet Health */}
        <Panel
          title="Fleet health"
          subtitle="Composite score from maintenance, compliance and safety signals"
          action={
            <Link to="/app/fleet" className="flex items-center gap-1 text-xs font-semibold text-ocean hover:underline">
              Fleet view <ArrowUpRight className="size-3.5" />
            </Link>
          }
          className="lg:col-span-7"
        >
          <div className="space-y-4">
            {/* Top Section: Donut Ring on Left + Vertical Legend on Right */}
            <div className="flex flex-col sm:flex-row items-center justify-start gap-8">
              {/* Donut Ring with Center Text */}
              <div className="relative size-40 shrink-0 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthDonut}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={68}
                      paddingAngle={2}
                      stroke="none"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {healthDonut.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-3xl font-bold tracking-tight text-foreground">87%</span>
                  <span className="text-[11px] text-muted-foreground font-medium">Fleet health</span>
                </div>
              </div>

              {/* Vertical Legend Items with Right-Aligned Numbers */}
              <div className="space-y-2.5 min-w-[200px] text-xs">
                <div className="flex items-center justify-between gap-6">
                  <span className="flex items-center gap-2 text-muted-foreground font-medium">
                    <span className="size-2 rounded-full bg-success" />
                    Operational
                  </span>
                  <span className="font-bold text-foreground tabular-nums">21</span>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <span className="flex items-center gap-2 text-muted-foreground font-medium">
                    <span className="size-2 rounded-full bg-warning" />
                    Under maintenance
                  </span>
                  <span className="font-bold text-foreground tabular-nums">2</span>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <span className="flex items-center gap-2 text-muted-foreground font-medium">
                    <span className="size-2 rounded-full bg-critical" />
                    Critical
                  </span>
                  <span className="font-bold text-foreground tabular-nums">1</span>
                </div>
              </div>
            </div>

            {/* Bottom Section: 4 Health Cards Grid below */}
            <div className="pt-3 border-t border-border/60 grid gap-3 sm:grid-cols-2">
              {/* Maintenance Health */}
              <div className="rounded-xl border border-border/80 bg-surface/40 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Maintenance Health</span>
                  <span className="font-display text-sm font-bold text-foreground">86%</span>
                </div>
                <ProgressBar value={86} tone="healthy" />
                <span className="block text-[11px] text-muted-foreground font-normal">-3 pts vs last month</span>
              </div>

              {/* Certificate Health */}
              <div className="rounded-xl border border-border/80 bg-surface/40 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Certificate Health</span>
                  <span className="font-display text-sm font-bold text-foreground">94%</span>
                </div>
                <ProgressBar value={94} tone="healthy" />
                <span className="block text-[11px] text-muted-foreground font-normal">+2 pts vs last month</span>
              </div>

              {/* Safety Health */}
              <div className="rounded-xl border border-border/80 bg-surface/40 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Safety Health</span>
                  <span className="font-display text-sm font-bold text-foreground">91%</span>
                </div>
                <ProgressBar value={91} tone="healthy" />
                <span className="block text-[11px] text-muted-foreground font-normal">+1 pts vs last month</span>
              </div>

              {/* Procurement Health */}
              <div className="rounded-xl border border-border/80 bg-surface/40 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Procurement Health</span>
                  <span className="font-display text-sm font-bold text-foreground">78%</span>
                </div>
                <ProgressBar value={78} tone="warning" />
                <span className="block text-[11px] text-muted-foreground font-normal">-6 pts vs last month</span>
              </div>
            </div>
          </div>
        </Panel>

        {/* Right: Critical Attention Required */}
        <Panel
          title="Critical attention required"
          subtitle="Ordered by operational risk · Every item opens filtered workspace"
          className="lg:col-span-5"
        >
          <div className="space-y-2">
            {criticalAttentionItems.map((item) => {
              const style = severityStyles[item.severity] || severityStyles.info;
              const Icon = style.icon;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-border bg-surface hover:bg-secondary/70 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`grid size-8 shrink-0 place-items-center rounded-lg border ${style.chip}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground group-hover:text-ocean transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">{item.detail}</p>
                    </div>
                  </div>
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${style.chip}`}>
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </Panel>
      </div>

      {/* Row 3: Maintenance Command Center + QHSE & Deviations (2-Column Telemetry Grid) */}
      <Section className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (7/12): Maintenance Command Center */}
        <div className="lg:col-span-7 rounded-xl border border-border bg-surface shadow-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 bg-muted/20">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="grid size-6 shrink-0 place-items-center rounded bg-ocean/10 text-ocean border border-ocean/20">
                <Wrench className="size-3.5" />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="text-xs font-bold tracking-wider text-foreground uppercase truncate">
                  Maintenance Command Center
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-success/30 bg-success-soft/60 px-2 py-0.5 text-[9px] font-semibold text-success shrink-0">
                  <span className="size-1 rounded-full bg-success animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            <Link
              to="/app/maintenance"
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-ocean shadow-sm transition-all hover:bg-secondary hover:border-ocean/30 shrink-0 group"
            >
              Open maintenance
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-muted/40 font-semibold uppercase tracking-wider text-muted-foreground text-[9px]">
                  <th className="py-2 px-4">PMS Category</th>
                  <th className="py-2 px-3 text-right">Count</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Fleet Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-[11px]">
                {maintenanceKpiGrid.map((k) => {
                  const Icon = k.icon;
                  const toneBox = {
                    healthy: "bg-success-soft text-success border-success/25",
                    warning: "bg-warning-soft text-warning border-warning/30",
                    critical: "bg-critical-soft text-critical border-critical/25",
                    info: "bg-info-soft text-info border-info/20",
                    neutral: "bg-secondary text-muted-foreground border-border",
                  }[k.tone] || "bg-secondary text-muted-foreground border-border";

                  return (
                    <tr
                      key={k.label}
                      onClick={() => navigate(k.to)}
                      className="group hover:bg-secondary/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2.5">
                          {Icon ? (
                            <div className={`grid size-6 shrink-0 place-items-center rounded border text-[10px] ${toneBox}`}>
                              <Icon className="size-3" />
                            </div>
                          ) : null}
                          <span className="font-semibold text-foreground group-hover:text-ocean transition-colors truncate">
                            {k.label}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-display text-sm font-bold tabular-nums text-foreground">
                        {k.value}
                      </td>
                      <td className="py-2 px-4">
                        <StatusChip status={k.trendValue || k.tone} tone={k.tone} />
                      </td>
                      <td className="py-2 px-4 text-muted-foreground font-normal truncate max-w-[180px]">
                        {k.delta}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5/12): QHSE & Deviations */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-surface shadow-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 bg-muted/20">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="grid size-6 shrink-0 place-items-center rounded bg-warning/10 text-warning border border-warning/20">
                <ShieldAlert className="size-3.5" />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="text-xs font-bold tracking-wider text-foreground uppercase truncate">
                  QHSE & Deviations
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning-soft/60 px-2 py-0.5 text-[9px] font-semibold text-warning shrink-0">
                  <span className="size-1 rounded-full bg-warning animate-pulse" />
                  Active
                </span>
              </div>
            </div>

            <Link
              to="/app/qms"
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-ocean shadow-sm transition-all hover:bg-secondary hover:border-ocean/30 shrink-0 group"
            >
              Open QHSE
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-muted/40 font-semibold uppercase tracking-wider text-muted-foreground text-[9px]">
                  <th className="py-2 px-4">QHSE Metric</th>
                  <th className="py-2 px-3 text-right">Count</th>
                  <th className="py-2 px-4 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-[11px]">
                {qhseTelemetryGrid.map((q) => {
                  const Icon = q.icon;
                  const toneBox = {
                    healthy: "bg-success-soft text-success border-success/25",
                    warning: "bg-warning-soft text-warning border-warning/30",
                    critical: "bg-critical-soft text-critical border-critical/25",
                    info: "bg-info-soft text-info border-info/20",
                    neutral: "bg-secondary text-muted-foreground border-border",
                  }[q.tone] || "bg-secondary text-muted-foreground border-border";

                  return (
                    <tr
                      key={q.label}
                      onClick={() => navigate(q.to)}
                      className="group hover:bg-secondary/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2.5">
                          {Icon ? (
                            <div className={`grid size-6 shrink-0 place-items-center rounded border text-[10px] ${toneBox}`}>
                              <Icon className="size-3" />
                            </div>
                          ) : null}
                          <span className="font-semibold text-foreground group-hover:text-ocean transition-colors truncate">
                            {q.label}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-display text-sm font-bold tabular-nums text-foreground">
                        {q.value}
                      </td>
                      <td className="py-2 px-4 text-right">
                        <StatusChip status={q.status || q.tone} tone={q.tone} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

        {/* Completion vs Plan Chart & Work Orders Action List */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Completion vs Plan Chart */}
          <Panel
            title="Completion vs plan"
            subtitle="Work orders completed vs planned vs overdue by month"
            className="lg:col-span-7"
          >
            <div className="h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={maintenanceTrend} margin={{ left: -18, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
                  <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="planned" stroke="var(--ocean)" fill="var(--ocean)" fillOpacity={0.08} strokeWidth={2} />
                  <Area type="monotone" dataKey="completed" stroke="var(--success)" fill="var(--success)" fillOpacity={0.12} strokeWidth={2} />
                  <Area type="monotone" dataKey="overdue" stroke="var(--critical)" fill="var(--critical)" fillOpacity={0.12} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Work Orders Requiring Action */}
          <Panel
            title="Work orders requiring action"
            subtitle="Ordered by priority and due date"
            action={<Link to="/app/work-orders" className="text-xs font-semibold text-ocean hover:underline">All work orders &gt;</Link>}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-2.5 pt-1">
              {workOrdersActionList.map((wo) => (
                <div
                  key={wo.id}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-border bg-surface hover:bg-secondary/60 transition-colors shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground truncate">{wo.title}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{wo.vessel} · {wo.due}</p>
                  </div>
                  <StatusChip status={wo.priority} tone={wo.tone} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      {/* Row 4: Voyage Activities & Remaining On Board */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Voyage Activities */}
        <Panel
          title="Voyage activities"
          subtitle="Booking reports, voyage journals and correction requests"
          action={<Link to="/app/voyages" className="text-xs font-semibold text-ocean hover:underline">Voyages &gt;</Link>}
          className="lg:col-span-6 space-y-4"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface/50 p-3">
              <span className="text-[11px] font-semibold text-muted-foreground block">Position &amp; Noon Reports</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-foreground">1</span>
                <span className="text-[10px] text-muted-foreground">In Port</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>0 Underway</span>
                <span>0 Anchored</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface/50 p-3">
              <span className="text-[11px] font-semibold text-muted-foreground block">Voyage Journals</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-foreground">0</span>
                <span className="text-[10px] text-muted-foreground">Submitted</span>
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">0 Under Review</div>
            </div>

            <div className="rounded-xl border border-border bg-surface/50 p-3">
              <span className="text-[11px] font-semibold text-muted-foreground block">Requests For Correction</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-foreground">0</span>
                <span className="text-[10px] text-muted-foreground">Pending Master</span>
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">0 Pending Supt.</div>
            </div>
          </div>
        </Panel>

        {/* Remaining On Board — MT Ocean Star */}
        <Panel
          title="Remaining on board"
          subtitle="MT Ocean Star · Fuel, lube oil and fresh water"
          className="lg:col-span-6"
        >
          <div className="space-y-4 pt-1">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium">
                  <Fuel className="size-4 text-ocean" /> Fuel Oil (VLSFO) — <b className="text-foreground">475 MT</b>
                </span>
                <span className="font-display font-bold tabular-nums">87%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={87} tone="healthy" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium">
                  <Droplets className="size-4 text-ocean" /> Lube Oil
                </span>
                <span className="font-display font-bold tabular-nums">42%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={42} tone="warning" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium">
                  <Flame className="size-4 text-ocean" /> Fresh Water
                </span>
                <span className="font-display font-bold tabular-nums">78%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={78} tone="healthy" />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Row 5: Compliance Snapshot & Procurement Overview */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Compliance Snapshot */}
        <Panel
          title="Compliance snapshot"
          subtitle="Statutory and class certificate status"
          action={<Link to="/app/certificates" className="text-xs font-semibold text-ocean hover:underline">Certificates &gt;</Link>}
          className="lg:col-span-6 space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
            {/* 98% Circle Gauge */}
            <div className="relative grid size-24 shrink-0 place-items-center rounded-full bg-surface border-4 border-success/30 shadow-inner">
              <span className="font-display text-2xl font-extrabold text-foreground">98%</span>
              <span className="text-[9px] text-muted-foreground uppercase font-bold">Total</span>
            </div>

            {/* 4 Stat Boxes Grid */}
            <div className="grid grid-cols-2 gap-2 flex-1 w-full">
              <div className="rounded-lg border border-border bg-surface/50 p-2 text-center">
                <span className="font-display text-lg font-bold text-warning block">4</span>
                <span className="text-[10px] text-muted-foreground block">Expiring 90d</span>
              </div>
              <div className="rounded-lg border border-border bg-surface/50 p-2 text-center">
                <span className="font-display text-lg font-bold text-critical block">10</span>
                <span className="text-[10px] text-muted-foreground block">Expiring 30d</span>
              </div>
              <div className="rounded-lg border border-border bg-surface/50 p-2 text-center">
                <span className="font-display text-lg font-bold text-info block">2</span>
                <span className="text-[10px] text-muted-foreground block">In Window</span>
              </div>
              <div className="rounded-lg border border-border bg-surface/50 p-2 text-center">
                <span className="font-display text-lg font-bold text-foreground block">29</span>
                <span className="text-[10px] text-muted-foreground block">Total Certs</span>
              </div>
            </div>
          </div>

          {/* 3 Certificate Alert Strips */}
          <div className="space-y-2 pt-2 border-t border-border">
            {certificateAlertStrips.map((c) => (
              <div key={c.name} className="flex items-center justify-between gap-2 p-2 rounded-lg border border-border bg-surface text-xs">
                <div className="min-w-0">
                  <p className="font-semibold truncate">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{c.detail}</p>
                </div>
                <StatusChip status={c.status} tone={c.tone} />
              </div>
            ))}
          </div>
        </Panel>

        {/* Procurement Overview & Spend */}
        <Panel
          title="Procurement overview"
          subtitle="Requisitions, purchase orders and supply to vessels"
          action={<Link to="/app/purchase-orders" className="text-xs font-semibold text-ocean hover:underline">Procurement &gt;</Link>}
          className="lg:col-span-6 space-y-4"
        >
          <div className="grid gap-3 sm:grid-cols-2 pt-1">
            <div className="rounded-xl border border-border bg-surface/50 p-3 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Purchase Requisitions</span>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-critical font-medium">PRs &gt; 100 days</span>
                <b className="font-display font-bold text-critical">3</b>
              </div>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted-foreground">Item draft &gt; 7 days</span>
                <b className="font-display font-bold text-warning">21</b>
              </div>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted-foreground">Service draft &gt; 7 days</span>
                <b className="font-display font-bold text-warning">2</b>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface/50 p-3 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Purchase Orders</span>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted-foreground">POs placed &gt; 90 days</span>
                <b className="font-display font-bold text-warning">756</b>
              </div>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted-foreground">PO partially received</span>
                <b className="font-display font-bold text-info">34</b>
              </div>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted-foreground">Pending Inspector Approval</span>
                <b className="font-display font-bold text-info">1</b>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <span className="text-xs font-semibold text-muted-foreground block mb-2">Monthly spend vs budget</span>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={procurement.spend} margin={{ left: -15, right: 5, top: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={10} stroke="var(--muted-foreground)" />
                  <YAxis tickFormatter={(v) => `${v / 1000}k`} tickLine={false} axisLine={false} fontSize={10} stroke="var(--muted-foreground)" />
                  <Tooltip formatter={(v) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: 8, fontSize: 11, border: "1px solid var(--border)" }} />
                  <Bar dataKey="budget" fill="var(--secondary)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="spend" fill="var(--ocean)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Panel>
      </div>

      {/* Row 6: QHSE & Deviations Overview */}
      <Panel
        title="QHSE &amp; Deviations"
        subtitle="Safety, quality and environmental signals"
        action={<Link to="/app/qms" className="text-xs font-semibold text-ocean hover:underline">QHSE overview &gt;</Link>}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 pt-1">
          <div className="rounded-xl border border-border bg-surface/50 p-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-muted-foreground block">Open deviations</span>
              <span className="text-2xl font-bold font-display text-warning block mt-1">4</span>
              <span className="text-[10px] text-muted-foreground">2 critical · 2 major</span>
            </div>
            <div className="grid size-9 place-items-center rounded-lg bg-warning-soft text-warning">
              <AlertTriangle className="size-4.5" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 p-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-muted-foreground block">Overdue CAPA</span>
              <span className="text-2xl font-bold font-display text-critical block mt-1">2</span>
              <span className="text-[10px] text-muted-foreground">1 corrective · 1 preventive</span>
            </div>
            <div className="grid size-9 place-items-center rounded-lg bg-critical-soft text-critical">
              <ShieldAlert className="size-4.5" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 p-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-muted-foreground block">Drills Due (30d)</span>
              <span className="text-2xl font-bold font-display text-foreground block mt-1">9</span>
              <span className="text-[10px] text-muted-foreground">3 mandatory</span>
            </div>
            <div className="grid size-9 place-items-center rounded-lg bg-info-soft text-info">
              <Clock className="size-4.5" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 p-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-muted-foreground block">Open PTW</span>
              <span className="text-2xl font-bold font-display text-foreground block mt-1">3</span>
              <span className="text-[10px] text-muted-foreground">2 hot work · 1 enclosed</span>
            </div>
            <div className="grid size-9 place-items-center rounded-lg bg-secondary text-foreground">
              <FileText className="size-4.5" />
            </div>
          </div>
        </div>
      </Panel>

      {/* Row 7: Bottom Split (Recent Activity & Vessel Quick Status) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Activity Feed */}
        <Panel
          title="RECENT ACTIVITY"
          subtitle="Updated 2 min ago"
          className="lg:col-span-6"
        >
          <ul className="divide-y divide-border pt-1">
            {[
              { text: "M/E Exhaust Valve (NO.2-CYL) - Exhaust valve spindle bearing renewed", detail: "MT Ocean Star · 12 min ago", tone: "info" },
              { text: "H. Overhauling compressor suction valve (NO.1-CYL) Engine consumption", detail: "MV Baltic Trader · 45 min ago", tone: "info" },
              { text: "CHIEF ENG submitted noon report for MT Ocean Star", detail: "MT Ocean Star · 1 hr ago", tone: "healthy" },
              { text: "Capt. L. Larsen submitted voyage journal for VOY-2026-07", detail: "MV Atlantic Pioneer · 2 hrs ago", tone: "info" },
              { text: "M. Tan updated running hours for Aux Engine #2 (14,200 hrs)", detail: "MV Baltic Trader · 3 hrs ago", tone: "warning" },
              { text: "Procurement issued PO-2026-0428 for Alfa Laval Separator Gaskets", detail: "MT Ocean Star · 4 hrs ago", tone: "info" },
            ].map((a, i) => (
              <li key={i} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
                <span className={`grid size-2.5 rounded-full mt-1.5 shrink-0 bg-${a.tone === 'healthy' ? 'success' : a.tone === 'warning' ? 'warning' : 'ocean'}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground">{a.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Vessel Quick Status List */}
        <Panel
          title="VESSEL QUICK STATUS"
          subtitle="View all (24)"
          action={<Link to="/app/fleet" className="text-xs font-semibold text-ocean hover:underline">All vessels &gt;</Link>}
          className="lg:col-span-6"
        >
          <div className="space-y-2 pt-1">
            {vesselQuickList.map((v) => (
              <div
                key={v.name}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-border bg-surface hover:bg-secondary/60 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-navy/10 text-navy font-bold">
                    <Ship className="size-4 text-ocean" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{v.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{v.imo} · {v.type} · {v.location}</p>
                  </div>
                </div>
                <StatusChip status={v.status} tone={v.tone} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

    </div>
  );
}
