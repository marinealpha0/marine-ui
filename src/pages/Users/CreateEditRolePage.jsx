import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Shield, ShieldCheck, Lock, Check, Sparkles, Search, Save,
  Ship, ShoppingCart, FileText, BarChart3, ChevronRight, Layers, SlidersHorizontal
} from "lucide-react";
import { toast } from "sonner";
import {
  PERMISSION_CATEGORIES, INITIAL_ROLES
} from "@/data/rolesData";
import { cn } from "@/lib/utils";

// Category Icons lookup
const ICON_MAP = {
  Ship: Ship,
  ShoppingCart: ShoppingCart,
  ShieldCheck: ShieldCheck,
  FileText: FileText,
  BarChart3: BarChart3,
  Lock: Lock,
};

export default function CreateEditRolePage() {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const isEditing = Boolean(roleId);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    category: "Operations",
    scope: "Single Vessel",
    badgeColor: "info",
    permissions: ["VIEW_FLEET", "VIEW_WORK_ORDERS"],
  });

  const [permSearch, setPermSearch] = useState("");
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");

  // Load existing role data if in Edit mode
  useEffect(() => {
    if (isEditing) {
      const existingRole = INITIAL_ROLES.find((r) => r.id === roleId);
      if (existingRole) {
        setFormData({
          name: existingRole.name,
          code: existingRole.code,
          description: existingRole.description,
          category: existingRole.category,
          scope: existingRole.scope,
          badgeColor: existingRole.badgeColor || "info",
          permissions: [...existingRole.permissions],
        });
      } else {
        toast.error("Role not found");
        navigate("/app/roles");
      }
    }
  }, [roleId, isEditing, navigate]);

  // Total permissions available in the system
  const totalSystemPermsCount = useMemo(() => {
    return PERMISSION_CATEGORIES.reduce((acc, cat) => acc + cat.permissions.length, 0);
  }, []);

  // Compute live Risk Level
  const calculatedRisk = useMemo(() => {
    const perms = formData.permissions;
    if (perms.includes("DELETE_ROLES_AND_PERMISSIONS") || perms.includes("EDIT_ROLES_AND_PERMISSIONS")) {
      return { level: "System Core", color: "critical", badgeBg: "bg-critical-soft text-critical border-critical/30" };
    }
    if (perms.length > 20 || perms.includes("AUTHORIZE_MOC") || perms.includes("APPROVE_REQUISITIONS")) {
      return { level: "High Privilege", color: "warning", badgeBg: "bg-warning-soft text-warning border-warning/30" };
    }
    if (perms.length > 10) {
      return { level: "Operational", color: "info", badgeBg: "bg-info-soft text-info border-info/30" };
    }
    return { level: "Restricted", color: "neutral", badgeBg: "bg-secondary text-muted-foreground border-border" };
  }, [formData.permissions]);

  // Auto-generate code when title changes
  const handleTitleChange = (val) => {
    setFormData((prev) => {
      const isAutoCode = !prev.code || prev.code === prev.name.toUpperCase().replace(/\s+/g, "_");
      const generatedCode = isAutoCode ? val.toUpperCase().replace(/[^A-Z0-9]/g, "_") : prev.code;
      return { ...prev, name: val, code: generatedCode };
    });
  };

  // Toggle individual permission
  const togglePermission = (id) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(id);
      const next = exists ? prev.permissions.filter((p) => p !== id) : [...prev.permissions, id];
      return { ...prev, permissions: next };
    });
  };

  // Toggle category all
  const toggleCategoryAll = (catPermIds, forceAll) => {
    setFormData((prev) => {
      const permSet = new Set(prev.permissions);
      if (forceAll) {
        catPermIds.forEach((id) => permSet.add(id));
      } else {
        const allPresent = catPermIds.every((id) => permSet.has(id));
        if (allPresent) {
          catPermIds.forEach((id) => permSet.delete(id));
        } else {
          catPermIds.forEach((id) => permSet.add(id));
        }
      }
      return { ...prev, permissions: Array.from(permSet) };
    });
  };

  // Save Role Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Role title is required");
      return;
    }

    if (formData.permissions.length === 0) {
      toast.error("Please select at least 1 capability grant for this role");
      return;
    }

    toast.success(
      isEditing
        ? `Role "${formData.name}" updated successfully`
        : `New custom role "${formData.name}" created successfully`
    );

    navigate("/app/roles");
  };

  return (
    <div className="space-y-6 pb-20 max-w-[1400px] mx-auto">
      {/* Main Page Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ocean mb-1">
            <Sparkles className="size-4" />
            <span>ROLE DESIGNER STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {isEditing ? `Edit Security Role: ${formData.name}` : "Create New Custom Security Role"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure role title, department, and assign fine-grained operational capabilities.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-navy text-white rounded-lg hover:bg-navy/90 transition-all shadow-md cursor-pointer"
          >
            <Save className="size-4" />
            <span>{isEditing ? "Save Changes" : "Publish Role"}</span>
          </button>
        </div>
      </div>

      {/* Studio Layout (4 cols Left, 8 cols Right for maximum horizontal space) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Role Identity Profile (4 cols - Sticky) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-card space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Shield className="size-4 text-ocean" />
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                1. Role Profile & Category
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Role Title <span className="text-critical">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chief Electro-Technical Officer"
                value={formData.name}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-sunken border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">System Code Identifier</label>
              <input
                type="text"
                placeholder="e.g. CHIEF_ETO"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 text-xs bg-surface-sunken border border-border rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Department Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-surface-sunken border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ocean font-medium"
              >
                <option value="Operations">Operations Department</option>
                <option value="Technical">Technical & Engineering</option>
                <option value="Vessel Operations">Vessel Shipboard Operations</option>
                <option value="Compliance">Compliance & QHSE</option>
                <option value="Supply Chain">Supply Chain & Procurement</option>
                <option value="Administration">System Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Role Purpose & Description</label>
              <textarea
                rows={4}
                placeholder="Describe responsibilities, oversight scope, and authorization boundaries..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-surface-sunken border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ocean leading-relaxed"
              />
            </div>

            {/* Selected Capabilities Counter Card */}
            <div className="pt-3 border-t border-border/80">
              <div className="flex items-center justify-between text-xs p-3 rounded-lg bg-surface-sunken border border-border">
                <span className="font-semibold text-foreground">Selected Capabilities:</span>
                <span className="font-bold text-ocean font-mono text-xs">
                  {formData.permissions.length} / {totalSystemPermsCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Fine-Grained Capability Grants Builder (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-card space-y-4">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border pb-3.5">
              <div>
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <span>2. Fine-Grained Capability Grants</span>
                  <span className="px-2 py-0.5 rounded-full bg-ocean/10 text-ocean text-xs font-bold font-mono">
                    {formData.permissions.length} Active
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select exact access capabilities granted to personnel holding this role.
                </p>
              </div>

              {/* Module Selection Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Filter Module:</label>
                <select
                  value={activeCategoryTab}
                  onChange={(e) => setActiveCategoryTab(e.target.value)}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-surface-sunken border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ocean cursor-pointer"
                >
                  <option value="all">All Modules ({totalSystemPermsCount})</option>
                  {PERMISSION_CATEGORIES.map((cat) => {
                    const countSelected = cat.permissions.filter((p) => formData.permissions.includes(p.id)).length;
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({countSelected}/{cat.permissions.length})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Category Sections List */}
            <div className="space-y-6 pt-2">
              {PERMISSION_CATEGORIES.filter(
                (cat) => activeCategoryTab === "all" || activeCategoryTab === cat.id
              ).map((cat) => {
                const CatIcon = ICON_MAP[cat.icon] || Shield;
                const catPermIds = cat.permissions.map((p) => p.id);
                const countSelected = catPermIds.filter((id) => formData.permissions.includes(id)).length;
                const allSelected = countSelected === catPermIds.length;
                return (
                  <div key={cat.id} className="rounded-xl border border-border bg-surface-sunken/40 p-4 space-y-3.5">
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="grid size-7 place-items-center rounded-lg bg-navy/10 text-navy font-bold">
                          <CatIcon className="size-4 text-ocean" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-foreground flex items-center gap-2">
                            <span>{cat.name}</span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground">
                              {countSelected} of {catPermIds.length} enabled
                            </span>
                          </h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCategoryAll(catPermIds, !allSelected)}
                        className="text-xs font-semibold text-ocean hover:underline cursor-pointer"
                      >
                        {allSelected ? "Deselect All" : "Select Category"}
                      </button>
                    </div>

                    {/* Capabilities 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cat.permissions.map((perm) => {
                        const isChecked = formData.permissions.includes(perm.id);

                        return (
                          <div
                            key={perm.id}
                            onClick={() => togglePermission(perm.id)}
                            className={cn(
                              "flex items-center justify-between gap-3 p-3.5 rounded-lg border text-xs cursor-pointer transition-all",
                              isChecked
                                ? "bg-surface border-ocean/60 shadow-xs ring-1 ring-ocean/30"
                                : "bg-surface/70 border-border text-muted-foreground hover:bg-surface hover:border-border/90"
                            )}
                          >
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}} // handled by div click
                                className="mt-0.5 size-4 rounded border-border text-ocean focus:ring-ocean cursor-pointer shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className={cn("font-bold truncate", isChecked ? "text-foreground" : "text-muted-foreground")}>
                                  {perm.label}
                                </div>
                                <div className="text-[10px] font-mono text-muted-foreground mt-0.5 truncate">
                                  {perm.id}
                                </div>
                              </div>
                            </div>

                            <span
                              className={cn(
                                "px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wider shrink-0 border",
                                perm.type === "approve"
                                  ? "bg-warning-soft text-warning border-warning/30"
                                  : perm.type === "delete"
                                  ? "bg-critical-soft text-critical border-critical/30"
                                  : perm.type === "write"
                                  ? "bg-info-soft text-info border-info/30"
                                  : "bg-secondary text-muted-foreground border-border"
                              )}
                            >
                              {perm.type || "access"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
