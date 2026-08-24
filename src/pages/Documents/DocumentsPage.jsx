import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { documentFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const documentsCatalog = tablesData.documentsCatalog;

export default function DocumentsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    type: "all",
    owner: "",
  });

  const filteredData = useMemo(() => {
    return documentsCatalog.filter((d) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (d.name && d.name.toLowerCase().includes(q)) ||
          (d.scope && d.scope.toLowerCase().includes(q)) ||
          (d.owner && d.owner.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && d.scope !== filters.vessel) return false;
      if (filters.type && filters.type !== "all" && d.type !== filters.type) return false;
      if (filters.owner && !d.owner?.toLowerCase().includes(filters.owner.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">KNOWLEDGE</div>
        <PageHeader
          title="Document Management"
          description="Controlled documents, manuals and plans with revision status and approval state."
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
        <SummaryCard label="Controlled documents" value="1284" tone="dark" />
        <SummaryCard label="Pending approval" value="6" tone="warning" borderLeft="amber" />
        <SummaryCard label="Revised this month" value="23" tone="info" />
        <SummaryCard label="Expired references" value="0" tone="healthy" />
      </div>

      <FilterSection
        filterFields={documentFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["DOCUMENT", "TYPE", "SCOPE", "OWNER", "UPDATED", "STATUS"]}
          rows={filteredData.map((d) => [
            <span key="a" className="font-bold text-gray-900">{d.name}</span>,
            <span key="b" className="text-gray-700 font-medium">{d.type}</span>,
            <span key="c" className="text-gray-600">{d.scope}</span>,
            <span key="d" className="text-gray-600">{d.owner}</span>,
            <span key="e" className="tabular-nums text-gray-600">{d.updated}</span>,
            <StatusChip key="f" status={d.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

