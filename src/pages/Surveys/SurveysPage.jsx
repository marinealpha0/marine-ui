import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { surveyFilterFields } from "@/constant/FilterFields";

export const surveyScheduleCatalog = [
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

export default function SurveysPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    surveyor: "",
  });

  const filteredData = useMemo(() => {
    return surveyScheduleCatalog.filter((s) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (s.id && s.id.toLowerCase().includes(q)) ||
          (s.survey && s.survey.toLowerCase().includes(q)) ||
          (s.vessel && s.vessel.toLowerCase().includes(q)) ||
          (s.provider && s.provider.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && s.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && s.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE</div>
        <PageHeader
          title="Surveys &amp; Services"
          description="Class and statutory survey windows, service provider attendance and completion evidence."
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
        filterFields={surveyFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Survey schedule</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["REF", "SURVEY", "VESSEL", "CLASS / PROVIDER", "WINDOW", "STATUS"]}
          rows={filteredData.map((s) => [
            <span key="a" className="font-bold text-gray-900">{s.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{s.survey}</span>,
            <span key="c" className="text-gray-600">{s.vessel}</span>,
            <span key="d" className="text-gray-600">{s.provider}</span>,
            <span key="e" className="tabular-nums text-gray-600">{s.window}</span>,
            <StatusChip key="f" status={s.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

