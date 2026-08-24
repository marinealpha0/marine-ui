import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { deviationFilterFields } from "@/constant/FilterFields";

export const deviationsCatalog = [
  {
    id: "DEV-0451",
    deviation: "Deviation from planned bunkering port",
    vessel: "MV Atlantic Pioneer",
    severity: "High",
    owner: "S. Okafor",
    age: 12,
    status: "Open",
  },
  {
    id: "DEV-0452",
    deviation: "PMS job interval extension — AE2",
    vessel: "MV Pacific Endeavour",
    severity: "Medium",
    owner: "K. Tan",
    age: 5,
    status: "Pending Approval",
  },
  {
    id: "DEV-0448",
    deviation: "Deferred hull inspection due to weather",
    vessel: "MT Gulf Navigator",
    severity: "Low",
    owner: "P. Dsouza",
    age: 27,
    status: "Approved",
  },
  {
    id: "DEV-0440",
    deviation: "Alternate spare part specification used",
    vessel: "MT Ocean Star",
    severity: "Medium",
    owner: "R. Malhotra",
    age: 41,
    status: "Overdue",
  },
];

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
        {/* Card 1 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Open deviations</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">4</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Pending approval</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">1</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Overdue duration</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">1</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Closed this quarter</div>
          <div className="mt-3 text-3xl font-bold text-[#059669]">23</div>
        </div>
      </div>

      <FilterSection
        filterFields={deviationFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel
        title={
          <div>
            <h3 className="text-base font-bold text-gray-900">Deviation register</h3>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {filteredData.length} {filteredData.length === 1 ? "record" : "records"} in current context
            </p>
          </div>
        }
        padded={false}
      >
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

