import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./FieldLabel";

export const SelectField = ({
    field,
    value,
    onChange,
    error,
    viewMode,
    onMultiSelectChange,
    onRemoveMultiSelectItem,
}) => {
    if (field.multiple) {
        return (
            <div className="space-y-2">
                <FieldLabel field={field} />
                <Select
                    onValueChange={(selectedValue) =>
                        onMultiSelectChange(field.name, selectedValue)
                    }
                    disabled={viewMode || field.disabled || field.loading}
                    onOpenChange={field.onOpenChange || field.props?.onOpenChange}
                    open={field.loading ? false : undefined}
                    {...field.props}
                >
                    <SelectTrigger className={cn(error && "border-red-500")} loading={field.loading}>
                        <SelectValue
                            placeholder={
                                field.placeholder || `Select ${field.label.toLowerCase()}`
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {field.options && field.options.length > 0 ? (
                            field.options.map((option) => {
                                const optionValue =
                                    typeof option === "object" ? option.value : option;
                                const optionLabel =
                                    typeof option === "object" ? option.label : option;
                                const isSelected = value.includes(optionValue);

                                const optionDisabled = typeof option === "object" ? option.disabled : false;
                                return (
                                    <SelectItem
                                        key={optionValue}
                                        value={optionValue}
                                        disabled={isSelected || optionDisabled}
                                        className={cn((isSelected || optionDisabled) && "opacity-50")}
                                    >
                                        {optionLabel} {isSelected && "(Selected)"}
                                    </SelectItem>
                                );
                            })
                        ) : (
                            <SelectItem disabled value="no-data" className="text-muted-foreground text-center">
                                No data available
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>

                {value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {value.map((item, idx) => {
                            const option = field.options?.find(
                                (opt) => (typeof opt === "object" ? opt.value : opt) === item
                            );
                            const displayText = option
                                ? typeof option === "object"
                                    ? option.label
                                    : option
                                : item;

                            return (
                                <Badge
                                    key={`${field.name}-selected-${idx}`}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    {displayText}
                                    {!viewMode && (
                                        <X
                                            className="h-3 w-3 cursor-pointer hover:text-red-500"
                                            onClick={() => onRemoveMultiSelectItem(field.name, idx)}
                                        />
                                    )}
                                </Badge>
                            );
                        })}
                    </div>
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}
                {field.helperText && !error && (
                    <p className="text-sm text-muted-foreground">{field.helperText}</p>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <FieldLabel field={field} />
            <Select
                value={value}
                onValueChange={(selectedValue) => onChange(field.name, selectedValue)}
                disabled={viewMode || field.disabled || field.loading}
                onOpenChange={field.onOpenChange || field.props?.onOpenChange}
                open={field.loading ? false : undefined}
                {...field.props}
            >
                <SelectTrigger className={cn(error && "border-red-500")} loading={field.loading}>
                    <SelectValue
                        placeholder={
                            field.placeholder || `Select a ${field.label.toLowerCase()}`
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    {field.options && field.options.length > 0 ? (
                        field.options.map((option) => {
                            const optionValue = typeof option === "object" ? option.value : option;
                            const optionDisabled = typeof option === "object" ? option.disabled : false;
                            return (
                                <SelectItem
                                    key={optionValue}
                                    value={optionValue}
                                    disabled={optionDisabled}
                                >
                                    {typeof option === "object" ? option.label : option}
                                </SelectItem>
                            );
                        })
                    ) : (
                        <SelectItem disabled value="no-data" className="text-muted-foreground text-center">
                            No data available
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {field.helperText && !error && (
                <p className="text-sm text-muted-foreground">{field.helperText}</p>
            )}
        </div>
    );
};
