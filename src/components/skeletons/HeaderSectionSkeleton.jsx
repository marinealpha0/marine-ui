import React from 'react';

const HeaderSectionSkeleton = ({ showButton = true, showTimeRangeDropdown = false }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                {/* Title skeleton */}
                <div
                    className="bg-gray-300 animate-pulse rounded"
                    style={{ width: 200, height: 40 }}
                />
                {/* Subtitle skeleton */}
                <div
                    className="bg-gray-300 animate-pulse rounded mt-2"
                    style={{ width: 300, height: 24 }}
                />
            </div>

            <div className="flex items-center gap-2">
                {showTimeRangeDropdown && (
                    <div
                        className="bg-black/10 rounded-lg animate-pulse"
                        style={{ width: 140, height: 40 }}
                    />
                )}
                {showButton && (
                    <div
                        className="bg-black/10 rounded-lg animate-pulse"
                        style={{ width: 120, height: 40 }}
                    />
                )}
            </div>
        </div>
    );
};

export default HeaderSectionSkeleton;