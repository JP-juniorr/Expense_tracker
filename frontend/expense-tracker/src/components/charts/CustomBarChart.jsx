import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";
import CustomTooltip from "./CustomTooltip"; // adjust path as needed

const CustomBarChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#c7b8ff";
  }; // lighter purple, less gray

  // Tooltip component should be outside or renamed to avoid conflict
  <Tooltip
    content={<CustomTooltip />}
    wrapperStyle={{ display: "none" }} // hides the default wrapper entirely
    cursor={false} // disables default hover effect
  />;
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart onMouseLeave={() => setActiveIndex(null)} data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            onMouseEnter={(_, index) => setActiveIndex(index)}
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            // Removed unused fill and active styles, as colors are per Cell
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === activeIndex ? "#875cf5" : getBarColor(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
