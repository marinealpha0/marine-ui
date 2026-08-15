import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { TrendingUp, AlertCircle, ChevronDown, DollarSign, Users, Award, Check } from "lucide-react";

// Color definitions
const COLORS = {
  current: "#6366f1", // Indigo
  previous: "#cbd5e1", // Slate
};

const METRIC_DATA = {
  revenue: {
    title: "Revenue Tracking",
    subtitle: "Daily revenue collection",
    prefix: "₹",
    statLabel: "Total Revenue",
    legendCurrent: "Current Week",
    legendPrevious: "Previous Week",
    icon: DollarSign,
    iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
    formatter: (v) => `₹${v.toLocaleString("en-IN")}`,
    points: [
      { label: "Mon", current: 28000, previous: 24000 },
      { label: "Tue", current: 35000, previous: 31000 },
      { label: "Wed", current: 42000, previous: 38000 },
      { label: "Thu", current: 38000, previous: 40000 },
      { label: "Fri", current: 48000, previous: 42000 },
      { label: "Sat", current: 52000, previous: 45000 },
      { label: "Sun", current: 45000, previous: 39000 },
    ],
  },
  leads: {
    title: "Leads Acquired",
    subtitle: "Daily marketing funnel leads",
    prefix: "",
    statLabel: "Total Leads",
    legendCurrent: "Current Week",
    legendPrevious: "Previous Week",
    icon: TrendingUp,
    iconColor: "text-teal-500 bg-teal-50 dark:bg-teal-950/20",
    formatter: (v) => `${v.toLocaleString("en-IN")} leads`,
    points: [
      { label: "Mon", current: 120, previous: 98 },
      { label: "Tue", current: 145, previous: 110 },
      { label: "Wed", current: 160, previous: 130 },
      { label: "Thu", current: 138, previous: 142 },
      { label: "Fri", current: 185, previous: 150 },
      { label: "Sat", current: 210, previous: 165 },
      { label: "Sun", current: 195, previous: 155 },
    ],
  },
  students: {
    title: "Student Registrations",
    subtitle: "New user account sign-ups",
    prefix: "",
    statLabel: "Total Students",
    legendCurrent: "Current Week",
    legendPrevious: "Previous Week",
    icon: Users,
    iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
    formatter: (v) => `${v.toLocaleString("en-IN")} users`,
    points: [
      { label: "Mon", current: 850, previous: 720 },
      { label: "Tue", current: 980, previous: 810 },
      { label: "Wed", current: 1100, previous: 890 },
      { label: "Thu", current: 1050, previous: 920 },
      { label: "Fri", current: 1250, previous: 980 },
      { label: "Sat", current: 1400, previous: 1050 },
      { label: "Sun", current: 1300, previous: 990 },
    ],
  },
};

