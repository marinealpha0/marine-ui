import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, Settings, Anchor as MarineIcon } from "lucide-react";
import { CustomTooltip } from "@/components/ui/tooltip";
import {
  Sidebar as ShadcnSidebarPrimitive, SidebarHeader, SidebarContent, SidebarGroup,
  SidebarFooter, SidebarTrigger, SidebarInput, useSidebar
} from "@/components/ui/sidebar";
import { navGroups, searchIndex } from "@/config/nav";
import { cn } from "@/lib/utils";

import { useAuthStore } from "@/store";

export { navGroups, searchIndex };

export function SidebarInner({ className, showSearch = false }) {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [searchTerm, setSearchTerm] = useState("");

  const user = useAuthStore((state) => state.user);
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

  // Open group accordions state
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = new Set(["Operations"]);
    navGroups.forEach((g) => {
      if (g.items.some((item) => item.to === location.pathname)) {
        initial.add(g.group);
      }
    });
    return initial;
  });

  // Auto-expand group accordion on navigation
  useEffect(() => {
    navGroups.forEach((g) => {
      if (g.items.some((item) => item.to === location.pathname)) {
        setOpenGroups((prev) => new Set([...prev, g.group]));
      }
    });
  }, [location.pathname]);

  const toggleGroup = (groupName) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  };

  const isActiveItem = (to) => {
    if (to === "/" || to === "/app") return location.pathname === "/" || location.pathname === "/app" || location.pathname === "/overview";
    return location.pathname === to;
  };

  const isGroupActive = (group) => {
    return group.items.some((item) => isActiveItem(item.to));
  };

  return (
    <ShadcnSidebarPrimitive className={cn("relative select-none border-sidebar-border bg-sidebar text-sidebar-foreground", className)}>
      {/* Floating Center Collapse/Expand Button */}
      <SidebarTrigger />

      {/* Header with App Brand */}
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between gap-2 min-h-10">
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 min-w-0 pl-1">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-navy text-cyan font-semibold shadow-sm">
                <MarineIcon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold tracking-tight text-sidebar-foreground truncate">
                  MeridianOPS
                </h2>
                <p className="text-[11px] text-sidebar-foreground/70 truncate">Fleet Command</p>
              </div>
            </div>
          ) : (
            <div className="grid size-8 mx-auto place-items-center rounded-lg bg-navy text-cyan shadow-sm">
              <MarineIcon className="size-4" />
            </div>
          )}
        </div>

        {!isCollapsed && showSearch && (
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-sidebar-foreground/60" />
            <SidebarInput
              type="text"
              placeholder="Search nav options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        )}
      </SidebarHeader>

      {/* Main Navigation Scroll Content */}
      <SidebarContent className="p-2 space-y-1">
        {/* COLLAPSED MODE: Icon-only flattened list with tooltips */}
        {isCollapsed ? (
          <div className="space-y-1">
            {navGroups.map((group) => (
              <div key={group.group} className="space-y-1 pb-2 mb-1 border-b border-sidebar-border/40 last:border-b-0">
                {group.items.map((item) => {
                  const active = isActiveItem(item.to);
                  const Icon = item.icon;
                  const tooltipContent = (
                    <div className="space-y-0.5 text-left">
                      <div className="font-semibold text-xs text-white">{item.label}</div>
                      <div className="text-[10px] text-gray-300 font-normal">{group.group}</div>
                      {item.badge !== undefined && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-medium bg-ocean/30 text-cyan rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );

                  return (
                    <CustomTooltip
                      key={item.label}
                      content={tooltipContent}
                      position="right"
                      delayDuration={150}
                    >
                      <Link
                        to={item.to}
                        className={cn(
                          "relative grid size-9 mx-auto place-items-center rounded-md text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group",
                          active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium border border-sidebar-border"
                        )}
                      >
                        <Icon className={cn("size-4 transition-transform group-hover:scale-110", active && "text-cyan")} />
                        {active && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-cyan" />
                        )}
                      </Link>
                    </CustomTooltip>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          /* EXPANDED MODE: Group Accordions with Sub-items */
          <div className="space-y-2">
            {navGroups
              .filter((group) =>
                searchTerm
                  ? group.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    group.items.some((i) => i.label.toLowerCase().includes(searchTerm.toLowerCase()))
                  : true
              )
              .map((group) => {
                const isOpen = openGroups.has(group.group) || Boolean(searchTerm);
                const isGroupAct = isGroupActive(group);

                return (
                  <div key={group.group} className="space-y-1">
                    {/* Group Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.group)}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold rounded-md transition-colors text-left cursor-pointer",
                        isGroupAct
                          ? "bg-sidebar-accent/70 text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <span className="truncate uppercase tracking-wider text-[11px] font-bold">
                        {group.group}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-3.5 text-sidebar-foreground/60 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Group Items Submenu */}
                    {isOpen && (
                      <div className="ml-3 my-0.5 space-y-0.5 border-l border-sidebar-border/70 pl-2">
                        {group.items
                          .filter((item) =>
                            searchTerm ? item.label.toLowerCase().includes(searchTerm.toLowerCase()) : true
                          )
                          .map((item) => {
                            const active = isActiveItem(item.to);
                            const Icon = item.icon;

                            return (
                              <Link
                                key={item.label}
                                to={item.to}
                                className={cn(
                                  "flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer",
                                  active
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                                )}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <Icon className={cn("size-3.5 shrink-0", active ? "text-cyan" : "text-sidebar-foreground/70")} />
                                  <span className="truncate">{item.label}</span>
                                </div>
                                {item.badge !== undefined && (
                                  <span className="px-1.5 py-0.2 text-[9px] font-semibold rounded bg-sidebar-accent text-sidebar-accent-foreground shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </SidebarContent>

      {/* Footer User Info */}
      <SidebarFooter className="p-3">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="grid size-7 place-items-center rounded-full bg-ocean text-white text-xs font-bold">
                {getInitials(displayName)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">{displayName}</p>
                <p className="text-[10px] text-sidebar-foreground/70 truncate">{roleName}</p>
              </div>
            </div>
            <Link to="/app/settings" className="text-sidebar-foreground/70 hover:text-sidebar-foreground p-1 cursor-pointer">
              <Settings className="size-4" />
            </Link>
          </div>
        ) : (
          <CustomTooltip content={`${displayName} (${roleName})`} position="right">
            <div className="grid size-8 mx-auto place-items-center rounded-full bg-ocean text-white text-xs font-bold shadow-sm cursor-pointer">
              {getInitials(displayName)}
            </div>
          </CustomTooltip>
        )}
      </SidebarFooter>
    </ShadcnSidebarPrimitive>
  );
}

export function Sidebar(props) {
  return <SidebarInner {...props} />;
}
