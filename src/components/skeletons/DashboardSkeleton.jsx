import React from 'react';
import HeaderSectionSkeleton from './HeaderSectionSkeleton';
import AnalyticsCardSkeleton from './AnalyticsCardSkeleton';
import { BarChartSkeleton, DonutChartSkeleton, LineChartSkeleton } from './ChartSkeletons';

const DashboardSkeleton = ({ showHeader = true, cardCount = 8, showCharts = true }) => {
  return (
    <div className="flex flex-col p-5">
      {/* Header Section Skeleton */}
      {showHeader && (
        <HeaderSectionSkeleton showButton={true} showTimeRangeDropdown={true} />
      )}

      {/* Analytics Cards Grid Skeleton */}
      <div className="flex flex-wrap gap-5">
        <AnalyticsCardSkeleton cardCount={cardCount} />
      </div>

      {/* Charts Section Skeleton */}
      {showCharts && (
        <>
          {/* Bar Chart and Donut Chart Row */}
          <div className="flex mb-5 mt-5 flex-wrap gap-6">
            <BarChartSkeleton title="Traffic by Age Range" barCount={6} />
            <DonutChartSkeleton title="User Gender" legendItems={3} />
          </div>

          {/* Line Chart */}
          <LineChartSkeleton title="Total Users" showControls={true} />
        </>
      )}
    </div>
  );
};

export default DashboardSkeleton;