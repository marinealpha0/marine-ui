import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { auditFilterFields } from "@/constant/FilterFields";
import { auditLogs } from "@/data/marine";

export default function AuditPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    entity: "all",
  });

  const filteredData = useMemo(() => {
    return auditLogs.filter((l) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (l.user && l.user.toLowerCase().includes(q)) ||
          (l.action && l.action.toLowerCase().includes(q)) ||
          (l.entity && l.entity.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.entity && filters.entity !== "all" && l.entity !== filters.entity) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internal & External Audits"
        description="ISM, ISPS, MLC and Class audit history and audit trail"
        actions={
          <>
            <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
            <ExportButton />
          </>
        }
      />
      <FilterSection
        filterFields={auditFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />
      <Panel padded={false}>
        <DataTable
          columns={["Timestamp", "User", "Action", "Entity", "IP"]}
          rows={filteredData.map((l) => [
            <span key="a" className="tabular-nums">{l.time}</span>,
            <span key="b" className="font-medium">{l.user}</span>,
            l.action,
            l.entity,
            <span key="e" className="tabular-nums text-muted-foreground">{l.ip}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}

