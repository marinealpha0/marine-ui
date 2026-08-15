import React from 'react';
import AnalyticsCardSkeleton from './AnalyticsCardSkeleton';
import FilterSectionSkeleton from './FilterSectionSkeleton';
import TableSkeleton from './TableSkeleton';
import PageContainer from '@/layouts/PageContainer';

// Header Section Skeleton (local to this file)
const HeaderSectionSkeleton = ({ showButton = false }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        {/* Page Title Skeleton */}
        <div className="bg-gray-300 animate-pulse rounded" style={{ width: 250, height: 40 }} />
        {/* Subtitle Skeleton */}
        <div className="bg-gray-300 animate-pulse rounded mt-2" style={{ width: 400, height: 24 }} />
      </div>

      {/* Button Skeleton */}
      {showButton && (
        <div className="flex items-center gap-2">
          <div className="bg-black/10 rounded-lg animate-pulse" style={{ width: 120, height: 40 }} />
        </div>
      )}
    </div>
  );
};

// Main User Page Skeleton
const TablePageSkeleton = ({
  showHeaderButton = false,
  showAnalytics = true,
  showFilter = true,
  showTable = true,
  tableType = 'user',
  analyticsCardCount = 4,
}) => {
  return (
    <PageContainer>
      {/* Header Section Skeleton */}
      <HeaderSectionSkeleton showButton={showHeaderButton} />

      {/* Analytics Cards Skeleton */}
      {showAnalytics && (
        <div className="mb-3">
          <AnalyticsCardSkeleton cardCount={analyticsCardCount} backgrounds={["#f0f7ff", "#f0fff4", "#fff0f6", "#f6f5ff"]} />
        </div>
      )}

      {/* Filter Section Skeleton */}
      {showFilter && <FilterSectionSkeleton showFilter={true} />}

      {/* Table Section Skeleton */}
      {showTable && (
        <div className="rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden mt-6">
          <TableSkeleton tableType={tableType} showCollapsible={false} rowsCount={5} showPagination={true} />
        </div>
      )}

      {/* Additional spacing for better visual balance */}
      <div style={{ height: 20 }} />
    </PageContainer>
  );
};

export default TablePageSkeleton;