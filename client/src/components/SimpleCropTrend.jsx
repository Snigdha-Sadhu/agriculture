import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SimpleCropTrend = ({ data }) => {
  // Pivot data: group by date, collect crops counts
  const unwantedCrops = new Set([
  "No exact crop found — try mixed farming",
  "No crop found",
  // add any other unwanted crop names here
]);
  const pivoted = {};
  const cropsSet = new Set();

  data.forEach(({ _id, count }) => {
    if (unwantedCrops.has(_id.crop)) return;
    const date = `${_id.month}/${_id.year}`;
    if (!pivoted[date]) pivoted[date] = { date };
    pivoted[date][_id.crop] = count;
    cropsSet.add(_id.crop);
  });

  const chartData = Object.values(pivoted);
  const crops = Array.from(cropsSet);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#84d8c8"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {crops.map((crop, i) => (
          <Bar key={crop} dataKey={crop} stackId="a" fill={colors[i % colors.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleCropTrend;
