import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore, useLoaderStore } from "@/store";
import { usePermission } from "@/Hooks/usePermission";

const ProtectedRoute = ({ permission, children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useLoaderStore((state) => state.isLoading);
  const { can } = usePermission();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific permission is required, check it
  if (permission && !can(permission)) {
    return <Navigate to="*" replace />;
  }

  // Support both wrapper mode (children) and layout mode (Outlet)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
