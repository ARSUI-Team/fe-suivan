"use client";

import { useState } from "react";

interface DataPoint {
  date: string;
  apy: number;
  tvl: number;
}

// Generate mock historical data
function generateHistoricalData(days: number): DataPoint[] {
  const data: DataPoint[] = [];
  const baseApy = 8.5;
  const baseTvl = 50000;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      apy: baseApy + (Math.random() - 0.5) * 4,
      tvl: baseTvl + Math.random() * 20000 + (days - i) * 500,
    });
  }

  return data;
}

interface PoolAnalyticsChartProps {
  poolAddress?: string;
  title?: string;
}

export default function PoolAnalyticsChart({
  title = "Pool Performance",
}: PoolAnalyticsChartProps) {
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(7);
  const [metric, setMetric] = useState<"apy" | "tvl">("apy");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = generateHistoricalData(timeRange);

  // Calculate chart dimensions
  const maxValue = Math.max(...data.map((d) => (metric === "apy" ? d.apy : d.tvl)));
  const minValue = Math.min(...data.map((d) => (metric === "apy" ? d.apy : d.tvl)));
  const range = maxValue - minValue;

  // Calculate averages
  const avgApy = data.reduce((sum, d) => sum + d.apy, 0) / data.length;
  const avgTvl = data.reduce((sum, d) => sum + d.tvl, 0) / data.length;
  const currentApy = data[data.length - 1].apy;
  const currentTvl = data[data.length - 1].tvl;
  const apyChange = currentApy - data[0].apy;
  const tvlChange = currentTvl - data[0].tvl;

  // Chart dimensions
  const paddingLeft = 10;
  const paddingRight = 3;
  const paddingTop = 3;
  const paddingBottom = 8;
  const chartWidth = 100 - paddingLeft - paddingRight;
  const chartHeight = 60 - paddingTop - paddingBottom;
  const gridSteps = 5;

  // Generate SVG path - snap to grid
  const getPath = () => {
    const points = data.map((d, i) => {
      const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
      const value = metric === "apy" ? d.apy : d.tvl;
      const normalizedValue = (value - minValue) / range;
      const y = paddingTop + (1 - normalizedValue) * chartHeight;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  // Generate Y-axis labels
  const getYAxisLabels = () => {
    const labels = [];
    for (let i = 0; i < gridSteps; i++) {
      const value = minValue + (range * (gridSteps - 1 - i)) / (gridSteps - 1);
      if (metric === "apy") {
        labels.push(`${value.toFixed(1)}%`);
      } else {
        labels.push(`$${(value / 1000).toFixed(0)}K`);
      }
    }
    return labels;
  };

  // Generate horizontal grid positions
  const getHorizontalGridPositions = () => {
    const positions = [];
    for (let i = 0; i < gridSteps; i++) {
      const y = paddingTop + (i / (gridSteps - 1)) * chartHeight;
      positions.push(y);
    }
    return positions;
  };

  const isPositive = metric === "apy" ? apyChange >= 0 : tvlChange >= 0;

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50/50 to-white rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 lg:p-8 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-blue-400/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 via-blue-500 to-orange-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-space), sans-serif" }}>
              {title}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Metric Toggle */}
            <div className="flex items-center gap-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setMetric("apy")}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 min-h-[44px] ${
                  metric === "apy"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-500/25"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                APY
              </button>
              <button
                onClick={() => setMetric("tvl")}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 min-h-[44px] ${
                  metric === "tvl"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                TVL
              </button>
            </div>

            {/* Time Range */}
            <div className="flex items-center gap-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-1 shadow-inner">
              {([7, 14, 30] as const).map((days) => (
                <button
                  key={days}
                  onClick={() => setTimeRange(days)}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 min-h-[44px] ${
                    timeRange === days
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/25"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {days}D
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Current Value */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative p-4 sm:p-5 bg-gradient-to-br from-green-50 via-emerald-50/50 to-green-50 rounded-2xl border border-green-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm font-medium text-green-700/80">
                  {metric === "apy" ? "Current APY" : "Current TVL"}
                </p>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {metric === "apy" ? `${currentApy.toFixed(2)}%` : `$${(currentTvl / 1000).toFixed(1)}K`}
              </p>
              <p className="text-xs text-green-600/70 mt-2 font-medium">
                Avg: {metric === "apy" ? `${avgApy.toFixed(2)}%` : `$${(avgTvl / 1000).toFixed(1)}K`}
              </p>
            </div>
          </div>

          {/* Change Value */}
          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${isPositive ? "from-blue-400 to-indigo-500" : "from-red-400 to-rose-500"} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className={`relative p-4 sm:p-5 bg-gradient-to-br ${isPositive ? "from-blue-50 via-indigo-50/50 to-blue-50" : "from-red-50 via-rose-50/50 to-red-50"} rounded-2xl border ${isPositive ? "border-blue-200/50" : "border-red-200/50"} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs sm:text-sm font-medium ${isPositive ? "text-blue-700/80" : "text-red-700/80"}`}>
                  {metric === "apy" ? "APY Change" : "TVL Change"}
                </p>
                <svg className={`w-4 h-4 ${isPositive ? "text-blue-500 rotate-0" : "text-red-500 rotate-180"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${isPositive ? "from-blue-600 to-indigo-600" : "from-red-600 to-rose-600"} bg-clip-text text-transparent`}>
                {metric === "apy"
                  ? `${apyChange >= 0 ? "+" : ""}${apyChange.toFixed(2)}%`
                  : `${tvlChange >= 0 ? "+" : ""}$${(tvlChange / 1000).toFixed(1)}K`}
              </p>
              <p className={`text-xs ${isPositive ? "text-blue-600/70" : "text-red-600/70"} mt-2 font-medium`}>
                vs {timeRange} days ago
              </p>
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative p-4 sm:p-5 bg-gradient-to-br from-purple-50 via-pink-50/50 to-purple-50 rounded-2xl border border-purple-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm font-medium text-purple-700/80">Trend</p>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <span className="text-lg">{isPositive ? "📈" : "📉"}</span>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {isPositive ? "Bullish" : "Bearish"}
              </p>
              <p className="text-xs text-purple-600/70 mt-2 font-medium">
                Market sentiment
              </p>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50/50 to-white rounded-2xl border border-gray-200/50 shadow-inner">
          <div className="relative h-64 sm:h-80 md:h-96 w-full flex gap-1.5 sm:gap-2">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between py-2 text-[10px] sm:text-xs text-gray-500 font-medium">
              {getYAxisLabels().map((label, i) => (
                <span key={i} className="text-right whitespace-nowrap">{label}</span>
              ))}
            </div>

            {/* Chart SVG */}
            <div className="flex-1 relative">
              <svg
                viewBox="0 0 100 60"
                className="w-full h-full transition-all duration-300"
                preserveAspectRatio="none"
                onMouseLeave={() => setHoveredIndex(null)}
              >
              {/* Vertical grid lines - aligned with data points */}
              {Array.from({ length: data.length }).map((_, i) => {
                const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
                return (
                  <line
                    key={`v-${i}`}
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={paddingTop + chartHeight}
                    stroke="#e5e7eb"
                    strokeWidth="0.2"
                    opacity="0.4"
                  />
                );
              })}

              {/* Horizontal grid lines - aligned with Y-axis labels */}
              {getHorizontalGridPositions().map((y, i) => (
                <line
                  key={`h-${i}`}
                  x1={paddingLeft}
                  y1={y}
                  x2={paddingLeft + chartWidth}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="0.2"
                  opacity="0.5"
                />
              ))}

              {/* Main line - thin and clean */}
              <path
                d={getPath()}
                fill="none"
                stroke={metric === "apy" ? "#22c55e" : "#3b82f6"}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Data points - simple bullets */}
              {data.map((d, i) => {
                const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
                const value = metric === "apy" ? d.apy : d.tvl;
                const normalizedValue = (value - minValue) / range;
                const y = paddingTop + (1 - normalizedValue) * chartHeight;
                const isHovered = hoveredIndex === i;

                return (
                  <g key={i}>
                    {/* Hover area */}
                    <rect
                      x={x - 3}
                      y="0"
                      width="6"
                      height="60"
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredIndex(i)}
                    />

                    {/* Data point - simple solid circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? "1.5" : "1"}
                      fill={metric === "apy" ? "#22c55e" : "#3b82f6"}
                      className="transition-all duration-200"
                    />

                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={x - 12}
                          y={y - 11}
                          width="24"
                          height="8"
                          rx="1.5"
                          fill="#1f2937"
                          opacity="0.95"
                        />
                        <text
                          x={x}
                          y={y - 5.5}
                          textAnchor="middle"
                          fill="white"
                          fontSize="3.2"
                          fontWeight="600"
                        >
                          {metric === "apy" ? `${value.toFixed(1)}%` : `$${(value / 1000).toFixed(0)}K`}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
              </svg>

              {/* X-axis labels */}
              <div className="absolute -bottom-5 sm:-bottom-6 left-0 right-0 flex justify-between text-[10px] sm:text-xs text-gray-500 font-medium px-1 sm:px-2">
                <span>{data[0].date}</span>
                <span className="hidden sm:inline">{data[Math.floor(data.length / 2)].date}</span>
                <span>{data[data.length - 1].date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend with enhanced styling */}
        <div className="mt-6 pt-4 sm:pt-5 border-t border-gray-200/50 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metric === "apy" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-blue-500 to-indigo-500"} shadow-md`} />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {metric === "apy" ? "Historical APY" : "Total Value Locked"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-gray-500">Hover over chart for details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
