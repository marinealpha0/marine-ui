import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { riskFilterFields } from "@/constant/FilterFields";
import tablesData from "@/constant/tablesData.json";

export const riskRegisterCatalog = tablesData.riskCatalog;

export default function RiskPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    severity: "all",
    mitigation: "all",
  });

  const filteredData = useMemo(() => {
    return riskRegisterCatalog.filter((r) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (r.id && r.id.toLowerCase().includes(q)) ||
          (r.hazard && r.hazard.toLowerCase().includes(q)) ||
          (r.vessel && r.vessel.toLowerCase().includes(q)) ||
          (r.owner && r.owner.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && r.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && r.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE &amp; QHSE</div>
        <PageHeader
          title="Risk Management"
          description="Risk assessments, mitigation status and ship review approvals across the fleet."
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
        <SummaryCard label="Open risks" value="18" tone="warning" borderLeft="amber" />
        <SummaryCard label="High / critical" value="4" tone="critical" borderLeft="red" />
        <SummaryCard label="Awaiting RA ship review" value="2" tone="info" />
        <SummaryCard label="Mitigated (30 days)" value="12" tone="healthy" />
      </div>

      <FilterSection
        filterFields={riskFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["REF", "HAZARD", "VESSEL", "L", "S", "OWNER", "MITIGATION", "DUE", "STATUS"]}
          rows={filteredData.map((r) => [
            <span key="a" className="font-bold text-gray-900">{r.id}</span>,
            <span key="b" className="text-gray-700 font-medium">{r.hazard}</span>,
            <span key="c" className="text-gray-600">{r.vessel}</span>,
            <span key="d" className="tabular-nums text-gray-600">{r.l}</span>,
            <span key="e" className="tabular-nums text-gray-600">{r.s}</span>,
            <span key="f" className="text-gray-600">{r.owner}</span>,
            <span key="g" className="text-gray-600">{r.mitigation}</span>,
            <span key="h" className="tabular-nums text-gray-600">{r.due}</span>,
            <StatusChip key="i" status={r.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

