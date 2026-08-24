import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard, WorkflowStepper } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { permitFilterFields } from "@/constant/FilterFields";

export const permitsCatalog = [
  {
    id: "PTW-3391",
    type: "Hot Work",
    vessel: "MT Ocean Star",
    location: "Engine Room — Purifier flat",
    risk: "High",
    requester: "2/E R. Malhotra",
    approver: "C/E S. Okafor",
    expiry: "2026-08-11 18:00",
    status: "To Approve",
  },
  {
    id: "PTW-3392",
    type: "Enclosed Space Entry",
    vessel: "MV Atlantic Pioneer",
    location: "Cargo Hold No.3",
    risk: "Critical",
    requester: "C/O M. Bakker",
    approver: "Master",
    expiry: "2026-08-10 22:00",
    status: "Ready Ship Review",
  },
  {
    id: "PTW-3388",
    type: "Aloft Work",
    vessel: "MT Nordic Spirit",
    location: "Radar Mast",
    risk: "Medium",
    requester: "2/O A. Ivanov",
    approver: "Master",
    expiry: "2026-08-12 16:00",
    status: "Pending Closure",
  },
  {
    id: "PTW-3385",
    type: "Electrical Isolation",
    vessel: "MV Baltic Carrier",
    location: "Main Switchboard",
    risk: "High",
    requester: "ETO J. Rivera",
    approver: "C/E",
    expiry: "2026-08-09 12:00",
    status: "Returned",
  },
];

const ptwWorkflowSteps = [
  { num: 1, label: "Requested", state: "done" },
  { num: 2, label: "Risk Assessed", state: "done" },
  { num: 3, label: "Approved", state: "active" },
  { num: 4, label: "Active", state: "upcoming" },
  { num: 5, label: "Closed", state: "upcoming" },
];

export default function PermitToWorkPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    type: "all",
    risk: "all",
    status: "all",
  });

  const filteredData = useMemo(() => {
    return permitsCatalog.filter((p) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (p.id && p.id.toLowerCase().includes(q)) ||
          (p.type && p.type.toLowerCase().includes(q)) ||
          (p.location && p.location.toLowerCase().includes(q)) ||
          (p.approver && p.approver.toLowerCase().includes(q)) ||
          (p.requester && p.requester.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && p.vessel !== filters.vessel) return false;
      if (filters.type && filters.type !== "all" && p.type !== filters.type) return false;
      if (filters.risk && filters.risk !== "all" && p.risk !== filters.risk) return false;
      if (filters.status && filters.status !== "all" && p.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">SAFETY MANAGEMENT</div>
        <PageHeader
          title="Permit To Work"
          description="Live permits with risk level, approver chain and expiry — closure required before validity ends."
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
        <SummaryCard label="To approve" value="1" tone="warning" borderLeft="amber" />
        <SummaryCard label="Ready ship review" value="1" tone="info" />
        <SummaryCard label="Pending closure" value="1" tone="warning" borderLeft="amber" />
        <SummaryCard label="Expired without closure" value="1" tone="critical" borderLeft="red" />
      </div>

      {/* Workflow Stepper Banner */}
      <WorkflowStepper steps={ptwWorkflowSteps} />

      <FilterSection
        filterFields={permitFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Active permits</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["PERMIT", "TYPE", "VESSEL", "LOCATION", "RISK", "REQUESTER", "APPROVER", "EXPIRY", "STATUS"]}
          rows={filteredData.map((p) => [
            <span key="a" className="font-bold text-gray-900">{p.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{p.type}</span>,
            <span key="c" className="text-gray-600">{p.vessel}</span>,
            <span key="d" className="text-gray-600">{p.location}</span>,
            <span key="e" className="text-gray-600 font-medium">{p.risk}</span>,
            <span key="f" className="text-gray-600">{p.requester}</span>,
            <span key="g" className="text-gray-600">{p.approver}</span>,
            <span key="h" className="tabular-nums text-gray-600">{p.expiry}</span>,
            <StatusChip key="i" status={p.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

