import React, { useState, useEffect } from "react";
const useModules = () => ({ modulesList: [], isLoadingModules: false });
const useRoles = () => ({ roles: [], isLoadingRoles: false });
import { 
  useSaveNotificationModules, 
  useSaveRoleNotificationPermissions, 
  useGetSelectedNotificationModules,
  useGetRoleNotificationConfigurations
} from "../hooks/useSettingServices";
import { toast } from "sonner";
import { 
  NotificationsActiveIcon as Bell, 
  InfoIcon
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Card from "./Card";
import CardHeader from "./CardHeader";

const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

const NotificationsTab = () => {
  // 1. Fetch real Modules and Roles from existing hooks
  const { modulesList: modules = [], isLoadingModules } = useModules(null, { status: true });
  const { roles = [], isLoadingRoles } = useRoles();

  const saveModulesMutation = useSaveNotificationModules();
  const saveRoleMutation = useSaveRoleNotificationPermissions();
  const { data: fetchedModulesResponse, isLoading: isLoadingSelectedModules } = useGetSelectedNotificationModules();
  const { data: fetchedRoleConfigsResponse, isLoading: isLoadingRoleConfigs } = useGetRoleNotificationConfigurations();

  const [activeSubTab, setActiveSubTab] = useState("modules"); // "modules" or "roles"

  // 2. STATE FOR SUBTAB 1: Selected Modules & Submodules for Notifications (Committed)
  const [selectedModules, setSelectedModules] = useState({});
  // Draft state for checkbox toggles in Subtab 1
  const [tempSelectedModules, setTempSelectedModules] = useState({});

  // 3. STATE FOR SUBTAB 2: Role configurations list and settings
  const [roleConfigs, setRoleConfigs] = useState({});



  // Sync draft modules when committed selection updates
  useEffect(() => {
    setTempSelectedModules(selectedModules);
  }, [selectedModules]);

  // Map backend global enable array into local select checked state
  useEffect(() => {
    const modulesArray = fetchedModulesResponse?.selectedNotificationModules || 
                         (Array.isArray(fetchedModulesResponse) ? fetchedModulesResponse : null);
    
    const mapped = {};
    if (modulesArray) {
      modulesArray.forEach(item => {
        if (item.type === "sub-module" && item.submoduleId) {
          let parentId = item.moduleId;
          // If parent moduleId is missing in backend GET response, scan the fetched modules tree to resolve it
          if (!parentId) {
            const parentMod = modules.find(m => 
              m.submodules && m.submodules.some(s => (s._id || s.name) === item.submoduleId)
            );
            if (parentMod) {
              parentId = parentMod._id || parentMod.name;
            }
          }
          if (parentId) {
            mapped[`${parentId}:${item.submoduleId}`] = true;
          }
        } else if (item.moduleId) {
          mapped[item.moduleId] = true;
        }
      });
    }
    setSelectedModules(mapped);
  }, [fetchedModulesResponse, modules]);

  // Map backend role notification configurations into local state map
  useEffect(() => {
    const configsList = fetchedRoleConfigsResponse?.configurations || 
                        (Array.isArray(fetchedRoleConfigsResponse) ? fetchedRoleConfigsResponse : null);
    
    if (configsList) {
      const mapped = {};
      configsList.forEach(configObj => {
        const roleId = configObj.roleId;
        mapped[roleId] = {};
        
        if (configObj.permissions) {
          configObj.permissions.forEach(perm => {
            if (perm.type === "sub-module" && perm.submoduleId) {
              let parentId = perm.moduleId;
              if (!parentId) {
                const parentMod = modules.find(m => 
                  m.submodules && m.submodules.some(s => (s._id || s.name) === perm.submoduleId)
                );
                if (parentMod) {
                  parentId = parentMod._id || parentMod.name;
                }
              }
              if (parentId) {
                mapped[roleId][`${parentId}:${perm.submoduleId}`] = !!perm.enabled;
              }
            } else if (perm.moduleId) {
              mapped[roleId][perm.moduleId] = !!perm.enabled;
            }
          });
        }
      });
      setRoleConfigs(mapped);
    }
  }, [fetchedRoleConfigsResponse, modules]);



  if (isLoadingModules || isLoadingRoles || isLoadingSelectedModules || isLoadingRoleConfigs) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Subtab 1: Handle toggling a module/submodule selection status
  const handleToggleModuleSelection = (key) => {
    setTempSelectedModules(prev => {
      const updated = { ...prev };
      const targetState = !prev[key];

      if (!key.includes(":")) {
        // Toggle parent module
        updated[key] = targetState;

        // Auto-select or auto-deselect all child sub-modules
        const modObj = modules.find(m => (m._id || m.name) === key);
        if (modObj && modObj.submodules) {
          modObj.submodules.forEach(sub => {
            const subKey = `${key}:${sub._id || sub.name}`;
            updated[subKey] = targetState;
          });
        }
      } else {
        // Toggle child sub-module
        updated[key] = targetState;

        // Automatically select/deselect parent module based on sibling submodule selections
        const [parentKey] = key.split(":");
        const parentMod = modules.find(m => (m._id || m.name) === parentKey);
        if (parentMod && parentMod.submodules && parentMod.submodules.length > 0) {
          const allSelected = parentMod.submodules.every(sub => {
            const subKey = `${parentKey}:${sub._id || sub.name}`;
            return !!updated[subKey];
          });
          updated[parentKey] = allSelected;
        }
      }

      return updated;
    });
  };

  // Subtab 1: Save draft selection to API
  const handleUpdateModules = async () => {
    const selectedList = [];
    Object.keys(tempSelectedModules).forEach(key => {
      if (tempSelectedModules[key]) {
        if (key.includes(":")) {
          const submoduleId = key.split(":")[1];
          selectedList.push({
            submoduleId,
            type: "sub-module"
          });
        } else {
          selectedList.push({
            moduleId: key,
            type: "module"
          });
        }
      }
    });

    const payload = {
      selectedNotificationModules: selectedList
    };

    // Log the exact payload as requested
    console.log("POST /notifications/config/global-enable - Payload:", payload);

    try {
      const response = await saveModulesMutation.mutateAsync(payload);
      toast.success(response.message || "Notification modules updated successfully!");
    } catch (error) {
      console.error("Mutation Error saving modules:", error);
      toast.error(error.message || "An error occurred while saving.");
    }
  };



  // Subtab 2: Toggle role notification permission for a specific module/submodule
  const handleToggleRolePermission = (roleId, itemKey) => {
    setRoleConfigs(prev => {
      const config = { ...(prev[roleId] || {}) };
      const targetState = !config[itemKey];

      if (!itemKey.includes(":")) {
        // Toggle parent module configuration
        config[itemKey] = targetState;

        // Auto-select or auto-deselect all child sub-modules in this role configuration
        const modObj = modules.find(m => (m._id || m.name) === itemKey);
        if (modObj && modObj.submodules) {
          modObj.submodules.forEach(sub => {
            const subKey = `${itemKey}:${sub._id || sub.name}`;
            config[subKey] = targetState;
          });
        }
      } else {
        // Toggle child sub-module configuration
        config[itemKey] = targetState;

        // Automatically select/deselect parent module based on active sibling submodule selections
        const [parentKey] = itemKey.split(":");
        const parentMod = modules.find(m => (m._id || m.name) === parentKey);
        if (parentMod && parentMod.submodules && parentMod.submodules.length > 0) {
          // Filter submodules that are currently active (selected in step 1)
          const activeSubs = parentMod.submodules.filter(sub => {
            const subKey = `${parentKey}:${sub._id || sub.name}`;
            return !!selectedModules[subKey];
          });

          if (activeSubs.length > 0) {
            const allSelected = activeSubs.every(sub => {
              const subKey = `${parentKey}:${sub._id || sub.name}`;
              return !!config[subKey];
            });
            config[parentKey] = allSelected;
          }
        }
      }

      return {
        ...prev,
        [roleId]: config
      };
    });
  };

  // Subtab 2: Save all role configuration mappings to API in bulk
  const handleSaveRolePermissions = async () => {
    const activeItemsList = getActiveItems();

    const configurations = Object.keys(roleConfigs).map(roleId => {
      const config = roleConfigs[roleId] || {};
      
      const formattedPermissions = activeItemsList.map(item => {
        const isEnabled = !!config[item.key];
        if (item.level === "sub-module") {
          const [moduleId, submoduleId] = item.key.split(":");
          return {
            moduleId,
            submoduleId,
            type: "sub-module",
            enabled: isEnabled
          };
        } else {
          return {
            moduleId: item.key,
            type: "module",
            enabled: isEnabled
          };
        }
      });

      return {
        roleId,
        permissions: formattedPermissions
      };
    });

    const payload = {
      configurations
    };

    console.log("POST /notifications/config/save - Bulk Payload:", payload);

    try {
      const response = await saveRoleMutation.mutateAsync(payload);
      toast.success(response.message || "Role configurations saved successfully!");
    } catch (error) {
      console.error("Mutation Error saving role configurations:", error);
      toast.error(error.message || "An error occurred while saving.");
    }
  };

  // Filter modules that are active (selected in Subtab 1)
  const getActiveItems = () => {
    const activeList = [];
    modules.forEach(mod => {
      const modKey = mod._id || mod.name;
      const isModActive = !!selectedModules[modKey];

      if (isModActive) {
        activeList.push({
          key: modKey,
          name: mod.name,
          level: "module",
          moduleName: mod.name,
          submoduleName: ""
        });
      }

      if (mod.submodules) {
        mod.submodules.forEach(sub => {
          const subKey = `${modKey}:${sub._id || sub.name}`;
          if (selectedModules[subKey]) {
            activeList.push({
              key: subKey,
              name: `${mod.name} › ${sub.name}`,
              level: "sub-module",
              moduleName: mod.name,
              submoduleName: sub.name
            });
          }
        });
      }
    });
    return activeList;
  };

  const activeItems = getActiveItems();
  const configuredRoleIds = roles.map(r => r._id || r.name);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub tabs navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab("modules")}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeSubTab === "modules"
              ? "bg-primary text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          1. Select Notification Modules
        </button>
        <button
          onClick={() => setActiveSubTab("roles")}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeSubTab === "roles"
              ? "bg-primary text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          2. Role Configuration Mapping
        </button>
      </div>

      {/* SUBTAB 1: SELECT NOTIFICATION MODULES */}
      {activeSubTab === "modules" && (
        <Card>
          <CardHeader
            icon={<Bell className="text-white h-5 w-5" />}
            title="Notification Domains Setup"
            subheader="Select the modules and sub-modules for which notifications should be enabled across the platform."
          />
          <CardContent>
            <div className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-3">
              <div className="text-primary mt-0.5"><InfoIcon size={18} /></div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check modules or submodules below to make them available for role mapping in the next tab. Enabling a module here allows role-based notification settings to be configured specifically for that section.
              </p>
            </div>            {modules.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Bell className="mx-auto text-slate-300 mb-2 h-10 w-10" />
                <p className="text-sm text-slate-600 font-semibold">No modules found</p>
                <p className="text-xs text-slate-400 mt-1">Please create modules in Administration Roles first.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((mod) => {
                  const modKey = mod._id || mod.name;
                  const isModChecked = !!tempSelectedModules[modKey];
                  
                  return (
                    <div key={modKey} className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden hover:border-primary/30 transition-all">
                      {/* Module Header Toggle */}
                      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold text-slate-800">{mod.name}</span>
                          {mod.description && (
                            <p className="text-[11px] text-slate-400 mt-0.5">{mod.description}</p>
                          )}
                        </div>
                        <label className="inline-flex items-center cursor-pointer select-none">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isModChecked}
                            onChange={() => handleToggleModuleSelection(modKey)}
                          />
                          <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary relative" />
                        </label>
                      </div>

                      {/* Submodules List */}
                      <div className="p-4 space-y-3 bg-white">
                        {mod.submodules && mod.submodules.length > 0 ? (
                          mod.submodules.map((sub) => {
                            const subKey = `${modKey}:${sub._id || sub.name}`;
                            const isSubChecked = !!tempSelectedModules[subKey];
                            
                            return (
                              <div key={subKey} className="flex items-center justify-between pl-2">
                                <div className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                  <span className="text-xs text-slate-700">{sub.name}</span>
                                </div>
                                <label className="inline-flex items-center cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isSubChecked}
                                    onChange={() => handleToggleModuleSelection(subKey)}
                                  />
                                  <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary relative" />
                                </label>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-[11px] text-slate-400 text-center py-1">
                            No submodules configured.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Actions Button Group */}
            <div className="flex justify-end mt-6 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleUpdateModules}
                disabled={saveModulesMutation.isPending || !modules || modules.length === 0}
              >
                {saveModulesMutation.isPending ? "Updating..." : "Update Selections"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SUBTAB 2: ROLE CONFIGURATION MAPPING */}
      {activeSubTab === "roles" && (
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon={<Bell className="text-white h-5 w-5" />}
              title="Role-Based Notification Permission Map"
              subheader="Toggle notifications for the selected modules per system role."
            />
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-slate-500">
                  Configure notifications for all {configuredRoleIds.length} system roles below.
                </p>
              </div>

              {configuredRoleIds.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <Bell className="mx-auto text-slate-300 mb-2 h-10 w-10" />
                  <p className="text-sm text-slate-600 font-semibold">No roles found</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {configuredRoleIds.map((roleId) => {
                    const roleObj = roles.find(r => (r._id || r.name) === roleId) || { name: roleId };
                    const config = roleConfigs[roleId] || {};

                    return (
                      <div key={roleId} className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden animate-fade-in hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                              {roleObj.name}
                              <Badge variant="outline" className="text-[10px] uppercase font-mono">
                                Configured
                              </Badge>
                            </h4>
                            {roleObj.description && (
                              <p className="text-xs text-slate-400 mt-0.5">{roleObj.description}</p>
                            )}
                          </div>
                        </div>

                        {/* Config Toggles Grouped by Module Section */}
                        <div className="p-6">
                          {activeItems.length === 0 ? (
                            <div className="text-center text-xs text-slate-400 py-4">
                              ⚠️ No active notification modules found. Please enable modules in step 1 ("Select Notification Modules").
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {modules.map((mod) => {
                                const modKey = mod._id || mod.name;
                                const isModActive = !!selectedModules[modKey];
                                
                                // Check if any submodules are active
                                const activeSubmodules = (mod.submodules || []).filter(sub => {
                                  const subKey = `${modKey}:${sub._id || sub.name}`;
                                  return !!selectedModules[subKey];
                                });

                                // Render section if either parent module or at least one submodule is active
                                if (!isModActive && activeSubmodules.length === 0) return null;

                                return (
                                  <div key={modKey} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-white">
                                    {/* Section Header */}
                                    <div className="bg-slate-50/70 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        {mod.name}
                                      </span>
                                      
                                      {isModActive && (
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] text-slate-400 font-mono">Module Active</span>
                                          <label className="inline-flex items-center cursor-pointer select-none">
                                            <input
                                              type="checkbox"
                                              className="sr-only peer"
                                              checked={!!config[modKey]}
                                              onChange={() => handleToggleRolePermission(roleId, modKey)}
                                            />
                                            <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary relative" />
                                          </label>
                                        </div>
                                      )}
                                    </div>

                                    {/* Section Submodules Grid */}
                                    {activeSubmodules.length > 0 && (
                                      <div className="p-4 bg-slate-50/30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {activeSubmodules.map((sub) => {
                                          const subKey = `${modKey}:${sub._id || sub.name}`;
                                          const isSubPermEnabled = !!config[subKey];

                                          return (
                                            <div key={subKey} className="flex items-center justify-between p-3 border border-slate-200/60 rounded-xl bg-white hover:bg-slate-50 transition-colors shadow-sm">
                                              <div className="flex flex-col pr-3">
                                                <span className="text-xs font-semibold text-slate-700">{sub.name}</span>
                                                <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 mt-0.5">
                                                  sub-module
                                                </span>
                                              </div>
                                              <label className="inline-flex items-center cursor-pointer select-none">
                                                <input
                                                  type="checkbox"
                                                  className="sr-only peer"
                                                  checked={isSubPermEnabled}
                                                  onChange={() => handleToggleRolePermission(roleId, subKey)}
                                                />
                                                <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary relative" />
                                              </label>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Bulk Save Actions Button Group */}
                  <div className="flex justify-end mt-6 pt-4 border-t border-slate-100">
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={handleSaveRolePermissions}
                      disabled={saveRoleMutation.isPending}
                    >
                      {saveRoleMutation.isPending ? "Saving..." : "Save Role Configurations"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationsTab;
