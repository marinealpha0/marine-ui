import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, WorkflowStepper } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { mocFilterFields } from "@/constant/FilterFields";

export const mocCatalog = [
  {
    id: "MOC-0421",
    change: "Replace ME lube oil grade to alternative supplier",
    vessel: "MT Ocean Star",
    initiator: "C/E S. Okafor",
    stage: "Approval",
    status: "Ready Ship Review",
  },
  {
    id: "MOC-0418",
    change: "Modify ballast line valve arrangement",
    vessel: "MV Atlantic Pioneer",
    initiator: "Supt. R. Grant",
    stage: "Review",
    status: "Vessel MOC Task",
  },
  {
    id: "MOC-0412",
    change: "PMS interval change for FW generator",
    vessel: "MT Nordic Spirit",
    initiator: "2/E J. Fernandes",
    stage: "Implementation",
    status: "Approved",
  },
  {
    id: "MOC-0405",
    change: "Temporary bypass of bilge alarm sensor",
    vessel: "MT Gulf Navigator",
    initiator: "C/E P. Dsouza",
    stage: "Verification",
    status: "Returned",
  },
];

const mocWorkflowSteps = [
  { num: 1, label: "Draft", state: "done" },
  { num: 2, label: "Review", state: "done" },
  { num: 3, label: "Approval", state: "active" },
  { num: 4, label: "Implementation", state: "upcoming" },
  { num: 5, label: "Verification", state: "upcoming" },
  { num: 6, label: "Closed", state: "upcoming" },
];

export default function MOCPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    stage: "all",
    owner: "",
  });

  const filteredData = useMemo(() => {
    return mocCatalog.filter((m) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (m.id && m.id.toLowerCase().includes(q)) ||
          (m.change && m.change.toLowerCase().includes(q)) ||
          (m.vessel && m.vessel.toLowerCase().includes(q)) ||
          (m.initiator && m.initiator.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && m.vessel !== filters.vessel) return false;
      if (filters.stage && filters.stage !== "all" && m.stage !== filters.stage) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">GOVERNANCE</div>
        <PageHeader
          title="Management of Change"
          description="Controlled changes to equipment, procedures and operating parameters with full verification trail."
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
          <div className="text-sm font-medium text-gray-700">Vessel MOC tasks</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">1</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Ready ship review</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">1</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Returned</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">1</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Closed YTD</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">31</div>
        </div>
      </div>

      {/* Workflow Stepper Banner */}
      <WorkflowStepper steps={mocWorkflowSteps} />

      <FilterSection
        filterFields={mocFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Change register</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["MOC", "CHANGE", "VESSEL", "INITIATOR", "STAGE", "STATUS"]}
          rows={filteredData.map((m) => [
            <span key="a" className="font-bold text-gray-900">{m.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{m.change}</span>,
            <span key="c" className="text-gray-600">{m.vessel}</span>,
            <span key="d" className="text-gray-600">{m.initiator}</span>,
            <span key="e" className="text-gray-600">{m.stage}</span>,
            <StatusChip key="f" status={m.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

