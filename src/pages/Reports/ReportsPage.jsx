import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { reportFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const reportsActivityCatalog = tablesData.reportsCatalog;

export default function ReportsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    category: "all",
    cadence: "all",
    owner: "",
  });

  const filteredData = useMemo(() => {
    return reportsActivityCatalog.filter((r) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (r.actor && r.actor.toLowerCase().includes(q)) ||
          (r.action && r.action.toLowerCase().includes(q)) ||
          (r.scope && r.scope.toLowerCase().includes(q)) ||
          (r.source && r.source.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">INSIGHT</div>
        <PageHeader
          title="Reports"
          description="Standard and custom reporting library across maintenance, procurement and compliance data."
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
        <SummaryCard label="Events (24h)" value="1842" tone="dark" />
        <SummaryCard label="Approvals" value="46" tone="info" />
        <SummaryCard label="Permission changes" value="3" tone="warning" borderLeft="amber" />
        <SummaryCard label="Failed sign-ins" value="2" tone="critical" borderLeft="red" />
      </div>

      <FilterSection
        filterFields={reportFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["TIMESTAMP", "ACTOR", "ACTION", "SCOPE", "SOURCE"]}
          rows={filteredData.map((r) => [
            <span key="a" className="font-bold text-gray-900 tabular-nums">{r.timestamp}</span>,
            <span key="b" className="text-gray-600 font-mono text-xs">{r.actor}</span>,
            <span key="c" className="text-gray-700 font-medium">{r.action}</span>,
            <span key="d" className="text-gray-600">{r.scope}</span>,
            <span key="e" className="text-gray-500 tabular-nums font-mono text-xs">{r.source}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}