const CustomTooltip = ({ active, payload, label, prefix }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200">
        <p className="font-bold mb-1.5 text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700/50 pb-1">
          {label}
        </p>
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-6 py-0.5">
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-gray-800 dark:text-white">
              {prefix}{entry.value.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsLineChartCard = ({ dashboardData }) => {
  // Filter metrics based on what's available in dashboardData
  const availableMetrics = Object.keys(METRIC_DATA).filter(key => {
    if (key === "revenue") return !!dashboardData?.revenue_tracking;
    if (key === "leads") return !!dashboardData?.leads_tracking;
    if (key === "students") return !!dashboardData?.student_registrations;
    return false;
  });

  const [metric, setMetric] = useState(availableMetrics[0] || "revenue");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync metric state with available metrics if list changes or selected is not available
  useEffect(() => {
    if (availableMetrics.length > 0 && !availableMetrics.includes(metric)) {
      setMetric(availableMetrics[0]);
    }
  }, [dashboardData]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map API tracking data to chart points if available
  const getPoints = (metricKey) => {
    let trackingData = null;
    if (metricKey === "revenue") {
      trackingData = dashboardData?.revenue_tracking;
    } else if (metricKey === "leads") {
      trackingData = dashboardData?.leads_tracking;
    } else if (metricKey === "students") {
      trackingData = dashboardData?.student_registrations;
    }

    if (trackingData && trackingData.current_week && trackingData.previous_week) {
      const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      const dayLabels = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
      return days.map(day => ({
        label: dayLabels[day],
        current: trackingData.current_week[day] || 0,
        previous: trackingData.previous_week[day] || 0
      }));
    }

    return METRIC_DATA[metricKey].points; // fallback
  };

  const currentMetric = METRIC_DATA[metric] || METRIC_DATA.revenue;
  const chartData = getPoints(metric);

  // Calculate totals & growth dynamically or fallback
  let currentTotal = chartData.reduce((sum, item) => sum + item.current, 0);
  let percentageGrowth = 0;

  if (metric === "revenue" && dashboardData?.revenue_tracking) {
    currentTotal = dashboardData.revenue_tracking.totalRevenue || currentTotal;
    percentageGrowth = dashboardData.revenue_tracking.growth ?? percentageGrowth;
  } else if (metric === "leads" && dashboardData?.leads_tracking) {
    currentTotal = dashboardData.leads_tracking.totalLeads || currentTotal;
    percentageGrowth = dashboardData.leads_tracking.growth ?? percentageGrowth;
  } else if (metric === "students" && dashboardData?.student_registrations) {
    currentTotal = dashboardData.student_registrations.totalStudents || currentTotal;
    percentageGrowth = dashboardData.student_registrations.growth ?? percentageGrowth;
  } else {
    const prevTotal = chartData.reduce((sum, item) => sum + item.previous, 0);
    percentageGrowth = prevTotal > 0 ? ((currentTotal - prevTotal) / prevTotal) * 100 : 0;
  }

  const MetricIcon = currentMetric.icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6 flex flex-col h-full hover:shadow-xl transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${currentMetric.iconColor} transition-colors duration-300`}>
            <MetricIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white text-base">
              {currentMetric.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentMetric.subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2.5 relative" ref={dropdownRef}>

          {/* Premium Custom Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm focus:outline-none transition-all duration-200"
            >
              <MetricIcon className="w-3.5 h-3.5" />
              <span className="capitalize">{metric === "students" ? "Students" : metric}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Premium Dropdown Option Menu */}
            {isOpen && availableMetrics.length > 0 && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {availableMetrics.map((key) => {
                  const m = METRIC_DATA[key];
                  const Icon = m.icon;
                  const isSelected = metric === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setMetric(key);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-bold text-left transition-all duration-150
                        ${isSelected 
                          ? "bg-indigo-50/60 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-md ${isSelected ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-600" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="capitalize">{key === "students" ? "Students" : key}</span>
                      </div>
                      {isSelected && <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="flex items-center gap-6 mb-5 bg-gray-50/50 dark:bg-gray-700/20 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">
            {currentMetric.statLabel}
          </span>
          <span className="text-base font-extrabold text-gray-800 dark:text-white mt-0.5 animate-in fade-in duration-200">
            {currentMetric.formatter(currentTotal)}
          </span>
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Growth</span>
          <span className={`text-xs font-bold mt-1 ${percentageGrowth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {percentageGrowth >= 0 ? "+" : ""}{percentageGrowth.toFixed(1)}% vs Prev Period
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[220px] flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.15)" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              className="text-[10px] font-medium text-gray-400 dark:text-gray-500"
            />
            <YAxis
              tickFormatter={(v) => {
                if (metric === "revenue") {
                  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`;
                  return `₹${v}`;
                }
                if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
                return v;
              }}
              axisLine={false}
              tickLine={false}
              className="text-[10px] font-medium text-gray-400 dark:text-gray-500"
            />
            <Tooltip content={<CustomTooltip prefix={currentMetric.prefix} />} />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 10, paddingTop: 10, fontWeight: 600 }}
            />

            <Line
              type="monotone"
              dataKey="current"
              stroke={COLORS.current}
              strokeWidth={3}
              dot={{
                r: 4,
                stroke: COLORS.current,
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{ r: 6 }}
              name={currentMetric.legendCurrent}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke={COLORS.previous}
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: COLORS.previous }}
              activeDot={{ r: 4 }}
              name={currentMetric.legendPrevious}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsLineChartCard;
