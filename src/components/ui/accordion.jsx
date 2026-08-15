import * as React from "react"
import { ChevronDown } from "@/assets/icons"

import { cn } from "@/lib/utils"

const AccordionContext = React.createContext({})
const AccordionItemContext = React.createContext({})

const Accordion = React.forwardRef(({ className, type = "single", collapsible = false, ...props }, ref) => {
    const [value, setValue] = React.useState(type === "multiple" ? [] : undefined)

    const handleValueChange = (itemValue) => {
        if (type === "single") {
            setValue(prev => (prev === itemValue && collapsible ? undefined : itemValue))
        } else {
            setValue(prev => {
                const isIncluded = prev && prev.includes(itemValue)
                return isIncluded ? prev.filter(v => v !== itemValue) : [...(prev || []), itemValue]
            })
        }
    }

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
            <div ref={ref} className={cn("", className)} {...props} />
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, value, ...props }, ref) => {
    const { value: selectedValue, type } = React.useContext(AccordionContext)
    const isOpen = type === "single" ? selectedValue === value : (Array.isArray(selectedValue) && selectedValue.includes(value))

    return (
        <AccordionItemContext.Provider value={{ value, isOpen }}>
            <div ref={ref} data-state={isOpen ? "open" : "closed"} className={cn("border-b", className)} {...props} />
        </AccordionItemContext.Provider>
    )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { onValueChange } = React.useContext(AccordionContext)
    const { value, isOpen } = React.useContext(AccordionItemContext)

    return (
        <div className="flex">
            <button
                ref={ref}
                type="button"
                onClick={() => onValueChange(value)}
                data-state={isOpen ? "open" : "closed"}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </button>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext)

    if (!isOpen) return null

    return (
        <div
            ref={ref}
            className={cn(
                "overflow-hidden text-sm transition-all animate-in slide-in-from-top-1",
                className
            )}
            {...props}
        >
            <div className="pb-4 pt-0">{children}</div>
        </div>
    )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
