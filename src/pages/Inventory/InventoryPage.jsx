import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { inventoryFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const inventoryStockCatalog = tablesData.inventoryStockCatalog;

export default function InventoryPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    category: "all",
    supplier: "",
  });

  const filteredData = useMemo(() => {
    return inventoryStockCatalog.filter((p) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (p.part && p.part.toLowerCase().includes(q)) ||
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.vessel && p.vessel.toLowerCase().includes(q)) ||
          (p.supplier && p.supplier.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && p.vessel !== filters.vessel) return false;
      if (filters.category && filters.category !== "all" && p.category !== filters.category) return false;
      if (filters.supplier && !p.supplier?.toLowerCase().includes(filters.supplier.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">ASSETS</div>
        <PageHeader
          title="Inventory"
          description="Spare part stock levels across vessels."
          actions={
            <>
              <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
              <ExportButton />
            </>
          }
        />
      </div>

      {/* Top KPI Card */}
      <div className="w-full sm:w-64">
        <SummaryCard label="Below minimum" value="8" tone="warning" borderLeft="amber" />
      </div>

      <FilterSection
        filterFields={inventoryFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Stock Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["PART", "DESCRIPTION", "VESSEL", "QTY", "MIN"]}
          rows={filteredData.map((p) => [
            <span key="a" className="font-bold text-gray-900">{p.part}</span>,
            <span key="b" className="text-gray-700 font-medium">{p.name}</span>,
            <span key="c" className="text-gray-600">{p.vessel}</span>,
            <span key="d" className="tabular-nums text-gray-700 font-medium">{p.qty}</span>,
            <span key="e" className="tabular-nums text-gray-500">{p.min}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}


