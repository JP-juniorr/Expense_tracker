import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow text-sm">
        <p>{payload[0].name}: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
