import React, { useMemo, useState } from "react";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip, SummaryCard } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { certificateFilterFields } from "@/constant/FilterFields";

export const certificatesCatalog = [
  {
    name: "Safety Management Certificate",
    vessel: "MT Ocean Star",
    issuer: "DNV",
    expiry: "2027-04-10",
    status: "Valid",
  },
  {
    name: "International Oil Pollution Prevention",
    vessel: "MV Pacific Endeavour",
    issuer: "Lloyd's Register",
    expiry: "2026-09-01",
    status: "Expiring",
  },
  {
    name: "Cargo Ship Safety Equipment",
    vessel: "MT Gulf Navigator",
    issuer: "ABS",
    expiry: "2026-06-13",
    status: "Expired",
  },
  {
    name: "Ballast Water Management Certificate",
    vessel: "MV Atlantic Pioneer",
    issuer: "Bureau Veritas",
    expiry: "2028-02-19",
    status: "Valid",
  },
  {
    name: "ISPS Ship Security Certificate",
    vessel: "MV Baltic Carrier",
    issuer: "DNV",
    expiry: "2026-08-29",
    status: "Expiring",
  },
  {
    name: "Load Line Certificate",
    vessel: "MV Coral Trader",
    issuer: "ClassNK",
    expiry: "2027-01-17",
    status: "Valid",
  },
  {
    name: "MLC 2006 Maritime Labour Certificate",
    vessel: "OSV Arctic Guardian",
    issuer: "DNV",
    expiry: "2029-03-04",
    status: "Valid",
  },
  {
    name: "Air Pollution Prevention (IAPP)",
    vessel: "MT Nordic Spirit",
    issuer: "Lloyd's Register",
    expiry: "2030-07-21",
    status: "Pending Approval",
  },
];

export default function CertificatesPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    vessel: "all",
    type: "all",
    status: "all",
    issuer: "",
  });

  const filteredData = useMemo(() => {
    return certificatesCatalog.filter((c) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (c.name && c.name.toLowerCase().includes(q)) ||
          (c.vessel && c.vessel.toLowerCase().includes(q)) ||
          (c.issuer && c.issuer.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.vessel && filters.vessel !== "all" && c.vessel !== filters.vessel) return false;
      if (filters.status && filters.status !== "all" && c.status !== filters.status) return false;
      if (filters.issuer && !c.issuer?.toLowerCase().includes(filters.issuer.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">COMPLIANCE</div>
        <PageHeader
          title="Certificates"
          description="Certificate lifecycle by vessel."
          actions={
            <>
              <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
              <ExportButton />
            </>
          }
        />
      </div>

      {/* Top KPI Card */}
      <div className="w-full sm:w-64">
        <SummaryCard label="Valid" value="312" tone="healthy" />
      </div>

      <FilterSection
        filterFields={certificateFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Table Panel */}
      <Panel padded={false}>
        <DataTable
          columns={["CERTIFICATE", "VESSEL", "ISSUER", "EXPIRY", "STATUS"]}
          rows={filteredData.map((c) => [
            <span key="a" className="font-bold text-gray-900">{c.name}</span>,
            <span key="b" className="text-gray-600">{c.vessel}</span>,
            <span key="c" className="text-gray-600">{c.issuer}</span>,
            <span key="d" className="tabular-nums text-gray-600">{c.expiry}</span>,
            <StatusChip key="e" status={c.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

