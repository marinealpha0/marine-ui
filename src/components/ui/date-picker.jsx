import * as React from "react"
import { Calendar as CalendarIcon } from "@/assets/icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
    value,
    onChange,
    className,
    placeholder = "Pick a date",
    disabled,          // disables the trigger button
    calendarDisabled,  // function (date) => bool — disables individual calendar days
    variant = "ghost",
    fromYear,
    toYear,
    ...props
}) {
    const [date, setDate] = React.useState(() => {
        if (value) {
            const d = new Date(value)
            return !isNaN(d.getTime()) ? d : undefined
        }
        return undefined
    })
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if (value) {
            const d = new Date(value)
            if (!isNaN(d.getTime())) {
                setDate(d)
            } else {
                setDate(undefined)
            }
        } else {
            setDate(undefined)
        }
    }, [value])

    const handleSelect = (newDate) => {
        setDate(newDate)
        if (onChange) {
            onChange(newDate)
        }
        setOpen(false)
    }

    // Use Intl.DateTimeFormat for formatting to avoid date-fns dependency if not present
    const formattedDate = date
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date)
        : null

    // Default year range: 100 years back to 10 years forward
    const currentYear = new Date().getFullYear();
    const defaultFromYear = currentYear - 100;
    const defaultToYear = currentYear + 10;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    className={cn(
                        "w-full justify-start text-left font-normal hover:bg-transparent hover:text-muted-foreground",
                        !date && "text-muted-foreground",
                        className
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? formattedDate : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={fromYear ?? defaultFromYear}
                    toYear={toYear ?? defaultToYear}
                    disabled={calendarDisabled}
                    {...props}
                />
            </PopoverContent>
        </Popover>
    )
}
