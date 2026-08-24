import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, WorkflowStepper } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { requisitionFilterFields } from "@/constant/FilterFields";

export const openRequisitionsData = [
  {
    id: "REQ-8842",
    description: "Engine room consumables — Q3",
    vessel: "MT Nordic Spirit",
    requester: "2/E J. Fernandes",
    value: "USD 8,420",
    status: "Approved",
  },
  {
    id: "REQ-8851",
    description: "ME cylinder head spares",
    vessel: "MT Ocean Star",
    requester: "C/E S. Okafor",
    value: "USD 41,300",
    status: "Under Review",
  },
  {
    id: "REQ-8858",
    description: "Deck paint & coatings",
    vessel: "MV Coral Trader",
    requester: "C/O M. Bakker",
    value: "USD 12,780",
    status: "Draft",
  },
  {
    id: "REQ-8860",
    description: "BWTS UV lamps (set of 4)",
    vessel: "MV Baltic Carrier",
    requester: "2/E L. Chen",
    value: "USD 5,800",
    status: "Ordered",
  },
  {
    id: "REQ-8863",
    description: "Safety equipment renewal",
    vessel: "MV Atlantic Pioneer",
    requester: "Safety Officer",
    value: "USD 9,140",
    status: "Partially Received",
  },
  {
    id: "REQ-8865",
    description: "Turbocharger cartridge exchange",
    vessel: "MT Gulf Navigator",
    requester: "C/E P. Dsouza",
    value: "USD 74,000",
    status: "Submitted",
  },
];

const workflowSteps = [
  { num: 1, label: "Draft", state: "done" },
  { num: 2, label: "Submitted", state: "done" },
  { num: 3, label: "Under Review", state: "active" },
  { num: 4, label: "Approved", state: "upcoming" },
  { num: 5, label: "Ordered", state: "upcoming" },
  { num: 6, label: "Partially Received", state: "upcoming" },
  { num: 7, label: "Completed", state: "upcoming" },
];

export default function RequisitionsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    raisedBy: "",
  });

  const filteredData = useMemo(() => {
    return openRequisitionsData.filter((r) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (r.id && r.id.toLowerCase().includes(q)) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          (r.vessel && r.vessel.toLowerCase().includes(q)) ||
          (r.requester && r.requester.toLowerCase().includes(q));
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
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">SUPPLY &amp; PROCUREMENT</div>
        <PageHeader
          title="Requisitions"
          description="Requisition lifecycle from draft to completion, with approval routing per vessel and department."
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
          <div className="text-sm font-medium text-gray-700">Awaiting review</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">12</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">PRs not processed &gt; 100 days</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">5</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Item drafts &gt; 7 days</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">21</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Approved this month</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">64</div>
        </div>
      </div>

      {/* Workflow Stepper Banner */}
      <WorkflowStepper steps={workflowSteps} />

      <FilterSection
        filterFields={requisitionFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Open requisitions</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["REQUISITION", "DESCRIPTION", "VESSEL", "REQUESTER", "VALUE", "STATUS"]}
          rows={filteredData.map((r) => [
            <span key="a" className="font-bold text-gray-900">{r.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{r.description}</span>,
            <span key="c" className="text-gray-600">{r.vessel}</span>,
            <span key="d" className="text-gray-600">{r.requester}</span>,
            <span key="e" className="tabular-nums font-medium text-gray-700">{r.value}</span>,
            <StatusChip key="f" status={r.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

