import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';


const OrderOverviewChart: React.FC<{ data: { month: string; value: number }[] }> = ({ data }) => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 = Jan, 11 = Dec

  const fullMonthData = Array.from({ length: currentMonth + 1 }, (_, i) => {
    const date = new Date(2000, i, 1); // month index
    const month = date.toLocaleString('default', { month: 'short' }); // full month name

    // check if month exists in original data
    const existing = data.find(
      d =>
        new Date(`${d.month} 1, 2000`).getMonth() === i // match by index
    );

    return {
      month,
      value: existing ? existing.value : 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        data={fullMonthData}
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
          stroke="#0d9488"
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
};

export default OrderOverviewChart; 