import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField } from "./fields/TextField";
import { SelectField } from "./fields/SelectField";
import { DateField } from "./fields/DateField";
import { PhoneField } from "./fields/PhoneField";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FileUploader } from "./fields/FileUploader";
import { RichTextField } from "./fields/RichTextField";
import { CodeField } from "./fields/CodeField";
import { ChipsField } from "./fields/ChipsField";
import { RepeaterField } from "./fields/RepeaterField";
import { DependentCoursesField } from "./fields/DependentCoursesField";
import { VideoListField } from "./fields/VideoListField";
import { ToggleField } from "./fields/ToggleField";
import { FieldLabel } from "./fields/FieldLabel";
import { formatDisplayDate } from "@/utils/dateUtils";
import { Regex } from "@/constant";

/**
 * Fixed FormDialog:
 * - Initializes formData only when dialog opens (prevents parent re-renders from erasing inputs).
 * - Handles onOpenChange boolean correctly (only reset/close when dialog actually closes).
 * - Honors isSubmitting prop to prevent accidental close while submitting.
 * - Shows submitting text on submit button when isSubmitting is true.
 */

const FormDialog = ({
  open,
  onClose,
  onSubmit,
  title = "Form Dialog",
  fields = [],
  initialData = {},
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  viewMode = false,
  isSubmitting = false,
  onValuesChange,
  isLoading = false,
  ...props
}) => {
  const [formData, setFormData] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [expandedBadges, setExpandedBadges] = useState({});

  // Build default data structure based on fields
  const buildDefaultData = () => {
    const defaultData = {};
    fields.forEach((field) => {
      if (field.type === "date" || field.type === "file")
        defaultData[field.name] = null;
      else if (
        field.type === "chips" ||
        (field.type === "select" && field.multiple) ||
        field.type === "dependent-courses" ||
        field.type === "video-list"
      )
        defaultData[field.name] = [];
      else if (field.type === "switch" || field.type === "checkbox")
        defaultData[field.name] = false;
      else defaultData[field.name] = "";
    });
    return defaultData;
  };

  const hasInitializedRef = useRef(false);
  const initialDataLoadedRef = useRef(false);

  // Initialize form data when dialog opens or initial data changes
  useEffect(() => {
    if (open) {
      const hasData = Object.keys(initialData || {}).some(
        (key) => initialData[key] !== "" && initialData[key] !== null && initialData[key] !== undefined
      );

      if (!hasInitializedRef.current || (!initialDataLoadedRef.current && hasData)) {
        const defaultData = buildDefaultData();
        const mergedData = { ...defaultData, ...initialData };
        setFormData(mergedData);

        // if there's an image field preset, show preview
        const imageField = fields.find(
          (f) => f.type === "file" && f.fileType === "image"
        );
        if (imageField && initialData && initialData[imageField.name]) {
          setProfileImagePreview(initialData[imageField.name]);
        } else {
          setProfileImagePreview(null);
        }
        setErrors({});
        
        hasInitializedRef.current = true;
        if (hasData) {
          initialDataLoadedRef.current = true;
        }
      }
    } else {
      hasInitializedRef.current = false;
      initialDataLoadedRef.current = false;
    }
  }, [open, initialData]);

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => {
      const next = { ...prev, [fieldName]: value };
      if (onValuesChange) {
        onValuesChange(next);
      }
      return next;
    });
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleMultiSelectChange = (fieldName, selectedValue) => {
    const currentValues = formData[fieldName] || [];
    if (!currentValues.includes(selectedValue)) {
      handleInputChange(fieldName, [...currentValues, selectedValue]);
    }
  };

  const handleRemoveMultiSelectItem = (fieldName, index) => {
    const currentValues = formData[fieldName] || [];
    const newValues = currentValues.filter((_, i) => i !== index);
    handleInputChange(fieldName, newValues);
  };

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files && event.target.files[0];
    const field = fields.find((f) => f.name === fieldName);
    if (!file || !field) return;

    if (field.accept) {
      const acceptedTypes = field.accept.split(",").map((t) => t.trim());
      const isValidType = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          const baseType = type.slice(0, -1);
          return file.type.startsWith(baseType);
        }
        return file.type === type;
      });
      if (!isValidType) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: `Please select a valid ${field.accept} file`,
        }));
        return;
      }
    }

    if (field.maxSize && file.size > field.maxSize * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `File size should be less than ${field.maxSize}MB`,
      }));
      return;
    }

    if (field.fileType === "image") {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }

    handleInputChange(fieldName, file);
  };

  const handleAddChip = (fieldName) => {
    const inputValue = formData[`${fieldName}_input`];
    if (!inputValue?.trim()) return;

    const field = fields.find((f) => f.name === fieldName);
    const currentChips = formData[fieldName] || [];

    // Example: coupon case (if you still need coupon logic, keep; else basic below)
    if (field?.chipType === "coupon") {
      const discount = formData["discountPercentage"];
      const validity = formData["couponValidityDate"];
      if (!discount || !validity) return;
      const newCoupon = {
        code: inputValue.trim(),
        discount: `${discount}%`,
        validity: formatDisplayDate(validity),
      };
      handleInputChange(fieldName, [...currentChips, newCoupon]);
      handleInputChange(`${fieldName}_input`, "");
      handleInputChange("discountPercentage", "");
      handleInputChange("couponValidityDate", null);
      return;
    }

    if (!currentChips.includes(inputValue.trim())) {
      handleInputChange(fieldName, [...currentChips, inputValue.trim()]);
    }
    handleInputChange(`${fieldName}_input`, "");
  };

  const handleRemoveChip = (fieldName, index) => {
    const currentChips = formData[fieldName] || [];
    const newChips = currentChips.filter((_, i) => i !== index);
    handleInputChange(fieldName, newChips);
  };

  const handleRepeaterInputChange = (fieldName, subFieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [`${fieldName}_temp`]: {
        ...prev[`${fieldName}_temp`],
        [subFieldName]: value,
      },
    }));
  };

  const handleAddRepeaterItem = (fieldName) => {
    const tempKey = `${fieldName}_temp`;
    const newItem = formData[tempKey];
    if (!newItem || Object.keys(newItem).length === 0) return;

    // Basic validation: check required subfields
    const field = fields.find((f) => f.name === fieldName);
    if (field && field.subFields) {
      const missingRequired = field.subFields.some(
        (sf) => sf.required && !newItem[sf.name]
      );
      if (missingRequired) return; // Could add error handling here
    }

    const currentItems = formData[fieldName] || [];
    handleInputChange(fieldName, [...currentItems, newItem]);

    // Clear temp data
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[tempKey];
      return newData;
    });
  };

  const handleRemoveRepeaterItem = (fieldName, index) => {
    const currentItems = formData[fieldName] || [];
    const newItems = currentItems.filter((_, i) => i !== index);
    handleInputChange(fieldName, newItems);
  };

  // Nested Repeater Helpers
  const handleNestedRepeaterInputChange = (
    parentFieldName,
    nestedFieldName,
    subSubFieldName,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [`${parentFieldName}_temp`]: {
        ...prev[`${parentFieldName}_temp`],
        [`${nestedFieldName}_temp`]: {
          ...(prev[`${parentFieldName}_temp`]?.[`${nestedFieldName}_temp`] ||
            {}),
          [subSubFieldName]: value,
        },
      },
    }));
  };

  const handleAddNestedRepeaterItem = (parentFieldName, nestedFieldName) => {
    const parentTempKey = `${parentFieldName}_temp`;
    const nestedTempKey = `${nestedFieldName}_temp`;
    const parentTemp = formData[parentTempKey] || {};
    const newItem = parentTemp[nestedTempKey];

    if (!newItem || Object.keys(newItem).length === 0) return;

    const currentNestedItems = parentTemp[nestedFieldName] || [];

    setFormData((prev) => ({
      ...prev,
      [parentTempKey]: {
        ...prev[parentTempKey],
        [nestedFieldName]: [...currentNestedItems, newItem],
        [nestedTempKey]: {}, // Clear nested temp
      },
    }));
  };

  const handleRemoveNestedRepeaterItem = (
    parentFieldName,
    nestedFieldName,
    index
  ) => {
    const parentTempKey = `${parentFieldName}_temp`;
    const parentTemp = formData[parentTempKey] || {};
    const currentNestedItems = parentTemp[nestedFieldName] || [];

    const newNestedItems = currentNestedItems.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      [parentTempKey]: {
        ...prev[parentTempKey],
        [nestedFieldName]: newNestedItems,
      },
    }));
  };

  const isFieldVisible = (field, data) => {
    if (!field.dependency) return true;
    const { name, value, values, notValue } = field.dependency;
    const dependentValue = data[name];

    if (value !== undefined) return dependentValue === value;
    if (values !== undefined) return values?.includes(dependentValue);
    if (notValue !== undefined) return dependentValue !== notValue;
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      // Skip validation if field is not visible
      if (!isFieldVisible(field, formData)) return;

      const value = (field.calculate && typeof field.calculate === "function")
        ? field.calculate(formData)
        : formData[field.name];
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0);

      if (field.required && isEmpty) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (isEmpty) return;

      if (field.type === "email" && !Regex.EMAIL_REGEX.test(value)) {
        newErrors[field.name] = "Please enter a valid email address";
      }

      // Phone field: delegate validation to libphonenumber-js via react-phone-number-input.
      // PhoneInput emits E.164 strings (e.g. "+919876543210") so we use isValidPhoneNumber
      // which handles country-specific rules automatically.
      if (field.type === "tel") {
        if (!value || !isValidPhoneNumber(String(value))) {
          newErrors[field.name] =
            field.patternMessage || "Please enter a valid phone number";
        }
      }

      if (field.type === "number") {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          newErrors[field.name] = "Please enter a valid number";
        } else {
          if (field.min !== undefined && numValue < field.min) {
            newErrors[field.name] = `Value must be at least ${field.min}`;
          }
          if (field.max !== undefined && numValue > field.max) {
            newErrors[field.name] = `Value must be at most ${field.max}`;
          }
        }
      }

      // Date field validations
      if (field.type === "date" && value) {
        // Parse "YYYY-MM-DD" as LOCAL midnight (new Date(string) parses as UTC which breaks IST comparisons)
        let dateVal;
        if (typeof value === "string" && Regex.ISO_DATE_STRING_REGEX.test(value)) {
          const [y, m, d] = value.split("-").map(Number);
          dateVal = new Date(y, m - 1, d); // local midnight
        } else {
          dateVal = new Date(value);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (field.disableFuture && dateVal > today) {
          newErrors[field.name] = field.futureDateMessage || `${field.label} cannot be in the future`;
        }

        if (!newErrors[field.name] && field.minAge) {
          const minAgeDate = new Date(today);
          minAgeDate.setFullYear(minAgeDate.getFullYear() - field.minAge);
          if (dateVal > minAgeDate) {
            newErrors[field.name] = field.minAgeMessage || `Must be at least ${field.minAge} years old`;
          }
        }

        if (!newErrors[field.name] && field.disablePast && dateVal < today) {
          newErrors[field.name] = field.pastDateMessage || `${field.label} cannot be in the past`;
        }
      }

      if (field.validate && typeof field.validate === "function") {
        const validationResult = field.validate(value, formData);
        if (validationResult !== true) {
          newErrors[field.name] = validationResult;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const dataToSubmit = { ...formData };
      fields.forEach((field) => {
        if (field.calculate && typeof field.calculate === "function") {
          dataToSubmit[field.name] = field.calculate(formData);
        }
      });
      onSubmit(dataToSubmit);
    }
  };

  // Toggle badge expansion
  const toggleBadgeExpansion = (fieldName, index) => {
    const key = `${fieldName}-${index}`;
    setExpandedBadges((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // handleClose: only allow closing when not submitting
  const handleClose = () => {
    if (isSubmitting) return;
    // Reset to initialData/default only when closing (not on parent re-render)
    const defaultData = buildDefaultData();
    setFormData({ ...defaultData, ...initialData });
    setProfileImagePreview(null);
    setErrors({});
    setExpandedBadges({});
    onClose();
  };

  // Dialog onOpenChange handler receives boolean; call handleClose only when dialog closing
  const handleDialogOpenChange = (isOpen) => {
    if (!isOpen) {
      handleClose();
    }
    // Do NOT reset when isOpen === true (opening); initialization is handled by useEffect on `open`
  };

  const renderField = (field, index) => {
    const value = (field.calculate && typeof field.calculate === "function")
      ? field.calculate(formData)
      : (field.type === "chips" || (field.type === "select" && field.multiple)
        ? formData[field.name] ?? []
        : formData[field.name] ?? "");
    const error = errors[field.name];

    switch (field.type) {
      case "placeholder":
        return <div key={field.name} />;
      case "richtext":
        return (
          <RichTextField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
          />
        );
      case "code":
        return (
          <CodeField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
      case "text":
      case "email":
      case "password":
      case "url":
      case "number":
        return (
          <TextField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
      case "tel":
        return (
          <PhoneField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
      case "select":
        return (
          <SelectField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
            onMultiSelectChange={handleMultiSelectChange}
            onRemoveMultiSelectItem={handleRemoveMultiSelectItem}
          />
        );
      case "date":
        return (
          <DateField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
      case "file":
        const acceptedFormats = field.accept
          ? field.accept.split(",").map((t) => t.trim())
          : ["image/*", "application/pdf"];

        const initialFiles = (() => {
          const value = formData[field.name];
          if (!value) return [];
          const files = Array.isArray(value) ? value : [value];
          return files.map((f, i) => {
            if (f instanceof File) {
              return {
                id: `initial-${i}`,
                file: f,
                preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
                status: 'success',
                progress: 100
              };
            } else if (typeof f === 'string') {
              let fileName = 'Existing File';
              try {
                const url = new URL(f);
                const pathname = url.pathname;
                const lastPart = pathname.split('/').pop();
                if (lastPart) {
                  const decoded = decodeURIComponent(lastPart);
                  fileName = decoded.replace(/^\d+-/, ''); // remove timestamp prefix e.g. 1781031717107-
                }
              } catch (e) {
                if (field.name === 'profileImg' && formData.firstName) {
                  fileName = `${formData.firstName} ${formData.lastName || ''}`.trim() + ' Profile';
                }
              }
              return {
                id: `initial-${i}`,
                file: { name: fileName, size: 0, type: field.fileType === 'image' ? 'image/jpeg' : 'application/octet-stream' },
                preview: f,
                status: 'success',
                progress: 100
              };
            } else if (typeof f === 'object' && f !== null) {
              // Handle object with metadata (e.g. from API)
              return {
                id: `initial-${i}`,
                file: {
                  name: f.fileName || f.name || 'Existing File',
                  size: f.fileSize || f.size || 0,
                  type: f.fileType || (field.fileType === 'image' ? 'image/jpeg' : 'application/octet-stream')
                },
                preview: f.cloudUrl || f.url || f.preview,
                status: 'success',
                progress: 100
              };
            }
            return null;
          }).filter(Boolean);
        })();

        return (
          <div key={field.name} className="space-y-2 mb-4 !max-w-[300px]">
            <FieldLabel field={field} />
            <FileUploader
              key={`${field.name}-${formData._id || 'new'}`}
              className="mt-2"
              acceptedFormats={acceptedFormats}
              helperText={field.helperText}
              maxSize={field.maxSize || 10}
              maxFiles={field.multiple ? 10 : 1}
              initialFiles={initialFiles}
              viewMode={viewMode}
              onValueChange={(files) => {
                if (field.multiple) {
                  handleInputChange(field.name, files);
                } else {
                  handleInputChange(field.name, files[0] || null);
                }
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );
      case "chips":
        return (
          <ChipsField
            key={field.name}
            field={field}
            formData={formData}
            error={error}
            viewMode={viewMode}
            onInputChange={handleInputChange}
            onAddChip={handleAddChip}
            onRemoveChip={handleRemoveChip}
            expandedBadges={expandedBadges}
            onToggleBadgeExpansion={toggleBadgeExpansion}
          />
        );
      case "repeater":
        return (
          <RepeaterField
            key={field.name}
            field={field}
            formData={formData}
            error={error}
            viewMode={viewMode}
            onRepeaterInputChange={handleRepeaterInputChange}
            onAddRepeaterItem={handleAddRepeaterItem}
            onRemoveRepeaterItem={handleRemoveRepeaterItem}
            onNestedRepeaterInputChange={handleNestedRepeaterInputChange}
            onAddNestedRepeaterItem={handleAddNestedRepeaterItem}
            onRemoveNestedRepeaterItem={handleRemoveNestedRepeaterItem}
            setFormData={setFormData}
          />
        );
      case "dependent-courses":
        return (
          <DependentCoursesField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
      case "video-list":
        return (
          <VideoListField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
      case "switch":
      case "checkbox":
        return (
          <ToggleField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
      default:
        return (
          <TextField
            key={field.name}
            field={field}
            value={value}
            onChange={handleInputChange}
            error={error}
            viewMode={viewMode}
          />
        );
    }
  };

  const renderFields = () => {
    const sections = {};
    const ungroupedFields = [];

    const visibleFields = fields.filter((field) => {
      if (!field.dependency) return true;
      const { name, value, values, notValue } = field.dependency;
      const dependentValue = formData[name];

      if (value !== undefined) return dependentValue === value;
      if (values !== undefined) return values?.includes(dependentValue);
      if (notValue !== undefined) return dependentValue !== notValue;
      return true;
    });

    visibleFields.forEach((field) => {
      if (field.section) {
        if (!sections[field.section]) sections[field.section] = [];
        sections[field.section].push(field);
      } else {
        ungroupedFields.push(field);
      }
    });

    const renderedSections = [];

    Object.keys(sections).forEach((sectionName) => {
      const sectionFields = sections[sectionName];
      renderedSections.push(
        <div key={sectionName} className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{sectionName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(() => {
              const renderedRows = new Set();
              const renderedElements = [];

              sectionFields.forEach((field, index) => {
                if (field.row) {
                  if (renderedRows.has(field.row)) return;

                  const rowFields = sectionFields.filter(
                    (f) => f.row === field.row
                  );

                  if (rowFields.length > 1) {
                    renderedElements.push(
                      <div
                        key={`${sectionName}-row-${field.row}`}
                        className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {rowFields.map((rowField) => renderField(rowField))}
                      </div>
                    );
                    renderedRows.add(field.row);
                  } else {
                    renderedElements.push(renderField(field, index));
                  }
                } else {
                  renderedElements.push(renderField(field, index));
                }
              });

              return renderedElements;
            })()}
          </div>
        </div>
      );
    });

    if (ungroupedFields.length > 0) {
      const renderedRows = new Set();

      ungroupedFields.forEach((field, index) => {
        if (field.row) {
          if (renderedRows.has(field.row)) return;

          const rowFields = ungroupedFields.filter((f) => f.row === field.row);

          if (rowFields.length > 1) {
            renderedSections.push(
              <div
                key={`ungrouped-row-${field.row}`}
                className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {rowFields.map((rowField) => renderField(rowField))}
              </div>
            );
            renderedRows.add(field.row);
          } else {
            renderedSections.push(renderField(field, index));
          }
        } else {
          renderedSections.push(renderField(field, index));
        }
      });
    }

    return renderedSections;
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange} {...props}>
      <DialogContent className="w-[95%] sm:max-w-[60%] p-4 sm:p-6 max-h-[90vh] sm:max-h-[85vh] rounded-lg flex flex-col overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex justify-between items-center text-lg sm:text-2xl font-bold text-gray-800">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 px-0 sm:px-4 flex-grow overflow-y-auto min-h-[200px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white rounded-xl">
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-sky-600 animate-spin" />
              <span className="text-sm font-semibold text-slate-500 animate-pulse">Loading details...</span>
            </div>
          ) : (
            renderFields()
          )}
        </div>
        <DialogFooter className="pt-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:space-x-2">
          {cancelButtonText && (
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md"
            >
              {cancelButtonText}
            </Button>
          )}
          {submitButtonText && (
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={isSubmitting || viewMode}
              className="px-4 py-2 rounded-md text-primary-foreground"
            >
              {isSubmitting ? "Loading..." : submitButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        "text",
        "email",
        "tel",
        "password",
        "url",
        "number",
        "select",
        "date",
        "file",
        "chips",
        "richtext",
        "code",
        "placeholder",
        "repeater",
        "phone",
      ]),
      required: PropTypes.bool,
      section: PropTypes.string,
      row: PropTypes.number,
      fullWidth: PropTypes.bool,
      multiline: PropTypes.bool,
      rows: PropTypes.number,
      placeholder: PropTypes.string,
      helperText: PropTypes.string,
      tooltip: PropTypes.string,
      options: PropTypes.array,
      multiple: PropTypes.bool,
      min: PropTypes.number,
      max: PropTypes.number,
      step: PropTypes.number,
      maxLength: PropTypes.number,
      minLength: PropTypes.number,
      pattern: PropTypes.string,
      patternMessage: PropTypes.string,
      accept: PropTypes.string,
      maxSize: PropTypes.number,
      fileType: PropTypes.string,
      validate: PropTypes.func,
      inputProps: PropTypes.object,
      props: PropTypes.object,
      disablePast: PropTypes.bool,
      disableFuture: PropTypes.bool,
    })
  ),
  initialData: PropTypes.object,
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  fullWidth: PropTypes.bool,
  viewMode: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

export default FormDialog;
