import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable, ExportButton, FilterButton, PageHeader, Panel, ProgressBar, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { fleetFilterFields } from "@/constant/FilterFields";

export const fleetVesselsCatalog = [
  {
    id: "ocean-star",
    name: "MT Ocean Star",
    imo: "9483721",
    flag: "Marshall Islands",
    type: "Crude Oil Tanker",
    status: "operational",
    location: "Strait of Malacca",
    nextPort: "Singapore",
    eta: "2026-08-13 06:00",
    crew: 24,
    maintenance: 92,
    certificates: 98,
    openWO: 4,
    overdueWO: 0,
  },
  {
    id: "atlantic-pioneer",
    name: "MV Atlantic Pioneer",
    imo: "9612044",
    flag: "Liberia",
    type: "Bulk Carrier",
    status: "at-risk",
    location: "North Atlantic",
    nextPort: "Rotterdam",
    eta: "2026-08-15 14:30",
    crew: 21,
    maintenance: 74,
    certificates: 88,
    openWO: 12,
    overdueWO: 3,
  },
  {
    id: "nordic-spirit",
    name: "MT Nordic Spirit",
    imo: "9702318",
    flag: "Norway",
    type: "Product Tanker",
    status: "operational",
    location: "Skagerrak",
    nextPort: "Gothenburg",
    eta: "2026-08-11 22:10",
    crew: 20,
    maintenance: 96,
    certificates: 100,
    openWO: 2,
    overdueWO: 0,
  },
  {
    id: "pacific-endeavour",
    name: "MV Pacific Endeavour",
    imo: "9558112",
    flag: "Panama",
    type: "Container 4,250 TEU",
    status: "critical",
    location: "Port of Busan",
    nextPort: "Shanghai",
    eta: "2026-08-12 09:45",
    crew: 23,
    maintenance: 51,
    certificates: 72,
    openWO: 18,
    overdueWO: 7,
  },
  {
    id: "coral-trader",
    name: "MV Coral Trader",
    imo: "9445901",
    flag: "Singapore",
    type: "Handysize Bulk",
    status: "maintenance",
    location: "Keppel Shipyard",
    nextPort: "Port Klang",
    eta: "2026-08-24 08:00",
    crew: 18,
    maintenance: 63,
    certificates: 91,
    openWO: 8,
    overdueWO: 1,
  },
  {
    id: "arctic-guardian",
    name: "OSV Arctic Guardian",
    imo: "9788410",
    flag: "Norway",
    type: "Platform Supply Vessel",
    status: "operational",
    location: "Ekofisk Field",
    nextPort: "Stavanger",
    eta: "2026-08-10 19:20",
    crew: 16,
    maintenance: 94,
    certificates: 97,
    openWO: 1,
    overdueWO: 0,
  },
  {
    id: "gulf-navigator",
    name: "MT Gulf Navigator",
    imo: "9366742",
    flag: "Malta",
    type: "Chemical Tanker",
    status: "at-risk",
    location: "Arabian Gulf",
    nextPort: "Jebel Ali",
    eta: "2026-08-12 04:15",
    crew: 19,
    maintenance: 69,
    certificates: 79,
    openWO: 6,
    overdueWO: 2,
  },
  {
    id: "baltic-carrier",
    name: "MV Baltic Carrier",
    imo: "9531027",
    flag: "Denmark",
    type: "Container 1,800 TEU",
    status: "operational",
    location: "Baltic Sea",
    nextPort: "Gdańsk",
    eta: "2026-08-11 11:00",
    crew: 17,
    maintenance: 89,
    certificates: 95,
    openWO: 3,
    overdueWO: 0,
  },
];

const summaryCards = [
  { id: "total", label: "Vessels", value: 24, valueColor: "text-[#0052cc]" },
  { id: "operational", label: "Operational", value: 21, valueColor: "text-[#059669]" },
  { id: "at-risk", label: "At risk", value: 2, borderColor: "border-l-[4px] border-l-[#f59e0b]", valueColor: "text-[#d97706]" },
  { id: "critical", label: "Critical", value: 1, borderColor: "border-l-[4px] border-l-[#ef4444]", valueColor: "text-[#dc2626]" },
];

