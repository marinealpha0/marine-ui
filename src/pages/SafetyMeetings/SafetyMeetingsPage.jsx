import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { safetyMeetingFilterFields } from "@/constant/FilterFields";

export const safetyMeetingsCatalog = [
  {
    id: "SM-0912",
    meeting: "Monthly Safety Committee Meeting",
    vessel: "MT Ocean Star",
    date: "2026-08-14",
    chair: "Master",
    actions: 3,
    status: "To Submit",
  },
  {
    id: "SM-0908",
    meeting: "Shipboard Management Review",
    vessel: "MV Atlantic Pioneer",
    date: "2026-08-07",
    chair: "Master",
    actions: 5,
    status: "Ship Review",
  },
  {
    id: "SM-0901",
    meeting: "Toolbox Talk — Hot Work",
    vessel: "MT Nordic Spirit",
    date: "2026-08-02",
    chair: "C/E",
    actions: 0,
    status: "Completed",
  },
  {
    id: "SM-0898",
    meeting: "Monthly Safety Committee Meeting",
    vessel: "MV Pacific Endeavour",
    date: "2026-07-28",
    chair: "Master",
    actions: 2,
    status: "Pending Review",
  },
];

export default function SafetyMeetingsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    chair: "",
  });

  const filteredData = useMemo(() => {
    return safetyMeetingsCatalog.filter((m) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (m.id && m.id.toLowerCase().includes(q)) ||
          (m.meeting && m.meeting.toLowerCase().includes(q)) ||
          (m.vessel && m.vessel.toLowerCase().includes(q)) ||
          (m.chair && m.chair.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && m.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && m.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">SAFETY MANAGEMENT</div>
        <PageHeader
          title="Safety Meetings &amp; Shipboard Review"
          description="Meeting submissions, ship review status and open action items with due dates."
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
          <div className="text-sm font-medium text-gray-700">To submit</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">3</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Awaiting ship review</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">2</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Open action items</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">10</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Completed this quarter</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">27</div>
        </div>
      </div>

      <FilterSection
        filterFields={safetyMeetingFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Meeting log</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["REF", "MEETING", "VESSEL", "DATE", "CHAIR", "ACTIONS", "STATUS"]}
          rows={filteredData.map((m) => [
            <span key="a" className="font-bold text-gray-900">{m.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{m.meeting}</span>,
            <span key="c" className="text-gray-600">{m.vessel}</span>,
            <span key="d" className="tabular-nums text-gray-600">{m.date}</span>,
            <span key="e" className="text-gray-600">{m.chair}</span>,
            <span key="f" className="tabular-nums text-gray-600 font-medium">{m.actions}</span>,
            <StatusChip key="g" status={m.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

