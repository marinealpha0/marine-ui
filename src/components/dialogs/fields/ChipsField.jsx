import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, ChevronUp, ChevronDown } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/formUtils";
import { FieldLabel } from "./FieldLabel";

export const ChipsField = ({
    field,
    formData,
    error,
    viewMode,
    onInputChange,
    onAddChip,
    onRemoveChip,
    expandedBadges,
    onToggleBadgeExpansion,
}) => {
    // Fields that should have truncation enabled
    const truncatableFields = [
        "jobDescription",
        "jobResponsibilities",
        "education",
    ];
    const shouldTruncate = truncatableFields.includes(field.name);
    const value = formData[field.name] ?? [];

    return (
        <div className="space-y-2">
            <FieldLabel field={field} />
            {!viewMode && (
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder={
                            field.placeholder || `Add ${field.label.toLowerCase()}`
                        }
                        value={formData[`${field.name}_input`] || ""}
                        onChange={(e) => onInputChange(`${field.name}_input`, e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                onAddChip(field.name);
                            }
                        }}
                        className={cn(error && "border-red-500")}
                        disabled={field.disabled}
                    />
                    <Button
                        type="button"
                        onClick={() => onAddChip(field.name)}
                        disabled={
                            !formData[`${field.name}_input`]?.trim() || field.disabled
                        }
                        size="icon"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <div className="flex flex-wrap gap-2 min-h-[40px]">
                {(value || []).map((item, idx) => {
                    const itemText =
                        typeof item === "object"
                            ? `${item.code} (${item.discount})`
                            : item;

                    const badgeKey = `${field.name}-${idx}`;
                    const isExpanded = expandedBadges[badgeKey];
                    const needsTruncation = shouldTruncate && itemText.length > 75;
                    const displayText =
                        needsTruncation && !isExpanded
                            ? truncateText(itemText, 75)
                            : itemText;

                    return (
                        <Badge
                            key={`${field.name}-chip-${idx}`}
                            variant="secondary"
                            className="flex items-center gap-1 max-w-full bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 transition-colors"
                        >
                            <span className="break-words">{displayText}</span>
                            {needsTruncation && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0 ml-1 text-xs text-gray-600 hover:text-primary hover:bg-transparent font-semibold"
                                    onClick={() => onToggleBadgeExpansion(field.name, idx)}
                                >
                                    {isExpanded ? (
                                        <span className="flex items-center gap-0.5">
                                            Less <ChevronUp className="h-3 w-3" />
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-0.5">
                                            More <ChevronDown className="h-3 w-3" />
                                        </span>
                                    )}
                                </Button>
                            )}
                            {!viewMode && (
                                <X
                                    className="h-3 w-3 cursor-pointer ml-1 flex-shrink-0 hover:text-red-600 transition-colors"
                                    onClick={() =>
                                        !field.disabled && onRemoveChip(field.name, idx)
                                    }
                                />
                            )}
                        </Badge>
                    );
                })}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
