import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Use three theme colors from Tailwind config
const COLORS = [
  "hsl(var(--primary))", // Primary
  "hsl(var(--secondary))", // Secondary
  "hsl(var(--destructive))", // Destructive
];

const DonutChartCard = ({ title = "User Gender", data = [] }) => {
  return (
    <Card className="w-[95%]">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        {/* Chart Area */}
        <div className="w-full h-[315px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                nameKey="label"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <ul className="list-none m-0 p-0 mt-5 flex justify-evenly w-full">
          {data.map((item, i) => (
            <li key={i} className="flex items-center text-sm">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {item.label} - {item.value}%
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DonutChartCard;
