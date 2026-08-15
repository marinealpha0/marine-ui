import React from "react";

/**
 * Reusable page-level container.
 * Provides the standard full-width padded flex-column layout used by every admin page.
 *
 * @param {React.ReactNode} children  - Page content
 * @param {string}          className - Optional extra Tailwind classes
 */
const PageContainer = ({ children, className = "" }) => (
  <div
    className={`w-full p-6 box-border flex flex-col gap-6 min-h-screen ${className}`.trim()}
  >
    {children}
  </div>
);

export default PageContainer;
