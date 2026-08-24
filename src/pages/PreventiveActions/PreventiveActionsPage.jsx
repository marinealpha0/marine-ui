import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { capaFilterFields } from "@/constant/FilterFields";

export const preventiveActionsCatalog = [
  {
    id: "PA-1142",
    action: "Introduce weekly ER lighting inspection",
    scope: "Fleet-wide",
    owner: "QHSE D. Petrov",
    due: "2026-08-30",
    status: "Open",
  },
  {
    id: "PA-1139",
    action: "Revise purifier overhaul checklist",
    scope: "MT Nordic Spirit",
    owner: "C/E A. Nowak",
    due: "2026-09-06",
    status: "In Progress",
  },
  {
    id: "PA-1134",
    action: "Crew briefing on enclosed space entry",
    scope: "MV Atlantic Pioneer",
    owner: "Master L. Hansen",
    due: "2026-08-05",
    status: "Overdue",
  },
  {
    id: "PA-1130",
    action: "Add vibration trending to ME turbocharger",
    scope: "MT Gulf Navigator",
    owner: "Supt. R. Grant",
    due: "2026-09-15",
    status: "To Be Verified",
  },
];

export default function PreventiveActionsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
  });

  const filteredPreventive = useMemo(() => {
    return preventiveActionsCatalog.filter((p) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (p.id && p.id.toLowerCase().includes(q)) ||
          (p.action && p.action.toLowerCase().includes(q)) ||
          (p.scope && p.scope.toLowerCase().includes(q)) ||
          (p.owner && p.owner.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && p.scope !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && p.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE &amp; QHSE</div>
        <PageHeader
          title="Preventive Actions"
          description="Proactive measures raised from trends, near misses and lessons learned."
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
        <SummaryCard label="Open" value="5" tone="warning" borderLeft="amber" />
        <SummaryCard label="To be verified" value="1" tone="info" />
        <SummaryCard label="Overdue" value="1" tone="critical" borderLeft="red" />
        <SummaryCard label="Effectiveness verified" value="9" tone="healthy" />
      </div>

      <FilterSection
        filterFields={capaFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Preventive action register</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredPreventive.length} {filteredPreventive.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["REF", "ACTION", "SCOPE", "OWNER", "DUE", "STATUS"]}
          rows={filteredPreventive.map((p) => [
            <span key="a" className="font-bold text-gray-900">{p.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{p.action}</span>,
            <span key="c" className="text-gray-600">{p.scope}</span>,
            <span key="d" className="text-gray-600">{p.owner}</span>,
            <span key="e" className="tabular-nums text-gray-600">{p.due}</span>,
            <StatusChip key="f" status={p.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}
