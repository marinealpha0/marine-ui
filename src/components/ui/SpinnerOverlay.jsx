import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function SpinnerOverlay() {
  // Prevent background scroll when overlay is active
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/10"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* White thin spinner */}
      <svg
        className="animate-spin text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={48}
        height={48}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2" 
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
        ></path>
      </svg>
    </div>,
    document.body
  );
}

export default SpinnerOverlay;
