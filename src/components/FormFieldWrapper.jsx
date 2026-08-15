"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Loader2, UploadCloud, X, Eye, EyeOff } from "@/assets/icons"

import { cn } from "@/lib/utils"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MultiSelect } from "@/components/ui/multi-select"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { compressImageIfNeeded } from "@/utils/imageCompression"


export function FormFieldWrapper({
    name,
    label,
    description,
    placeholder,
    type = "text",
    options = [],
    disabled = false,
    loading = false,
    required = false,
    className,
    rows = 3,
    splitBy = "\n",
    icon: Icon,
    onOpenChange,
}) {
    const { control } = useFormContext()
    const [showPassword, setShowPassword] = useState(false)

    const renderControl = (field) => {
        const commonProps = {
            placeholder,
            disabled: disabled || loading,
            ...field,
        }

        const inputClasses =
            "border border-input bg-background rounded-md h-10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:ring-0 focus:ring-offset-0 transition-all duration-200"

        const isScannerInput = ["textarea", "textarea-list", "select", "multi-select", "checkbox", "radio", "file", "image", "date", "date-picker"].includes(type)

        if (loading && !isScannerInput) {
            return (
                <div className="relative">
                    <Input
                        {...commonProps}
                        placeholder=" "
                        className={cn(inputClasses, "pr-10 peer placeholder:text-transparent")}
                    />
                    <Label
                        className={cn(
                            "absolute left-3 top-0 z-10 origin-[0] -translate-y-1/2 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-primary pointer-events-none peer-[:-webkit-autofill]:top-0 peer-[:-webkit-autofill]:-translate-y-1/2 peer-[:-webkit-autofill]:scale-75 rounded-sm truncate max-w-[calc(100%-2.5rem)]",
                            Icon && "left-9"
                        )}
                    >
                        {label || placeholder}
                        {required && <span className="ml-0.5 text-destructive">*</span>}
                    </Label>
                    <div className="absolute right-3 top-3 h-4 w-4">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )
        }

        // Handle Password Type specifically for toggle
        const isPasswordType = type === "password"
        const currentType = isPasswordType && showPassword ? "text" : type

        switch (type) {
            case "textarea":
                return (
                    <div className="relative">
                        <Textarea
                            {...commonProps}
                            rows={rows}
                            placeholder=" "
                            className={cn(inputClasses, "h-auto min-h-[100px] py-2 peer placeholder:text-transparent")}
                        />
                        <Label
                            className={cn(
                                "absolute left-3 top-0 z-10 origin-[0] -translate-y-1/2 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-primary pointer-events-none peer-[:-webkit-autofill]:top-0 peer-[:-webkit-autofill]:-translate-y-1/2 peer-[:-webkit-autofill]:scale-75 rounded-sm truncate max-w-[calc(100%-2.5rem)]"
                            )}
                        >
                            {label || placeholder}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </Label>
                    </div>
                )

            case "textarea-list":
                return (
                    <div className="relative">
                        <Textarea
                            {...commonProps}
                            value={Array.isArray(field.value) ? field.value.join("\n") : field.value || ""}
                            onChange={(e) => field.onChange(e.target.value.split(splitBy))}
                            rows={rows}
                            placeholder=" "
                            className={cn(inputClasses, "h-auto min-h-[100px] py-2 peer placeholder:text-transparent")}
                        />
                        <Label
                            className={cn(
                                "absolute left-3 top-0 z-10 origin-[0] -translate-y-1/2 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-primary pointer-events-none peer-[:-webkit-autofill]:top-0 peer-[:-webkit-autofill]:-translate-y-1/2 peer-[:-webkit-autofill]:scale-75 rounded-sm truncate max-w-[calc(100%-2.5rem)]"
                            )}
                        >
                            {label || placeholder}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </Label>
                    </div>
                )

            case "select":
                return (
                    <div className="relative">
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={disabled || loading}
                            onOpenChange={onOpenChange}
                            open={loading ? false : undefined}
                        >
                            <SelectTrigger className={inputClasses} loading={loading}>
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {options && options.length > 0 ? (
                                    options.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem disabled value="no-data" className="text-muted-foreground text-center">
                                        No data available
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        <Label
                            className={cn(
                                "absolute left-3 top-0 z-10 origin-[0] -translate-y-1/2 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-200 pointer-events-none rounded-sm truncate max-w-[calc(100%-2.5rem)]",
                                !field.value && "top-1/2 scale-100"
                            )}
                        >
                            {label || placeholder}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </Label>
                    </div>
                )

            case "multi-select":
                return (
                    <div className="relative">
                        <MultiSelect
                            options={options}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder=""
                            disabled={disabled || loading}
                            loading={loading}
                            onOpenChange={onOpenChange}
                        />
                        <Label
                            className={cn(
                                "absolute left-3 top-0 z-10 origin-[0] -translate-y-1/2 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-200 pointer-events-none rounded-sm truncate max-w-[calc(100%-2.5rem)]",
                                (!field.value || field.value.length === 0) && "top-1/2 scale-100"
                            )}
                        >
                            {label || placeholder}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </Label>
                    </div>
                )

            case "checkbox":
                return (
                    <div className="flex items-center space-x-2 py-1">
                        <Checkbox
                            id={name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled || loading}
                        />
                        {label && (
                            <Label
                                htmlFor={name}
                                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {label}
                            </Label>
                        )}
                    </div>
                )

            case "radio":
                return (
                    <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={disabled || loading}
                        className="flex flex-col space-y-1"
                    >
                        {options.map((opt) => (
                            <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={opt.value}
                                    id={`${name}-${opt.value}`}
                                />
                                <Label
                                    htmlFor={`${name}-${opt.value}`}
                                    className="font-normal"
                                >
                                    {opt.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )

            case "file":
            case "image":
                return (
                    <div className="grid w-full items-center gap-1.5">
                        <div
                            className={cn(
                                "relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted/80",
                                (disabled || loading) && "pointer-events-none opacity-50"
                            )}
                            onClick={() =>
                                document.getElementById(`${name}-file-input`)?.click()
                            }
                        >
                            {field.value ? (
                                <div className="relative h-full w-full p-2">
                                    {type === "image" ? (
                                        <img
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : URL.createObjectURL(field.value)
                                            }
                                            alt="Preview"
                                            className="h-full w-full rounded-md object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-sm font-medium">
                                            {field.value.name || "File selected"}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            field.onChange(null)
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <UploadCloud className="mb-3 h-8 w-8 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or
                                        drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {type === "image"
                                            ? "PNG, JPG or GIF (max. 800x400px)"
                                            : "Any file type"}
                                    </p>
                                </div>
                            )}

                            <input
                                id={`${name}-file-input`}
                                type="file"
                                className="hidden"
                                accept={type === "image" ? "image/*" : undefined}
                                onChange={async (e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        const finalFile = await compressImageIfNeeded(file)
                                        field.onChange(finalFile)
                                    }
                                }}

                            />
                        </div>
                    </div>
                )

            case "date":
            case "date-picker":
                return (
                    <div className="relative">
                        <DatePicker
                            value={field.value}
                            onChange={(date) => {
                                if (date) {
                                    const year = date.getFullYear()
                                    const month = String(date.getMonth() + 1).padStart(2, "0")
                                    const day = String(date.getDate()).padStart(2, "0")
                                    field.onChange(`${year}-${month}-${day}`)
                                } else {
                                    field.onChange("")
                                }
                            }}
                            disabled={disabled || loading}
                            placeholder=""
                            variant="ghost"
                            className={cn(inputClasses, className)}
                        />
                        <Label
                            className={cn(
                                "absolute left-3 top-0 z-10 origin-[0] -translate-y-1/2 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-200 pointer-events-none rounded-sm truncate max-w-[calc(100%-2.5rem)]",
                                !field.value && "top-1/2 scale-100"
                            )}
                        >
                            {label || placeholder}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </Label>
                    </div>
                )

            default:
                // Text, password, email, tel, etc.
                return (
                    <div className="relative">
                        {Icon && (
                            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                        )}
                        <Input
                            {...commonProps}
                            type={currentType}
                            placeholder=" "
                            onClick={(e) => {
                                if (type === "date" && e.currentTarget.showPicker) {
                                    e.currentTarget.showPicker()
                                }
                            }}
                            className={cn(
                                inputClasses,
                                Icon && "pl-10",
                                isPasswordType && "pr-10",
                                type === "date" && "[&::-webkit-calendar-picker-indicator]:hidden",
                                "peer placeholder:text-transparent"
                            )}
                        />
                        <Label
                            className={cn(
                                "absolute left-2 top-0 z-10 origin-[0] -translate-y-1/2 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-primary pointer-events-none peer-[:-webkit-autofill]:top-0 peer-[:-webkit-autofill]:-translate-y-1/2 peer-[:-webkit-autofill]:scale-75 rounded-sm truncate max-w-[calc(100%-2.5rem)]",
                                Icon && "left-9"
                            )}
                        >
                            {label || placeholder}
                            {required && <span className="ml-0.5 text-destructive">*</span>}
                        </Label>
                        {isPasswordType && (
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </button>
                        )}
                    </div>
                )
        }
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn("w-full space-y-1.5", className)}
                >
                    {label && ["checkbox", "radio", "file", "image"].includes(type) && (
                        <FormLabel className="text-sm font-medium text-foreground">
                            {label}
                            {required && (
                                <span className="ml-0.5 text-destructive">*</span>
                            )}
                        </FormLabel>
                    )}

                    <FormControl>{renderControl(field)}</FormControl>

                    {description && (
                        <FormDescription className="text-[12px] text-muted-foreground leading-normal">
                            {description}
                        </FormDescription>
                    )}

                    <FormMessage className="text-xs font-medium" />
                </FormItem>
            )}
        />
    )
}
