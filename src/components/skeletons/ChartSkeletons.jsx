import React from 'react';

// Reusable Chart Container
const ChartContainer = ({ children, minWidth = '320px', maxWidth = '550px' }) => (
    <div
        className="bg-white rounded-md p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        style={{ minWidth, flex: '1 1 450px', maxWidth }}
    >
        {children}
    </div>
);

// Chart Title Skeleton
const ChartTitleSkeleton = ({ width = 180 }) => (
    <div className="bg-gray-300 animate-pulse rounded mb-3" style={{ width, height: 28 }} />
);

// Bar Chart Skeleton
export const BarChartSkeleton = ({ title = 'Chart Title', barCount = 6 }) => {
    return (
        <ChartContainer>
            <ChartTitleSkeleton width={title.length * 8 + 50} />

            <div className="h-[300px] flex items-end gap-2 px-1">
                {Array.from({ length: barCount }, (_, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div
                            className="w-full rounded bg-black/10 animate-pulse"
                            style={{ height: Math.random() * 200 + 50 }}
                        />
                        <div className="w-[80%] h-4 rounded bg-gray-300 animate-pulse" />
                    </div>
                ))}
            </div>
        </ChartContainer>
    );
};

// Donut Chart Skeleton
export const DonutChartSkeleton = ({ title = 'Chart Title', legendItems = 3 }) => {
    return (
        <div
            className="rounded-md p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            style={{ minWidth: '320px', flex: '1 1 450px', maxWidth: '550px', backgroundColor: '#f9fcff' }}
        >
            <ChartTitleSkeleton width={title.length * 8 + 50} />

            {/* Chart Area - Centered */}
            <div className="flex justify-center items-center h-[250px] mb-2.5">
                <div className="rounded-full bg-black/10 animate-pulse" style={{ width: 200, height: 200 }} />
            </div>

            {/* Legend */}
            <div className="flex justify-evenly items-center mt-2.5 gap-2">
                {Array.from({ length: legendItems }, (_, index) => (
                    <div key={index} className="w-20 h-8 rounded bg-black/10 animate-pulse" />
                ))}
            </div>
        </div>
    );
};

// Line Chart Skeleton
export const LineChartSkeleton = ({ title = 'Chart Title', showControls = true, height = 350 }) => {
    return (
        <div className="w-full bg-white rounded-md p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)] mt-2">
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <ChartTitleSkeleton width={title.length * 8 + 50} />

                {showControls && (
                    <div className="flex gap-1">
                        {Array.from({ length: 3 }, (_, index) => (
                            <div key={index} className="w-20 h-8 rounded bg-black/10 animate-pulse" />
                        ))}
                    </div>
                )}
            </div>

            <div className="relative flex items-end gap-1 px-2" style={{ height }}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[90%] rounded bg-black/10 animate-pulse" style={{ height: height * 0.6 }} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                    {Array.from({ length: 7 }, (_, index) => (
                        <div key={index} className="w-10 h-4 rounded bg-gray-300 animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Area Chart Skeleton
export const AreaChartSkeleton = ({ title = 'Chart Title', showControls = true }) => {
    return (
        <div className="w-full bg-white rounded-md p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)] mt-2">
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <ChartTitleSkeleton width={title.length * 8 + 50} />

                {showControls && (
                    <div className="flex gap-1">
                        {Array.from({ length: 2 }, (_, index) => (
                            <div key={index} className="w-24 h-8 rounded bg-black/10 animate-pulse" />
                        ))}
                    </div>
                )}
            </div>

            <div className="relative h-[300px]">
                {/* Area chart simulation */}
                <div className="w-full h-full rounded bg-gradient-to-b from-black/10 to-black/5" />

                {/* Simulated data points */}
                <div className="absolute top-[20%] left-[10%] right-[10%] flex justify-between items-end">
                    {Array.from({ length: 8 }, (_, index) => (
                        <div key={index} className="w-2 h-2 rounded-full bg-primary/80" style={{ transform: `translateY(${Math.random() * 100}px)` }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Generic Chart Skeleton
export const GenericChartSkeleton = ({
    title = 'Chart Title',
    width = '100%',
    height = 300,
    showHeader = true,
    showControls = false,
    controlCount = 2,
}) => {
    return (
        <div className="bg-white rounded-md p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)] mt-2" style={{ width }}>
            {showHeader && (
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <ChartTitleSkeleton width={title.length * 8 + 50} />

                    {showControls && (
                        <div className="flex gap-1">
                            {Array.from({ length: controlCount }, (_, index) => (
                                <div key={index} className="w-20 h-8 rounded bg-black/10 animate-pulse" />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="w-full rounded bg-black/10 animate-pulse" style={{ height }} />
        </div>
    );
};