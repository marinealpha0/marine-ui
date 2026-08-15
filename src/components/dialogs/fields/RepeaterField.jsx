import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, X, Edit2 } from "@/assets/icons";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/editors/RichTextEditor";
import { FieldLabel } from "./FieldLabel";

export const RepeaterField = ({
    field,
    formData,
    error,
    viewMode,
    onRepeaterInputChange,
    onAddRepeaterItem,
    onRemoveRepeaterItem,
    onNestedRepeaterInputChange,
    onAddNestedRepeaterItem,
    onRemoveNestedRepeaterItem,
    setFormData, // Need this for the edit functionality which manipulates formData directly
}) => {
    const value = formData[field.name] ?? [];

    return (
        <div className="space-y-4 col-span-full">
            <FieldLabel field={field} />

            {/* List of existing items */}
            <div className="space-y-3">
                {(value || []).map((item, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "group relative flex flex-col gap-3 transition-all duration-200",
                            !field.renderItem &&
                            "p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-300"
                        )}
                    >
                        {/* Action Buttons */}
                        {!viewMode && (
                            <div
                                className={cn(
                                    "absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1",
                                    "top-4 right-11"
                                )}
                            >
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-md bg-white shadow-sm border border-gray-200"
                                    onClick={() => {
                                        // Populate the temp fields with the item's data
                                        const tempFieldName = `${field.name}_temp`;
                                        const currentTempData = formData[tempFieldName] || {};

                                        // Create a new object with the item's data
                                        const newTempData = { ...currentTempData, ...item };

                                        // Update the form data with the item's data
                                        setFormData((prev) => ({
                                            ...prev,
                                            [tempFieldName]: newTempData,
                                        }));

                                        // Remove the item from the list (it's now in the "edit" area)
                                        onRemoveRepeaterItem(field.name, idx);
                                    }}
                                    title="Edit"
                                >
                                    <Edit2 className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md bg-white shadow-sm border border-gray-200"
                                    onClick={() => onRemoveRepeaterItem(field.name, idx)}
                                    title="Remove"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        <div className="flex-1">
                            {field.renderItem ? (
                                field.renderItem(item)
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                    {field.subFields?.map((subField) => {
                                        const itemValue = item[subField.name];
                                        // Skip rendering if value is empty
                                        if (
                                            itemValue === undefined ||
                                            itemValue === null ||
                                            itemValue === ""
                                        )
                                            return null;

                                        return (
                                            <div
                                                key={subField.name}
                                                className="flex flex-col gap-1 min-w-0"
                                            >
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 truncate">
                                                    {subField.label}
                                                </span>
                                                <span className="text-sm font-medium text-gray-700 break-words">
                                                    {subField.type === "repeater"
                                                        ? `${Array.isArray(itemValue) ? itemValue.length : 0
                                                        } items`
                                                        : subField.type === "select" && subField.options
                                                            ? (() => {
                                                                const opt = subField.options.find(
                                                                    (o) =>
                                                                        (typeof o === "object" ? o.value : o) ===
                                                                        itemValue
                                                                );
                                                                return opt
                                                                    ? typeof opt === "object"
                                                                        ? opt.label
                                                                        : opt
                                                                    : itemValue;
                                                            })()
                                                            : String(itemValue)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {(!value || value.length === 0) && (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg bg-gray-50 text-muted-foreground">
                        <p className="text-sm">No {field.label.toLowerCase()} added yet.</p>
                    </div>
                )}
            </div>

            {/* Inputs for new item */}
            {!viewMode && (
                <div className="border-2 border-dashed border-gray-200 p-6 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    {!field.inlineAdd && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Plus className="h-4 w-4" />
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900">
                                Add New {field.label}
                            </h4>
                        </div>
                    )}

                    <div className={cn(field.inlineAdd ? "flex items-end gap-3" : "")}>
                        <div className={cn("flex-1", field.inlineAdd ? "flex gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-5")}>
                            {field.subFields.map((subField) => {
                                const tempValue =
                                    formData[`${field.name}_temp`]?.[subField.name] || "";

                                // Add flex-1 to wrapper div if inlineAdd so they distribute space
                                const wrapperClass = field.inlineAdd
                                    ? (subField.type === 'switch' ? 'w-auto min-w-[120px]' : 'flex-[2]')
                                    : (subField.fullWidth ? "col-span-full" : "");

                                if (subField.type === "repeater") {
                                    const nestedItems =
                                        formData[`${field.name}_temp`]?.[subField.name] || [];
                                    return (
                                        <div
                                            key={subField.name}
                                            className="col-span-full space-y-3 border p-4 rounded-lg bg-white shadow-sm"
                                        >
                                            <Label className="text-sm font-semibold text-gray-700">
                                                {subField.label}
                                            </Label>

                                            {/* List Nested Items */}
                                            <div className="space-y-2">
                                                {nestedItems.map((nItem, nIdx) => (
                                                    <div
                                                        key={nIdx}
                                                        className="group flex justify-between items-center text-sm bg-gray-50 p-3 rounded-md border border-gray-100"
                                                    >
                                                        <span className="font-medium text-gray-700">
                                                            {subField.renderItem
                                                                ? subField.renderItem(nItem)
                                                                : Object.values(nItem)
                                                                    .map((v) =>
                                                                        typeof v === "string"
                                                                            ? v.substring(0, 30)
                                                                            : "..."
                                                                    )
                                                                    .join(", ")}
                                                        </span>
                                                        <X
                                                            className="h-4 w-4 cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                                                            onClick={() =>
                                                                onRemoveNestedRepeaterItem(
                                                                    field.name,
                                                                    subField.name,
                                                                    nIdx
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                                {nestedItems.length === 0 && (
                                                    <p className="text-xs text-muted-foreground italic px-1">
                                                        No items added.
                                                    </p>
                                                )}
                                            </div>

                                            {/* Add New Nested Item */}
                                            <div className="bg-gray-50 p-3 rounded-md border border-dashed border-gray-200 mt-2">
                                                <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
                                                    New {subField.label}
                                                </p>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {subField.subFields?.map((subSubField) => {
                                                        const nestedTempValue =
                                                            formData[`${field.name}_temp`]?.[
                                                            `${subField.name}_temp`
                                                            ]?.[subSubField.name] || "";

                                                        if (subSubField.type === "richtext") {
                                                            return (
                                                                <div
                                                                    key={subSubField.name}
                                                                    className="space-y-1.5"
                                                                >
                                                                    <Label className="text-xs font-medium text-gray-600">
                                                                        {subSubField.label}
                                                                    </Label>
                                                                    <RichTextEditor
                                                                        value={nestedTempValue}
                                                                        onChange={(val) =>
                                                                            onNestedRepeaterInputChange(
                                                                                field.name,
                                                                                subField.name,
                                                                                subSubField.name,
                                                                                val
                                                                            )
                                                                        }
                                                                        maxHeight="150px"
                                                                    />
                                                                </div>
                                                            );
                                                        }

                                                        if (subSubField.type === "code") {
                                                            return (
                                                                <div
                                                                    key={subSubField.name}
                                                                    className="space-y-1.5"
                                                                >
                                                                    <Label className="text-xs font-medium text-gray-600">
                                                                        {subSubField.label}
                                                                    </Label>
                                                                    <textarea
                                                                        value={nestedTempValue}
                                                                        onChange={(e) =>
                                                                            onNestedRepeaterInputChange(
                                                                                field.name,
                                                                                subField.name,
                                                                                subSubField.name,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder={
                                                                            subSubField.placeholder ||
                                                                            "// Enter code..."
                                                                        }
                                                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-xs text-slate-50 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                                                                        spellCheck={false}
                                                                    />
                                                                </div>
                                                            );
                                                        }

                                                        return (
                                                            <div key={subSubField.name} className="space-y-1.5">
                                                                <Label className="text-xs font-medium text-gray-600">
                                                                    {subSubField.label}
                                                                </Label>
                                                                <Input
                                                                    value={nestedTempValue}
                                                                    onChange={(e) =>
                                                                        onNestedRepeaterInputChange(
                                                                            field.name,
                                                                            subField.name,
                                                                            subSubField.name,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    placeholder={subSubField.placeholder}
                                                                    className="h-9 text-sm bg-white"
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() =>
                                                            onAddNestedRepeaterItem(field.name, subField.name)
                                                        }
                                                        className="mt-2 w-full"
                                                    >
                                                        <Plus className="h-3 w-3 mr-1" /> Add {subField.label}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if (subField.type === "richtext") {
                                    return (
                                        <div key={subField.name} className="col-span-full space-y-2">
                                            <Label
                                                className={
                                                    subField.required
                                                        ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                                                        : ""
                                                }
                                            >
                                                {subField.label}
                                            </Label>
                                            <RichTextEditor
                                                value={tempValue}
                                                onChange={(val) =>
                                                    onRepeaterInputChange(field.name, subField.name, val)
                                                }
                                                maxHeight="200px"
                                            />
                                        </div>
                                    );
                                }

                                if (subField.type === "select") {
                                    return (
                                        <div key={subField.name} className="space-y-2">
                                            <Label
                                                className={
                                                    subField.required
                                                        ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                                                        : ""
                                                }
                                            >
                                                {subField.label}
                                            </Label>
                                            <Select
                                                value={tempValue}
                                                onValueChange={(val) =>
                                                    onRepeaterInputChange(field.name, subField.name, val)
                                                }
                                            >
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue
                                                        placeholder={subField.placeholder || "Select"}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subField.options?.map((opt) => (
                                                        <SelectItem
                                                            key={typeof opt === "object" ? opt.value : opt}
                                                            value={typeof opt === "object" ? opt.value : opt}
                                                        >
                                                            {typeof opt === "object" ? opt.label : opt}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    );
                                }

                                if (subField.type === "code") {
                                    return (
                                        <div key={subField.name} className="col-span-full space-y-2">
                                            <Label
                                                className={
                                                    subField.required
                                                        ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                                                        : ""
                                                }
                                            >
                                                {subField.label}
                                            </Label>
                                            <div className="relative rounded-md border border-input bg-slate-950 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                                                <div className="flex items-center justify-between px-3 py-1 border-b border-slate-800 bg-slate-900/50 rounded-t-md">
                                                    <span className="text-xs text-slate-400 font-mono">
                                                        Code Editor
                                                    </span>
                                                </div>
                                                <textarea
                                                    value={tempValue}
                                                    onChange={(e) =>
                                                        onRepeaterInputChange(
                                                            field.name,
                                                            subField.name,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={
                                                        subField.placeholder || "// Enter code here..."
                                                    }
                                                    className="flex min-h-[150px] w-full bg-transparent px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono resize-y"
                                                    spellCheck={false}
                                                />
                                            </div>
                                        </div>
                                    );
                                }

                                if (subField.type === "switch") {
                                    const isChecked = tempValue === true || tempValue === "true";
                                    return (
                                        <div key={subField.name} className={cn("space-y-2", wrapperClass)}>
                                            <Label
                                                className={
                                                    subField.required
                                                        ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                                                        : ""
                                                }
                                            >
                                                {subField.label}
                                            </Label>
                                            <div className="flex items-center h-10">
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={isChecked}
                                                    onClick={() =>
                                                        onRepeaterInputChange(
                                                            field.name,
                                                            subField.name,
                                                            !isChecked
                                                        )
                                                    }
                                                    className={cn(
                                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                                        isChecked ? "bg-green-500" : "bg-gray-200"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                                                            isChecked ? "translate-x-5" : "translate-x-0"
                                                        )}
                                                    />
                                                </button>
                                                <span className="ml-2 text-sm text-muted-foreground">{isChecked ? "Yes" : "No"}</span>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={subField.name} className={cn("space-y-2", wrapperClass)}>
                                        <Label
                                            className={
                                                subField.required
                                                    ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                                                    : ""
                                            }
                                        >
                                            {subField.label}
                                        </Label>
                                        <Input
                                            value={tempValue}
                                            onChange={(e) =>
                                                onRepeaterInputChange(
                                                    field.name,
                                                    subField.name,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={subField.placeholder}
                                            type={subField.type || "text"}
                                            className="bg-white"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cn(field.inlineAdd ? "" : "mt-6 flex justify-end")}>
                            <Button
                                type="button"
                                onClick={() => onAddRepeaterItem(field.name)}
                                disabled={field.disabled}
                                className={cn("px-6", field.inlineAdd && "h-10")}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {field.inlineAdd ? "Add" : "Add to List"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
