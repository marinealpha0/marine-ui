import React from "react";

/**
 * Reusable inline error state component for data-fetch failures.
 *
 * Props:
 *  - title   (string) – headline text.  Default: "Failed to Load Data"
 *  - message (string) – detail/description text.
 */
const ErrorState = ({
  title = "Failed to Load Data",
  message = "Something went wrong. Please try again.",
}) => (
  <div className="p-6 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4 text-center max-w-sm">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "hsl(0 72% 51% / 0.1)" }}
      >
        <svg
          className="w-8 h-8 text-destructive"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <div>
        <p className="text-base font-bold text-destructive">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorState;
