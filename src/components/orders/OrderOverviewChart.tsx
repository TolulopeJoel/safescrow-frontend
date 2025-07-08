import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', value: 3 },
  { month: 'Feb', value: 10 },
  { month: 'Mar', value: 48 },
  { month: 'Apr', value: 36 },
  { month: 'May', value: 0 },
  { month: 'Jun', value: 73 },
  { month: 'Jul', value: 36 },
];

const OrderOverviewChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={450}>
    <LineChart
      data={data}
      margin={{ top: 30, right: 30, left: 30, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#e5e7eb" />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 14, fill: '#6b7280' }}
        interval="preserveStartEnd"
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 14, fill: '#6b7280' }}
        allowDecimals={false}
      />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#6366f1"
        strokeWidth={2}
        dot={false}
        activeDot={false}
        isAnimationActive={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default OrderOverviewChart; 