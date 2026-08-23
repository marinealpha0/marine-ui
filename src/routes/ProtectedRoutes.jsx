import React, { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/guards/ProtectedRoute";

// Lazy imports
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Settings = lazy(() => import("@/pages/General/Settings/Settings"));
const Profile = lazy(() => import("@/pages/General/Profile/Profile"));
const NotFound = lazy(() => import("@/pages/General/NotFound/NotFound"));
const DrillsPage = lazy(() => import("@/pages/Drills/DrillsPage"));

export const ProtectedRoutes = (
  <Route element={<ProtectedRoute />}>
    {/* Dashboard / Home Overview */}
    <Route path="/" element={<Dashboard />} />
    <Route path="app" element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="overview" element={<Dashboard />} />
    <Route path="app/dashboard" element={<Dashboard />} />

    {/* Compliance & QHSE */}
    <Route path="drills" element={<DrillsPage />} />
    <Route path="app/drills" element={<DrillsPage />} />

    {/* General settings & profile */}
    <Route path="settings" element={<Settings />} />
    <Route path="app/settings" element={<Settings />} />
    <Route path="profile" element={<Profile />} />
    <Route path="app/profile" element={<Profile />} />

    {/* 404 fallback */}
    <Route path="*" element={<NotFound />} />
  </Route>
);

