import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { picFilterFields } from "@/constant/FilterFields";

export const picTasksCatalog = [
  {
    id: "PIC-3320",
    task: "Verify fire main pressure test records",
    vessel: "MT Ocean Star",
    pic: "2/E R. Malhotra",
    due: "2026-08-12",
    status: "Assigned",
  },
  {
    id: "PIC-3316",
    task: "Close out inspection findings from PSC",
    vessel: "MV Pacific Endeavour",
    pic: "C/E K. Tan",
    due: "2026-08-09",
    status: "Overdue",
  },
  {
    id: "PIC-3311",
    task: "Update SMS chapter 7 acknowledgement",
    vessel: "MV Baltic Carrier",
    pic: "Master",
    due: "2026-08-20",
    status: "Pending",
  },
  {
    id: "PIC-3305",
    task: "Confirm spare parts stocktake",
    vessel: "MV Coral Trader",
    pic: "2/E L. Chen",
    due: "2026-08-04",
    status: "Completed",
  },
];

export default function PICPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    pic: "",
  });

  const filteredData = useMemo(() => {
    return picTasksCatalog.filter((t) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (t.id && t.id.toLowerCase().includes(q)) ||
          (t.task && t.task.toLowerCase().includes(q)) ||
          (t.vessel && t.vessel.toLowerCase().includes(q)) ||
          (t.pic && t.pic.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && t.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && t.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">GOVERNANCE</div>
        <PageHeader
          title="Person In Charge"
          description="Task ownership across vessels — assigned, pending, overdue and completed responsibilities."
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
          <div className="text-sm font-medium text-gray-700">Assigned</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">24</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Pending</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">9</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Overdue</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">3</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Completed (30 days)</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">61</div>
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
            <h3 className="text-base font-bold text-gray-900">PIC task list</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["REF", "TASK", "VESSEL", "PERSON IN CHARGE", "DUE", "STATUS"]}
          rows={filteredData.map((t) => [
            <span key="a" className="font-bold text-gray-900">{t.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{t.task}</span>,
            <span key="c" className="text-gray-600">{t.vessel}</span>,
            <span key="d" className="text-gray-600">{t.pic}</span>,
            <span key="e" className="tabular-nums text-gray-600">{t.due}</span>,
            <StatusChip key="f" status={t.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

