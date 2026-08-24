import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { deviationFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const deviationsCatalog = tablesData.deviationsCatalog;

export default function DeviationsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    severity: "all",
    status: "all",
  });

  const filteredData = useMemo(() => {
    return deviationsCatalog.filter((d) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (d.id && d.id.toLowerCase().includes(q)) ||
          (d.deviation && d.deviation.toLowerCase().includes(q)) ||
          (d.vessel && d.vessel.toLowerCase().includes(q)) ||
          (d.owner && d.owner.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && d.vessel !== filters.vessel) return false;
      if (filters.severity && filters.severity !== "all" && d.severity !== filters.severity) return false;
      if (filters.status && filters.status !== "all" && d.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE &amp; QHSE</div>
        <PageHeader
          title="Deviations"
          description="Approved departures from planned operations and maintenance, with severity, owner and ageing."
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
        <SummaryCard label="Open deviations" value="4" tone="warning" borderLeft="amber" />
        <SummaryCard label="Pending approval" value="1" tone="info" />
        <SummaryCard label="Overdue duration" value="1" tone="critical" borderLeft="red" />
        <SummaryCard label="Closed this quarter" value="23" tone="healthy" />
      </div>

      <FilterSection
        filterFields={deviationFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "DEVIATION", "VESSEL", "SEVERITY", "OWNER", "AGE (DAYS)", "STATUS"]}
          rows={filteredData.map((d) => [
            <span key="a" className="font-bold text-gray-900">{d.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{d.deviation}</span>,
            <span key="c" className="text-gray-600">{d.vessel}</span>,
            <span key="d" className="text-gray-600">{d.severity}</span>,
            <span key="e" className="text-gray-600">{d.owner}</span>,
            <span key="f" className="tabular-nums text-gray-600">{d.age}</span>,
            <StatusChip key="g" status={d.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

