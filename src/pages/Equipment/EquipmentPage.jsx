import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PageHeader, ProgressBar } from "@/components/app/kit";

const hierarchyData = [
  {
    id: "me",
    name: "Main Engine — MAN B&W 6S60ME-C",
    health: 78,
    children: [
      { id: "cyl1", name: "Cylinder Unit 1", health: 91 },
      { id: "cyl2", name: "Cylinder Unit 2", health: 88 },
      { id: "cyl3", name: "Cylinder Unit 3", health: 42 },
      { id: "fuel", name: "Fuel Injection System", health: 74 },
      { id: "tca", name: "Turbocharger TCA66", health: 66 },
      { id: "jcool", name: "Jacket Cooling System", health: 93 },
    ],
  },
  {
    id: "ae",
    name: "Auxiliary Engines",
    health: 84,
    children: [
      { id: "ae1", name: "Aux Engine No.1", health: 86 },
      { id: "ae2", name: "Aux Engine No.2", health: 82 },
    ],
  },
  {
    id: "boiler",
    name: "Boiler & Steam Plant",
    health: 89,
    children: [
      { id: "auxboiler", name: "Auxiliary Boiler", health: 89 },
    ],
  },
  {
    id: "pumps",
    name: "Pumps & Auxiliary Systems",
    health: 81,
    children: [
      { id: "lopump", name: "Lube Oil Pump 1", health: 81 },
    ],
  },
  {
    id: "nav",
    name: "Navigation & Automation",
    health: 96,
    children: [
      { id: "radar", name: "X-Band Radar", health: 96 },
    ],
  },
];

const componentDetailsData = {
  cyl3: {
    title: "Cylinder Unit 3",
    system: "Component detail · MAN B&W 6S60ME-C",
    maker: "MAN Energy Solutions",
    serial: "6S60-3-2016-114",
    hours: "48,206 h",
    overhaul: "2025-11-14",
    nextDue: "2026-08-02 (overdue)",
    criticality: "Class 1 — Critical",
    conditionScore: 42,
    history: [
      { date: "2025-11-14", label: "Cylinder head overhaul completed — WO-23011" },
      { date: "2025-06-02", label: "Exhaust valve spindle renewed — WO-21877" },
      { date: "2025-01-19", label: "Piston ring inspection — WO-20440" },
      { date: "2024-08-27", label: "Liner honing and measurement — WO-19122" },
    ],
  },
  cyl1: {
    title: "Cylinder Unit 1",
    system: "Component detail · MAN B&W 6S60ME-C",
    maker: "MAN Energy Solutions",
    serial: "6S60-1-2016-112",
    hours: "48,206 h",
    overhaul: "2026-01-10",
    nextDue: "2026-11-15",
    criticality: "Class 1 — Critical",
    conditionScore: 91,
    history: [
      { date: "2026-01-10", label: "Piston ring renewal — WO-24012" },
      { date: "2025-07-22", label: "Injector nozzle testing — WO-22105" },
    ],
  },
};

