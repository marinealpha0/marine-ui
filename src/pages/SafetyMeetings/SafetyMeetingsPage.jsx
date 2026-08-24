import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { safetyMeetingFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const safetyMeetingsCatalog = tablesData.safetyMeetingsCatalog;

export default function SafetyMeetingsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    chair: "",
  });

  const filteredData = useMemo(() => {
    return safetyMeetingsCatalog.filter((m) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (m.id && m.id.toLowerCase().includes(q)) ||
          (m.meeting && m.meeting.toLowerCase().includes(q)) ||
          (m.vessel && m.vessel.toLowerCase().includes(q)) ||
          (m.chair && m.chair.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && m.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && m.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">SAFETY MANAGEMENT</div>
        <PageHeader
          title="Safety Meetings &amp; Shipboard Review"
          description="Meeting submissions, ship review status and open action items with due dates."
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
        <SummaryCard label="To submit" value="3" tone="warning" borderLeft="amber" />
        <SummaryCard label="Pending ship review" value="1" tone="info" />
        <SummaryCard label="Overdue" value="1" tone="critical" borderLeft="red" />
        <SummaryCard label="Completed (30 days)" value="14" tone="healthy" />
      </div>

      <FilterSection
        filterFields={safetyMeetingFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "MEETING", "VESSEL", "DATE", "CHAIR", "ACTIONS", "STATUS"]}
          rows={filteredData.map((m) => [
            <span key="a" className="font-bold text-gray-900">{m.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{m.meeting}</span>,
            <span key="c" className="text-gray-600">{m.vessel}</span>,
            <span key="d" className="tabular-nums text-gray-600">{m.date}</span>,
            <span key="e" className="text-gray-600">{m.chair}</span>,
            <span key="f" className="tabular-nums text-gray-600 font-medium">{m.actions}</span>,
            <StatusChip key="g" status={m.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

