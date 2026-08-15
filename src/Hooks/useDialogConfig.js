import { MODES } from "@/constant/modes";

/**
 * Hook to generate dialog configuration based on the current mode.
 * @param {Object} params
 * @param {string} params.mode - Current mode (ADD, EDIT, VIEW)
 * @param {string} params.entityName - Name of the entity (e.g., "Admin", "User")
 * @param {string} [params.detailName] - Specific name to show in View mode (e.g., "John Doe")
 * @returns {Object} Configuration object containing title, button texts, and boolean flags
 */
export const useDialogConfig = ({ mode, entityName, detailName = "" }) => {
  const isViewMode = mode === MODES.VIEW;
  const isEditMode = mode === MODES.EDIT;
  const isAddMode = mode === MODES.ADD;

  let title = "";
  if (isAddMode) {
    title = `Add New ${entityName}`;
  } else if (isEditMode) {
    title = `Edit ${entityName}`;
  } else if (isViewMode) {
    title = detailName
      ? `View ${entityName} Details - ${detailName}`
      : `View ${entityName} Details`;
  }

  const submitButtonText = isViewMode
    ? ""
    : isEditMode
    ? `Update ${entityName}`
    : `Add ${entityName}`;
    
  const cancelButtonText = isViewMode ? "Close" : "Cancel";

  return {
    title,
    submitButtonText,
    cancelButtonText,
    isViewMode,
    isEditMode,
    isAddMode,
  };
};
