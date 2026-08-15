import React, { lazy } from "react";
import { Route } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/General/NotFound/NotFound"));

export const NotFoundRoute = <Route path="*" element={<NotFound />} />;
