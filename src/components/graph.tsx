import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type GraphProps = {
  name: string;
  uv: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white">
        <p className="label">{`${label} : ${
          Math.round(payload[0].value * 100) / 100
        }`}</p>
      </div>
    );
  }

  return null;
};

const Graph = ({ data }: { data: GraphProps[] }) => {
  return (
    <div className="h-60 mt-4">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis dataKey="uv" stroke="#ffffff" />
          <Line type="monotone" dataKey="uv" stroke="#ffffff" />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;