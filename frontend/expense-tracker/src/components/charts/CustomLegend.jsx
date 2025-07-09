import React from "react";

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="flex flex-wrap gap-4 mt-4">
      {payload.map((entry, index) => (
        <li key={`legend-${index}`} className="flex items-center gap-2">
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              borderRadius: "50%",
            }}
          ></span>
          <span className="text-sm">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend;
