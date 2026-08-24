import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { picFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const picTasksCatalog = tablesData.picTasksCatalog;

export default function PICPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    pic: "",
  });

  const filteredData = useMemo(() => {
    return picTasksCatalog.filter((t) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (t.id && t.id.toLowerCase().includes(q)) ||
          (t.task && t.task.toLowerCase().includes(q)) ||
          (t.vessel && t.vessel.toLowerCase().includes(q)) ||
          (t.pic && t.pic.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && t.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && t.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">GOVERNANCE</div>
        <PageHeader
          title="Person In Charge"
          description="Task ownership across vessels — assigned, pending, overdue and completed responsibilities."
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
        <SummaryCard label="Assigned" value="24" tone="info" />
        <SummaryCard label="Pending" value="9" tone="warning" borderLeft="amber" />
        <SummaryCard label="Overdue" value="3" tone="critical" borderLeft="red" />
        <SummaryCard label="Completed (30 days)" value="61" tone="healthy" />
      </div>

      <FilterSection
        filterFields={picFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "TASK", "VESSEL", "PERSON IN CHARGE", "DUE", "STATUS"]}
          rows={filteredData.map((t) => [
            <span key="a" className="font-bold text-gray-900">{t.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{t.task}</span>,
            <span key="c" className="text-gray-600">{t.vessel}</span>,
            <span key="d" className="text-gray-600">{t.pic}</span>,
            <span key="e" className="tabular-nums text-gray-600">{t.due}</span>,
            <StatusChip key="f" status={t.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

