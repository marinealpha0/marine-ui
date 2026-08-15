"use client"

import * as React from "react"
import { X, Check, ChevronsUpDown, Loader2 } from "@/assets/icons"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function MultiSelect({
    options,
    value = [],
    onChange,
    placeholder = "Select options...",
    disabled,
    className,
    onOpenChange,
    loading,
}) {
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item) => {
        onChange?.(value.filter((i) => i !== item))
    }

    const handleSelect = (itemValue) => {
        const newValue = value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue]

        onChange?.(newValue)
    }

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen)
        onOpenChange?.(newOpen)
    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "h-auto min-h-10 w-full justify-between px-3 py-2 font-normal hover:bg-background hover:text-foreground",
                        className
                    )}
                >
                    <div className="flex flex-wrap gap-1">
                        {value.length > 0 ? (
                            <>
                                {value.slice(0, 2).map((val) => {
                                    const option = options.find((o) => o.value === val)

                                    return (
                                        <Badge
                                            key={val}
                                            className="rounded-sm px-1.5 py-0.5 font-normal bg-primary/10 text-primary border-transparent hover:bg-primary/20 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleUnselect(val)
                                            }}
                                        >
                                            {option?.label ?? val}
                                            <X className="ml-1.5 h-3 w-3 text-primary/70 hover:text-primary" />
                                        </Badge>
                                    )
                                })}
                                {value.length > 2 && (
                                    <Badge
                                        className="rounded-sm px-1.5 py-0.5 font-normal bg-primary/10 text-primary border-transparent"
                                    >
                                        +{value.length - 2}
                                    </Badge>
                                )}
                            </>
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>

                    {loading ? (
                        <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin text-primary" />
                    ) : (
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="w-[var(--radix-popover-trigger-width)] p-0"
            >
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => handleSelect(option.value)}
                                    className="data-[selected='true']:bg-primary/10 data-[selected='true']:text-primary"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value.includes(option.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
