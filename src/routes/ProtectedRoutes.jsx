import React, { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/guards/ProtectedRoute";

// Lazy imports for all application pages
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const FleetPage = lazy(() => import("@/pages/Fleet/FleetPage"));
const VesselDetailPage = lazy(() => import("@/pages/Fleet/VesselDetailPage"));
const EquipmentPage = lazy(() => import("@/pages/Equipment/EquipmentPage"));
const InventoryPage = lazy(() => import("@/pages/Inventory/InventoryPage"));
const VoyagesPage = lazy(() => import("@/pages/Voyages/VoyagesPage"));
const WorkOrdersPage = lazy(() => import("@/pages/WorkOrders/WorkOrdersPage"));
const MaintenancePage = lazy(() => import("@/pages/Maintenance/MaintenancePage"));
const WorkPlannerPage = lazy(() => import("@/pages/WorkPlanner/WorkPlannerPage"));
const RequisitionsPage = lazy(() => import("@/pages/Requisitions/RequisitionsPage"));
const PurchaseOrdersPage = lazy(() => import("@/pages/PurchaseOrders/PurchaseOrdersPage"));
const ReceiptsPage = lazy(() => import("@/pages/Receipts/ReceiptsPage"));
const CertificatesPage = lazy(() => import("@/pages/Certificates/CertificatesPage"));
const SurveysPage = lazy(() => import("@/pages/Surveys/SurveysPage"));
const DeviationsPage = lazy(() => import("@/pages/Deviations/DeviationsPage"));
const QMSPage = lazy(() => import("@/pages/QMS/QMSPage"));
const CAPAPage = lazy(() => import("@/pages/CAPA/CAPAPage"));
const PreventiveActionsPage = lazy(() => import("@/pages/PreventiveActions/PreventiveActionsPage"));
const RiskPage = lazy(() => import("@/pages/Risk/RiskPage"));
const SafetyMeetingsPage = lazy(() => import("@/pages/SafetyMeetings/SafetyMeetingsPage"));
const DrillsPage = lazy(() => import("@/pages/Drills/DrillsPage"));
const PermitToWorkPage = lazy(() => import("@/pages/PermitToWork/PermitToWorkPage"));
const MOCPage = lazy(() => import("@/pages/MOC/MOCPage"));
const HandoverPage = lazy(() => import("@/pages/Handover/HandoverPage"));
const DailyPlannerPage = lazy(() => import("@/pages/DailyPlanner/DailyPlannerPage"));
const WeeklyPlannerPage = lazy(() => import("@/pages/WeeklyPlanner/WeeklyPlannerPage"));
const PICPage = lazy(() => import("@/pages/PIC/PICPage"));
const ReportsPage = lazy(() => import("@/pages/Reports/ReportsPage"));
const AnalyticsPage = lazy(() => import("@/pages/Analytics/AnalyticsPage"));
const DocumentsPage = lazy(() => import("@/pages/Documents/DocumentsPage"));
const NotificationsPage = lazy(() => import("@/pages/Notifications/NotificationsPage"));
const UsersPage = lazy(() => import("@/pages/Users/UsersPage"));
const AuditPage = lazy(() => import("@/pages/Audit/AuditPage"));
const Settings = lazy(() => import("@/pages/General/Settings/Settings"));
const Profile = lazy(() => import("@/pages/General/Profile/Profile"));
const NotFound = lazy(() => import("@/pages/General/NotFound/NotFound"));

export const ProtectedRoutes = (
  <Route element={<ProtectedRoute />}>
    {/* Operations & Command Center */}
    <Route path="/" element={<Dashboard />} />
    <Route path="app" element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="overview" element={<Dashboard />} />
    <Route path="app/dashboard" element={<Dashboard />} />
    <Route path="app/voyages" element={<VoyagesPage />} />
    <Route path="app/work-orders" element={<WorkOrdersPage />} />
    <Route path="app/maintenance" element={<MaintenancePage />} />
    <Route path="app/work-planner" element={<WorkPlannerPage />} />

    {/* Assets */}
    <Route path="app/fleet" element={<FleetPage />} />
    <Route path="app/vessels/:vesselId" element={<VesselDetailPage />} />
    <Route path="app/equipment" element={<EquipmentPage />} />
    <Route path="app/inventory" element={<InventoryPage />} />

    {/* Supply & Procurement */}
    <Route path="app/procurement" element={<RequisitionsPage />} />
    <Route path="app/requisitions" element={<RequisitionsPage />} />
    <Route path="app/purchase-orders" element={<PurchaseOrdersPage />} />
    <Route path="app/receipts" element={<ReceiptsPage />} />

    {/* Compliance & QHSE */}
    <Route path="app/certificates" element={<CertificatesPage />} />
    <Route path="certificates" element={<CertificatesPage />} />
    <Route path="app/surveys" element={<SurveysPage />} />
    <Route path="surveys" element={<SurveysPage />} />
    <Route path="app/deviations" element={<DeviationsPage />} />
    <Route path="deviations" element={<DeviationsPage />} />
    <Route path="app/qms" element={<QMSPage />} />
    <Route path="qms" element={<QMSPage />} />
    <Route path="app/qhse" element={<QMSPage />} />
    <Route path="qhse" element={<QMSPage />} />
    <Route path="app/capa" element={<CAPAPage />} />
    <Route path="capa" element={<CAPAPage />} />
    <Route path="app/corrective-actions" element={<CAPAPage />} />
    <Route path="corrective-actions" element={<CAPAPage />} />
    <Route path="app/preventive-actions" element={<PreventiveActionsPage />} />
    <Route path="preventive-actions" element={<PreventiveActionsPage />} />
    <Route path="preventative-actions" element={<PreventiveActionsPage />} />
    <Route path="app/risk" element={<RiskPage />} />
    <Route path="risk" element={<RiskPage />} />
    <Route path="app/safety-meetings" element={<SafetyMeetingsPage />} />
    <Route path="safety-meetings" element={<SafetyMeetingsPage />} />
    <Route path="app/drills" element={<DrillsPage />} />
    <Route path="drills" element={<DrillsPage />} />
    <Route path="app/permit-to-work" element={<PermitToWorkPage />} />
    <Route path="permit-to-work" element={<PermitToWorkPage />} />
    <Route path="app/moc" element={<MOCPage />} />
    <Route path="moc" element={<MOCPage />} />
    <Route path="app/handover" element={<HandoverPage />} />
    <Route path="handover" element={<HandoverPage />} />

    {/* Planning */}
    <Route path="app/daily-planner" element={<DailyPlannerPage />} />
    <Route path="app/weekly-planner" element={<WeeklyPlannerPage />} />
    <Route path="app/pic" element={<PICPage />} />

    {/* Insight */}
    <Route path="app/reports" element={<ReportsPage />} />
    <Route path="app/analytics" element={<AnalyticsPage />} />
    <Route path="app/documents" element={<DocumentsPage />} />
    <Route path="app/notifications" element={<NotificationsPage />} />

    {/* Administration & User Management */}
    <Route path="app/users" element={<UsersPage />} />
    <Route path="app/audit" element={<AuditPage />} />
    <Route path="settings" element={<Settings />} />
    <Route path="app/settings" element={<Settings />} />
    <Route path="profile" element={<Profile />} />
    <Route path="app/profile" element={<Profile />} />

    {/* 404 fallback */}
    <Route path="*" element={<NotFound />} />
  </Route>
);
