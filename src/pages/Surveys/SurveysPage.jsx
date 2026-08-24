import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { surveyFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const surveyScheduleCatalog = tablesData.surveysCatalog;

export default function SurveysPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
    surveyor: "",
  });

  const filteredData = useMemo(() => {
    return surveyScheduleCatalog.filter((s) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (s.id && s.id.toLowerCase().includes(q)) ||
          (s.survey && s.survey.toLowerCase().includes(q)) ||
          (s.vessel && s.vessel.toLowerCase().includes(q)) ||
          (s.provider && s.provider.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && s.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && s.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE</div>
        <PageHeader
          title="Surveys &amp; Services"
          description="Class and statutory survey windows, service provider attendance and completion evidence."
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
        <SummaryCard label="Upcoming (90 days)" value="11" tone="info" />
        <SummaryCard label="Overdue surveys" value="1" tone="critical" borderLeft="red" />
        <SummaryCard label="Pending approval" value="2" tone="warning" borderLeft="amber" />
        <SummaryCard label="Completed YTD" value="48" tone="healthy" />
      </div>

      <FilterSection
        filterFields={surveyFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "SURVEY", "VESSEL", "CLASS / PROVIDER", "WINDOW", "STATUS"]}
          rows={filteredData.map((s) => [
            <span key="a" className="font-bold text-gray-900">{s.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{s.survey}</span>,
            <span key="c" className="text-gray-600">{s.vessel}</span>,
            <span key="d" className="text-gray-600">{s.provider}</span>,
            <span key="e" className="tabular-nums text-gray-600">{s.window}</span>,
            <StatusChip key="f" status={s.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

