import * as React from "react";
import { cn } from "@/lib/utils";

export function Sheet({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 h-full w-full max-w-xs bg-sidebar text-sidebar-foreground shadow-xl transition-transform">
        {children}
      </div>
    </div>
  );
}

export function SheetContent({ className, children, ...props }) {
  return (
    <div className={cn("relative flex h-full w-full flex-col bg-sidebar p-4", className)} {...props}>
      {children}
    </div>
  );
}

export function SheetHeader({ className, children, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props}>{children}</div>;
}

export function SheetTitle({ className, children, ...props }) {
  return <h3 className={cn("text-lg font-semibold text-sidebar-foreground", className)} {...props}>{children}</h3>;
}

export function SheetDescription({ className, children, ...props }) {
  return <p className={cn("text-sm text-sidebar-foreground/70", className)} {...props}>{children}</p>;
}
