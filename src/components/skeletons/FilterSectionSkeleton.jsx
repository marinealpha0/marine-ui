const FilterSectionSkeleton = ({
  showFilter = true,
}) => {
  if (!showFilter) return null;

  return (
    <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-white">
      {/* Header */}
      <div className="flex justify-between items-center cursor-pointer">
        {/* Title skeleton */}
        <div className="h-7 w-24 bg-gray-300 rounded animate-pulse"></div>
        {/* Expand icon skeleton */}
        <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default FilterSectionSkeleton;
