import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { reportFilterFields } from "@/constant/FilterFields";

export const reportsActivityCatalog = [
  {
    timestamp: "2026-08-10 14:22",
    actor: "a.costa@oceanicmarine.com",
    action: "Approved purchase order PO-2026-1207",
    scope: "Oceanic Marine / Offshore",
    source: "203.0.113.24",
  },
  {
    timestamp: "2026-08-10 12:05",
    actor: "s.okafor@oceanicmarine.com",
    action: "Changed WO-24215 status to Awaiting Approval",
    scope: "MV Atlantic Pioneer",
    source: "198.51.100.9",
  },
  {
    timestamp: "2026-08-10 09:41",
    actor: "d.petrov@oceanicmarine.com",
    action: "Updated risk assessment RA-121 mitigation",
    scope: "MT Gulf Navigator",
    source: "203.0.113.77",
  },
  {
    timestamp: "2026-08-09 21:14",
    actor: "system",
    action: "Certificate expiry job flagged 4 certificates",
    scope: "Fleet-wide",
    source: "internal",
  },
  {
    timestamp: "2026-08-09 16:58",
    actor: "alex.v@oceanicmarine.com",
    action: "Invited user l.hansen@oceanicmarine.com (Master)",
    scope: "Oceanic Marine",
    source: "203.0.113.11",
  },
];

export default function ReportsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    category: "all",
    cadence: "all",
    owner: "",
  });

  const filteredData = useMemo(() => {
    return reportsActivityCatalog.filter((r) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (r.actor && r.actor.toLowerCase().includes(q)) ||
          (r.action && r.action.toLowerCase().includes(q)) ||
          (r.scope && r.scope.toLowerCase().includes(q)) ||
          (r.source && r.source.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">INSIGHT</div>
        <PageHeader
          title="Reports"
          description="Standard and custom reporting library across maintenance, procurement and compliance data."
          actions={
            <>
              <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
              <ExportButton />
            </>
          }
        />
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Events (24h)" value="1842" tone="dark" />
        <SummaryCard label="Approvals" value="46" tone="info" />
        <SummaryCard label="Permission changes" value="3" tone="warning" borderLeft="amber" />
        <SummaryCard label="Failed sign-ins" value="2" tone="critical" borderLeft="red" />
      </div>

      <FilterSection
        filterFields={reportFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent activity</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["TIMESTAMP", "ACTOR", "ACTION", "SCOPE", "SOURCE"]}
          rows={filteredData.map((r) => [
            <span key="a" className="font-bold text-gray-900 tabular-nums">{r.timestamp}</span>,
            <span key="b" className="text-gray-600 font-mono text-xs">{r.actor}</span>,
            <span key="c" className="text-gray-700 font-medium">{r.action}</span>,
            <span key="d" className="text-gray-600">{r.scope}</span>,
            <span key="e" className="text-gray-500 tabular-nums font-mono text-xs">{r.source}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}

