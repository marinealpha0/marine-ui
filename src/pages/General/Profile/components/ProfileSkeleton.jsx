import React from "react";

const ProfileSkeleton = () => (
  <div className="p-6 max-w-7xl mx-auto">
    {/* Header skeleton */}
    <div className="mb-8">
      <div className="h-8 w-48 bg-muted animate-pulse rounded-xl mb-3" />
      <div className="h-4 w-80 bg-muted animate-pulse rounded-lg" />
    </div>

    <div className="flex gap-6 mb-6 flex-wrap">
      {/* Profile card skeleton */}
      <div className="flex-1 min-w-[280px] h-[420px] bg-muted animate-pulse rounded-2xl" />
      {/* Middle column */}
      <div className="flex-1 min-w-[280px] flex flex-col gap-6">
        <div className="h-[190px] bg-muted animate-pulse rounded-2xl" />
        <div className="h-[200px] bg-muted animate-pulse rounded-2xl" />
      </div>
      {/* Permissions skeleton */}
      <div className="flex-1 min-w-[280px] h-[420px] bg-muted animate-pulse rounded-2xl" />
    </div>

    {/* Activity stats skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-[180px] bg-muted animate-pulse rounded-2xl" />
      ))}
    </div>
  </div>
);

export default ProfileSkeleton;
