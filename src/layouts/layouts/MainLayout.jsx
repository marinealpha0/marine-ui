import React from "react";
// import { useIsFetching, useIsMutating } from "@tanstack/react-query";
// import SpinnerOverlay from "@components/ui/SpinnerOverlay";
import { Toaster } from "@/components/ui/sonner";

export function MainLayout({ children }) {

  // React Query hooks to detect any in-flight API requests
  // const isFetching = useIsFetching();
  // const isMutating = useIsMutating();

  // const isLoading = isFetching > 0 || isMutating > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Application content rendered inside */}
      {/* {isLoading && <SpinnerOverlay />} */}

      {children}

      {/* Global components accessible everywhere */}
      <Toaster />
    </div>
  );
}
