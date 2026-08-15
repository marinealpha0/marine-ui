import React, { useEffect } from "react";
import { AlertTriangle, CheckCircle, Trash2, X, Info, AlertCircle } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
  cancelBtn = "Cancel",
  confirmBtn = "Confirm",
  showIcon = true,
  type = "default", // "default" | "delete" | "warning" | "success" | "info"
  closeOnOutsideClick = false,
  isLoading = false,
}) {
  // Config based on type
  const getConfig = () => {
    switch (type) {
      case "delete":
        return {
          icon: Trash2,
          iconColor: "text-rose-600",
          iconBg: "bg-rose-50",
          confirmVariant: "destructive",
          confirmButtonClass: "bg-rose-600 hover:bg-rose-700 border-transparent text-white",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: "text-amber-600",
          iconBg: "bg-amber-50",
          confirmVariant: "default",
          confirmButtonClass: "bg-amber-600 hover:bg-amber-700 border-transparent text-white",
        };
      case "success":
        return {
          icon: CheckCircle,
          iconColor: "text-emerald-600",
          iconBg: "bg-emerald-50",
          confirmVariant: "default",
          confirmButtonClass: "bg-emerald-600 hover:bg-emerald-700 border-transparent text-white",
        };
      case "info":
        return {
          icon: Info,
          iconColor: "text-primary",
          iconBg: "bg-primary/10",
          confirmVariant: "default",
          confirmButtonClass: "bg-primary hover:bg-primary-hover border-transparent text-white",
        };
      default:
        return {
          icon: AlertCircle,
          iconColor: "text-primary",
          iconBg: "bg-primary/5", // Using theme primary for default
          confirmVariant: "default",
          confirmButtonClass: "bg-primary hover:bg-primary/90 border-transparent text-white",
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && open && closeOnOutsideClick) onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, closeOnOutsideClick]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Soft Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
        onClick={() => closeOnOutsideClick && onClose?.()}
      />

      {/* Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="
          relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl 
          overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-4 top-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all z-10 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
        >
          <X size={18} />
        </button>

        {/* Header & Content */}
        <div className="p-6 sm:p-7 pb-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            {showIcon && (
              <div className={cn(
                "shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                config.iconBg,
                config.iconColor
              )}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
            )}

            {/* Title & Description */}
            <div className="flex-1 pt-1">
              <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 pr-6">
                {title}
              </h3>
              <div className="text-gray-500 text-[15px] leading-relaxed">
                {content}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - Separated Background */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="h-10 px-5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-semibold shadow-sm"
          >
            {cancelBtn}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "h-10 px-5 rounded-xl font-semibold shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2",
              config.confirmButtonClass
            )}
          >
            {isLoading ? `${confirmBtn}...` : confirmBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
