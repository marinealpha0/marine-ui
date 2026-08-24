import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { workPlannerFilterFields } from "@/constant/FilterFields";

export const surveyScheduleData = [
  {
    id: "SUR-1180",
    survey: "Intermediate Hull Survey",
    vessel: "MV Atlantic Pioneer",
    provider: "Bureau Veritas",
    window: "2026-09-01 → 2026-12-01",
    status: "Scheduled",
  },
  {
    id: "SUR-1176",
    survey: "Annual Machinery Survey",
    vessel: "MT Ocean Star",
    provider: "DNV",
    window: "2026-08-15 → 2026-10-15",
    status: "Open",
  },
  {
    id: "SUR-1171",
    survey: "Cargo Gear Load Test",
    vessel: "MV Coral Trader",
    provider: "ClassNK",
    window: "2026-07-10 → 2026-08-05",
    status: "Overdue",
  },
  {
    id: "SUR-1168",
    survey: "Docking Survey",
    vessel: "MT Gulf Navigator",
    provider: "ABS",
    window: "2026-10-01 → 2027-01-01",
    status: "Pending Approval",
  },
  {
    id: "SUR-1160",
    survey: "Safety Equipment Survey",
    vessel: "MT Nordic Spirit",
    provider: "Lloyd's Register",
    window: "2026-06-01 → 2026-07-30",
    status: "Completed",
  },
];

export default function WorkPlannerPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
  });

  const filteredData = useMemo(() => {
    return surveyScheduleData.filter((item) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (item.id && item.id.toLowerCase().includes(q)) ||
          (item.survey && item.survey.toLowerCase().includes(q)) ||
          (item.vessel && item.vessel.toLowerCase().includes(q)) ||
          (item.provider && item.provider.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && item.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && item.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">OPERATIONS</div>
        <PageHeader
          title="Planner"
          description="Fleet-wide planning board across maintenance, dry dock, inspections and crew changes."
          actions={
            <>
              <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
              <ExportButton />
            </>
          }
        />
      </div>

      {/* Top 4 KPI Summary Cards (Exact replica of reference UI) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Upcoming (90 days)</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">11</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Overdue surveys</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">1</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Pending approval</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">2</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Completed YTD</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">48</div>
        </div>
      </div>

      <FilterSection
        filterFields={workPlannerFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "SURVEY", "VESSEL", "CLASS / PROVIDER", "WINDOW", "STATUS"]}
          rows={filteredData.map((item) => [
            <span key="a" className="font-bold text-gray-900">{item.id}</span>,
            <span key="b" className="font-medium text-gray-800">{item.survey}</span>,
            <span key="c" className="text-gray-600">{item.vessel}</span>,
            <span key="d" className="text-gray-600">{item.provider}</span>,
            <span key="e" className="tabular-nums text-gray-600">{item.window}</span>,
            <StatusChip key="f" status={item.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}
