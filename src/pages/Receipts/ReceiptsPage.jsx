import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { receiptFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const receiptsData = tablesData.receiptsCatalog;

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
        <SummaryCard label="Pending inspection" value="7" tone="warning" borderLeft="amber" />
        <SummaryCard label="Partially received" value="34" tone="info" />
        <SummaryCard label="Damaged on arrival" value="2" tone="critical" borderLeft="red" />
        <SummaryCard label="Returns in transit" value="3" tone="info" />
      </div>

      <FilterSection
        filterFields={receiptFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
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


