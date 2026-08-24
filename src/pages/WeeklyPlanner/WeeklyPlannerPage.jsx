import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { weeklyPlannerFilterFields } from "@/constant/FilterFields";
import { weeklyPlan } from "@/data/marine";

export default function WeeklyPlannerPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    status: "all",
  });

  const filteredData = useMemo(() => {
    return weeklyPlan.filter((p) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (p.vessel && p.vessel.toLowerCase().includes(q)) ||
          (p.plan && p.plan.toLowerCase().includes(q)) ||
          (p.week && p.week.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && p.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && p.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Maintenance Planner"
        description="Weekly work packages by vessel, planned jobs and approval stage"
        actions={
          <>
            <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
            <ExportButton />
          </>
        }
      />
      <FilterSection
        filterFields={weeklyPlannerFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />
      <Panel padded={false}>
        <DataTable
          columns={["Vessel", "Plan", "Week", "Planned items", "Status"]}
          rows={filteredData.map((p) => [
            <span key="a" className="font-medium">{p.vessel}</span>,
            p.plan,
            p.week,
            <span key="d" className="tabular-nums">{p.items}</span>,
            <StatusChip key="e" status={p.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}
