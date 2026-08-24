import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DataTable, EmptyState, KpiCard, Panel, ProgressBar, StatusChip, healthTone } from "@/components/app/kit";
import { certificates, equipmentTree, vessels, workOrders } from "@/data/marine";

const tabs = ["Overview", "Equipment", "Work Orders", "Certificates", "Inventory", "Voyages", "QHSE", "Documents", "Crew"];

export default function VesselDetailPage() {
  const { vesselId } = useParams();
  const vessel = vessels.find((v) => v.id === vesselId) || vessels[0];
  const [tab, setTab] = useState("Overview");
  
  const vesselWOs = workOrders.filter((w) => w.vessel === vessel.name);
  const vesselCerts = certificates.filter((c) => c.vessel === vessel.name);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-navy p-5 text-navy-foreground shadow-card">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold">{vessel.name}</h1>
            <p className="mt-1 text-sm text-navy-muted">
              IMO {vessel.imo} · {vessel.type} · {vessel.flag} · Built {vessel.built} · {vessel.dwt.toLocaleString()} DWT
            </p>
          </div>
          <StatusChip status={vessel.status} />
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["Current voyage", vessel.voyage], ["Position", vessel.location], ["Next port", vessel.nextPort], ["ETA", vessel.eta]].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] tracking-wide text-navy-muted uppercase">{k}</dt>
              <dd className="mt-1 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={"shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors " + (tab === t ? "border-ocean text-ocean" : "border-transparent text-muted-foreground hover:text-foreground")}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Open work orders" value={vessel.openWO} to="/app/work-orders" />
            <KpiCard label="Overdue work orders" value={vessel.overdueWO} tone={vessel.overdueWO ? "critical" : "healthy"} to="/app/work-orders" />
            <KpiCard label="Certificate health" value={vessel.certificates + "%"} tone={healthTone(vessel.certificates)} to="/app/certificates" />
            <KpiCard label="Crew on board" value={vessel.crew} delta="Full complement" />
          </div>
          <Panel title="Remaining on board">
            <div className="grid gap-6 sm:grid-cols-3">
              {[["Fuel oil", vessel.rob.fuel], ["Lube oil", vessel.rob.lube], ["Fresh water", vessel.rob.water]].map(([l, v]) => (
                <div key={l}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{l}</span>
                    <span className="font-semibold tabular-nums">{v}%</span>
                  </div>
                  <div className="mt-2"><ProgressBar value={v} tone={healthTone(v)} /></div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {tab === "Equipment" && (
        <div className="grid gap-3 md:grid-cols-2">
          {equipmentTree.map((e) => (
            <Panel key={e.name} title={e.name}>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground"><span>Condition index</span><span className="font-semibold tabular-nums">{e.health}%</span></div>
                <div className="mt-1.5"><ProgressBar value={e.health} tone={healthTone(e.health)} /></div>
              </div>
              <ul className="space-y-1.5">
                {e.children.map((c) => (
                  <li key={c.name} className="flex items-center justify-between text-sm">
                    <span className="min-w-0 truncate text-foreground/85">{c.name}</span>
                    <span className={"shrink-0 font-medium tabular-nums " + (c.health < 60 ? "text-critical" : c.health < 85 ? "text-warning" : "text-success")}>{c.health}%</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}

      {tab === "Work Orders" && (
        <Panel padded={false}>
          {vesselWOs.length ? (
            <DataTable
              columns={["Work order", "Equipment", "Priority", "Status", "Assigned", "Due"]}
              rows={vesselWOs.map((w) => [
                <span key="a" className="font-medium">{w.id} · {w.title}</span>,
                w.equipment,
                <StatusChip key="c" status={w.priority} />,
                <StatusChip key="d" status={w.status} />,
                w.assignee,
                <span key="f" className="tabular-nums">{w.due}</span>,
              ])}
            />
          ) : (
            <div className="p-4"><EmptyState title="No open work orders" description="This vessel has no maintenance backlog." /></div>
          )}
        </Panel>
      )}

      {tab === "Certificates" && (
        <Panel padded={false}>
          {vesselCerts.length ? (
            <DataTable
              columns={["Certificate", "Type", "Issuer", "Issued", "Expiry", "Status"]}
              rows={vesselCerts.map((c) => [
                <span key="a" className="font-medium">{c.name}</span>, c.type, c.issuer,
                <span key="d" className="tabular-nums">{c.issued}</span>,
                <span key="e" className="tabular-nums">{c.expiry}</span>,
                <StatusChip key="f" status={c.status} />,
              ])}
            />
          ) : (
            <div className="p-4"><EmptyState title="All certificates valid" /></div>
          )}
        </Panel>
      )}

      {["Inventory", "Voyages", "QHSE", "Documents", "Crew"].includes(tab) && (
        <EmptyState title={tab + " is up to date"} description={"No outstanding " + tab.toLowerCase() + " items for " + vessel.name + "."} />
      )}
    </div>
  );
}
