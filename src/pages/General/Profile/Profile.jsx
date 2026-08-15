import React from "react";
import AdminProfileCard from "./components/AdminProfileCard";
import AdminPerformanceCard from "./components/AdminPerformanceCard";
import AccountStatusCard from "./components/AccountStatusCard";
import PermissionsCard from "./components/PermissionsCard";
import AdminResponsibilitiesCard from "./components/AdminResponsibilitiesCard";
import AdminActivityStats from "./components/AdminActivityStats";
import { useAdminProfile } from "./hooks/useProfileServices";
import HeaderSection from "@/layouts/HeaderSection";
import ErrorState from "@/components/ui/ErrorState";
import ProfileSkeleton from "./components/ProfileSkeleton";
import { UI_TEXT } from "@/constant";
import { usePermission } from "@/Hooks/usePermission";


/* ─────────────────────────────────────────
   Main Profile Page
───────────────────────────────────────── */
const Profile = () => {
  const { permissions } = usePermission();
  const { profile, isLoading, isError, error } = useAdminProfile();

  if (isLoading) return <ProfileSkeleton />;
  if (isError) return <ErrorState title="Failed to Load Profile" message={error?.message} />;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Decorative page-top gradient strip ── */}
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">

        {/* ── Page Header ── */}
        <HeaderSection
          title={UI_TEXT.PROFILE.TITLE}
          subtitle={UI_TEXT.PROFILE.SUBTITLE}
        />

        {/* ── Top Row: Profile | Performance + Status | Permissions ── */}
        <div
          className="grid gap-5 mb-6 !pt-6"
          style={{
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gridTemplateRows: "660px",
          }}
        >
          {/* Column 1: Profile Card */}
          <div className="h-full">
            <AdminProfileCard user={profile} />
          </div>

          {/* Column 2: Performance + Account Status stacked */}
          <div className="flex flex-col gap-5 h-full">
            <AdminPerformanceCard rating={profile?.performanceRating} />
            <AccountStatusCard profile={profile} />
          </div>

          {/* Column 3: Permissions */}
          <div className="h-full">
            <PermissionsCard userPermissions={profile?.permissions ?? permissions} />
          </div>
        </div>

        {/* ── Section divider ── */}
        <div className="flex items-center gap-3 mb-6 mt-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">
            Activity &amp; Statistics
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ── Bottom Row: Activity Stats ── */}
        <AdminActivityStats stats={profile?.activityStatistics} />

      </div>
    </div>
  );
};

export default Profile;
