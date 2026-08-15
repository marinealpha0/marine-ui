import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore, useLoaderStore } from "@/store";

/**
 * GuestRoute — protects auth pages (login, forgot-password, etc.)
 * from being accessed by already-authenticated users.
 *
 * If the user IS authenticated  → redirect to dashboard.
 * If the user is NOT authenticated → render the auth page normally.
 */
const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useLoaderStore((state) => state.isLoading);

  // Wait for auth state to resolve before making a redirect decision
  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
