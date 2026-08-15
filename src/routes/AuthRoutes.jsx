import React, { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy load public pages
const AdminLogin = lazy(() => import("@/pages/Auth/Login"));
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword"));
const SetPassword = lazy(() => import("@/pages/Auth/SetPassword"));
const ContactAdmin = lazy(() => import("@/pages/Auth/ContactAdmin"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const SelectOrganization = lazy(() => import("@/pages/Auth/SelectOrganization"));

export const AuthRoutes = (
  <>
    <Route path="/login" element={<AdminLogin />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/setup-password" element={<SetPassword />} />
    <Route path="/contact-admin" element={<ContactAdmin />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/select-organization" element={<SelectOrganization />} />
  </>
);
