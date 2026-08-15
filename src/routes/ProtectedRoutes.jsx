import React, { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/guards/ProtectedRoute";

// Lazy imports
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Settings = lazy(() => import("@/pages/General/Settings/Settings"));
const Profile = lazy(() => import("@/pages/General/Profile/Profile"));
const NotFound = lazy(() => import("@/pages/General/NotFound/NotFound"));

export const ProtectedRoutes = (
  <Route element={<ProtectedRoute />}>
    {/* Dashboard / Home */}
    <Route path="/" element={<Dashboard />} />

    {/* General settings & profile */}
    <Route path="settings" element={<Settings />} />
    <Route path="profile" element={<Profile />} />

    {/* 404 fallback */}
    <Route path="*" element={<NotFound />} />
  </Route>
);

