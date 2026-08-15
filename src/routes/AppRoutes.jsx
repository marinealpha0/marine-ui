import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/guards/ProtectedRoute";
import GuestRoute from "@/guards/GuestRoute";
import SpinnerOverlay from "@/components/ui/SpinnerOverlay";
import { ProtectedRoutes } from "@/routes/ProtectedRoutes";
import { AuthRoutes } from "@/routes/AuthRoutes";
import { NotFoundRoute } from "@/routes/NotFoundRoute";
import {
  ProtectedFullLayout,
  PublicNavbarOnlyLayout,
} from "@layouts/layouts/index";
import { MainLayout } from "@layouts/layouts/MainLayout";

export function AppContent() {
  return (
    <MainLayout>
      <Suspense fallback={<SpinnerOverlay />}>
        <Routes>

          {/* Public / auth routes — redirect to dashboard if already logged in */}
          <Route element={<GuestRoute />}>
            <Route element={<PublicNavbarOnlyLayout />}>
              {AuthRoutes}
            </Route>
          </Route>

          {/* Protected wrapper */}
          <Route element={<ProtectedRoute />}>
            {/* Protected full layout */}
            <Route element={<ProtectedFullLayout />}>
              {ProtectedRoutes}
            </Route>
          </Route>

          {/* 404 fallback */}
          {NotFoundRoute}
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
