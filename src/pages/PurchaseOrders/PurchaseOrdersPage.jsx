import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard, WorkflowStepper } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { purchaseOrderFilterFields } from "@/constant/FilterFields";

export const purchaseOrdersData = [
  {
    po: "PO-2026-1184",
    supplier: "Wärtsilä Services",
    vessel: "MT Ocean Star",
    amount: "84,200",
    currency: "USD",
    expected: "2026-08-19",
    status: "Ordered",
  },
  {
    po: "PO-2026-1190",
    supplier: "Alfa Laval Marine",
    vessel: "MT Nordic Spirit",
    amount: "21,750",
    currency: "EUR",
    expected: "2026-08-14",
    status: "Partially Received",
  },
  {
    po: "PO-2026-1201",
    supplier: "MAN Energy Solutions",
    vessel: "MV Pacific Endeavour",
    amount: "156,900",
    currency: "USD",
    expected: "2026-09-02",
    status: "Pending Approval",
  },
  {
    po: "PO-2026-1207",
    supplier: "Kongsberg Maritime",
    vessel: "OSV Arctic Guardian",
    amount: "43,100",
    currency: "NOK",
    expected: "2026-08-22",
    status: "Approved",
  },
  {
    po: "PO-2026-1211",
    supplier: "Survitec Group",
    vessel: "MV Baltic Carrier",
    amount: "9,820",
    currency: "USD",
    expected: "2026-08-12",
    status: "Received",
  },
  {
    po: "PO-2026-1215",
    supplier: "Jotun Marine Coatings",
    vessel: "MV Coral Trader",
    amount: "67,400",
    currency: "USD",
    expected: "2026-08-30",
    status: "Overdue",
  },
];

const poWorkflowSteps = [
  { num: 1, label: "Pending", state: "done" },
  { num: 2, label: "Approved", state: "done" },
  { num: 3, label: "Ordered", state: "active" },
  { num: 4, label: "Partially Received", state: "upcoming" },
  { num: 5, label: "Received", state: "upcoming" },
  { num: 6, label: "Closed", state: "upcoming" },
];

export default function PurchaseOrdersPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    supplier: "",
  });

  const filteredData = useMemo(() => {
    return purchaseOrdersData.filter((p) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (p.po && p.po.toLowerCase().includes(q)) ||
          (p.supplier && p.supplier.toLowerCase().includes(q)) ||
          (p.vessel && p.vessel.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && p.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.supplier && !p.supplier?.toLowerCase().includes(filters.supplier.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">SUPPLY &amp; PROCUREMENT</div>
        <PageHeader
          title="Purchase Orders"
          description="Track supplier commitments, delivery windows and receipt status across the fleet."
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
        <SummaryCard label="Open POs" value="187" tone="info" />
        <SummaryCard label="Ordered > 90 days" value="791" tone="warning" borderLeft="amber" />
        <SummaryCard label="Overdue delivery" value="6" tone="critical" borderLeft="red" />
        <SummaryCard label="Committed spend (USD)" value="1.42M" tone="dark" subtext="↗ +4% vs last month" />
      </div>

      {/* Workflow Stepper Banner */}
      <WorkflowStepper steps={poWorkflowSteps} />

      <FilterSection
        filterFields={purchaseOrderFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent purchase orders</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["PO NUMBER", "SUPPLIER", "VESSEL", "AMOUNT", "CURRENCY", "EXPECTED", "STATUS"]}
          rows={filteredData.map((p) => [
            <span key="a" className="font-bold text-gray-900">{p.po}</span>,
            <span key="b" className="text-gray-700 font-medium">{p.supplier}</span>,
            <span key="c" className="text-gray-600">{p.vessel}</span>,
            <span key="d" className="tabular-nums font-semibold text-gray-800">{p.amount}</span>,
            <span key="e" className="text-gray-600 font-medium">{p.currency}</span>,
            <span key="f" className="tabular-nums text-gray-600">{p.expected}</span>,
            <StatusChip key="g" status={p.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

