import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Anchor, Bell, Building2, ChevronDown, LogOut, Search, Settings, Ship, User, X
} from "lucide-react";
import { useAuthStore } from "@/store";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";

const organizations = [
  { name: "Oceanic Marine Group", count: "24 vessels" },
  { name: "Northstar Ship Management", count: "11 vessels" },
  { name: "Meridian Offshore Services", count: "7 vessels" },
];

const fleets = [
  { name: "All Vessels", count: "24" },
  { name: "Tanker Fleet", count: "9" },
  { name: "Bulk Carrier Fleet", count: "8" },
  { name: "Container Fleet", count: "5" },
  { name: "Offshore Support", count: "2" },
];

const vessels = [
  { name: "All Vessels", imo: "" },
  { name: "MT Ocean Star", imo: "9483721" },
  { name: "MV Atlantic Pioneer", imo: "9612044" },
  { name: "MT Nordic Spirit", imo: "9702318" },
  { name: "MV Pacific Endeavour", imo: "9558112" },
  { name: "MV Coral Trader", imo: "9445901" },
  { name: "OSV Arctic Guardian", imo: "9788410" },
  { name: "MT Gulf Navigator", imo: "9366742" },
  { name: "MV Baltic Carrier", imo: "9531027" },
];

export const Header = () => {
  const [selectedOrg, setSelectedOrg] = useState("Oceanic Marine Group");
  const [selectedFleet, setSelectedFleet] = useState("All Vessels");
  const [selectedVessel, setSelectedVessel] = useState("All Vessels");

  const [activeDropdown, setActiveDropdown] = useState(null); // 'org' | 'fleet' | 'vessel' | 'profile' | null
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const displayName = user?.adminName || user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "") || "Alex Mercer";
  const roleName = (typeof user?.role === 'string' ? user.role : user?.role?.roleName) || user?.adminRole || user?.roleName || "Fleet Manager";

  const getInitials = (name) => {
    if (!name) return "AM";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = (e) => {
    e?.preventDefault();
    logout();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hotkey Cmd+K or Ctrl+K for search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchVessels = vessels.filter((v) => v.name !== "All Vessels");
  const searchWorkOrders = [
    { id: "WO-24188", title: "Main Engine cylinder head overhaul" },
    { id: "WO-24244", title: "Turbocharger cartridge inspection" },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-30 w-full bg-surface border-b border-border px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 select-none">
      
      {/* Left side: 3 Filter Selector Dropdowns */}
      <div className="flex items-center gap-2 py-0.5">
        
        {/* 1. Organization Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === "org" ? null : "org");
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground transition-colors shrink-0 cursor-pointer"
          >
            <Building2 className="size-3.5 text-ocean" />
            <span>{selectedOrg}</span>
            <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
          </button>

          {activeDropdown === "org" && (
            <div className="absolute left-0 mt-1.5 w-64 rounded-xl border border-gray-200 bg-white shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-2 font-bold text-[11px] tracking-wider text-gray-500 uppercase border-b border-gray-100">
                ORGANIZATION
              </div>
              <div className="py-1 max-h-60 overflow-y-auto">
                {organizations.map((org) => (
                  <button
                    key={org.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrg(org.name);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 hover:bg-sky-50 text-left transition-colors cursor-pointer ${
                      selectedOrg === org.name ? "font-semibold text-gray-900 bg-sky-50/80" : "text-gray-700"
                    }`}
                  >
                    <span className="truncate">{org.name}</span>
                    <span className="text-[11px] text-gray-400 font-normal shrink-0 ml-2">{org.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Fleet Type Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === "fleet" ? null : "fleet");
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground transition-colors shrink-0 cursor-pointer"
          >
            <Anchor className="size-3.5 text-ocean" />
            <span>{selectedFleet}</span>
            <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
          </button>

          {activeDropdown === "fleet" && (
            <div className="absolute left-0 mt-1.5 w-56 rounded-xl border border-gray-200 bg-white shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-2 font-bold text-[11px] tracking-wider text-gray-500 uppercase border-b border-gray-100">
                FLEET
              </div>
              <div className="py-1 max-h-60 overflow-y-auto">
                {fleets.map((fl) => (
                  <button
                    key={fl.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFleet(fl.name);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 hover:bg-sky-50 text-left transition-colors cursor-pointer ${
                      selectedFleet === fl.name ? "font-semibold text-gray-900 bg-sky-50/80" : "text-gray-700"
                    }`}
                  >
                    <span>{fl.name}</span>
                    <span className="text-[11px] text-gray-400 font-normal tabular-nums shrink-0 ml-2">{fl.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Vessel Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === "vessel" ? null : "vessel");
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground transition-colors shrink-0 cursor-pointer"
          >
            <Ship className="size-3.5 text-ocean" />
            <span>{selectedVessel}</span>
            <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
          </button>

          {activeDropdown === "vessel" && (
            <div className="absolute left-0 mt-1.5 w-64 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-2 font-bold text-[11px] tracking-wider text-gray-500 uppercase border-b border-gray-100 sticky top-0 bg-white">
                VESSEL
              </div>
              <div className="py-1">
                {vessels.map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVessel(v.name);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 hover:bg-sky-50 text-left transition-colors cursor-pointer ${
                      selectedVessel === v.name ? "font-semibold text-gray-900 bg-sky-50/80" : "text-gray-700"
                    }`}
                  >
                    <span>{v.name}</span>
                    {v.imo && <span className="text-[11px] text-gray-400 font-mono tabular-nums shrink-0 ml-2">{v.imo}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Right side: Search, Notifications & Profile */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Global Search Trigger Input */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 size-3.5 text-muted-foreground" />
          <input
            type="text"
            readOnly
            onClick={() => setIsSearchOpen(true)}
            placeholder="Search vessels, work orders, parts..."
            className="h-8 w-64 lg:w-80 pl-9 pr-12 text-xs rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none cursor-pointer hover:border-ocean transition-colors"
          />
          <kbd
            onClick={() => setIsSearchOpen(true)}
            className="absolute right-2.5 text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border cursor-pointer"
          >
            ⌘K
          </kbd>
        </div>

        {/* Notification Bell & Panel */}
        <NotificationPanel
          trigger={
            <button className="relative grid size-8 place-items-center rounded-lg border border-border bg-background hover:bg-secondary text-foreground transition-colors">
              <Bell className="size-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs">
                6
              </span>
            </button>
          }
        />

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")}
            className="flex items-center gap-2.5 p-1 pr-2.5 rounded-lg border border-border bg-background hover:bg-secondary transition-colors"
          >
            <div className="grid size-7 place-items-center rounded-full bg-ocean text-white font-bold text-xs shadow-sm">
              {getInitials(displayName)}
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-semibold leading-none text-foreground">{displayName}</span>
              <span className="block text-[10px] text-muted-foreground leading-tight mt-0.5">{roleName}</span>
            </div>
            <ChevronDown className="size-3 text-muted-foreground" />
          </button>

          {/* Profile Dropdown Menu */}
          {activeDropdown === "profile" && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface shadow-lg py-1 z-50 text-xs">
              <button
                onClick={() => { navigate("/app/profile"); setActiveDropdown(null); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-foreground hover:bg-secondary text-left"
              >
                <User className="size-3.5 text-ocean" /> Profile Settings
              </button>
              <button
                onClick={() => { navigate("/app/settings"); setActiveDropdown(null); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-foreground hover:bg-secondary text-left"
              >
                <Settings className="size-3.5 text-ocean" /> System Settings
              </button>
              <div className="my-1 border-t border-border" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-critical hover:bg-critical-soft text-left font-medium"
              >
                <LogOut className="size-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Global Search Modal (Screenshot 4) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-gray-200 px-4 py-3">
              <Search className="size-5 text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vessels, equipment, work orders, certificates..."
                className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg shrink-0 ml-2"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
              {/* Category: Vessels */}
              <div>
                <div className="font-bold text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Vessels</div>
                <div className="space-y-1">
                  {searchVessels.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => {
                        navigate("/app/fleet");
                        setIsSearchOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-cyan-50/70 text-left transition-colors font-medium text-gray-800"
                    >
                      <span>{v.name} &mdash; IMO {v.imo}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: Work Orders */}
              <div>
                <div className="font-bold text-gray-400 uppercase tracking-wider mb-2 text-[11px]">Work Orders</div>
                <div className="space-y-1">
                  {searchWorkOrders.map((wo) => (
                    <button
                      key={wo.id}
                      onClick={() => {
                        navigate("/app/work-orders");
                        setIsSearchOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-cyan-50/70 text-left transition-colors font-medium text-gray-800"
                    >
                      <span>{wo.id} {wo.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

