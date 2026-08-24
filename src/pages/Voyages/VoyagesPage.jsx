import React, { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, ProgressBar, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { voyageFilterFields } from "@/constant/FilterFields";

export const handoverRegisterData = [
  {
    id: "HO-1188",
    rank: "Chief Engineer",
    vessel: "MT Ocean Star",
    outgoing: "S. Okafor",
    incoming: "P. Dsouza",
    date: "2026-08-19",
    progress: 75,
    status: "Ready For Ship Review",
  },
  {
    id: "HO-1184",
    rank: "Second Engineer",
    vessel: "MV Atlantic Pioneer",
    outgoing: "J. Fernandes",
    incoming: "L. Chen",
    date: "2026-08-14",
    progress: 50,
    status: "PIC Pending Tasks",
  },
  {
    id: "HO-1179",
    rank: "Master",
    vessel: "OSV Arctic Guardian",
    outgoing: "L. Hansen",
    incoming: "M. Haugen",
    date: "2026-08-06",
    progress: 30,
    status: "PIC Overdue",
  },
  {
    id: "HO-1170",
    rank: "Chief Officer",
    vessel: "MV Baltic Carrier",
    outgoing: "M. Bakker",
    incoming: "A. Reyes",
    date: "2026-07-30",
    progress: 100,
    status: "Completed",
  },
];

const summaryCards = [
  {
    id: "review",
    label: "Ready for ship review",
    value: 1,
    borderColor: "border-l-sky-500",
    valueColor: "text-[#0052cc]",
  },
  {
    id: "pending",
    label: "PIC pending tasks",
    value: 1,
    borderColor: "border-l-[#f59e0b]",
    valueColor: "text-[#d97706]",
  },
  {
    id: "overdue",
    label: "PIC overdue",
    value: 1,
    borderColor: "border-l-[#ef4444]",
    valueColor: "text-[#dc2626]",
  },
  {
    id: "completed",
    label: "Completed (90 days)",
    value: 18,
    borderColor: "border-l-emerald-500",
    valueColor: "text-[#059669]",
  },
];

const workflowSteps = [
  { id: 1, label: "1 Initiated" },
  { id: 2, label: "2 Checklist" },
  { id: 3, label: "3 Joint Review" },
  { id: 4, label: "4 Ship Review" },
  { id: 5, label: "5 Closed" },
];

export default function VoyagesPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [activeStage, setActiveStage] = useState(4); // Default to Stage 4 (Ship Review)
  const [selectedRef, setSelectedRef] = useState(handoverRegisterData[0]?.id || "HO-1188");

  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    rank: "",
  });

  const filteredData = useMemo(() => {
    return handoverRegisterData.filter((item) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (item.id && item.id.toLowerCase().includes(q)) ||
          (item.vessel && item.vessel.toLowerCase().includes(q)) ||
          (item.rank && item.rank.toLowerCase().includes(q)) ||
          (item.outgoing && item.outgoing.toLowerCase().includes(q)) ||
          (item.incoming && item.incoming.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && item.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && item.status !== filters.status) return false;
      if (filters.rank && !item.rank?.toLowerCase().includes(filters.rank.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Voyage Management & Handover"
        description="Active officer handovers, review workflow stages and progress tracking"
        actions={
          <>
            <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
            <ExportButton />
          </>
        }
      />

      {/* Summary KPI Cards Grid (Matching reference UI) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm ${
              card.borderColor !== "border-l-sky-500" ? `border-l-[4px] ${card.borderColor}` : ""
            }`}
          >
            <span className="text-sm font-medium text-gray-700">{card.label}</span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className={`font-display text-3xl font-bold tracking-tight ${card.valueColor}`}>
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Progress Banner (Matching reference UI) */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Workflow</h3>
          <p className="text-xs text-gray-500 mt-0.5">Current stage highlighted</p>
        </div>

        {/* Horizontal Workflow Step Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
          {workflowSteps.map((step, index) => {
            const isCompleted = step.id < activeStage;
            const isCurrent = step.id === activeStage;

            return (
              <React.Fragment key={step.id}>
                {/* Step Pill */}
                <button
                  type="button"
                  onClick={() => setActiveStage(step.id)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition-all duration-200 cursor-pointer ${
                    isCompleted
                      ? "border border-[#86efac] bg-[#f0fdf4] text-[#166534] font-semibold"
                      : isCurrent
                      ? "border border-[#7dd3fc] bg-[#e0f2fe] text-[#0369a1] font-bold shadow-xs scale-[1.02]"
                      : "border border-gray-200 bg-gray-50 text-gray-500 font-medium"
                  }`}
                >
                  {isCompleted ? <Check className="size-3.5 text-[#166534] stroke-[3]" /> : null}
                  <span>{step.label}</span>
                </button>

                {/* Line Separator */}
                {index < workflowSteps.length - 1 && (
                  <div
                    className={`h-[1px] w-6 sm:w-10 transition-colors duration-300 ${
                      step.id < activeStage ? "bg-emerald-400" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <FilterSection
        filterFields={voyageFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "RANK", "VESSEL", "OUTGOING", "INCOMING", "DATE", "PROGRESS", "STATUS"]}
          rows={filteredData.map((item) => [
            <button
              key="a"
              type="button"
              onClick={() => {
                setSelectedRef(item.id);
                if (item.status === "Ready For Ship Review") setActiveStage(4);
                else if (item.status === "PIC Pending Tasks") setActiveStage(2);
                else if (item.status === "PIC Overdue") setActiveStage(3);
                else if (item.status === "Completed") setActiveStage(5);
              }}
              className={`font-semibold text-left hover:underline cursor-pointer ${
                item.id === selectedRef ? "text-ocean" : "text-gray-900"
              }`}
            >
              {item.id}
            </button>,
            <span key="b" className="text-gray-600">{item.rank}</span>,
            <span key="c" className="text-gray-600">{item.vessel}</span>,
            <span key="d" className="text-gray-500">{item.outgoing}</span>,
            <span key="e" className="text-gray-500">{item.incoming}</span>,
            <span key="f" className="tabular-nums text-gray-600">{item.date}</span>,
            <div key="g" className="w-28">
              <ProgressBar value={item.progress} tone={item.progress === 100 ? "healthy" : "info"} />
            </div>,
            <StatusChip key="h" status={item.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}
