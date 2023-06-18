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
          <YAxis dataKey="uv" stroke="#ffffff" />=
          <Line type="monotone" dataKey="uv" stroke="#ffffff" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
