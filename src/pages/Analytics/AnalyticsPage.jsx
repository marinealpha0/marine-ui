import React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Panel } from "@/components/app/kit";
import { deviationTrend, maintenanceTrend, procurement } from "@/data/marine";

const axis = { tickLine: false, axisLine: false, fontSize: 12, stroke: "var(--muted-foreground)" };
const tip = { borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Rolling 6-month operational performance across the fleet" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Maintenance throughput">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={maintenanceTrend} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
                <Tooltip contentStyle={tip} /><Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="completed" stroke="var(--success)" fill="var(--success)" fillOpacity={0.12} strokeWidth={2} />
                <Area type="monotone" dataKey="overdue" stroke="var(--critical)" fill="var(--critical)" fillOpacity={0.12} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Procurement spend vs budget">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={procurement.spend} margin={{ left: -10, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" {...axis} /><YAxis tickFormatter={(v) => `${v / 1000}k`} {...axis} />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} contentStyle={tip} />
                <Bar dataKey="budget" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spend" fill="var(--ocean)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Deviations opened vs closed" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviationTrend} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" {...axis} /><YAxis {...axis} />
                <Tooltip contentStyle={tip} /><Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="open" fill="var(--warning)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="closed" fill="var(--teal)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}
