import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, Lock, Users, Copy, Edit3, Trash2, Plus, Search, Sparkles
} from "lucide-react";
import { toast } from "sonner";
import {
  PageHeader, SummaryCard, ActionButton, ExportButton
} from "@/components/app/kit";
import {
  PERMISSION_CATEGORIES, INITIAL_ROLES
} from "@/data/rolesData";
import { cn } from "@/lib/utils";

export default function RolesPermissionsPage() {
  const navigate = useNavigate();

  // Primary Data State
  const [roles, setRoles] = useState(INITIAL_ROLES);

  // Filter & Search States
  const [roleSearch, setRoleSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Clone Role Modal State
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [sourceRoleForClone, setSourceRoleForClone] = useState(null);
  const [cloneRoleName, setCloneRoleName] = useState("");

  // Total Permissions across all categories
  const totalSystemPermissionsCount = useMemo(() => {
    return PERMISSION_CATEGORIES.reduce((acc, cat) => acc + cat.permissions.length, 0);
  }, []);

  // Filtered Roles List
  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchSearch =
        role.name.toLowerCase().includes(roleSearch.toLowerCase()) ||
        role.description.toLowerCase().includes(roleSearch.toLowerCase()) ||
        role.code.toLowerCase().includes(roleSearch.toLowerCase());
      const matchCategory =
        categoryFilter === "all" || role.category.toLowerCase() === categoryFilter.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [roles, roleSearch, categoryFilter]);

  // Handle Open Clone Modal
  const handleOpenCloneModal = (role) => {
    setSourceRoleForClone(role);
    setCloneRoleName(`${role.name} (Copy)`);
    setIsCloneModalOpen(true);
  };

  // Confirm Clone Role
  const handleConfirmClone = () => {
    if (!cloneRoleName.trim() || !sourceRoleForClone) return;

    const clonedRole = {
      ...sourceRoleForClone,
      id: `role-clone-${Date.now()}`,
      name: cloneRoleName,
      code: `${sourceRoleForClone.code}_COPY`,
      description: `Cloned from ${sourceRoleForClone.name}. ${sourceRoleForClone.description}`,
      isCustom: true,
      assignedUsersCount: 0,
      updatedAt: new Date().toISOString().split("T")[0],
      updatedBy: "Alex Mercer",
    };

    setRoles((prev) => [clonedRole, ...prev]);
    setIsCloneModalOpen(false);
    toast.success(`Role cloned as "${clonedRole.name}"`);
  };

  // Handle Delete Custom Role
  const handleDeleteRole = (role) => {
    if (!role.isCustom) {
      toast.error("Default system roles cannot be deleted.");
      return;
    }

    if (role.assignedUsersCount > 0) {
      toast.error(`Cannot delete role with ${role.assignedUsersCount} active assigned users. Reassign users first.`);
      return;
    }

    setRoles((prev) => prev.filter((r) => r.id !== role.id));
    toast.success(`Role "${role.name}" has been removed`);
  };

  // Export Roles List
  const handleExportRoles = () => {
    toast.success("Security Roles exported successfully");
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ocean mb-1">
          <ShieldCheck className="size-4" />
          <span>GOVERNANCE & SECURITY</span>
        </div>
        <PageHeader
          title="Custom Roles & Permissions"
          description="Design custom operational roles, set authorization scopes, and configure fine-grained module access rights."
          actions={
            <>
              <ActionButton
                variant="navy"
                icon={<Plus className="size-4" />}
                onClick={() => navigate("/app/roles/create")}
              >
                Create Custom Role
              </ActionButton>
              <ExportButton onClick={handleExportRoles} label="Export Roles" />
            </>
          }
        />
      </div>

      {/* KPI Overview Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Total Defined Roles"
          value={roles.length}
          subtext={`${roles.filter((r) => r.isCustom).length} Custom roles created`}
          tone="info"
        />
        <SummaryCard
          label="Custom Roles"
          value={roles.filter((r) => r.isCustom).length}
          subtext="Tailored operational roles"
          tone="healthy"
        />
        <SummaryCard
          label="High Privilege Roles"
          value={roles.filter((r) => r.riskLevel === "System Core" || r.riskLevel === "High Privilege").length}
          subtext="Requires executive sign-off"
          tone="warning"
          borderLeft="amber"
        />
        <SummaryCard
          label="System Capabilities"
          value={totalSystemPermissionsCount}
          subtext="Across 6 domain categories"
          tone="neutral"
        />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface p-3.5 rounded-lg border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search roles by title, code, or description..."
            value={roleSearch}
            onChange={(e) => setRoleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-sunken border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ocean"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-surface-sunken border border-border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ocean"
          >
            <option value="all">All Categories</option>
            <option value="Administration">Administration</option>
            <option value="Operations">Operations</option>
            <option value="Technical">Technical</option>
            <option value="Vessel Operations">Vessel Operations</option>
            <option value="Compliance">Compliance</option>
            <option value="Supply Chain">Supply Chain</option>
          </select>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoles.map((role) => {
          const permPercentage = Math.round((role.permissions.length / totalSystemPermissionsCount) * 100);

          return (
            <div
              key={role.id}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-surface p-5 shadow-card hover:shadow-raised hover:border-ocean/40 transition-all duration-200"
            >
              <div>
                {/* Header: Badge / Scope & Category */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border",
                        role.riskLevel === "System Core"
                          ? "bg-critical-soft text-critical border-critical/30"
                          : role.riskLevel === "High Privilege"
                          ? "bg-warning-soft text-warning border-warning/30"
                          : role.riskLevel === "Operational"
                          ? "bg-info-soft text-info border-info/30"
                          : "bg-secondary text-muted-foreground border-border"
                      )}
                    >
                      <Lock className="size-3" />
                      {role.riskLevel}
                    </span>

                    {role.isCustom && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-ocean/10 text-ocean border border-ocean/20 px-2 py-0.5 text-[10px] font-bold">
                        <Sparkles className="size-2.5" />
                        Custom
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-medium text-muted-foreground bg-surface-sunken px-2 py-0.5 rounded border border-border">
                    {role.scope}
                  </span>
                </div>

                {/* Role Title & Description */}
                <h3 className="text-base font-bold text-foreground tracking-tight flex items-center justify-between">
                  <span>{role.name}</span>
                  <span className="text-xs font-mono text-muted-foreground font-normal">[{role.code}]</span>
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {role.description}
                </p>

                {/* Permission Progress */}
                <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground/90">
                      {role.permissions.length} Active Grants
                    </span>
                    <span className="text-muted-foreground font-mono text-[11px]">
                      {permPercentage}% system access
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-sunken rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        permPercentage > 75
                          ? "bg-critical"
                          : permPercentage > 45
                          ? "bg-warning"
                          : "bg-ocean"
                      )}
                      style={{ width: `${permPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Users className="size-3.5 text-ocean" />
                  <span>{role.assignedUsersCount} Users assigned</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenCloneModal(role)}
                    title="Clone Role"
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors cursor-pointer"
                  >
                    <Copy className="size-3.5" />
                  </button>

                  <button
                    onClick={() => navigate(`/app/roles/edit/${role.id}`)}
                    title="Edit Role & Permissions Studio"
                    className="p-1.5 text-ocean hover:bg-ocean/10 rounded-md transition-colors cursor-pointer"
                  >
                    <Edit3 className="size-3.5" />
                  </button>

                  {role.isCustom && (
                    <button
                      onClick={() => handleDeleteRole(role)}
                      title="Delete Custom Role"
                      className="p-1.5 text-critical hover:bg-critical-soft rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: CLONE ROLE */}
      {isCloneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-surface border border-border rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-foreground">Clone Security Role</h3>
            <p className="text-xs text-muted-foreground">
              Create a duplicate custom role with all {sourceRoleForClone?.permissions.length} capability grants pre-populated.
            </p>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">New Role Name</label>
              <input
                type="text"
                value={cloneRoleName}
                onChange={(e) => setCloneRoleName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface-sunken border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsCloneModalOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClone}
                className="px-4 py-1.5 text-xs font-semibold bg-navy text-white rounded-md hover:bg-navy/90 cursor-pointer"
              >
                Clone Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
