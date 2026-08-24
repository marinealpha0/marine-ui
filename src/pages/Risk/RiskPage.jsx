import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { riskFilterFields } from "@/constant/FilterFields";

export const riskRegisterCatalog = [
  {
    id: "RA-118",
    hazard: "Enclosed space entry — cargo hold inspection",
    vessel: "MV Atlantic Pioneer",
    l: 3,
    s: 5,
    owner: "C/O M. Bakker",
    mitigation: "Permit + gas testing",
    due: "2026-08-21",
    status: "Open",
  },
  {
    id: "RA-121",
    hazard: "Hot work adjacent to fuel tank",
    vessel: "MT Gulf Navigator",
    l: 2,
    s: 5,
    owner: "C/E P. Dsouza",
    mitigation: "Isolation & fire watch",
    due: "2026-08-18",
    status: "Mitigated",
  },
  {
    id: "RA-124",
    hazard: "Working aloft — radar mast servicing",
    vessel: "MT Ocean Star",
    l: 3,
    s: 4,
    owner: "2/O A. Ivanov",
    mitigation: "Fall arrest, toolbox talk",
    due: "2026-08-27",
    status: "Open",
  },
  {
    id: "RA-127",
    hazard: "Main switchboard live testing",
    vessel: "MV Pacific Endeavour",
    l: 2,
    s: 4,
    owner: "ETO J. Rivera",
    mitigation: "LOTO procedure",
    due: "2026-09-04",
    status: "Under Review",
  },
];

export default function RiskPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    severity: "all",
    mitigation: "all",
  });

  const filteredData = useMemo(() => {
    return riskRegisterCatalog.filter((r) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (r.id && r.id.toLowerCase().includes(q)) ||
          (r.hazard && r.hazard.toLowerCase().includes(q)) ||
          (r.vessel && r.vessel.toLowerCase().includes(q)) ||
          (r.owner && r.owner.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && r.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && r.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE &amp; QHSE</div>
        <PageHeader
          title="Risk Management"
          description="Risk assessments, mitigation status and ship review approvals across the fleet."
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
        {/* Card 1 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Open risks</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">18</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">High / critical</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">4</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Awaiting RA ship review</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">2</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Mitigated (30 days)</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">12</div>
        </div>
      </div>

      <FilterSection
        filterFields={riskFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Risk register</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["REF", "HAZARD", "VESSEL", "L", "S", "OWNER", "MITIGATION", "DUE", "STATUS"]}
          rows={filteredData.map((r) => [
            <span key="a" className="font-bold text-gray-900">{r.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{r.hazard}</span>,
            <span key="c" className="text-gray-600">{r.vessel}</span>,
            <span key="d" className="tabular-nums text-gray-600">{r.l}</span>,
            <span key="e" className="tabular-nums text-gray-600">{r.s}</span>,
            <span key="f" className="text-gray-600">{r.owner}</span>,
            <span key="g" className="text-gray-600">{r.mitigation}</span>,
            <span key="h" className="tabular-nums text-gray-600">{r.due}</span>,
            <StatusChip key="i" status={r.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

