import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { picFilterFields } from "@/constant/FilterFields";

export const handoverCatalog = [
  {
    id: "HO-1188",
    rank: "Chief Engineer",
    vessel: "MT Ocean Star",
    outgoing: "S. Okafor",
    incoming: "P. Dsouza",
    date: "2026-08-19",
    status: "Ready For Ship Review",
  },
  {
    id: "HO-1184",
    rank: "Second Engineer",
    vessel: "MV Atlantic Pioneer",
    outgoing: "J. Fernandes",
    incoming: "L. Chen",
    date: "2026-08-14",
    status: "PIC Pending Tasks",
  },
  {
    id: "HO-1179",
    rank: "Master",
    vessel: "OSV Arctic Guardian",
    outgoing: "L. Hansen",
    incoming: "M. Haugen",
    date: "2026-08-06",
    status: "PIC Overdue",
  },
  {
    id: "HO-1170",
    rank: "Chief Officer",
    vessel: "MV Baltic Carrier",
    outgoing: "M. Bakker",
    incoming: "A. Reyes",
    date: "2026-07-30",
    status: "Completed",
  },
];

const handoverWorkflowSteps = [
  { num: 1, label: "Initiated", state: "done" },
  { num: 2, label: "Checklist", state: "done" },
  { num: 3, label: "Joint Review", state: "done" },
  { num: 4, label: "Ship Review", state: "active" },
  { num: 5, label: "Closed", state: "upcoming" },
];

export default function HandoverPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
  });

  const filteredData = useMemo(() => {
    return handoverCatalog.filter((h) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (h.id && h.id.toLowerCase().includes(q)) ||
          (h.rank && h.rank.toLowerCase().includes(q)) ||
          (h.vessel && h.vessel.toLowerCase().includes(q)) ||
          (h.outgoing && h.outgoing.toLowerCase().includes(q)) ||
          (h.incoming && h.incoming.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && h.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && h.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">GOVERNANCE</div>
        <PageHeader
          title="Handover / Takeover"
          description="Rank handovers with checklist completion, outstanding PIC tasks and ship review sign-off."
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
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Ready for ship review</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">1</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">PIC pending tasks</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">1</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">PIC overdue</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">1</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Completed (90 days)</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">18</div>
        </div>
      </div>

      {/* Workflow Stepper Banner */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Workflow</h3>
          <p className="text-xs text-gray-500 mt-0.5">Current stage highlighted</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {handoverWorkflowSteps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  step.state === "done"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : step.state === "active"
                    ? "bg-sky-50 text-sky-700 border border-sky-300 font-semibold"
                    : "bg-gray-50 text-gray-400 border border-gray-200"
                }`}
              >
                <span>{step.num}</span>
                <span>{step.label}</span>
              </div>
              {idx < handoverWorkflowSteps.length - 1 && (
                <div className="h-0.5 w-4 bg-gray-200 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <FilterSection
        filterFields={picFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Handover register</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["REF", "RANK", "VESSEL", "OUTGOING", "INCOMING", "DATE", "STATUS"]}
          rows={filteredData.map((h) => [
            <span key="a" className="font-bold text-gray-900">{h.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{h.rank}</span>,
            <span key="c" className="text-gray-600">{h.vessel}</span>,
            <span key="d" className="text-gray-600">{h.outgoing}</span>,
            <span key="e" className="text-gray-600">{h.incoming}</span>,
            <span key="f" className="tabular-nums text-gray-600">{h.date}</span>,
            <StatusChip key="g" status={h.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}
