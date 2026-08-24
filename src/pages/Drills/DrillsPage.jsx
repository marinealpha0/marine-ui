import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { drillFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const drillsCatalog = tablesData.drillsCatalog;

export default function DrillsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    type: "all",
    status: "all",
  });

  const filteredData = useMemo(() => {
    return drillsCatalog.filter((d) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (d.id && d.id.toLowerCase().includes(q)) ||
          (d.type && d.type.toLowerCase().includes(q)) ||
          (d.vessel && d.vessel.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && d.vessel !== filters.vessel) return false;
      if (filters.type && filters.type !== "all" && d.type !== filters.type) return false;
      if (filters.status && filters.status !== "all" && d.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">SAFETY MANAGEMENT</div>
        <PageHeader
          title="Drills"
          description="Statutory drill scheduling, participation and post-drill review across all vessels."
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
        <SummaryCard label="Scheduled (30 days)" value="9" tone="info" />
        <SummaryCard label="Pending review" value="1" tone="warning" borderLeft="amber" />
        <SummaryCard label="Overdue drills" value="0" tone="healthy" />
        <SummaryCard label="Completed YTD" value="142" tone="healthy" />
      </div>

      <FilterSection
        filterFields={drillFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "DRILL TYPE", "VESSEL", "SCHEDULED", "PARTICIPANTS", "STATUS"]}
          rows={filteredData.map((d) => [
            <span key="a" className="font-bold text-gray-900">{d.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{d.type}</span>,
            <span key="c" className="text-gray-600">{d.vessel}</span>,
            <span key="d" className="tabular-nums text-gray-600">{d.scheduled}</span>,
            <span key="e" className="tabular-nums text-gray-600 font-medium">{d.participants}</span>,
            <StatusChip key="f" status={d.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

