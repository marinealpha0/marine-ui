import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { receiptFilterFields } from "@/constant/FilterFields";

export const receiptsData = [
  {
    grn: "GRN-5521",
    po: "PO-2026-1190",
    vessel: "MT Nordic Spirit",
    lines: "18 of 24 lines",
    port: "Gothenburg",
    date: "2026-08-08",
    status: "Partially Received",
  },
  {
    grn: "GRN-5518",
    po: "PO-2026-1211",
    vessel: "MV Baltic Carrier",
    lines: "12 of 12 lines",
    port: "Gdańsk",
    date: "2026-08-06",
    status: "Received",
  },
  {
    grn: "GRN-5510",
    po: "PO-2026-1174",
    vessel: "MT Ocean Star",
    lines: "2 lines",
    port: "Singapore",
    date: "2026-08-03",
    status: "Returned",
  },
  {
    grn: "GRN-5507",
    po: "PO-2026-1169",
    vessel: "MV Pacific Endeavour",
    lines: "1 line",
    port: "Busan",
    date: "2026-08-01",
    status: "Damaged",
  },
  {
    grn: "GRN-5502",
    po: "PO-2026-1160",
    vessel: "OSV Arctic Guardian",
    lines: "7 lines",
    port: "Stavanger",
    date: "2026-07-29",
    status: "Pending Inspection",
  },
];

export default function ReceiptsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    state: "all",
    port: "",
  });

  const filteredData = useMemo(() => {
    return receiptsData.filter((r) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (r.grn && r.grn.toLowerCase().includes(q)) ||
          (r.po && r.po.toLowerCase().includes(q)) ||
          (r.vessel && r.vessel.toLowerCase().includes(q)) ||
          (r.port && r.port.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && r.vessel !== filters.vessel) return false;
      if (filters.state && filters.state !== "all" && r.status !== filters.state) return false;
      if (filters.port && !r.port?.toLowerCase().includes(filters.port.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">SUPPLY &amp; PROCUREMENT</div>
        <PageHeader
          title="Receipts & Returns"
          description="Goods receipt notes, partial deliveries, damaged goods and supplier returns by port call."
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
          <div className="text-sm font-medium text-gray-700">Pending inspection</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">7</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Partially received</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">34</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Damaged on arrival</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">2</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Returns in transit</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">3</div>
        </div>
      </div>

      <FilterSection
        filterFields={receiptFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Latest receipts</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
        <DataTable
          columns={["GRN", "PO", "VESSEL", "LINES", "PORT", "DATE", "STATUS"]}
          rows={filteredData.map((r) => [
            <span key="a" className="font-bold text-gray-900">{r.grn}</span>,
            <span key="b" className="text-gray-600 font-medium">{r.po}</span>,
            <span key="c" className="text-gray-600">{r.vessel}</span>,
            <span key="d" className="text-gray-600">{r.lines}</span>,
            <span key="e" className="text-gray-600">{r.port}</span>,
            <span key="f" className="tabular-nums text-gray-600">{r.date}</span>,
            <StatusChip key="g" status={r.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}


