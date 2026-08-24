import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard, WorkflowStepper } from "@/components/app/kit";
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
        <SummaryCard label="Awaiting review" value="12" tone="warning" borderLeft="amber" />
        <SummaryCard label="PRs not processed > 100 days" value="5" tone="critical" borderLeft="red" />
        <SummaryCard label="Item drafts > 7 days" value="21" tone="warning" borderLeft="amber" />
        <SummaryCard label="Approved this month" value="64" tone="healthy" />
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
      <Panel padded={false}>
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

