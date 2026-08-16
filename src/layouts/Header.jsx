import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, ChevronDown, Globe, Search, Ship, Building2, User, Settings, LogOut
} from "lucide-react";
import { useAuthStore } from "@/store";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const displayName = user?.adminName || user?.name || "Alex Mercer";
  const roleName = user?.roleName || "Fleet Manager";

  const handleLogout = (e) => {
    e?.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-surface border-b border-border px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 select-none">
      
      {/* Left side: Filter Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-0.5">
        {/* Organization Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground transition-colors shrink-0">
          <Building2 className="size-3.5 text-ocean" />
          <span>Oceanic Marine Group</span>
          <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
        </button>

        {/* Vessel Fleet Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground transition-colors shrink-0">
          <Ship className="size-3.5 text-ocean" />
          <span>All Vessels</span>
          <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
        </button>

        {/* Region Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-xs font-medium text-foreground transition-colors shrink-0 hidden sm:flex">
          <Globe className="size-3.5 text-ocean" />
          <span>All Regions</span>
          <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
        </button>
      </div>

      {/* Right side: Search, Notifications & Profile */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Global Search Input */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search vessels, work orders, spares..."
            className="h-8 w-64 lg:w-80 pl-9 pr-12 text-xs rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ocean"
          />
          <kbd className="absolute right-2.5 text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border">
            ⌘K
          </kbd>
        </div>

        {/* Notification Bell */}
        <button className="relative grid size-8 place-items-center rounded-lg border border-border bg-background hover:bg-secondary text-foreground transition-colors">
          <Bell className="size-4" />
          <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-critical text-white text-[9px] font-bold">
            4
          </span>
        </button>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 p-1 pr-2.5 rounded-lg border border-border bg-background hover:bg-secondary transition-colors"
          >
            <div className="grid size-7 place-items-center rounded-full bg-ocean text-white font-bold text-xs shadow-sm">
              AM
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-semibold leading-none text-foreground">{displayName}</span>
              <span className="block text-[10px] text-muted-foreground leading-tight mt-0.5">{roleName}</span>
            </div>
            <ChevronDown className="size-3 text-muted-foreground" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface shadow-lg py-1 z-50 text-xs">
              <button
                onClick={() => { navigate("/app/profile"); setIsDropdownOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-foreground hover:bg-secondary text-left"
              >
                <User className="size-3.5 text-ocean" /> Profile Settings
              </button>
              <button
                onClick={() => { navigate("/app/settings"); setIsDropdownOpen(false); }}
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

    </header>
  );
};
