import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MODES } from "@/constant/modes";
import { UI_TEXT } from "@/constant";

/**
 * Custom hook to encapsulate common CRUD state logic across pages.
 * Manages modal dialog states, active modes, selected entity IDs,
 * and handles the boilerplate for status change confirmation dialogues.
 *
 * @param {string} entityName - Name of the entity being managed (for logging purposes).
 * @param {Object} toggleStatusMutation - React Query mutation object for toggling status.
 * @returns {Object} States and handler functions.
 */
export const useCrudState = (entityName, toggleStatusMutation) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(MODES.ADD);
  const [selectedId, setSelectedId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [confirmConfig, setConfirmConfig] = useState({
    open: false,
    title: "",
    content: "",
    type: "default",
    confirmBtn: "",
    onConfirm: () => {},
  });

  const handleAdd = useCallback(() => {
    setMode(MODES.ADD);
    setSelectedId(null);
    setDialogOpen(true);
  }, []);

  const handleEdit = useCallback((id) => {
    setMode(MODES.EDIT);
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleView = useCallback((id) => {
    setMode(MODES.VIEW);
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedId(null);
    setMode(MODES.ADD);

    // Clean up query parameters on close to prevent re-opening
    const newParams = new URLSearchParams(searchParams);
    const normalizedEntity = entityName.replace(/\s+/g, "").toLowerCase();
    newParams.delete("id");
    newParams.delete("mode");
    newParams.delete(`${normalizedEntity}Id`);
    newParams.delete(`${entityName.toLowerCase()}Id`);
    setSearchParams(newParams);
  }, [searchParams, setSearchParams, entityName]);

  const handleStatusChange = useCallback((id, currentStatus, messages = {}) => {
    const isActive = currentStatus?.toLowerCase() === "active";

    setConfirmConfig({
      open: true,
      title: isActive ? messages.deactivateTitle : messages.activateTitle,
      content: isActive ? messages.deactivateContent : messages.activateContent,
      type: isActive ? "delete" : "success",
      confirmBtn: isActive
        ? (messages.deactivateBtn || UI_TEXT?.COMMON?.BTN_DEACTIVATE || "Deactivate")
        : (messages.activateBtn || UI_TEXT?.COMMON?.BTN_ACTIVATE || "Activate"),
      onConfirm: async () => {
        try {
          if (toggleStatusMutation) {
            await toggleStatusMutation.mutateAsync(id);
          }
          setConfirmConfig((prev) => ({ ...prev, open: false }));
        } catch (error) {
          console.error(`Failed to toggle ${entityName} status`, error);
        }
      },
    });
  }, [toggleStatusMutation, entityName]);

  /** Convenience handler for ConfirmationDialog's onClose prop. */
  const handleCloseConfirm = useCallback(() => {
    setConfirmConfig((prev) => ({ ...prev, open: false }));
  }, []);

  // Read URL search params to open dialog automatically
  useEffect(() => {
    const normalizedEntity = entityName.replace(/\s+/g, "").toLowerCase();
    const paramId = searchParams.get("id") || 
                    searchParams.get(`${normalizedEntity}Id`) || 
                    searchParams.get(`${entityName.toLowerCase()}Id`);
    const paramMode = searchParams.get("mode");

    if (paramId) {
      setSelectedId(paramId);
      if (paramMode === "edit") {
        setMode(MODES.EDIT);
        setDialogOpen(true);
      } else if (paramMode === "view" || !paramMode) {
        setMode(MODES.VIEW);
        setDialogOpen(true);
      }
    }
  }, [searchParams, entityName]);

  return {
    dialogOpen,
    setDialogOpen,
    mode,
    setMode,
    selectedId,
    setSelectedId,
    confirmConfig,
    setConfirmConfig,
    handleAdd,
    handleEdit,
    handleView,
    handleCloseDialog,
    handleStatusChange,
    handleCloseConfirm,
    isConfirmLoading: toggleStatusMutation?.isPending ?? false,
  };
};