export default function FleetPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState("Grid"); // Grid | Map | List

  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    status: "all",
    health: "all",
  });

  const filteredVessels = useMemo(() => {
    return fleetVesselsCatalog.filter((v) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (v.name && v.name.toLowerCase().includes(q)) ||
          (v.imo && v.imo.toLowerCase().includes(q)) ||
          (v.type && v.type.toLowerCase().includes(q)) ||
          (v.location && v.location.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.status && filters.status !== "all" && v.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const getProgressTone = (score) => {
    if (score >= 80) return "healthy";
    if (score >= 65) return "warning";
    return "critical";
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-ocean mb-1">ASSETS</div>
        <PageHeader
          title="Fleet management"
          description="Fleet register with live status, position, next port and health scoring for every vessel."
          actions={
            <>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === "Map" ? "Grid" : "Map")}
                className={`rounded-md border border-gray-200 px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  viewMode === "Map" ? "bg-ocean text-white border-ocean" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Map view
              </button>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === "List" ? "Grid" : "List")}
                className={`rounded-md border border-gray-200 px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  viewMode === "List" ? "bg-ocean text-white border-ocean" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                List view
              </button>
              <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
              <button className="rounded-md bg-navy px-3 py-2 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition-colors cursor-pointer">
                Add vessel
              </button>
            </>
          }
        />
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm ${
              card.borderColor ? card.borderColor : ""
            }`}
          >
            <span className="text-sm font-medium text-gray-700">{card.label}</span>
            <div className="mt-3 text-3xl font-bold tracking-tight ${card.valueColor}">
              <span className={card.valueColor}>{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      <FilterSection
        filterFields={fleetFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />

      {/* Vessel Grid View */}
      {viewMode !== "List" && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Vessel grid</h3>
            <p className="text-xs text-gray-500 mt-0.5">Click a vessel to open its operational dashboard</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVessels.map((v) => (
              <Link
                key={v.id}
                to={`/app/vessels/${v.id}`}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:border-gray-300 hover:shadow-sm space-y-4"
              >
                {/* Header: Vessel Name, Meta & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base font-bold text-gray-900 group-hover:text-ocean transition-colors">
                      {v.name}
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                      IMO {v.imo} · {v.flag} · {v.type}
                    </p>
                  </div>
                  <StatusChip status={v.status} />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs border-t border-b border-gray-100 py-3">
                  <div>
                    <span className="text-gray-500">Position</span>
                    <p className="mt-0.5 font-semibold text-gray-900">{v.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Next port</span>
                    <p className="mt-0.5 font-semibold text-gray-900">{v.nextPort}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">ETA</span>
                    <p className="mt-0.5 font-semibold text-gray-900 tabular-nums">{v.eta}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Crew onboard</span>
                    <p className="mt-0.5 font-semibold text-gray-900 tabular-nums">{v.crew}</p>
                  </div>
                </div>

                {/* Health Scores */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Maintenance health</span>
                      <span className="font-bold tabular-nums text-gray-900">{v.maintenance}%</span>
                    </div>
                    <ProgressBar value={v.maintenance} tone={getProgressTone(v.maintenance)} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Certificate health</span>
                      <span className="font-bold tabular-nums text-gray-900">{v.certificates}%</span>
                    </div>
                    <ProgressBar value={v.certificates} tone={getProgressTone(v.certificates)} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Fleet Register Table (When List View active) */}
      {viewMode === "List" && (
        <Panel padded={false}>
          <DataTable
            columns={["Vessel", "IMO", "Type", "Status", "Position", "Next port", "Open WOs", "Overdue"]}
            rows={filteredVessels.map((v) => [
              <Link key="a" to={`/app/vessels/${v.id}`} className="font-bold text-ocean hover:underline">{v.name}</Link>,
              <span key="b" className="tabular-nums text-gray-600">{v.imo}</span>,
              <span key="c" className="text-gray-600">{v.type}</span>,
              <StatusChip key="d" status={v.status} />,
              <span key="e" className="text-gray-600">{v.location}</span>,
              <span key="f" className="text-gray-600">{v.nextPort}</span>,
              <span key="g" className="tabular-nums font-semibold">{v.openWO}</span>,
              <span key="h" className={v.overdueWO > 0 ? "font-bold tabular-nums text-critical" : "font-semibold tabular-nums text-healthy"}>{v.overdueWO}</span>,
            ])}
          />
        </Panel>
      )}

      {/* Fleet Map Panel (Always visible below grid/list as shown in screenshot) */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Fleet map</h3>
          <p className="text-xs text-gray-500 mt-0.5">Live AIS positions — integration placeholder</p>
        </div>

        <div className="relative min-h-[320px] w-full rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-8 grid place-items-center">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none rounded-lg" />
          <p className="relative z-10 text-sm font-medium text-gray-500">
            AIS map integration renders vessel positions here
          </p>
        </div>
      </div>
    </div>
  );
}


