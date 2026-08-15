import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value, name, payload: dataPoint } = payload[0];

    return (
      <div className="rounded-md border bg-card p-3 shadow-md text-card-foreground text-sm">
        {dataPoint.label && (
          <p className="font-semibold mb-1">{dataPoint.label}</p>
        )}
        <p className="text-muted-foreground">
          {`${name}: `}
          <span className="font-medium text-foreground">{value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const AnalyticsBarChart = ({
  title = "Traffic by Device",
  data = [],
  dataKey = "value",
  nameKey = "label",
  barColors = ["hsl(var(--primary))", "hsl(var(--secondary))"], // Primary & Secondary only
}) => {
  return (
    <Card className="w-full max-w-[550px]">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey={nameKey}
              axisLine={false}
              tickLine={false}
              className="text-sm text-muted-foreground font-medium"
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(tick) => (tick > 999 ? `${tick / 1000}K` : tick)}
              className="text-sm text-muted-foreground font-medium"
              dx={-5}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent", opacity: 0.7 }}
            />
            <Bar
              dataKey={dataKey}
              barSize={45}
              radius={[6, 6, 0, 0]}
              name="Traffic"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                  className="transition-all duration-200 ease-out hover:brightness-110"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsBarChart;
