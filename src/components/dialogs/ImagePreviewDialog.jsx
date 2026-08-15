import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "@/assets/icons";
import { Button } from "@/components/ui/button";

export default function ImagePreviewDialog({
  open,
  onClose,
  imageUrl,
  title = "Image Preview",
}) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && open) onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !imageUrl) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black visible pointer-events-auto">
      {/* Solid black backdrop */}
      <div
        className="absolute inset-0 bg-black animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div
        role="dialog"
        aria-modal="true"
        className="
          relative max-w-[90vw] max-h-[90vh] bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800
          overflow-hidden animate-in zoom-in-95 duration-200
          flex flex-col items-center justify-center p-2
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between px-4 py-2 text-white">
          <span className="text-sm font-medium truncate max-w-[60vw]">
            {title}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
              title="Open Original"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <Button
              size="icon"
              variant="ghost"
              type="button"
              onClick={onClose}
              className="h-8 w-8 text-neutral-300 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-all"
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Display */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-neutral-950 rounded-xl border border-neutral-900">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-inner select-none transition-all duration-300"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