export default function EquipmentPage() {
  const [expandedSystems, setExpandedSystems] = useState(new Set(["me"]));
  const [selectedComponentId, setSelectedComponentId] = useState("cyl3");

  const toggleSystem = (systemId) => {
    setExpandedSystems((prev) => {
      const next = new Set(prev);
      if (next.has(systemId)) {
        next.delete(systemId);
      } else {
        next.add(systemId);
      }
      return next;
    });
  };

  const selectedDetails = componentDetailsData[selectedComponentId] || componentDetailsData.cyl3;

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
          title="Equipment structure"
          description="MT Ocean Star · Interactive equipment hierarchy with health scoring, maintenance history and spare part linkage."
        />
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Registered components</div>
          <div className="mt-3 text-3xl font-bold text-[#0052cc]">1842</div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Below health threshold</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">6</div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#ef4444] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Critical equipment failures</div>
          <div className="mt-3 text-3xl font-bold text-[#dc2626]">2</div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-gray-200 border-l-[4px] border-l-[#f59e0b] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
          <div className="text-sm font-medium text-gray-700">Counters not updated</div>
          <div className="mt-3 text-3xl font-bold text-[#d97706]">1</div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Hierarchy Tree */}
        <div className="lg:col-span-5 rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Hierarchy</h3>
            <p className="text-xs text-gray-500 mt-0.5">Vessel → system → component</p>
          </div>

          <div className="space-y-1 text-xs">
            {hierarchyData.map((system) => {
              const isExpanded = expandedSystems.has(system.id);

              return (
                <div key={system.id} className="space-y-1">
                  {/* System Header Node */}
                  <button
                    type="button"
                    onClick={() => toggleSystem(system.id)}
                    className="w-full flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-gray-100/70 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-gray-900 truncate">
                      {isExpanded ? (
                        <ChevronDown className="size-3.5 text-gray-500 shrink-0" />
                      ) : (
                        <ChevronRight className="size-3.5 text-gray-500 shrink-0" />
                      )}
                      <span className="truncate">{system.name}</span>
                    </div>
                    <span className="text-gray-500 tabular-nums shrink-0 ml-2 font-medium">
                      {system.health}%
                    </span>
                  </button>

                  {/* Component Child Nodes */}
                  {isExpanded && (
                    <div className="ml-5 space-y-0.5 border-l border-gray-200 pl-3">
                      {system.children.map((child) => {
                        const isSelected = child.id === selectedComponentId;
                        return (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => setSelectedComponentId(child.id)}
                            className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-md text-left cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-[#e0f2fe] text-[#0369a1] font-bold shadow-xs border-l-2 border-[#0284c7]"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <span className="truncate">{child.name}</span>
                            <span
                              className={`tabular-nums font-semibold shrink-0 ml-2 ${
                                child.health < 60
                                  ? "text-[#dc2626]"
                                  : child.health < 80
                                  ? "text-[#d97706]"
                                  : "text-gray-500"
                              }`}
                            >
                              {child.health}%
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Component Details & History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Component Detail Spec Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">{selectedDetails.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{selectedDetails.system}</p>
            </div>

            {/* Spec Details Grid */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-3 text-xs pt-1 border-t border-gray-100">
              <div>
                <span className="text-gray-500">Maker</span>
                <p className="mt-0.5 font-bold text-gray-900">{selectedDetails.maker}</p>
              </div>
              <div>
                <span className="text-gray-500">Serial</span>
                <p className="mt-0.5 font-bold text-gray-900">{selectedDetails.serial}</p>
              </div>
              <div>
                <span className="text-gray-500">Running hours</span>
                <p className="mt-0.5 font-bold text-gray-900 tabular-nums">{selectedDetails.hours}</p>
              </div>
              <div>
                <span className="text-gray-500">Last overhaul</span>
                <p className="mt-0.5 font-semibold text-gray-900 tabular-nums">{selectedDetails.overhaul}</p>
              </div>
              <div>
                <span className="text-gray-500">Next due</span>
                <p className="mt-0.5 font-semibold text-gray-900 tabular-nums">{selectedDetails.nextDue}</p>
              </div>
              <div>
                <span className="text-gray-500">Criticality</span>
                <p className="mt-0.5 font-semibold text-gray-900">{selectedDetails.criticality}</p>
              </div>
            </div>

            {/* Condition Score Bar */}
            <div className="pt-3 border-t border-gray-100 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-700">Condition score</span>
                <span className="font-bold tabular-nums text-gray-900">{selectedDetails.conditionScore}%</span>
              </div>
              <ProgressBar value={selectedDetails.conditionScore} tone={getProgressTone(selectedDetails.conditionScore)} />
            </div>
          </div>

          {/* Maintenance History List Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Maintenance history</h3>
              <p className="text-xs text-gray-500 mt-0.5">Last {selectedDetails.history.length} interventions</p>
            </div>

            <div className="space-y-3 pt-1 border-t border-gray-100 text-xs">
              {selectedDetails.history.map((h, idx) => (
                <div key={idx} className="flex items-baseline gap-3 py-1 border-b border-gray-50 last:border-b-0">
                  <span className="tabular-nums font-semibold text-gray-500 shrink-0">{h.date}</span>
                  <span className="text-gray-800 font-medium">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

