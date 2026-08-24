import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard, WorkflowStepper } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { capaFilterFields } from "@/constant/FilterFields";

export const correctiveActionsCatalog = [
  {
    id: "CA-2291",
    finding: "Oil mist detector alarm not tested per SMS",
    vessel: "MV Pacific Endeavour",
    owner: "C/E K. Tan",
    due: "2026-08-18",
    status: "In Progress",
  },
  {
    id: "CA-2288",
    finding: "Missing entry in garbage record book",
    vessel: "MV Coral Trader",
    owner: "C/O A. Reyes",
    due: "2026-08-12",
    status: "Open",
  },
  {
    id: "CA-2280",
    finding: "Inadequate lighting in steering flat",
    vessel: "MT Gulf Navigator",
    owner: "ETO J. Rivera",
    due: "2026-07-31",
    status: "Overdue",
  },
  {
    id: "CA-2275",
    finding: "PMS job closed without running hours",
    vessel: "MT Ocean Star",
    owner: "2/E R. Malhotra",
    due: "2026-08-22",
    status: "Open",
  },
  {
    id: "CA-2268",
    finding: "Lifeboat release gear maintenance record gap",
    vessel: "MV Atlantic Pioneer",
    owner: "3/O T. Nakamura",
    due: "2026-08-09",
    status: "Extension",
  },
];

const caWorkflowSteps = [
  { num: 1, label: "Raised", state: "done" },
  { num: 2, label: "Assigned", state: "done" },
  { num: 3, label: "In Progress", state: "active" },
  { num: 4, label: "Verification", state: "upcoming" },
  { num: 5, label: "Closed", state: "upcoming" },
];

export default function CAPAPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
  });

  const filteredCorrective = useMemo(() => {
    return correctiveActionsCatalog.filter((c) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (c.id && c.id.toLowerCase().includes(q)) ||
          (c.finding && c.finding.toLowerCase().includes(q)) ||
          (c.vessel && c.vessel.toLowerCase().includes(q)) ||
          (c.owner && c.owner.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && c.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && c.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE &amp; QHSE</div>
        <PageHeader
          title="Corrective Actions"
          description="Actions raised from non-conformities, inspections, audits and defect reports."
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
        <SummaryCard label="Open" value="5" tone="warning" borderLeft="amber" />
        <SummaryCard label="In progress" value="3" tone="info" />
        <SummaryCard label="Overdue" value="1" tone="critical" borderLeft="red" />
        <SummaryCard label="Closed (30 days)" value="14" tone="healthy" />
      </div>

      {/* Workflow Stepper Banner */}
      <WorkflowStepper steps={caWorkflowSteps} />

      <FilterSection
        filterFields={capaFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "FINDING", "VESSEL", "OWNER", "DUE", "STATUS"]}
          rows={filteredCorrective.map((c) => [
            <span key="a" className="font-bold text-gray-900">{c.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{c.finding}</span>,
            <span key="c" className="text-gray-600">{c.vessel}</span>,
            <span key="d" className="text-gray-600">{c.owner}</span>,
            <span key="e" className="tabular-nums text-gray-600">{c.due}</span>,
            <StatusChip key="f" status={c.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}



