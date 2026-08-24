import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { workOrderFilterFields } from "@/constant/FilterFields";

export const workOrdersCatalog = [
  {
    id: "WO-24188",
    title: "Main Engine No.3 cylinder head overhaul",
    vessel: "MT Ocean Star",
    equipment: "ME / Cylinder 3",
    priority: "Critical",
    assignee: "R. Malhotra (2/E)",
    due: "2026-08-02",
    day: 2,
    status: "Overdue",
  },
  {
    id: "WO-24191",
    title: "Aux Engine 2 fuel injector replacement",
    vessel: "MV Pacific Endeavour",
    equipment: "AE2 / Fuel System",
    priority: "Critical",
    assignee: "K. Tan (3/E)",
    due: "2026-08-11",
    day: 11,
    status: "In Progress",
  },
  {
    id: "WO-24202",
    title: "Purifier No.1 bowl cleaning & bearing check",
    vessel: "MT Nordic Spirit",
    equipment: "FO Purifier 1",
    priority: "Medium",
    assignee: "A. Nowak (4/E)",
    due: "2026-08-18",
    day: 18,
    status: "Open",
  },
  {
    id: "WO-24215",
    title: "Emergency fire pump annual performance test",
    vessel: "MV Atlantic Pioneer",
    equipment: "Emergency Fire Pump",
    priority: "High",
    assignee: "S. Okafor (C/E)",
    due: "2026-08-14",
    day: 14,
    status: "Awaiting Approval",
  },
  {
    id: "WO-24220",
    title: "Ballast water treatment UV lamp renewal",
    vessel: "MV Baltic Carrier",
    equipment: "BWTS / UV Reactor",
    priority: "High",
    assignee: "J. Fernandes (2/E)",
    due: "2026-08-20",
    day: 20,
    status: "Open",
  },
  {
    id: "WO-24231",
    title: "Steering gear hydraulic oil sampling",
    vessel: "OSV Arctic Guardian",
    equipment: "Steering Gear",
    priority: "Low",
    assignee: "M. Haugen (3/E)",
    due: "2026-08-06",
    day: 6,
    status: "Completed",
  },
  {
    id: "WO-24244",
    title: "Turbocharger cartridge inspection (ME)",
    vessel: "MT Gulf Navigator",
    equipment: "ME / Turbocharger",
    priority: "Critical",
    assignee: "P. Dsouza (C/E)",
    due: "2026-07-28",
    day: 28,
    status: "Overdue",
  },
  {
    id: "WO-24250",
    title: "Provision reefer compressor overhaul",
    vessel: "MV Coral Trader",
    equipment: "Reefer Unit 1",
    priority: "Medium",
    assignee: "L. Chen (3/E)",
    due: "2026-08-16",
    day: 16,
    status: "In Progress",
  },
];

const kanbanStatuses = ["Open", "In Progress", "Awaiting Approval", "Overdue", "Completed"];

export default function WorkOrdersPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState("List"); // List | Kanban | Calendar

  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    priority: "all",
    status: "all",
    type: "all",
  });

  const filteredData = useMemo(() => {
    return workOrdersCatalog.filter((w) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (w.id && w.id.toLowerCase().includes(q)) ||
          (w.title && w.title.toLowerCase().includes(q)) ||
          (w.equipment && w.equipment.toLowerCase().includes(q)) ||
          (w.assignee && w.assignee.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && w.vessel !== filters.vessel) return false;
      if (filters.priority && filters.priority !== "all" && w.priority !== filters.priority) return false;
      if (filters.status && filters.status !== "all" && w.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">OPERATIONS</div>
        <PageHeader
          title="Work orders"
          description="Fleet work order management with list, kanban and calendar views, filtered by vessel, priority and status."
          actions={
            <>
              <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
              <ExportButton />
              <button className="rounded-md bg-navy px-3 py-2 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition-colors cursor-pointer">
                New work order
              </button>
            </>
          }
        />
      </div>

      {/* Top KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Overdue</div>
          <div className="mt-2 text-3xl font-bold text-[#dc2626]">118</div>
          <div className="mt-2 text-xs font-medium text-[#dc2626] flex items-center gap-1">
            <span>↗</span> +12% vs last month
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Critical overdue</div>
          <div className="mt-2 text-3xl font-bold text-[#dc2626]">14</div>
          <div className="mt-2 text-xs font-medium text-gray-500">Immediate attention</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Awaiting approval</div>
          <div className="mt-2 text-3xl font-bold text-[#d97706]">22</div>
          <div className="mt-2 text-xs font-medium text-gray-500">Avg wait 3.2 days</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Due in 30 days</div>
          <div className="mt-2 text-3xl font-bold text-[#0052cc]">666</div>
          <div className="mt-2 text-xs font-medium text-gray-500">Planned maintenance</div>
        </div>
      </div>

      <FilterSection
        filterFields={workOrderFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* View Switcher Tabs (List | Kanban | Calendar) */}
      <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-100/70 p-1 w-fit">
        {["List", "Kanban", "Calendar"].map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setViewMode(mode)}
            className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === mode
                ? "bg-white text-gray-900 shadow-xs font-bold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* List View */}
      {viewMode === "List" && (
        <Panel padded={false}>
          <DataTable
            columns={["WO", "TITLE", "VESSEL", "EQUIPMENT", "PRIORITY", "ASSIGNED TO", "DUE", "STATUS"]}
            rows={filteredData.map((w) => [
              <span key="a" className="font-bold text-gray-900">{w.id}</span>,
              <span key="b" className="font-medium text-gray-800">{w.title}</span>,
              <span key="c" className="text-gray-600">{w.vessel}</span>,
              <span key="d" className="text-gray-600">{w.equipment}</span>,
              <span key="e" className="text-gray-700 font-medium">{w.priority}</span>,
              <span key="f" className="text-gray-600">{w.assignee}</span>,
              <span key="g" className="tabular-nums text-gray-600">{w.due}</span>,
              <StatusChip key="h" status={w.status} />,
            ])}
          />
        </Panel>
      )}

      {/* Kanban View */}
      {viewMode === "Kanban" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {kanbanStatuses.map((colStatus) => {
            const jobs = filteredData.filter((w) => w.status === colStatus);
            return (
              <div key={colStatus} className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{colStatus}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{jobs.length} jobs</p>
                </div>
                <div className="space-y-3">
                  {jobs.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-gray-200 bg-gray-50/60 p-3 shadow-xs hover:border-gray-300 transition-all space-y-2"
                    >
                      <h5 className="text-xs font-bold text-gray-900 line-clamp-2">{item.title}</h5>
                      <p className="text-[11px] text-gray-500">
                        {item.id} · {item.vessel}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 pt-1 border-t border-gray-100">
                        <span>{item.priority}</span>
                        <span>due {item.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === "Calendar" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">August 2026</h3>
            <p className="text-xs text-gray-500 mt-0.5">Scheduled maintenance by day</p>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => i + 1).map((dayNum) => {
              const dayWos = filteredData.filter((w) => w.day === dayNum);
              return (
                <div
                  key={dayNum}
                  className="min-h-[85px] rounded-lg border border-gray-200 bg-gray-50/40 p-2 flex flex-col justify-between"
                >
                  <span className="text-xs font-medium text-gray-500">{dayNum}</span>
                  <div className="space-y-1">
                    {dayWos.map((w) => (
                      <div
                        key={w.id}
                        className="rounded bg-sky-100 border border-sky-200 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 truncate"
                        title={`${w.id} - ${w.title}`}
                      >
                        {w.id}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}



